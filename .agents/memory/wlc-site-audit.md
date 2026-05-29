---
name: WLC site audit findings
description: Durable rules and decisions from the brand voice audit. What to check, what is resolved, what is permanently budgeted.
---

## Permanent rules (enforce on every future edit)

**"Household Stewardship" is banned everywhere** — title tags, OG/Twitter meta, JSON-LD, body copy. Use "Home Resets, House Calls, Resale" or the vault hero line instead.

**"transform" is banned** — any form ("completely transform," "transformation"). Use "back to fully functional," "functional again," or describe the specific outcome.

**"thoughtful" is a one-use phrase** — only where operationally grounded. Never floating as a self-endorsement, never duplicated verbatim across pages.

**Payment timing must be consistent** — "At time of service" everywhere. "At booking" contradicts the body copy on every page that states payment is at time of service.

**Footer social links** — two Instagram handles only: @thewelllivedcitizen and @thewelllivedcloset. Poshmark, eBay, and Facebook belong in JSON-LD `sameAs` (search-engine structured data) but not in the visual footer.

**"Independent older adults"** — approved and preferred phrasing. The word "independent" is load-bearing: it frames the client as maintaining autonomy, not surrendering it. Use it in pillar descriptions and FAQ headings. In body copy answers, "people who want support maintaining their homes and their autonomy" is the natural equivalent. Banned alternatives: "elderly," "aging parents" (as a description of the client's condition), "seniors who need help." The generational gap (adult children booking for a parent) is a legitimate, real entry point — address it directly as "families managing a parent's home from a distance."

**"Their households"** — internal/formal language. Banned in confidentiality copy. Rephrase to plain language: "their homes," "what's inside them."

**Math-splaining is banned** — no "$5–$10 range," "payouts closer to $3/item," "free pickup only works if it's worth both our time." The canonical Fast Bag Fill addendum is the replacement. See `voice-profile.ts → canonicalCopy.fastBagFillAddendum`.

**Gayle reference budget** — testimonial on homepage = use #1, HouseCalls = use #2. At capacity. No new Gayle references without retiring one existing one.

## Budget decisions (locked)

| Item | Budget | Status |
|------|--------|--------|
| Gayle Williams reference | 2 total | At capacity |
| "older adults" in body copy | 0 (question headings only) | Clean |
| "thoughtful" as floating claim | 0 (must be grounded) | Clean |
| Footer social links | 2 Instagram handles only | Clean |

## Voice dump protocol

Dayna's voice recordings and concept messages are concept-building material, not locked copy. She talks through examples, sometimes in rough language, to create frameworks. Do not create new pillars, service locks, or rate structures from a voice dump unless she explicitly names a service with pricing and logistics. Distill the concept, express it in the master voice, and document it in `voice-profile.ts → voiceDumpProtocol.canonicalConceptExamples`.

## Remaining open items (as of last full audit)

- About.tsx: Rachel Corwin @ Spruce not yet named — vault §09/§21 says story not yet captured; add credibility vouch tag when Dayna confirms it
