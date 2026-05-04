# Reseller Dashboard — Scope (Future Build)

This is the agreed feature set for the future "reselling dashboard studio" build, captured here so the build task can start from a single source of truth instead of re-parsing `attached_assets/`. Nothing in this document is built yet.

## End user

**Internal ops, not client self-serve.**

The dashboard is operated by the reseller / household-management team on behalf of clients (estate clear-outs, downsizing seniors, busy households). Clients do not log in. They are tracked as records; they do not interact with the system.

See `household-roles.md` for the role taxonomy. The dashboard must support multiple operators per account and multiple clients/households per operator.

## Feature set (v1)

### 1. Photo upload → AI item ID

Upload a batch of photos. Gemini Vision returns Brand, Model, Market Price, Floor Price, and a suggested Platform per identified item.

Source: v1 + v2 of the AI pipeline in `ai-resale-pipeline.md`.

### 2. Master inventory table with duplicate detection

A persistent inventory table is the system of record. New uploads are cross-referenced against existing rows; items the AI flags as `Duplicate` are surfaced and not silently re-added.

Source: v2 dedup logic in `ai-resale-pipeline.md` (existing inventory passed in as memory; `Status: New | Duplicate` in the JSON output).

### 3. SEO-optimized listing description generator

For every new inventory item, generate a platform-specific listing description. Carry-forward feature explicitly mentioned in the source pipeline chat ("a `.txt` file for every photo that contains a pre-written, SEO-optimized description for the specific platform it chose").

Source: `ai-resale-pipeline.md` §6.

### 4. Cross-platform routing logic

Apply the platform routing table (size × type → eBay / Poshmark / Etsy / Chairish / FB Marketplace) and surface it on each item, with the shipping logic per platform.

Source: `ai-resale-pipeline.md` §2.

### 5. Client / household tracking (estate clear-out jobs)

Items belong to a job, jobs belong to a client/household. This is what makes the dashboard useful for the household-management roles in `household-roles.md` (estate managers, fractional estate managers, lifestyle managers) where estate clear-outs are the highest-volume inventory source.

Source: `household-roles.md` §5; `competitors.md` "Differentiation patterns to watch — Move management as a wedge / Estate / downsizing focus."

## Resale operating rules (from Dayna's business plan)

These are the operator-facing settings and behaviors the dashboard must support before it can write inventory or payouts. Folded in from `attached_assets/Dayna_Brown_Business_Plan_Final_1777843986317.docx`. Where they conflict with the older "Decision Lock" baked into the prior-art dashboard (`prior-art-dashboard.md`), the conflict is called out — the build task must pick a winner before persisting anything.

### Commission split

- **Default**: 50/50 on net profit after platform fees (business plan).
- **Conflict**: prior-art dashboard hardcodes 55/45 for clothing, 50/50 for designer + furniture.
- **Implication**: split must be a per-item or per-job config, not a constant. Default per category, overridable per item.

### Hard lines (item intake)

- 10-item minimum for doorstep pickup.
- Items must be in the specified zip bags (no trash bags). Surface this on the intake form / pickup booking flow if/when one exists.
- Nothing under **$20 estimated sale value** — the dashboard should flag any AI-suggested item below the floor and route it to "donate / decline" instead of "list".
- Items requiring professional cleaning or repair before listing → client-handles or donate; never auto-listed.

### Floor price + markdown authority

- A **floor price** is set per item at intake (operator input, with AI suggestion as default).
- Operator has standing authority to accept any offer within **15–20% of the listed price** without re-asking.
- Below that threshold: send the client one notification, 24-hour response window. No response → operator decides. The dashboard should expose this as an item-level state machine: `Listed → OfferReceived → AwaitingClient (24h timer) → AutoApproved | Accepted | Declined`.

### Markdown schedule (default)

- **Clothing / general**: Day 30 −10%, Day 60 −10%, Day 90 client decides (pick up at their expense, donate with tax receipt, or accept best offer).
- **Furniture**: 60-day timeline, −10% every 14 days.
- **Expedited (client-requested 30 days)**: weekly markdowns, full operator authority.
- The dashboard should auto-schedule markdowns and surface a "ready for client decision" queue at Day 90.

### Payout cadence

- Report sent by the **1st** of the month.
- Payout by the **5th** (Venmo, Zelle, or check).
- Per-item line on the report: item, platform, sale price, net after platform fee, client's share.
- The dashboard must be able to produce this report from inventory + sale records.

### Platforms

- **Active**: Poshmark (primary clothing), eBay (luxury / collectibles), Etsy (curated vintage / home), Facebook Marketplace (furniture / local pickup, zero fees), Chairish (higher-end home decor — under evaluation), Nifty AI ($69.99/mo crosslister, under 90-day ROI evaluation).
- **On deck**: Vestiaire Collective (designer bags, built-in authentication).
- **Future**: 1stDibs ($500+ items, dealer application required).
- **Killed — must not be suggested**: Depop, Grailed, Mercari, Thumbtack.
- The platform-routing table from `ai-resale-pipeline.md` must respect this killed-list when selecting a platform.

### Data sanitization (electronics)

Electronics identified during a job (laptops, phones, tablets) are factory-reset, data-wiped, and recycled. The dashboard should support an `Electronics — Wipe & Recycle` disposition as a first-class item state, not a free-text note.

### Forbidden language (apply to all generated copy)

Any AI-generated listing description, client message, or report copy must avoid:
"elder care", "estate sale", "asset management", "liquidation", "fall prevention", "small repairs", "closet systems", "luxury organizing", "will / death", "ADHD closet edits". Use "major life transition" / "next chapter" / "hands-on home improvements" / "closet and wardrobe organization" instead. This belongs in the system prompt for the description generator (Feature 3) and any client-facing notification template.

## Source mapping

Where each feature came from in the raw materials:

| Feature | Primary source | Supporting sources |
| --- | --- | --- |
| Photo → AI item ID | `attached_assets/Copy_of_AI-Powered_Resale_Automation_Pipeline._1777845832500.dat` (v1) | `ai-resale-pipeline.md` §3 |
| Master inventory + dedup | Same `.dat` file (v2 batch flow) | `ai-resale-pipeline.md` §4 |
| SEO listing description generator | Same `.dat` file ("Pro-Tip" carry-forward) | `ai-resale-pipeline.md` §6 |
| Cross-platform routing | Same `.dat` file (platform routing table) | `ai-resale-pipeline.md` §2 |
| Client / household tracking | `attached_assets/Pasted_content_10_1777845862885.txt` + landscape analysis | `household-roles.md`; `competitors.md` |
| Resale operating rules (commission, markdown, payout, hard lines, platform list, forbidden language) | `attached_assets/Dayna_Brown_Business_Plan_Final_1777843986317.docx` (Resale Engine + Rules and Boundaries) | `prior-art-dashboard.md` (conflict notes) |
| Prior-art / reusable copy + auth shape | `attached_assets/Dashboard--main_1777846011968.zip` | `prior-art-dashboard.md` |

## Open questions

These need a decision before, or at the start of, the build task. They are deliberately not answered here.

Questions 1, 2, and 5 are **resolved** — see `dashboard-placement-decision.md` for the rationale. Summary of the resolutions is inlined below so this doc still reads end-to-end.

1. **Where does the dashboard live?** **Resolved → new artifact `artifacts/reseller-studio`**, sibling of `well-lived-citizen` and `api-server`. Keeps the marketing site static and unauthed; isolates the internal tool's branding, auth, and deploy lifecycle. See `dashboard-placement-decision.md` §1.
2. **Auth model.** **Resolved → Clerk** (email/password + Google), operator accounts only, no client-facing login in v1. Clerk Organizations covers the multi-operator-per-account requirement. Single shared login is explicitly disallowed (would destroy per-operator audit trail needed for payout reports). See `dashboard-placement-decision.md` §2.
3. **Photo storage.** Object storage from day one (App Storage / S3-equivalent) vs. a temporary local cache. Affects how the AI call ingests images (URL vs. inline base64).
4. **Gemini model + key.** The pipeline references `gemini-1.5-flash` and `gemini-3-flash-preview`. Need to pick the current production model and decide whether to use a Replit AI integration proxy (`ai-integrations-gemini`) vs. a user-supplied key.
5. **Master-inventory persistence.** **Resolved → single Postgres database in the existing `api-server`**, schema in `lib/db` (or a new `@workspace/db-reseller` lib if it grows large), tenancy via `client_id` / `job_id` columns. Not a database-per-client. See `dashboard-placement-decision.md` §3.
6. **Listing publish-out.** Does the dashboard generate descriptions only (operator copy-pastes into eBay/Poshmark/etc.), or does it integrate directly with each platform's API in v1? Default assumption: generate-only in v1.
7. **Photo grouping at scale.** v2 relies on Gemini grouping multi-angle photos in a single batch. For 100+ items, do we keep batches small (per source folder) or design a server-side grouping pre-pass?
8. **Client/household data sensitivity.** Estate clear-outs touch sensitive personal data. Decide retention policy and any encryption-at-rest requirements before storing client records.
9. **Commission-split source of truth.** 50/50 (Dayna's business plan) vs. 55/45 clothing + 50/50 designer/furniture (prior-art dashboard "Decision Lock"). Pick the default before writing the splits column. See `prior-art-dashboard.md` "Discrepancies".
10. **Reuse vs. rebuild the prior-art dashboard.** The `Dashboard--main` prototype is an AI-Studio-bound brand intelligence suite, not a reseller dashboard. Decide whether to keep its `SERVICES_DATA` constant + Firestore-rules template + AI-error handling pattern, or start clean. See `prior-art-dashboard.md`.

## Out of scope for v1

- Client self-serve portal.
- Direct marketplace API publishing (eBay, Poshmark, Etsy, Chairish, FB Marketplace).
- Payment processing / commission tracking.
- Shipping label generation.
- Mobile app (assume web-only for v1).

## What this scope is _not_

This document is not a build plan. It does not contain:

- A database schema.
- API contracts.
- UI mockups or component breakdowns.
- A milestone or timeline estimate.

Those belong in the future build task, not in source extraction.
