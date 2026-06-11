# Project Status — Session Close

**Date:** 2026-05-30 · Branch: `claude/site-tooling-gaps-pr-docs-P9p1K` · PR #1

## Done & verified (builds green, run-tested)

- **Handshake system** — 9-step chain-of-custody workflow on the Replit stack:
  signed intake gate, board, step actions, inventory report builder, client
  consent page, payout. Data model, pure unit-tested logic, persistence, email
  (Resend + safe fallback), ops dashboard at `/api/handshake/dashboard`.
- **Site signed-intake flow** — `AgreementGate` → `/bag-pickup`, `/consent/:token`;
  all "Schedule a Pickup" CTAs routed through the signed flow.
- **Brand voice locked** — `voice-profile.ts` now holds the operational-realism
  positioning, the "conversations in between" device, dignity/restraint rules,
  the hero-flow rule, and canonical launch copy.
- **Homepage rebuilt** — universal ease-based hero ("There's an easier way to do
  that."), recognition bullets, "three easy ways to start," core services.
- **Repo consolidated** — duplicate `site-build/wlc-launch` removed; stale tarball
  + scratch notes removed. `git pull` clears them from local files.
- **Webhook seam** — `WEBHOOK_URL` + optional `WEBHOOK_SECRET` (env only, never
  hardcoded). DB is system of record; webhook is best-effort.
- **Docs** — PARTNER-BRIEF, RESULTS-PLAN, HANDSHAKE, LISTING-WORKFLOW, LAUNCH-KIT.

Verified this session: `pnpm run typecheck` ✅ · api-server build ✅ ·
wlc-site build ✅ · 12/12 handshake logic checks ✅.

## This week (no new apps)
- **Launch:** post from `docs/LAUNCH-KIT.md` (copy is done). One real image each.
- **Photos:** edit realistically in Manus — no fake/AI-plastic look. (Photos only;
  not a PII pipeline.)
- **List items:** use `docs/LISTING-WORKFLOW.md`.

## Open (when ready — not tonight)
- **A — Handshake to first sale:** provision Postgres on Replit, set secrets
  (`DATABASE_URL`, `RESEND_API_KEY`, `PUBLIC_SITE_URL`), run `pnpm --filter
  @workspace/db run push`. Steps in `docs/HANDSHAKE.md`.
- **B — Triage the 15 apps:** decide finish / fold-in / let-go per app.
- **Manus CRM:** only with a stable HTTPS URL + enforced `WEBHOOK_SECRET`
  (see `docs/PARTNER-BRIEF.md`). Do not route client PII until then.
- **Housekeeping:** rotate the API key committed in `.replit`; add CI to run the
  verified checks on every push.
