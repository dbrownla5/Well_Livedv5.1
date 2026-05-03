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

## Source files extracted

- `attached_assets/Copy_of_AI-Powered_Resale_Automation_Pipeline._1777845832500.dat` → `ai-resale-pipeline.md`
- `attached_assets/research_la_organizers_1777845862885.csv` → `competitors.json`, `competitors.md`
- `attached_assets/competitor_list_1777845862885.md` → `competitors.md` (master list cross-reference)
- `attached_assets/Competitive_Landscape_Analysis:_Professional_Organizing_in_Los__1777845862885.md` → `competitors.md` (segment framing, market analysis)
- `attached_assets/Pasted_content_10_1777845862885.txt` → `household-roles.md`

## Binary attachments — not extracted

These exist in `attached_assets/` but were not parsed in this task. They are listed here so we know what is available for a future extraction pass.

| File | Notes |
| --- | --- |
| `Dashboard--main_1777846011968.zip` | Likely a previous dashboard prototype export. Worth inspecting before the build task starts. |
| `files_1777846011968.zip` | Tiny (22 bytes) — probably an empty or placeholder archive. |
| `gemini.google.com_1777846011968.html` | Saved Gemini chat UI page, ~629 KB. The `.dat` file already contains the structured pipeline content. |
| `multimodal_1777846011968.html` | ~2.8 MB Gemini multimodal chat export. Contains the same pipeline conversation rendered as HTML. |
| `Dayna_Brown_Business_Plan_Final_1777843986317.docx` | Business plan for Dayna Brown / The Well Lived Citizen Co. Not directly reseller-related. |
| `WDC_Business_Plan_2_1777843986317.docx` | Well Dressed Citizen business plan, predecessor brand. Out of scope here. |
| `AWLC_Services_Master_FINAL_1777843986317.pdf` | Services master deck for the Well Lived Citizen brand. |
| `Platform_Setup_Guide_1777843986317.pdf` | Platform setup guide. Likely operational, not directly reseller-pipeline. |
| `TWLCC_Starting_Context_1777844108028.pdf` | Brand starting context. |
| `The_Well_Lived_Citizen_Co_—_Zero-Budget_Digital_Marketing_Plan_1777578385421.pdf` | Marketing plan, not reseller-related. |
| Multiple `*.zip` site-export bundles (`thewelllivedcitizen-FINAL`, `WellLivedCitizen_Build_v043026`, `welldressedcitizen_redirect`, `well_lived_citizen_files`, `welllivedcitizen_site_updated`) | Static-site exports of past versions of the brand site. Not relevant to the reseller dashboard. |

If any of these need extraction later, do it as a separate task.

## What is NOT in this folder

- Any UI, API, database schema, or AI integration code for the reseller dashboard.
- Any decision about whether the dashboard will live as a new artifact or inside `artifacts/well-lived-citizen` — that is captured as an open question in `dashboard-scope.md`.
- Any modification to existing artifacts (`well-lived-citizen`, `api-server`, `mockup-sandbox`).
