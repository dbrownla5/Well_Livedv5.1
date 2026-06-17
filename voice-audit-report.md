# Brand Voice Audit Report

**Date:** 2026-06-17
**Average Compliance Score:** `97/100`

## Executive Summary
This report outlines the brand voice compliance audit results for all user-facing pages in the *Well Lived Citizen* build. All pages were audited against the canonical voice profile rules using the OpenAI-compatible Gemini engine.

## Page Results

### Home.tsx
- **Score:** `99/100`
- **Summary:** This copy demonstrates an exceptional command of the brand voice, consistently embodying its human-first, business-always identity. It excels at acknowledging emotional realities, identifying underlying desires, and offering solutions with empathy and directness.

> [!NOTE]
> No voice compliance issues found. Copy is clean and on-brand.

---

### Services.tsx
- **Score:** `90/100`
- **Summary:** The copy largely excels at capturing "The Well Lived Citizen" voice, particularly in its evocative taglines, detailed descriptions, and empathetic routing language. A few minor phrases could be refined to further eliminate generic corporate phrasing and to emphasize client possibilities over simple feature listings.

| Phrase | Issue | Explanation | Suggestion |
| :--- | :--- | :--- | :--- |
| `Home organization, legacy inventory, house calls, and resale in greater Los Angeles.` | **SEO-speak** | While this is a meta description, the phrase 'in greater Los Angeles' leans into SEO-optimized language rather than the brand's natural, human-first tone. The brand explicitly flags location-based SEO phrases as an anti-pattern. | *Home organization, legacy inventory, house calls, and resale for homes across Los Angeles.* |
| `Easy to schedule, easy to see results.` | **Corporate sanitizer tone / Empty reassurance filler** | This phrase, while positive, feels generic and lacks the specific, human-first, emotional resonance characteristic of the brand. It describes a general benefit without acknowledging the underlying emotional state or specific value uncovered. | *These are the three paths clients often take first, designed for immediate relief and tangible progress.* |
| `Organization, unpacking, room functionality, closet editing, and post-move support.` | **Listing features instead of uncovering possibilities / Feature inventory** | This opening sentence for the 'Home Organization' pillar lists actions rather than framing them as outcomes or possibilities the client hasn't considered. The brand emphasizes lists as evidence or possibilities, not mere feature inventories. | *This is the work that brings true relief to your space: from organization and unpacking to reshaping closet function and comprehensive post-move support.* |
| `Closet and storage editing` | **Listing features instead of uncovering possibilities** | This item in the 'Includes' list describes the action of the service (editing closets and storage) rather than the deeper benefit or possibility it creates for the client. The brand encourages framing list items as outcomes or discoveries. | *Making your closet and storage work for who you actually are now.* |

---

### TheReset.tsx
- **Score:** `100/100`
- **Summary:** This copy is an outstanding example of brand voice execution. It consistently embodies the 'human-first, business-always' principle, directly addresses emotional realities, and effectively removes client burdens without lecturing or resorting to anti-patterns. The language is empathetic, direct, and perfectly aligns with the 'The Well Lived Citizen' brand.

> [!NOTE]
> No voice compliance issues found. Copy is clean and on-brand.

---

### HouseCalls.tsx
- **Score:** `98/100`
- **Summary:** This copy demonstrates an exceptional understanding and application of The Well Lived Citizen brand voice, excelling in empathy, directness, and problem-solving without lecturing or overpromising. It flawlessly navigates the 'routing vs. verdict' rule and effectively uses strong, reassuring language.

| Phrase | Issue | Explanation | Suggestion |
| :--- | :--- | :--- | :--- |
| `Los Angeles.` | **SEO-speak / Lacking brand integration (minor)** | While brief and functional for a meta description, appending 'Los Angeles.' nakedly at the end can feel a touch blunt and functional, rather than integrated with the brand's otherwise human-first, empathetic tone. It leans slightly into a functional SEO tag rather than a naturally flowing phrase. | *For meta descriptions, a brief location tag is often necessary. If it were in body copy, a more integrated phrasing would be preferred (e.g., 'serving clients across Los Angeles'). For this specific meta description, the impact is minimal due to brevity.* |

---

### HouseCallsPillar.tsx
- **Score:** `98/100`
- **Summary:** This copy demonstrates an exceptional understanding and application of The Well Lived Citizen brand voice, excelling in emotional architecture, directness, and problem-solving focus. It consistently prioritizes the client's human experience while providing clear operational information.

| Phrase | Issue | Explanation | Suggestion |
| :--- | :--- | :--- | :--- |
| `Los Angeles.` | **SEO-speak (minor)** | While 'Los Angeles' is a factual geographic descriptor in the page meta description, it appears as a blunt, isolated term. The brand's anti-pattern for SEO-speak advises against language primarily aimed at algorithms, which this brevity, while practical for meta descriptions, can lean into. | *Consider omitting the standalone 'Los Angeles.' from the meta description, as the service area is clearly and more naturally stated within the page body. If a location must be included in meta for SEO, try a slightly more integrated phrase like 'Serving Los Angeles and surrounding areas' (if space allows) to soften the impact, though removal is often best for maintaining the brand voice in a purely textual context.* |

---

### LegacyPillar.tsx
- **Score:** `98/100`
- **Summary:** The copy is an outstanding match for The Well Lived Citizen brand voice, expertly blending empathy, directness, and a focus on uncovering value. It consistently avoids anti-patterns while embodying the core principles and rhythm.

| Phrase | Issue | Explanation | Suggestion |
| :--- | :--- | :--- | :--- |
| `Los Angeles.` | **SEO-speak** | This geo-tag is a classic example of SEO-driven language that can feel impersonal and out of place in copy aiming for a human-first, empathetic connection. It stands out as a functional tag rather than an organic part of the narrative. | *Remove this phrase. If location needs to be stated, it should be integrated naturally, perhaps in the footer or a dedicated contact page section, not in a description meant to convey the service's emotional and commercial value.* |

---

### FastBagFill.tsx
- **Score:** `99/100`
- **Summary:** This copy is an outstanding example of the brand voice, consistently adhering to its principles of human-first empathy, direct routing, and emotional intelligence. It masterfully navigates potentially sensitive topics, turning operational logic into client reassurance.

> [!NOTE]
> No voice compliance issues found. Copy is clean and on-brand.

---

### Pricing.tsx
- **Score:** `95/100`
- **Summary:** The copy is highly aligned with The Well Lived Citizen brand voice, demonstrating excellent directness, transparency, and empathy, particularly in its policies and problem-solving approach. It effectively anticipates client anxieties and offers reassurance, avoiding most anti-patterns.

| Phrase | Issue | Explanation | Suggestion |
| :--- | :--- | :--- | :--- |
| `For items where resale potential is minimal due to market factors: 35% to you · reviewed at intake` | **Verdict Tone / Item-focused judgment** | While attempting transparency, the phrase 'resale potential is minimal' describes a perceived lack of value in the items themselves. This can inadvertently make the client feel their items are being judged, rather than focusing on the best routing or outcome for them. The brand voice aims to articulate the outcome for the client based on what helps them most, not the item's inherent market flaw. | *For items where the market indicates a lower selling price: 35% to you, reviewed at intake.* |

---

