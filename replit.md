# Resale / Estate Services Site

A voice-consistent website and API for a Los Angeles-based resale, estate, and value recovery service. The owner's brand voice is the core product: human-first, business-always, never influencer-polished, never SEO-sanitized.

## Project Map — read these first
*If you are an AI agent opening this project: read this section, then the files below, before doing anything. Everything you need to understand the business and its voice is here. You do not need to be told folder by folder.*

- **`attached_assets/wlc-brand-vault_*.md`** — THE brand voice source of truth. Origin story, positioning, locked hero, banned language, the four pillars, voice layers. Add, never delete. **Read this before writing any client-facing copy.**
- **`docs/SERVICES-PRICING.md`** — the Services & Pricing foundation: two-layer model (Quick Sells + pillars), rates, flex blocks, supply add-on bundles. Build the Services/Pricing pages from this.
- **`artifacts/api-server/src/voice-profile.ts`** — the operational voice profile (code form): rules, anti-patterns, canonical copy, annotated examples. Powers the voice + caption tools.
- **`docs/DIRECTIVE.md`** — how the owner's tools fit together (Claude / Manus / Gemini / Unfold) + content-engine scope.
- **`docs/GO-LIVE.md`** — plain-English publish checklist (publish → bookings → caption studio).
- **`docs/LAUNCH-KIT.md`** — ready-to-post launch copy (locked). `docs/CONTENT-ENGINE.md` — caption prompt system.
- **`docs/HANDSHAKE.md`** — the resale chain-of-custody workflow + how to turn on bookings.
- **`artifacts/wlc-site/`** — the website (React + Vite). Internal Caption Studio at `/caption-studio`.

## How to change anything (anti-drift law)
*For any AI agent working here. Drift = the same fact saying two different things in two places. That is always a bug, never acceptable. Follow this:*

1. **Understand the whole business first.** Read the Project Map and the brand vault before touching copy. You are acting as the owner's marketing developer, not a search-and-replace tool. Localized edits that ignore the rest of the site are the #1 cause of drift.
2. **Single source of truth.** Business facts — prices, service names, the four pillars, the hero/taglines, contact info, canonical service descriptions — must live in ONE place and be imported everywhere they appear. **Never hardcode a price, name, or tagline directly in a page.** (Target architecture: a single `brand`/content config the pages read from. If it does not exist yet, building it is the highest-priority refactor — and until it does, rule 3 is mandatory.)
3. **A change is not done until every instance agrees.** Before changing any fact or phrase, search the ENTIRE repo for every place it appears (grep the price, the exact phrase, the service name across `artifacts/`, `docs/`, `attached_assets/`) and update all of them. Report what you changed and where.
4. **Re-check voice after any copy change.** Confirm the edit complies with the brand vault's banned-language list and voice layers. On-brand-everywhere or it's not done.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env: `AI_INTEGRATIONS_OPENAI_BASE_URL` + `AI_INTEGRATIONS_OPENAI_API_KEY` — auto-provisioned via Replit AI Integrations

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- AI: OpenAI via Replit AI Integrations (gpt-5.4, no user API key needed)
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/api-server/src/voice-profile.ts` — the source-of-truth voice profile document (update this to retrain the voice tool)
- `artifacts/api-server/src/routes/voice.ts` — `/api/voice/profile` and `/api/voice/analyze` endpoints
- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth for all API shapes)
- `lib/api-client-react/src/generated/` — generated React Query hooks (do not edit manually)
- `lib/api-zod/src/generated/` — generated Zod validation schemas (do not edit manually)

## Voice Profile Summary

The owner's voice is built on these structural moves:
- **Triplet opener** — "Not everything should be X. Not everything should be Y. And not everything should be Z." — earns the pivot
- **Commercial-emotional bridge** — business logic and human empathy land in the same sentence, never separated
- **Discovery framing** — the client is paying to *uncover*, not just sort/donate/sell
- **Lists as possibilities** — each bullet is something the reader hasn't thought to look for, not a feature inventory
- **Short punctuation lines** — for emphasis, not style

Anti-patterns the voice tool flags: SEO-speak, corporate sanitizer tone, internal business language in client-facing copy, lists as feature menus, framing the service as sorting when it's actually value recovery.

## Architecture decisions

- Voice profile is a TypeScript object (not a DB table) — it's version-controlled, reviewable, and editable without a migration
- OpenAI system prompt embeds the full voice profile + 5 annotated before/after examples at analysis time
- `/api/voice/analyze` uses `gpt-5.4` with `response_format: { type: "json_object" }` for reliable structured output
- Voice tool is API-only by design — it's a behind-the-scenes audit tool, not a user-facing feature

## Product

A service site for an LA-based resale, estate, and value recovery specialist. Services include:
- Fast Bag Fill (resale pickup for active-market clothing/accessories)
- Reset and House Call (full clean-out with donation handling)
- Value recovery (uncovering unrealized resale value, insurance blind spots, collectibles, heirlooms, warranty recoveries)

## User preferences

- Voice: human-first, business-always — never influencer, never SEO-polished
- The voice tool must analyze by pattern/rhythm/emotional architecture — not word lists
- Launch post / promotional content is a separate project
- SEO metadata is a separate pass
- This is a voice pass only — no redesign, no structural changes to the site

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after any change to `lib/api-spec/openapi.yaml`
- The voice profile is in `voice-profile.ts` — update it there and rebuild the server; no codegen needed
- `AI_INTEGRATIONS_OPENAI_API_KEY` is a dummy string for SDK compatibility — the real auth is via `AI_INTEGRATIONS_OPENAI_BASE_URL`
- API server runs on port 8080 (not 5000 as the default replit.md suggested)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
