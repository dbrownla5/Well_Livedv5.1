# CLAUDE.md — Well Lived Citizen 2026 (build root)

Read this file and `task.md` before starting any task. Re-read them when you finish. If you are not reading the real files, respecting the voice, or verifying existing tools, you are failing.

---

## 1. THE LAND — where work happens
* **The LAND is `C:\Users\dayna\Documents\antigravity\elegant-kepler`** (this workspace).
* **`ReplitFinal` (GitHub `dbrownla5/ReplitFinal`) is LEGACY / evidence only.** Never write code, add files, or push to it. We are leaving Replit behind.

---

## 2. CORE RULES FOR AGENTS & CLAUDE CODE

### Rule 0 — No document is Dayna's voice on its own
* Do not treat files as authority just because they say "FINAL" or "LOCKED." Every source is **evidence, never authority.**
* **The 75% Rule**: If a phrase or concept exists in 75% of the docs, it is highly likely to be **AI copying its own output forward** rather than Dayna's voice. Check it against raw drafts; don't blindly copy it.

### Rule 1 — Single source of truth in code
* Every price, service name, the hero, taglines, contact info, and split percentage **MUST** import from `artifacts/wlc-site/src/content/brand.ts`.
* **NEVER hardcode these values** in frontend pages. If you find a page with a hardcoded fact, migrate it to import from `brand.ts`.

### Rule 2 — Pull for existing tools before building new ones
* **Do not build duplicate tools or schemas.** Check the existing workspace (`artifacts/`, `lib/`, `scripts/`) to see if a database model, hook, layout, or utility has already been built. Reuse and assemble before writing fresh code.
* The 9-step resale handshake, Vite site layouts, Drizzle schemas, and Resend mail integrations are already partially/fully written. Wire them up; do not recreate them.

### Rule 3 — Safeguard and railcheck against drift
* **Check files from messy places.** Do not copy-paste code or text directly from `.Trash`, `_ARCHIVE`, or legacy Replit folders without validating it against the active brand rules. Verify that no banned words or old splits slip into new pages.

### Rule 4 — Groundwork and foundations focus
* The goal is **not to rebuild the site.** Focus on building the groundwork, establishing database/API connections, and assembling the built scattered tools and copy rather than rushing into cosmetic rebuilds.

### Rule 5 — Tone & Register
* **Kitchen Table Voice**: A trusted, capable person sitting at a kitchen table. Keep it clean, direct, and conversational (like a trusted person would say in a kitchen rather than corporate keynote language).
* **Observation over emotion**: Notice emotion; do not narrate it. (e.g., *Good:* "The closet everyone closes quickly because nobody knows what to do with it yet." *Bad:* "Objects carry emotional continuity.")
* **No AI shorthand**: Remove "dead smoke detector" or "expired smoke detector" from all copy. Use Dayna's **real examples**:
  * *The lightbulb that never got replaced after someone passed away.*
  * *The storage unit that started as temporary and quietly became a monthly line item for six years.*
  * *The parent who absolutely does not want help, but also definitely did not set up the new iPhone correctly.*
  * *The move you technically have handled, except nobody has decided what's happening with the things that didn't fit in the car.*

---

## 3. BRAND WORDING
* **Banned Words (AI-drift, completely banned as not Dayna's voice)**:
  * *care-driven · transformative · holistic · bespoke · luxury · white-glove · optimize · scrutinize*
* **Caution & Context-Dependent Words (Must come from Dayna, require context, use wisely)**:
  * *stewardship* (The brand is **not** a stewardship-forward brand; this word is banned from public copy and restricted to a maximum of 2 uses on the About page only)
  * *continuity · ecosystem · curated · elevated · intentional living · seamless · concierge · holding space · meaningful belongings · luxury experience*

---

## 4. PRICING & CONSIGMENT QUICK REFERENCE (Truth is in brand.ts)
* **Consignment Splits (Client / WLC)**:
  * Clothing & Accessories: **Client 45% / WLC 55%**
  * Designer & Luxury: **50% / 50% split**
  * Furniture & Significant Home Pieces: **50% / 50% split**
  * Full Closet Liquidation: **Client 45% / WLC 55%**
* **Zelle Centralized Details**:
  * Zelle Email: `dayna@thewelllivedcitizen.com`
  * Zelle Phone: `(310) 993-0204` (For payment validation only)
  * target account: business checking under parent LLC `Well Dressed Citizen LLC`.
  * Memo Line Instruction: Clients must include name + service (e.g., "Smith - Home Org 3 hr block").
