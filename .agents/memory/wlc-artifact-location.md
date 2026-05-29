---
name: WLC artifact location
description: Where the WLC site lives in the monorepo after being registered as a proper Replit artifact
---

The Well Lived Citizen site is registered at `artifacts/wlc-site/` (kind: web, previewPath: /).

**Why:** The site was originally scaffolded at `site-build/wlc-launch/` outside the pnpm workspace (which only covered `artifacts/*`). To register it properly as a Replit artifact (so it appears in the preview pane and can be deployed), it was moved to `artifacts/wlc-site/` and registered via `createArtifact()`.

**How to apply:**
- All future site edits go in `artifacts/wlc-site/src/`
- Pages live at `artifacts/wlc-site/src/pages/`
- Voice profile stays at `artifacts/api-server/src/voice-profile.ts`
- The workflow is `artifacts/wlc-site: web` running on port 20784
- `site-build/wlc-launch/` is the old location — do not edit it
