# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

- `well-lived-citizen` (react-vite, /) — Marketing site for The Well Lived Citizen (Dayna Brown, LA concierge home services). Cream/rust/charcoal palette, Plus Jakarta Sans. Form-first contact: every phone CTA routes to /contact except the FloatCall button and Schema.org. Routes: /, /about, /services, /services/{home-organization,legacy,house-calls,resale}, /pricing, /contact.
  - **Voice / copy authority**: `.agents/skills/wlc-voice/SKILL.md` is the single source of truth. Canonical reference copy in `.local/build_v043026/*.md` — elevation only, no rewrites, no drift.
  - **Quick books (flat rate)**: The 4x5 ($500 / 4hr), The 2x3 ($300 / 2hr). CTAs route to `/contact?offer={4hour|2x3|housecall|pickup|closeout}` and the multi-step intake auto-jumps to the right intent.
  - **Contact intake**: Formspree `xreojkvo` is the system of record (success determinant). `/api/intake` POST is a best-effort mirror only; never blocks success. Do not change the Formspree endpoint.
  - **SEO**: per-page titles via `src/hooks/usePageMeta.ts`. `index.html` carries OG/Twitter tags, JSON-LD LocalBusiness, GA4 (`G-HN9C986JLW`). `public/robots.txt` and `public/sitemap.xml` shipped.
  - **Brand rules** (from voice skill): never "estate sale", "Special Delivery", "elder care", or "The Well Lived Citizen Co". Phone (323) 433-1350 lives only in FloatCall + Schema.org. Email: dayna@thewelllivedcitizen.com.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
