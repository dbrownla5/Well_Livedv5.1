---
name: WLC site audit findings
description: Results of Task #2 voice/brand audit against the full brand vault. What was fixed, what was clean, what is pending.
---

## Fixed (applied to site-build/wlc-launch)

| File | Violation | Fix |
|------|-----------|-----|
| `Home.tsx` usePageMeta title | "Household Stewardship" — banned phrase (vault §10) | → "Home Resets, House Calls, Resale · Los Angeles" |
| `Home.tsx` Gayle attribution | "— Gayle · Seattle" — vault §23 locks homepage to full name | → "— Gayle Williams · Seattle Client" |
| `FAQ.tsx` The Reset answer | "completely transform a closet" — "transform" banned (vault §10) | → "get a closet...back to fully functional" |
| `FAQ.tsx` House Calls answer | "I'm particularly thoughtful about this" — floating claim, no operational grounding | → grounded rewrite referencing pace/independence |
| `HouseCalls.tsx` FAQ answer | Verbatim duplicate of the "thoughtful" violation | → same grounded rewrite |
| `HouseCalls.tsx` pricing table | "Payment due: At booking" — conflicts with body text "at time of service" | → "At time of service" |

## Clean (confirmed, no action)
- Hero copy matches locked vault §11 exactly
- Gayle full quote present in both Home.tsx and HouseCalls.tsx (not truncated)
- Footer: only @thewelllivedcitizen + @thewelllivedcloset present (personal accounts absent)
- Fast Bag Fill: 8-step flow, commission splits, 6-month check-in match vault §24
- Services.tsx, Pricing.tsx, About.tsx: no violations found

## Pending (Dayna sign-off or future work)
- About.tsx: Rachel Corwin @ Spruce not yet named — vault §09 says story not yet captured, §21 says she should be a credibility/vouch tag when ready
- About.tsx: Dayna's last name appears as "Dayna Brown" in heading/eyebrow — vault §21 says last name can be used in professional contexts ("About Dayna Brown · Founder") which this is, so likely fine but worth confirming
- Gayle reference budget: testimonial on homepage = use #1, HouseCalls = use #2. Budget is testimonial + max 2 additional references per vault §21/§23. Currently at capacity — no new Gayle references should be added without retiring one.
