# WLC 2026 — Active Tasks (Wave 3 Build)

Use this TODO list to organize work. Mark tasks as `[/]` (in progress) and `[x]` (completed) as we go. Do not build new tools before verifying existing ones.

---

## 1. Copy & Voice Alignment (Groundwork)
* [ ] **Run Current Copy Audit**: Run the current website copy and consignment listings through the built voice analysis tool (in `api-server`) to flag and fix where the voice slipped.
* [ ] **Import brand.ts Everywhere**: Audit all frontend pages (`artifacts/wlc-site/src/pages/`) to ensure splits (45/55 clothing), pricing, and contact handles import dynamically from `brand.ts` instead of being hardcoded.
* [ ] **Copy Polish**: Apply correct register (dry, capable person at the table) and the unreplaced lightbulb/storage unit real examples across all pages.

---

## 2. Infrastructure & Tool Integrations (Supabase, Resend, Netlify, Render)
* [ ] **Database Setup**: Configure the Supabase database URL and push the Drizzle database schema (`pnpm --filter @workspace/db run push`).
* [ ] **Secret Management**: Set up Environment Variables in Render/Netlify and `.env` (`DATABASE_URL`, `RESEND_API_KEY`, `PUBLIC_SITE_URL`).
* [ ] **Transactional Email Integration**: Wire up Resend API key to automate mail notifications for the 9-step resale handshake.
* [ ] **Netlify & Render Deployment Setup**: Link Netlify for frontend hosting and Render for the API backend.

---

## 3. Handshake Workflow Testing (End-to-End Execution)
* [ ] **Dry Run handoff**: Run one real client entry through the complete 9-step resale handshake (intake → day-before → custody → inventory → evaluation → report → consent → review → payout) to verify DB persistence.
* [ ] **Check Payouts & Statements**: Confirm that payouts generate statement records and email notifications correctly.
* [ ] **E-Sign Document verification**: Ensure signed resale consignment agreements generate a verified audit trail PDF on the client's profile.

---

## 4. Google Cloud & Gen AI Credits Integration
* [ ] **Cloud Credentials Wire-up**: Connect the Google Cloud Identity using `@welllivedcitizen.com` or `daynabrown3100@gmail.com` to leverage the $1000 AI Credits.
* [ ] **AI Assistant Wiring**: Connect Google AI Studio / Gemini API inside the Caption/Voice Studio to assist Dayna with drafting description copy for listings from photos.
