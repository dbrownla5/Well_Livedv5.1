# The Handshake — Operating Manual

The full operational system for WLC's 9-step chain-of-custody resale workflow,
built into the existing Replit stack (no new app to host, no second site copy).

## What got built

| Piece | Where | What it does |
|-------|-------|--------------|
| Data model | `lib/db/src/schema/handshake.ts` | `handshakes`, `handshake_items`, `handshake_events` (audit log) |
| Business logic | `artifacts/api-server/src/handshake/logic.ts` | Agreement gate, 9-step machine, payout math, date rules — **pure, unit-tested** |
| API engine | `artifacts/api-server/src/routes/handshake.ts` | Intake (gate-enforced), board, advance, report builder, consent, payout |
| Storage | `artifacts/api-server/src/handshake/storage.ts` | Drizzle persistence |
| Email | `artifacts/api-server/src/lib/email.ts` | Resend with graceful fallback (logs when no key — never crashes) |
| Webhook | `artifacts/api-server/src/lib/webhook.ts` | Portable `WEBHOOK_URL` push to any external CRM, optional bearer auth |
| Ops dashboard | `GET /api/handshake/dashboard` | Self-contained admin page: board, step actions, inventory, payout |
| Agreement gate | `artifacts/wlc-site/src/components/AgreementGate.tsx` + `/bag-pickup` | Scroll + typed signature → opens a record |
| Client consent | `artifacts/wlc-site/src/pages/Consent.tsx` → `/consent/:token` | Client reviews inventory, approves or pulls items |

## The 9 steps

1. **intake** — agreement signed + record opened *(the legal gate — no signature, no record)*
2. **day_before** — day-before pickup confirmation emailed
3. **custody** — physical custody logged at handoff (emails client)
4. **inventory** — 48-hour count verification
5. **evaluation** — 7–10 business-day evaluation
6. **report** — itemized inventory report emailed with a consent link
7. **consent** — 24-hour client window to pull items
8. **review** — 4-day review period
9. **payout** — total computed, emailed; dated to the first Monday after consent + 30 days

Steps only move forward, one at a time (enforced in `logic.ts` / `canAdvance`).

## Going live on Replit (one-time)

1. **Database** — a Postgres DB must be provisioned so `DATABASE_URL` is set.
   Create the tables:
   ```
   pnpm --filter @workspace/db run push
   ```
2. **Secrets** (Replit Secrets / env):
   - `DATABASE_URL` — Postgres (required)
   - `RESEND_API_KEY` — already set per the site owner; enables client emails
   - `CONTACT_FROM` — verified sender, e.g. `The Well Lived Citizen <dayna@thewelllivedcitizen.com>`
   - `PUBLIC_SITE_URL` — e.g. `https://thewelllivedcitizen.com` (used to build consent links)
   - `WEBHOOK_URL` — *optional*; the CRM receiver (see below)
   - `WEBHOOK_SECRET` — *optional but recommended*; shared secret sent as a bearer token
3. Deploy. Run the dashboard at `/api/handshake/dashboard`.
   **Keep it behind hosting auth** — it's an internal tool.

## Wiring an external CRM (Google AppSheet, Manus, anything)

The webhook is the portable seam. Set `WEBHOOK_URL` to any POST endpoint and a
JSON record is sent on every submission. Swap targets anytime without touching
the website. **The URL lives only in a Replit Secret — never hardcoded in source
or committed to git.**

- `kind: "handshake_intake"` — fired when a signed pickup opens a record.
  Fields: `id`, `token`, `opened`, `name`, `email`, `phone`, `neighborhood`,
  `bagsCount`, `estimatedItems`, `urgency`, `pickupMethod`, `pickupTime1`,
  `pickupTime2`, `courierNotes`, `signatureName`, `agreementTimestamp`.
- `kind: "contact"` — fired on general contact-form submissions.

The DB row is always the system of record; the webhook is best-effort on top, so
a CRM outage never loses a lead. If `WEBHOOK_URL` is unset, the webhook is a no-op
and everything else still works.

### Security note on third-party receivers

If you point `WEBHOOK_URL` at an external service (e.g. a Manus-hosted endpoint),
treat it as sending client PII off-platform. Before going live:
- Require **HTTPS** and a **stable domain** (ephemeral sandbox URLs like
  `*.manus.computer` rotate and will silently break the pipe).
- Set `WEBHOOK_SECRET` and have the receiver **reject requests without it** — an
  unauthenticated public endpoint that writes to a client database can be spammed
  or poisoned by anyone who learns the URL.
- Confirm the receiver's storage (e.g. a shared Google Sheet) has appropriate
  access controls.

## Payout math (single source of truth: `logic.ts`)

- Item net = sold gross − platform fees − shipping (never negative to client).
- Tier client share: Standard 40%, Contemporary 45%, Designer 50%, Luxury 60%.
- Payout total = sum of client shares for items that sold and weren't pulled.
- Payout date = first Monday strictly after (consent date + 30 days).

Worked example (verified in tests): $70 gross − $10 fees − $8 shipping = $52 net;
Designer 50% = **$26 to client**.

## Verification status — what was actually run

Honest ledger (this build box has the npm registry but **no live Postgres**, so
DB round-trips are verified on Replit where `DATABASE_URL` exists):

- ✅ **Business logic** — ran `logic.test.ts`: **12/12 checks pass** (gate blocks
  unsigned / opens signed, steps can't skip or reverse, payout math incl. the
  $26 example, payout date rule).
- ✅ **Type safety** — full `pnpm run typecheck` passes across libs, server, site.
- ✅ **Server builds & boots** — esbuild bundle succeeds; the built server serves
  `/api/healthz` (200), intake validation (400), and the dashboard (200).
- ✅ **Site builds** — `vite build` succeeds with the new `/bag-pickup` and
  `/consent/:token` routes.
- ⏳ **Live DB round-trip + real email send** — verify on Replit after
  `db run push` and with secrets set. The storage layer is thin Drizzle calls;
  the gate/step/payout logic it depends on is already proven.

## Try it after deploy (smoke test)

```
# 1. Unsigned intake is blocked (kept off the board)
curl -X POST $URL/api/handshake/intake -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@e.com"}'        # -> opened:false, blocked:true

# 2. Signed intake opens a record
curl -X POST $URL/api/handshake/intake -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@e.com","agreementAccepted":true,
       "signatureName":"Test Client","agreementTimestamp":"2026-05-30T00:00:00Z"}'

# 3. Open the board / dashboard
open $URL/api/handshake/dashboard
```
