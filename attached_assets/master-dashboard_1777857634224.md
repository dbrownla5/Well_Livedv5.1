# The Well Lived Citizen — Master Dashboard

## 1. Operating Status

| Field | Current Rule | Status |
|---|---|---|
| Trust boundary | Clean-start reset is active. No prior company files, legacy sources, former GitHub material, or prior agent memory may be treated as valid unless Dayna explicitly reintroduces them. | Active |
| Source of truth | Authoritative inputs come from Dayna’s direct messages and any uploads she explicitly approves for use. | Active |
| Language handling | Voice-to-text errors are treated as probable typos and interpreted by context unless ambiguity is material. | Active |
| Agent role | This agent functions as the language, structure, continuity, and handoff layer. Separate implementation agents may consume approved outputs from this dashboard. | Active |

## 2. Authoritative Business Facts

| Field | Current Value | Source | Last Updated | Confidence |
|---|---|---|---|---|
| Business name | Pending | Pending | Pending | Pending |
| Owner name | Dayna Brown | User instruction | 2026-04-18 | High |
| Primary phone | Pending | Pending | Pending | Pending |
| Primary email | Pending | Pending | Pending | Pending |
| Website/domain | Pending | Pending | Pending | Pending |
| Social links | Pending | Pending | Pending | Pending |
| Payment links | Pending | Pending | Pending | Pending |
| Hours | Pending | Pending | Pending | Pending |
| Services | Pending | Pending | Pending | Pending |

## 3. Brand Voice Model

| Dimension | Working Rule | Source Status |
|---|---|---|
| Tone | Crisp, confident, human, and direct. | Confirmed from Dayna operating instructions |
| Output standard | Structured, usable, and ready to hand off. | Confirmed from Dayna operating instructions |
| Brand consistency rule | Do not drift from Dayna’s wording, business facts, or approved framing. | Active |
| Interpretation rule | Resolve likely transcription errors by context rather than treating them as separate meanings. | Active |

## 4. Session Intake Log

| Timestamp | Input Type | Raw Topic | Structured Outcome | Action Needed |
|---|---|---|---|---|
| 2026-04-18 | Operating directive | Reset boundary and cross-agent workflow | Clean-start trust boundary established; dashboard and handoff rhythm required | Collect authoritative business facts |

## 5. Handoff Packet Format

At the end of each work block, this dashboard should be updated and a clean handoff should be prepared using the following structure.

| Section | Required Content |
|---|---|
| Objective | What the next agent is supposed to do |
| Approved facts only | Only the current facts explicitly confirmed by Dayna |
| Brand and language rules | The active voice and consistency constraints |
| Open questions | Facts still missing or awaiting confirmation |
| Do not use | Any excluded source categories or invalidated materials |
| Next-step instruction | A copy/paste prompt for the next session or agent |

## 6. Current Open Items

| Item | Needed From Dayna | Priority |
|---|---|---|
| Core business facts | Current phone, email, domain, socials, payment links, hours, and services | Immediate |
| Brand baseline | Any current brand language she wants treated as authoritative | Immediate |
| Dashboard destination | Whether this dashboard should stay as a document, be mirrored into the web app, or both | Immediate |

## 7. Next-Session Prompt Template

> Use this as the opening message in the next session:  
> "Clean-start trust boundary remains active. Use only facts in the current Master Dashboard and any new information I provide in this message. Update the dashboard first, then produce the handoff packet for the implementation agent. New authoritative updates: [paste updates here]."

## 8. Current Browser-Dependent Step

| Timestamp | Dependency | Status | Notes |
|---|---|---|---|
| 2026-04-18 | Reference app preview access in browser | Pending user action | Dayna will wake the browser so the interaction model can be reviewed and translated into the internal living dashboard. |

## 9. Reference App Inspection Notes

| Timestamp | Source | Finding | Use in Dashboard Design |
|---|---|---|---|
| 2026-04-18 | Replit preview landing page | The public Replit app page currently shows project-title framing and a remix CTA, but not the internal application view itself from the initial load state. | Additional interaction may be needed to reach the actual app experience. |
| 2026-04-18 | User instruction | The reference is intended as an interaction model for an internal, iOS-feeling, non-technical business dashboard. | Preserve ease-of-use, operational clarity, and structured data visibility in the target app. |
| 2026-04-18 | Replit HTML inspection | The saved page source did not immediately reveal a clean internal app surface from the public preview state. | Use the reference for UX direction, but expect additional browser interaction or login state if a deeper live view is needed. |
| 2026-04-18 | Replit source review | The inspected public page appears to be a Replit project shell rather than the internal app itself, and no straightforward app embed target was surfaced from the current state. | Proceed by using the reference conceptually for interaction style while defining the app’s information architecture from Dayna’s stated needs. |

## 10. Current Dependency Summary

| Dependency | Why It Is Needed | Current Status |
|---|---|---|
| Dayna’s current business facts | Required to populate the first authoritative source-of-truth records in the dashboard | Awaiting input |
| Additional preview details or direct app view | Helpful for refining interaction design toward the desired iOS-like feel | Awaiting input |
