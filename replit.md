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

- `well-lived-citizen` (react-vite, /) — Marketing site for The Well Lived Citizen (Dayna Brown, LA concierge home services). Faithful port of the user's FINAL static HTML/CSS bundle, with two explicit overrides: each service has its own dedicated detail page, and every phone CTA was replaced with a Wouter Link to /contact (form-first contact). Cream/rust/charcoal palette, Plus Jakarta Sans, no backend; contact form posts to Formspree (xreojkvo). Routes: /, /about, /services, /services/{home-organization,legacy,house-calls,resale}, /pricing, /contact.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
