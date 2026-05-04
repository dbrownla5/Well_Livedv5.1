# Reseller Dashboard — Placement, Auth, and Persistence Decision

Status: **Decided** (May 2026). Resolves open questions 1, 2, and 5 in `dashboard-scope.md`. This document is the single source of truth for those three decisions; the build task starts from here.

## TL;DR

| Decision | Choice |
| --- | --- |
| Where the dashboard lives | **New artifact**: `artifacts/reseller-studio` (sibling of `well-lived-citizen` and `api-server`). |
| Auth model | **Clerk** (email/password + Google), operator accounts only. No client-facing login. |
| Master inventory persistence | **Single Postgres database in the existing `api-server`**, schema lives in a new shared lib (`@workspace/db` extension or a new `@workspace/db-reseller` namespace), with row-level `client_id` / `job_id` columns for household tenancy. **Not** a database-per-client. |

---

## 1. Where the dashboard lives — new artifact

**Decision: new artifact `artifacts/reseller-studio`, sibling of the existing artifacts.**

Rationale:

- **Different audience.** `well-lived-citizen` is the public marketing site (clients, leads, press). The reseller dashboard is an internal ops tool used by Dayna's team. Mixing them forces a single deploy/branding/auth boundary onto two products with opposite needs.
- **Different branding.** The marketing site is brand-controlled and uses the WLC voice rules (`.agents/skills/wlc-voice`). The dashboard is utilitarian and should not carry that voice or risk leaking the forbidden language list (`dashboard-scope.md` → "Forbidden language") into public-facing copy.
- **Different auth boundary.** Putting an authed `/dashboard` route inside the marketing site means every visitor's bundle pulls Clerk and the auth runtime. A separate artifact keeps the marketing site fully static and the dashboard's auth scope contained.
- **Different deploy lifecycle.** The marketing site is high-stakes/low-frequency. The dashboard will iterate weekly during the resale-engine build-out. Independent artifacts mean we can ship dashboard changes without redeploying the marketing site.
- **Routing is already solved.** The shared proxy routes by path (see `pnpm-workspace` skill). The new artifact will mount under `/studio` (or similar — finalized at scaffold time) and coexist with `/` (marketing) and `/api` (server).

Rejected alternative: `/dashboard` section inside `well-lived-citizen`. Cheaper to scaffold but bakes in the four problems above. The 5–10 minutes saved are not worth the structural cost.

## 2. Auth model — Clerk

**Decision: Clerk, configured for email/password + Google sign-in. Operator accounts only. No client-facing login in v1.**

Rationale:

- **Operator profile fits Clerk, not Replit Auth.** Operators are non-technical ops staff (estate managers, lifestyle managers — see `household-roles.md`). Requiring a Replit account is wrong for that audience. Clerk supports email/password and Google directly, which matches how the team already works.
- **Multi-operator-per-account is first-class in Clerk.** The dashboard must support "multiple operators per account, multiple clients per operator" (`dashboard-scope.md` → "End user"). Clerk Organizations + Roles model this without us building user/role tables ourselves.
- **The `clerk-auth` skill is the platform default.** Per the skill index, Clerk is the default auth solution unless the user explicitly asks for Replit Auth. They have not.
- **No client-facing portal in v1.** Clients are records, not users (`dashboard-scope.md` → "End user", "Out of scope for v1"). We are not designing for client logins yet, so we do not need a federated/multi-tenant SSO story today. Clerk Organizations leaves room for that later if needed.
- **Explicit rejection of "single shared login".** A shared password for the whole team destroys the per-operator audit trail we need for commission splits, payout reports, and item-level state-machine ownership. Disallowed.

Rejected alternatives:

- **Replit Auth.** Wrong end-user; ops staff aren't Replit users.
- **Single shared login.** Loses per-operator attribution; incompatible with payout reports.
- **Firebase Auth (carried over from `Dashboard--main` prior art).** Prior art is being treated as reference, not foundation (see `prior-art-dashboard.md`). Adding a second auth system to the monorepo for one artifact is not justified.

## 3. Master inventory persistence — single Postgres in `api-server`, namespaced by client

**Decision: persist the master inventory and all reseller-engine entities in the existing `api-server` Postgres database. Schema lives in the existing `lib/db` (or a new `@workspace/db-reseller` lib if the surface gets large enough to warrant a split — call that at schema-design time, not now). Tenancy is handled with `client_id` and `job_id` columns on every row, not by spinning a database per client.**

Rationale:

- **Reuse the infra we already have.** `artifacts/api-server` already exists with `lib/db`, migrations, and the OpenAPI codegen pipeline (`pnpm --filter @workspace/api-spec run codegen`). The dashboard will call typed hooks from `lib/api-client-react` against the same server. Adding a parallel database stack for one product is unjustified overhead.
- **Single source of truth across artifacts.** If we ever surface aggregate data on the marketing site (e.g. "items rehomed this month"), it has to come from one DB, not N.
- **Dedup needs a single index.** Feature 2 in `dashboard-scope.md` (cross-reference new uploads against existing inventory) is a single-index problem. Per-client databases would force us to either ship the dedup logic into the AI prompt (already the v2 design) without a global fallback, or write a cross-DB query layer. Single DB + `client_id` filter is simpler and still supports per-client AI memory.
- **Sensitive client data is handled via column-level controls, not DB isolation.** Open question 8 (data sensitivity / encryption-at-rest) is left open intentionally — it will be answered when the schema is designed. The decision here is only about *topology*, not encryption policy. Postgres supports column encryption and row-level security if/when needed.
- **Operationally, one DB is one backup, one migration story, one point of monitoring.** Per-client DBs multiply ops cost linearly with clients. Dayna's team is small; this would not pay for itself.

Rejected alternatives:

- **A new dedicated database for the reseller studio.** Possible later if the schema diverges enough, but premature now. Start in `api-server` Postgres; split only if a concrete reason appears.
- **Database-per-client.** Rejected as above.
- **Firestore (carried over from `Dashboard--main` prior art).** The prior-art prototype used Firestore; we are not adopting it. Postgres + Drizzle is the existing repo standard.

## What this decision does not cover

The following remain open in `dashboard-scope.md` and are explicitly out of scope for this decision doc:

- Q3 (photo storage — object storage vs. local cache).
- Q4 (Gemini model + key — production model selection, integration vs. user key).
- Q6 (listing publish-out — generate-only vs. direct API integration).
- Q7 (photo grouping at scale).
- Q8 (client/household data sensitivity, retention, encryption-at-rest).
- Q9 (commission-split source of truth — 50/50 vs. 55/45 clothing).
- Q10 (reuse vs. rebuild prior-art dashboard).

Those need to be answered at or before the build task; they do not block scaffolding the artifact, picking the auth provider, or pointing the schema at the existing Postgres.
