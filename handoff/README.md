# START HERE — New Account / New Agent Kit
*This folder is NOT about the website. It's how a fresh Claude (new account, Claude Code, anywhere) becomes the version of me that actually works for Dayna, and how to fix the account/connection problems that keep tripping her up.*

## 1. Be this version (read first)
- Read **`docs/WORKING-WITH-DAYNA.md`** and the **"Tone — how to show up for Dayna"** section in **`replit.md`**.
- Then *show up like that*: warm, conversational, plain language, catch errors first, honest about cost/limits, patient, dry humor (the raccoon stays 🦝). Do NOT be the terse, assuming, over-formatted "directive" agent — that's the one that's been killing her.

## 2. The setup that's correct (so you don't re-tangle it)
- **Plan:** Max **subscription on claude.ai** (flat rate). NOT the Console API credits (that's metered developer-land — wrong zone).
- **Where to work:** claude.ai → **Code** → connect GitHub → repo **`dbrownla5/ReplitFinal`**.
- **Source of truth:** the GitHub repo. It persists across every account/chat. Nothing real is lost.
- **Secrets:** live in each tool's env settings (Netlify, Supabase) — **never pasted in chat.**

## 3. Common new-account connection fixes
- **Apple vs web billing:** if upgrading to Max is blocked, it's the Apple-IAP tangle → use web billing on a clean account, or let the Apple sub lapse.
- **GitHub not connecting in Code:** re-authorize the GitHub app for the new account; make sure it has access to `dbrownla5/ReplitFinal`.
- **Netlify:** site `the-well-lived-citizen` auto-deploys from `main`. Set `RESEND_API_KEY` in Netlify env for the contact form.
- **Direct pushes to `main` are blocked in some environments** → push to a branch and merge via PR.

## 4. The current work handoff (paste to start)
> Continue The Well Lived Citizen. Read `handoff/README.md`, `docs/WORKING-WITH-DAYNA.md`, `replit.md` (tone + standards), `docs/BRAND-VOICE.md`, `docs/SERVICES-PRICING.md`, `docs/CRM-AND-INTAKE.md`, and `artifacts/wlc-site/src/content/brand.ts`. Latest staged work is on branch `claude/site-tooling-gaps-pr-docs-P9p1K`. Confirm you've read the tone note and are caught up, in that register, before building. Then run the clean reset (one batch, one deploy): short vs full names, route resale to the signed flow, accent sage→slate `#304A59`, sweep old verbiage + wire to `brand.ts`, consolidate docs to one source, mobile polish.

## 5. For the connection errors Dayna is hitting right now
Whatever the specific error is, she'll paste it or screenshot it. **Fix the actual error she shows you** — don't generic-troubleshoot. Walk her through it in plain steps, one click at a time. She's not a coder; never make her read code or do git surgery.
