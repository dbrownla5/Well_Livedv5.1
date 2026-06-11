# Site Tooling Gaps — Where the Frame Has No Tool

**Date:** 2026-05-30
**Scope:** The Well Lived Citizen (WLC) resale / estate site + API workspace
**Purpose:** Catalog every place where the UI presents a button or process to the
visitor, but there is no working tool or workflow behind it. This is the concrete
version of "the site is a frame with no tools" — and it documents why a prior run
could report a finished "build" that does not actually function end-to-end.

Each gap below is backed by a file reference so it can be verified, not taken on
faith.

---

## TL;DR — what actually happens when a visitor clicks

Every page on the site ends in the same call to action — *Schedule a Call*,
*Book a Reset*, *Schedule a Pickup*, *Send Message* — and all of them route to a
single `/contact` form that POSTs to `/api/contact`. That one endpoint is the
load-bearing tool for the entire business. Today, in the deployed environment:

1. The form **renders and validates** correctly. ✅ (the frame)
2. The submit handler **POSTs to `/api/contact`**. ✅
3. The backend **requires `RESEND_API_KEY`, which is not provisioned**, so it
   returns `500 "Email service not configured."` ❌ (no tool)
4. Even when email works, the submission is **never stored anywhere** — a built
   database schema exists but no code writes to it. ❌
5. There are **two divergent copies** of the site and two divergent contact
   backends; the more complete one is not necessarily the one that deploys. ❌

So the visible result is a polished form whose button does nothing durable. That
is the gap.

---

## Priority summary

| # | Gap | Severity | Type |
|---|-----|----------|------|
| 1 | Contact endpoint has no configured email sender → every CTA dead-ends in prod | **Critical** | Missing tool/config |
| 2 | Submissions are never persisted; DB schema is orphaned | **Critical** | Built tool, no workflow |
| 3 | Two site copies + two contact backends have drifted; deployed copy is ambiguous | **High** | Build provenance |
| 4 | `/api/contact` missing from the OpenAPI contract → no typed client / validation | **High** | Contract drift |
| 5 | "UPS label" / "Uber courier" pickup options imply automation that doesn't exist | **Medium** | Button, no tool |
| 6 | Resale-agreement consent captured in UI but stored only in an email body | **Medium** | Compliance/record |
| 7 | No tests, no CI, no SessionStart hook — nothing verifies the build | **High** | No verification workflow |
| 8 | A live-looking API key is committed in `.replit` | **High** | Security |

---

## Gap 1 — The contact form's backend tool is not configured (Critical)

**The button:** Every page funnels to `/contact`. Examples:
`artifacts/wlc-site/src/pages/Home.tsx:63` (*Schedule a Call*),
`.../TheReset.tsx:50` (*Book a Reset*),
`.../FastBagFill.tsx:55` (*Schedule a Pickup*),
plus the final *Send Message* submit in
`artifacts/wlc-site/src/pages/Contact.tsx:516`.

**The missing tool:** Both backend implementations hard-require `RESEND_API_KEY`
and 500 out without it:

- `artifacts/api-server/src/routes/contact.ts:43-47`
- `site-build/wlc-launch/netlify/functions/contact.ts:50-56`

`.replit` sets `CONTACT_TO` and `CONTACT_FROM` in `userenv.shared` but **does not
set `RESEND_API_KEY`**, and there is no `.env` providing it. The sending domain is
also unverified (the code falls back to Resend's `onboarding@resend.dev` sender,
which cannot send to arbitrary recipients in production).

**Impact:** In the deployed environment, 100% of contact submissions fail with
"Email service not configured." The site looks complete and converts zero leads.

**Fix:**
1. Provision `RESEND_API_KEY` as a secret and verify `thewelllivedcitizen.com`
   as a Resend sending domain.
2. Make a missing key *non-fatal*: persist the submission (Gap 2) and surface a
   softer message so a config problem never silently loses a lead.

---

## Gap 2 — Submissions are never persisted; the database tool is orphaned (Critical)

**Built but unused:** `lib/db/src/schema/contact.ts` defines a full
`contact_submissions` table (name, email, phone, neighborhood, client type,
summary, situation, bag count, urgency, pickup windows/method, `pickupRelease`,
courier notes, timestamp), plus an `insertContactSubmissionSchema` zod schema.
There are also `conversations` and `messages` tables and a
`pnpm --filter @workspace/db run push` migration workflow.

**The gap:** No request path imports `@workspace/db`. A repo-wide search for
`@workspace/db` / `contactSubmissions` / `drizzle` inside the contact backends
returns nothing — neither the Express route nor the Netlify function touches the
database. Email is the *only* sink.

**Impact:**
- If Resend fails, rate-limits, or the key is missing (Gap 1), the lead is gone —
  no retry, no record, no CRM.
- The `pickupRelease` / agreement-consent columns are defined but never written,
  so the consent record (Gap 6) has nowhere to live.
- A whole conversations/messages schema exists with no workflow attached.

**Fix:** Write every submission to `contact_submissions` (validated with the
existing `insertContactSubmissionSchema`) as the system of record, and treat the
email as a best-effort *notification* on top of that.

---

## Gap 3 — Two site copies + two backends have drifted; the deployed one is ambiguous (High)

There are (at least) three near-duplicate front-ends and two contact backends:

- `artifacts/wlc-site/` — the Replit "web" artifact (`artifact.toml` kind = web),
  served static; `/api` is the Express `artifacts/api-server`.
- `site-build/wlc-launch/` — a **separate Netlify deploy** (`netlify.toml`) with
  its **own** serverless contact function.
- `artifacts/mockup-sandbox/` — a component sandbox.

These have already diverged in the field:

- `artifacts/wlc-site/.../Contact.tsx` sends `agreementAccepted` and
  `estimatedItems` in the POST body. `site-build/wlc-launch/.../Contact.tsx` does
  **not** (confirmed by diff of the two `useState` form initializers).
- The Netlify function's `ContactPayload` interface
  (`site-build/wlc-launch/netlify/functions/contact.ts:14-26`) omits
  `pickupMethod`, `pickupRelease`, `courierNotes`, and `agreementAccepted`
  entirely — so on the Netlify build those fields are silently dropped from the
  email even if the form sends them.

**Impact:** "The site" means different things in different folders. A change made
to improve the intake (e.g., agreement capture) lands in one copy and never
reaches the deployed one. This is the structural reason a prior session could
*believe* it shipped a working improvement — it edited a copy that isn't the live
build. It is the literal "falsified sense of build."

**Fix:** Choose one source of truth and one deploy path. Delete or clearly archive
the others (e.g., move `site-build/` out of the deploy set or mark it deprecated).
Share a single `ContactPayload` type between the form and the backend so drift
becomes a type error.

---

## Gap 4 — `/api/contact` is missing from the API contract (High)

`lib/api-spec/openapi.yaml` — described in `replit.md` as the "source of truth for
all API shapes" — documents only `/healthz`, `/voice/profile`, and
`/voice/analyze`. The single most important endpoint, `/contact`, is **not in the
contract**.

**Impact:**
- The generated typed client and zod schemas (`lib/api-client-react/`,
  `lib/api-zod/`) do not cover contact, so the front-end hand-rolls
  `fetch("/api/contact")` with an untyped payload — exactly where the Gap 3 drift
  crept in.
- The server does not validate the request body against a schema (the existing
  `insertContactSubmissionSchema` is unused), so malformed payloads aren't caught.

**Fix:** Add `/contact` (request + response) to `openapi.yaml`, run
`pnpm --filter @workspace/api-spec run codegen`, validate the body server-side with
the generated/zod schema, and call the endpoint through the generated hook.

---

## Gap 5 — "UPS label" and "Uber courier" pickup options have no fulfillment tool (Medium)

The Fast Bag Fill intake (`artifacts/wlc-site/src/pages/Contact.tsx`, pickup-method
select) offers **"Send me a UPS label"** and **"Uber courier"**, with copy that
implies an automated, scheduled handoff ("I'll confirm one and lock the time").

There is no shipping-label generator (UPS/Shippo) and no courier-dispatch
integration (e.g., Uber Direct) anywhere in the codebase. The selected method is
only written into the notification email. The button implies a workflow that is
actually 100% manual.

**Fix:** Either build the integration (label generation / courier dispatch) or
adjust the copy so the visitor understands Dayna arranges the label/courier
personally after they submit. Don't promise automation the tooling can't deliver.

---

## Gap 6 — Resale-agreement consent is captured in the UI but stored only in an email (Medium)

The intake includes a checkbox authorizing WLC to take possession of the client's
property ("possession transfers at handoff per the Resale Agreement") surfaced as
`pickupRelease` / `agreementAccepted`. The Express route even labels it in the
email: *"Resale Agreement accepted at intake: YES — client signed at booking"*
(`artifacts/api-server/src/routes/contact.ts:81-88`).

For a business that physically takes and resells other people's property, that is a
**consent record**. Today it exists only as text in an inbox — no timestamp, no
immutable storage, no agreement-version reference — and on the Netlify build it is
dropped entirely (Gap 3). The `WLC-Resale-Agreement.pdf` is shipped in `public/`,
but which version a client agreed to is never recorded.

**Fix:** Persist consent (boolean + timestamp + agreement version) with the
submission as part of Gap 2. This is both a record-keeping and a liability concern.

---

## Gap 7 — No verification workflow: no tests, no CI, no SessionStart hook (High)

There are no `.github/workflows`, no test scripts in any `package.json`, and no
`.claude` hooks. `pnpm run build` is only `typecheck + per-package build` and needs
dependencies installed (root `node_modules` is absent in a fresh checkout). Nothing
independently exercises the contact endpoint, checks that required env vars exist,
or confirms the site builds.

**Impact:** "It works" / "the build is done" can only be *asserted*, never
*checked*. That is precisely the condition that allowed a falsified sense of build.

**Fix:**
- Add a SessionStart hook (there is a `session-start-hook` skill for exactly this)
  so web sessions install deps and can run typecheck/build.
- Add minimal CI: `pnpm run typecheck`, `pnpm run build`, and a smoke test that
  POSTs to `/api/contact` against a stubbed sender and asserts a 200 + a persisted
  row.
- Add a startup check that fails loudly if `RESEND_API_KEY` / `DATABASE_URL` are
  missing in production, instead of silently 500-ing per request.

---

## Gap 8 — A live-looking credential is committed in `.replit` (High, security)

`.replit` → `[userenv.shared]` contains a hard-coded Google API key (`Gemma = ...`)
checked into version control. Even if unused by the app, a committed key is a
leaked secret.

**Fix:** Rotate the key immediately, remove it from `.replit`, and move any real
secrets to the platform secret manager. Never store API keys in tracked files.

---

## Not a gap (intentional), for the record

- **The voice tool is API-only by design.** `replit.md` states the
  `/api/voice/analyze` tool is "a behind-the-scenes audit tool, not a user-facing
  feature." It is correctly *not* wired to any button. Noted here so it isn't
  mistaken for a missing UI.

---

## Recommended sequence

1. **Unblock conversions (Gaps 1 + 2):** provision `RESEND_API_KEY`, verify the
   sending domain, and persist every submission to `contact_submissions` so a lead
   is never lost even if email fails.
2. **Collapse the duplication (Gap 3):** pick one front-end + one backend + one
   deploy target; archive the rest; share a single payload type.
3. **Put contact under contract (Gap 4):** add `/contact` to OpenAPI, regenerate,
   validate server-side.
4. **Make the build checkable (Gap 7 + 8):** SessionStart hook, minimal CI, startup
   env checks, and rotate the committed key.
5. **Align promises with tooling (Gaps 5 + 6):** build or re-word the
   label/courier flow, and store agreement consent durably.
