# Partner Brief — Build Status, Provenance & Integration Contract

**Owner:** Dayna Brown — The Well Lived Citizen
**Date:** 2026-05-30
**Audience:** Replit Agent (website/hosting), Manus AI (CRM/dashboard), and Dayna
**Status of this document:** Authoritative. Future contributions from any agent
must conform to the Integration Contract below and pass the Verified Checks.

---

## 1. What was actually built tonight (by Claude, in this repo)

A complete, **verified** operational system for the 9-step Handshake workflow,
built directly into the existing Replit stack (pnpm workspace, Express API,
Drizzle/Postgres, React site). No second app to host.

- **Data model** — `lib/db/src/schema/handshake.ts` (handshakes, items, audit events)
- **Business logic (pure, unit-tested)** — `artifacts/api-server/src/handshake/logic.ts`
  (agreement gate, 9-step machine, payout math, date rules)
- **API engine** — `artifacts/api-server/src/routes/handshake.ts`
  (intake, board, advance, inventory report builder, consent, payout)
- **Persistence** — `artifacts/api-server/src/handshake/storage.ts`
- **Email** — `artifacts/api-server/src/lib/email.ts` (Resend + graceful fallback)
- **Portable webhook** — `artifacts/api-server/src/lib/webhook.ts`
  (`WEBHOOK_URL` + optional `WEBHOOK_SECRET`; URL never hardcoded)
- **Ops dashboard** — served at `GET /api/handshake/dashboard`
- **Signed intake UI** — `artifacts/wlc-site/.../AgreementGate.tsx` → `/bag-pickup`
- **Client consent page** — `artifacts/wlc-site/src/pages/Consent.tsx` → `/consent/:token`
- **Contact form** — now persists to Postgres + forwards to the webhook; a missing
  email key is no longer fatal (the lead is saved first)

### Verified Checks (what "done" means here — run, not asserted)
- ✅ `pnpm run typecheck` — passes across libs, server, site
- ✅ `pnpm --filter @workspace/api-server run build` — esbuild bundle succeeds
- ✅ `pnpm --filter @workspace/wlc-site run build` — vite build succeeds
- ✅ `node --experimental-strip-types artifacts/api-server/src/handshake/logic.test.ts`
  — **12/12** checks pass, incl. the payout worked example ($52 net × designer 50% = $26)
- ✅ Built server boots and serves: health `200`, unsigned intake `400`,
  dashboard `200`, unknown route `404`

---

## 2. Provenance & what is NOT usable (please adjust)

This is not a criticism of effort — it's about what can safely carry client data
and ship. Both partners' work on **this portion** is superseded:

### The standalone "Handshake app" ZIP
- **Origin:** It was produced by **Claude**, not by Replit or Manus. It is not in
  this repo and nothing hosts it. A floating zip is not a running system.
- **Resolution:** Superseded by the in-repo implementation above, which runs on
  the stack you already pay for and is version-controlled.

### Manus integration brief (Google Sheet + FastAPI webhook + dashboard)
Not wired in, for concrete reasons:
1. **Unauthenticated public endpoint writing to a client database.** The brief
   states "No API keys required: the webhook is publicly accessible." For data
   that includes names, emails, phones, addresses, and a legal signature, anyone
   who learns the URL can inject or scrape records. **Not acceptable for PII.**
2. **Ephemeral sandbox URL** (`*.manus.computer`). These rotate; the pipe would
   silently break and leads would be lost with no visible error.
3. **Targets the wrong file.** The brief says to edit `netlify/functions/contact.ts`
   in `site-build/wlc-launch/` — a **duplicate, non-deployed** site copy (see §4).
- **Resolution:** The webhook seam exists and is ready. Manus must meet the
  Integration Contract (§3) before any client PII is routed there.

### Replit's prior contact backend
- The contact form previously **500'd in production** (required `RESEND_API_KEY`,
  dropped the lead on failure, persisted nothing). It also reported builds as
  finished that did not compile end-to-end — a "falsified sense of build."
- **Resolution:** Replaced with persist-first + webhook-forward + safe email.

---

## 3. Integration Contract (all future work must conform)

**Single source of truth:** this Git repo. The **Replit Postgres** is the system
of record. Email and any external CRM are best-effort layers on top — they must
never be the only place a lead exists.

**Webhook receiver requirements (for Manus or any CRM):**
1. **Stable HTTPS domain** — no ephemeral/sandbox hostnames.
2. **Authentication enforced** — must accept and *require* a shared secret sent as
   `Authorization: Bearer <WEBHOOK_SECRET>` and/or `X-Webhook-Secret`. Reject
   requests without it.
3. **Documented JSON contract** — payloads are `kind: "handshake_intake"` and
   `kind: "contact"` with the fields listed in `docs/HANDSHAKE.md`.
4. **Idempotency** — de-dupe on the `token` / handshake id; retries must not
   create duplicate rows.
5. **Access-controlled storage** — if backed by a Google Sheet, it must not be
   publicly readable/writable.

**Website/build requirements (for Replit):**
1. Build against **`artifacts/wlc-site`** (the deployed web artifact), NOT
   `site-build/wlc-launch`. Resolve the duplication (§4).
2. Secrets (`WEBHOOK_URL`, `WEBHOOK_SECRET`, `DATABASE_URL`, `RESEND_API_KEY`,
   `PUBLIC_SITE_URL`) live in Replit Secrets — never committed to the repo.
3. Rotate the Google API key currently committed in `.replit`.

---

## 4. Open structural issue — two site copies

`artifacts/wlc-site/` (Replit web artifact, where tonight's work lives) and
`site-build/wlc-launch/` (a separate Netlify copy) have **diverged**. Edits to one
do not reach the other. This is the mechanism behind "improvements that look done
but aren't live." **Action:** pick one (recommended: `artifacts/wlc-site`), retire
the other, and never maintain both.

---

## 5. Syncing to the Verified Checks (so this doesn't happen again)

Any agent touching this repo must, before claiming completion, run and pass the
Verified Checks in §1. Recommended enforcement (not yet added):
- A **CI workflow** running `pnpm run typecheck` + both builds + the logic test on
  every push, so a red build can't be reported as green.
- A **SessionStart hook** so web sessions install deps and can run the checks.

---

## 6. Bottom line for Dayna

You now have **one** coherent, running system on the stack you already pay for,
instead of fragments across tools. The remaining work is consolidation and
finishing — not starting anything new. See `docs/RESULTS-PLAN.md` for the focused
path to revenue.
