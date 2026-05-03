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

## Source mapping

Where each feature came from in the raw materials:

| Feature | Primary source | Supporting sources |
| --- | --- | --- |
| Photo → AI item ID | `attached_assets/Copy_of_AI-Powered_Resale_Automation_Pipeline._1777845832500.dat` (v1) | `ai-resale-pipeline.md` §3 |
| Master inventory + dedup | Same `.dat` file (v2 batch flow) | `ai-resale-pipeline.md` §4 |
| SEO listing description generator | Same `.dat` file ("Pro-Tip" carry-forward) | `ai-resale-pipeline.md` §6 |
| Cross-platform routing | Same `.dat` file (platform routing table) | `ai-resale-pipeline.md` §2 |
| Client / household tracking | `attached_assets/Pasted_content_10_1777845862885.txt` + landscape analysis | `household-roles.md`; `competitors.md` |

## Open questions

These need a decision before, or at the start of, the build task. They are deliberately not answered here.

1. **Where does the dashboard live?** Two options:
   - Add a new artifact (e.g. `artifacts/reseller-studio`) that runs alongside `well-lived-citizen` and `api-server`.
   - Add a `/dashboard` (or similar) section inside `artifacts/well-lived-citizen`.
   The decision affects branding (client-facing brand vs. internal tool), auth boundary, and routing.
2. **Auth model.** Internal ops only, but how — Replit Auth, Clerk, or a single shared login? Tied to question 1.
3. **Photo storage.** Object storage from day one (App Storage / S3-equivalent) vs. a temporary local cache. Affects how the AI call ingests images (URL vs. inline base64).
4. **Gemini model + key.** The pipeline references `gemini-1.5-flash` and `gemini-3-flash-preview`. Need to pick the current production model and decide whether to use a Replit AI integration proxy (`ai-integrations-gemini`) vs. a user-supplied key.
5. **Master-inventory persistence.** Postgres in the existing `api-server`, a new lib/schema, or a separate database per client? Tied to question 1.
6. **Listing publish-out.** Does the dashboard generate descriptions only (operator copy-pastes into eBay/Poshmark/etc.), or does it integrate directly with each platform's API in v1? Default assumption: generate-only in v1.
7. **Photo grouping at scale.** v2 relies on Gemini grouping multi-angle photos in a single batch. For 100+ items, do we keep batches small (per source folder) or design a server-side grouping pre-pass?
8. **Client/household data sensitivity.** Estate clear-outs touch sensitive personal data. Decide retention policy and any encryption-at-rest requirements before storing client records.

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
