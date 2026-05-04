# Reseller Studio — Source Reference

This folder is the structured source-of-truth for the future "reselling dashboard studio" build. All raw research, AI pipeline notes, and competitive context originally landed in `attached_assets/` as a mix of `.dat`, `.csv`, `.md`, `.txt`, `.zip`, `.pdf`, and `.docx` files. The originals are preserved untouched; this folder is the cleaned, organized extraction.

No application code, schemas, or UI live here yet — this is reference material only.

## Files in this folder

| File | What it is |
| --- | --- |
| `README.md` | This index. |
| `ai-resale-pipeline.md` | The Gemini Vision resale pipeline spec — v1 (single-photo CSV) and v2 (batch + dedup + JSON), system prompts, platform routing, dedup logic, and JSON schema. |
| `competitors.json` | 35 LA professional-organizer competitors normalized to a structured record (name, url, areas, services, scopes, pricing, differentiators, certifications, founder, year, team_size). |
| `competitors.md` | Human-readable summary of the competitor set, grouped by market segment (franchise, luxury/concierge, methodology specialists, boutique). |
| `household-roles.md` | Reference on fractional/concierge/estate/lifestyle-manager roles, plus a mapping of each role to the reseller workflow. |
| `dashboard-scope.md` | Agreed feature set for the future dashboard, end-user definition, source-mapping per feature, and the open question list. |
| `prior-art-dashboard.md` | Inspection summary of the `Dashboard--main` zip — what's in it, what's reusable for the reseller build, and where its locked numbers conflict with Dayna's business plan. |

## Source files extracted

- `attached_assets/Copy_of_AI-Powered_Resale_Automation_Pipeline._1777845832500.dat` → `ai-resale-pipeline.md`
- `attached_assets/research_la_organizers_1777845862885.csv` → `competitors.json`, `competitors.md`
- `attached_assets/competitor_list_1777845862885.md` → `competitors.md` (master list cross-reference)
- `attached_assets/Competitive_Landscape_Analysis:_Professional_Organizing_in_Los__1777845862885.md` → `competitors.md` (segment framing, market analysis)
- `attached_assets/Pasted_content_10_1777845862885.txt` → `household-roles.md`
- `attached_assets/Dashboard--main_1777846011968.zip` → `prior-art-dashboard.md`
- `attached_assets/Dayna_Brown_Business_Plan_Final_1777843986317.docx` → resale operating rules folded into `dashboard-scope.md` (commission splits, markdown schedule, payout cadence, hard lines)
- `attached_assets/TWLCC_Starting_Context_1777844108028.pdf` → brand/handle facts cross-referenced in `prior-art-dashboard.md` (no reseller-pipeline content beyond what was already extracted)

## Binary attachments — extraction status

Updated by Task #4 (May 2026). "Inspected" means the file was opened, scanned for reseller-dashboard content, and either folded back into the docs above or confirmed not to add anything.

### Inspected and folded in

| File | Result |
| --- | --- |
| `Dashboard--main_1777846011968.zip` | Unzipped and reviewed in full. It is an *intelligence suite* prototype, not a reseller dashboard — no photo upload, item ID, or inventory. Summary, reusable pieces, and discrepancies vs. Dayna's business plan are now in `prior-art-dashboard.md`; resale operating rules folded into `dashboard-scope.md`. |
| `Dayna_Brown_Business_Plan_Final_1777843986317.docx` | Read for reseller-relevant rules. Resale Engine section (commission split, hard lines, markdown schedule, markdown authority, payout cadence, platform list, forbidden behaviors) folded into `dashboard-scope.md`. |
| `WDC_Business_Plan_2_1777843986317.docx` | Read. Predecessor-brand plan; the operational method (visibility rule, daily/weekly/monthly/never sort) and the `@velvetnomad` retired-brand note are already covered. Nothing new for the reseller pipeline beyond what's in the newer plan. |
| `TWLCC_Starting_Context_1777844108028.pdf` | Read. Confirms current brand, handles, killed platforms, and "Lovable build" note. Brand facts cross-referenced in `prior-art-dashboard.md`. No new pipeline content. |
| `AWLC_Services_Master_FINAL_1777843986317.pdf` | Read. Service-catalog narrative under the older "A Well Lived Citizen" name. Adds add-on bundles (Essentials/Start-Up/Full Landing, Org Bundles) — operational not reseller-pipeline. Noted, not folded. |
| `Platform_Setup_Guide_1777843986317.pdf` | Read. Marketing platform onboarding (GBP, Yelp, Care.com, Nextdoor). Not reseller-dashboard content. |
| `The_Well_Lived_Citizen_Co_—_Zero-Budget_Digital_Marketing_Plan_1777578385421.pdf` | Read. Marketing sequencing only. Not reseller-dashboard content. |
| `gemini.google.com_1777846011968.html` | Auth-walled Google login chrome — only ~98 chars of real text once tags are stripped. **No pipeline content.** Confirms `ai-resale-pipeline.md` is already complete. |
| `multimodal_1777846011968.html` | Cloud Console "failed to load" error page (~500 chars of real text). **No pipeline content.** |
| `files_1777846011968.zip` | Confirmed empty (zero entries). |

### Still skipped

| File | Why |
| --- | --- |
| Site-export zips: `thewelllivedcitizen-FINAL_1777578385421.zip`, `WellLivedCitizen_Build_v043026_*.zip` (×3), `welldressedcitizen_redirect_*.zip` (×2), `well_lived_citizen_files_1777578385421.zip`, `welllivedcitizen_site_updated_1777578060612.zip` | Static-site exports of past brand-site builds. Out of scope for the reseller dashboard; if needed for the public-site artifact they should be a separate extraction task. |

## What is NOT in this folder

- Any UI, API, database schema, or AI integration code for the reseller dashboard.
- Any decision about whether the dashboard will live as a new artifact or inside `artifacts/well-lived-citizen` — that is captured as an open question in `dashboard-scope.md`.
- Any modification to existing artifacts (`well-lived-citizen`, `api-server`, `mockup-sandbox`).
