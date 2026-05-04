# Prior Art — `Dashboard--main` (Google AI Studio prototype)

Source: `attached_assets/Dashboard--main_1777846011968.zip`, extracted and inspected as part of Task #4 (May 2026). Originally a Google AI Studio export with an attached Firebase project. Specific project IDs, admin email, and API keys live inside the zip — not repeated in this doc.

## TL;DR — is this the reseller dashboard?

**No.** This is a brand/operations *intelligence suite* for The Well Lived Citizen, not a reseller-inventory tool. There is **no photo upload, no item identification, no inventory table, and no dedup logic** anywhere in the codebase. The "Salvage" feature in the prototype is for salvaging *code snippets from old repos*, not items.

It is still useful as prior art for three reasons:

1. It is the only working artifact that already has Dayna's brand identity, service architecture, pricing, and guardrails encoded as data.
2. It demonstrates one workable shape for the Gemini-powered tool surface (sidebar + tabs + Markdown rendering of model output).
3. It establishes a Firebase Auth + Firestore baseline that the future dashboard can either adopt or explicitly reject.

## What's in the zip

```
Dashboard--main/
├── AGENTS.md                       # "Structural Engine" role doc for the AI editing this app
├── README.md                       # AI Studio scaffold readme
├── firebase-applet-config.json     # Live Firebase keys (project gen-lang-client-0138005396)
├── firebase-blueprint.json         # Firestore entity blueprint (Repository / Component / Spec)
├── firebase.json, firestore.*      # Hosting + security-rules config
├── index.html, vite.config.ts, tsconfig.json, package.json
├── outputs/
│   ├── master_site_spec.md         # Brand identity + service architecture v1.1 (LOCKED)
│   ├── manus_build_directive.md    # Production build directive for Manus
│   ├── firebase_launch.md          # Cloud-launch / Vertex migration notes
│   └── session_summary.md          # Decision Lock — full pricing + corrections list
├── references/
│   └── cross_platform_template.md  # AI handoff template (Claude → Gemini → Manus)
└── src/
    ├── App.tsx                     # 2,141-line single-file React app (the entire dashboard)
    ├── domain_check.ts             # Retired domain-availability tool
    ├── domain_info.ts              # Retired domain-info tool
    ├── lib/                        # firebase.ts, utils.ts (cn() helper)
    ├── main.tsx, index.css
```

## Tech stack

- React 19 + Vite 6 + Tailwind v4 (`@tailwindcss/vite`).
- `@google/genai` (`gemini-3.1-pro-preview`) called directly from the browser with `googleSearch` tool enabled on every prompt.
- Firebase Auth (Google sign-in only) + Firestore.
- `motion`, `recharts`, `react-markdown`, `lucide-react`.
- Single-process Express dependency listed but not wired in — the app is effectively a static SPA that calls Gemini from the client.

The model name (`gemini-3.1-pro-preview`) is unusable from outside AI Studio. Any port to this repo must repick a model — see `.local/skills/ai-integrations-gemini`.

## Feature surface (sidebar tabs)

| Tab | What it does |
| --- | --- |
| Market Trends | Auto-runs a Gemini Search prompt for Boomer-inheritance / wills / proximity / home-org reasons. Renders Markdown + Recharts of fallback data. |
| Home Organization | Static charts of "top reasons to hire", color/sentiment palette, meeting-time preferences. |
| Service Catalog | Hardcoded `SERVICES_DATA` for the four service lines (home org, resale, legacy, house calls) with pricing + commission splits. |
| Spending & Fears | Static generational-fears chart. |
| Launch Strategy | Strategic guardrails ("Say NO to") + April cash-flow sprint copy + a "Run Market Pricing Pulse" Gemini call. |
| Logistics & CRM | Project-scoping form (service type / hours / location / complexity) → Gemini prompt that returns market comparison + value score. |
| Success Planner | Revenue projection sliders (legacy count, home-org count, resale hours, resale commission) with derived totals. |
| Content Launcher | Marketing/content-engine port (largely a Markdown renderer for Gemini output). |
| SEO & Growth | "Generate SEO strategy" Gemini call hard-coded for the LA market. |
| Manus Handoff | Free-text input → Gemini converts raw edits into a "Developer Handoff for Manus" doc and writes it to Firestore (Salvage flow). |

The "Salvage" / Repository-Component-Spec data model in `firebase-blueprint.json` exists to capture pasted-in code snippets from prior repos for the AI to score against the brand voice — **not** for inventory.

## Reusable for the reseller dashboard build

These pieces are worth lifting (or re-deriving) when the real reseller dashboard is built:

1. **`SERVICES_DATA` constant** in `src/App.tsx` (lines ~82–140) — already-locked copy and pricing for the four service lines, matches `outputs/manus_build_directive.md`.
2. **`outputs/session_summary.md` "DECISION LOCK"** — the canonical pricing + corrections-list. The reseller commission splits (55/45 clothing, 50/50 designer + furniture) and "Flex blocks never expire" rule live here. **Note the conflict** with Dayna's own business plan (see "Discrepancies" below).
3. **Firestore rules** (`firestore.rules`) — admin-gated by a single hardcoded email (Dayna's). Useful template for an "internal-ops only" auth shape, but the reseller dashboard probably needs multi-operator access, not a single-email lock.
4. **`AGENTS.md` + `references/cross_platform_template.md`** — voice/guardrails for any AI feature. Worth folding into the future build's prompts (the "do not say elder care / estate sale / fall prevention" list is non-trivial).
5. **`handleAiError` pattern** in `App.tsx` — quota / 403 / generic error handling for client-side Gemini calls. Worth porting if the new dashboard also calls Gemini from the browser.

## Not reusable

- Direct browser-side `@google/genai` calls with a hardcoded preview model.
- Single 2,141-line `App.tsx` — needs to be broken into routed components.
- Firebase project config — `firebase-applet-config.json` in the zip ships a live web API key alongside the project ID and admin email. **Treat the key as compromised** (it has been sitting in `attached_assets/` and is now in extracted form on disk). Do not reuse the project; rotate / revoke if it is still active. Specific identifiers are intentionally not repeated here — open the zip if you need them.
- Manus / "Switchboard" handoff plumbing — irrelevant once the build lives in this monorepo.
- Domain-check / domain-info tools — author's own session_summary marks them as RETIRED.
- "Salvage" Repository/Component/Spec collections — solves a different problem.

## Discrepancies vs. Dayna's own business plan

The dashboard prototype encodes one set of numbers; `Dayna_Brown_Business_Plan_Final_1777843986317.docx` encodes another. The reseller dashboard build will need a tie-breaker before persisting anything.

| Topic | Dashboard / Decision Lock | Dayna's business plan (March 2026) |
| --- | --- | --- |
| Resale commission (clothing) | 55% Dayna / 45% client | 50/50 on net profit after platform fees |
| Resale commission (designer + furniture) | 50/50 | 50/50 |
| Pickup minimum | "No minimums" (catalog tab) / 10-item (some pages) | 10-item minimum, no trash bags |
| Item floor | not stated | nothing under $20 estimated sale value |
| Markdown schedule | not stated | Day 30 −10%, Day 60 −10%, Day 90 client decides; furniture 60-day, −10% / 14 days |
| Markdown authority | not stated | Operator may accept offers within 15–20% of list without re-asking |
| Payout cadence | "Monthly payout by the 5th" | Report by the 1st, payout by the 5th, Venmo/Zelle/check |

These are now reflected in `dashboard-scope.md` as required-config inputs the operator must be able to set before any inventory is written.

## Brand identity also confirmed

- Business: **The Well Lived Citizen** (DBA under Well Dressed Citizen LLC).
- Tagline: *"Well Placed. Well Dressed (again). Transitions done Well."*
- Phone (published): (323) 433-1350.
- Active platforms: Etsy, Chairish, Poshmark, eBay, Facebook Marketplace; on-deck Vestiaire; future 1stDibs.
- Killed platforms: Depop, Grailed, Mercari, Thumbtack, Replit content app.
- Crosslisting tool: Nifty AI ($69.99/mo), under 90-day ROI evaluation.
- Forbidden language list (apply to any generated copy): "elder care", "estate sale", "asset management", "liquidation", "fall prevention", "small repairs", "closet systems", "luxury organizing", "will / death", "ADHD closet edits", "daily/weekly/monthly/never" in client-facing copy.
