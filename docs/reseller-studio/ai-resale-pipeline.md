# AI Resale Pipeline — Spec

Source: `attached_assets/Copy_of_AI-Powered_Resale_Automation_Pipeline._1777845832500.dat` (Gemini AI Studio chat export, model: `gemini-3-flash-preview`, but pipeline scripts use `gemini-1.5-flash` for vision throughput).

This document captures the working AI pipeline as it was developed in Google AI Studio: a v1 single-photo flow that produces one CSV row per image, and a v2 batch flow that groups multi-angle photos into a single inventory item and detects duplicates against the existing master sheet.

The future "reselling dashboard studio" should re-implement the v2 logic against a proper backend (object storage for photos, a database for the master inventory, server-side calls to Gemini), instead of a local PowerShell script writing to a CSV on a Windows folder.

---

## 1. Identity & purpose

The agent is named **"DB Strategic Resale Engine"**.

Goal: Identify luxury and vintage items from photos, then generate optimized listings for resale platforms with suggested pricing and platform routing.

Tone constraint repeated throughout: **"Zero fluff. No markdown. No conversational text."** when producing structured output.

---

## 2. Platform routing rules

These rules govern which marketplace each item is routed to. They are consistent across v1 and v2.

| Item type | Size | Primary platforms | Shipping logic |
| --- | --- | --- | --- |
| Luxury purses | Small | Poshmark / eBay | You ship; use authenticated labels. |
| Vintage decor | Small / Medium | Etsy / eBay | You ship; calculated shipping costs. |
| Vintage furniture | Large | Chairish | Chairish handles white-glove shipping. |
| Heavy / bulky | Large | Facebook Marketplace | Local pickup. |

Compressed routing logic used inside the system prompt:

- **Small / Luxury** → eBay / Poshmark
- **Vintage / Handmade** → Etsy
- **Large / High-end** → Chairish
- **Heavy / Bulky** → Facebook Marketplace

For every item, the engine also produces:

- **Market Price** — suggested list price.
- **Floor Price** — lowest acceptable sell price.

---

## 3. v1 — Single-photo CSV flow

### v1 system prompt (verbatim)

> You are the "DB Strategic Resale Engine."
>
> Goal: Identify luxury and vintage items from photos to generate optimized listings for Poshmark, eBay, Etsy, Chairish, and FB Marketplace.
>
> Operational Logic:
> - Visual Scan: Identify Brand, Model, Material, and Condition markers (e.g., date codes for purses, joinery for furniture).
> - Platform Routing:
>   - Small/Luxury (Purses/Small Decor) → eBay/Poshmark.
>   - Vintage/Handmade → Etsy.
>   - Large/Heavy (Tables/Sofas) → Chairish (High-end) or Facebook Marketplace (Local).
> - Pricing: Suggest a "Market Price" and a "Floor Price" (Lowest to Sell).
> - Output: Provide a structured table for the Master Sheet and formatted descriptions for each platform. Zero fluff.

### v1 script-mode system prompt (CSV-only)

Used by the PowerShell script to constrain output to a single CSV line per image.

> You are the DB Strategic Resale Engine. Identify luxury/vintage items from photos.
> Return ONLY a single line of comma-separated values (CSV format) for the item.
> Order: Brand, Model, Market Price, Floor Price, Platform, Shipping Logic.
> Platform Logic:
> - Small/Luxury → eBay/Poshmark
> - Vintage/Handmade → Etsy
> - Large/High-end → Chairish
> - Heavy/Bulky → FB Marketplace
> Zero fluff. No markdown. No conversational text.

### v1 CSV header

```
FileName,Brand,Model,MarketPrice,FloorPrice,PrimaryPlatform,ShippingLogic
```

### v1 flow

1. Iterate every `.jpg` in the upload folder.
2. Base64-encode the image.
3. POST to Gemini `gemini-1.5-flash:generateContent` with the system prompt + the image as `inline_data`.
4. Parse the candidate text (one CSV line) and prepend the filename.
5. Append the row to `MasterInventory.csv`.

### v1 known problem

Every photo is treated as a unique item. Taking 5 photos of one purse produces 5 duplicate rows. This is the entire reason v2 exists.

---

## 4. v2 — Batch + dedup + JSON flow

### v2 design changes

1. **Batch vision processing.** Send all photos in the folder in a single request instead of one-by-one.
2. **Image grouping.** The model groups multi-angle photos of the same physical item into a single inventory entry.
3. **Duplicate detection against existing inventory.** Before the call, load the existing `MasterInventory.csv` and pass its `Brand` + `Model` columns into the prompt as "Existing Inventory." The model marks any new photo that matches an existing item as `Duplicate`.
4. **JSON output instead of CSV.** Multi-item output is returned as a JSON array so commas inside descriptions cannot corrupt the columns.

### v2 system prompt (verbatim)

> You are the "DB Strategic Resale Engine."
>
> **Task:** Analyze a batch of images and generate a consolidated inventory list.
>
> **Logic:**
> 1. **Grouping:** Multiple images may show the same item from different angles. Group them into a single unique ID.
> 2. **Deduplication:** I will provide a list of "Existing Inventory." If a new photo matches an item already in the list, label it "DUPLICATE" and do not create a new entry.
> 3. **Platform Routing:** Use previous logic (Large → Chairish, Small → eBay, etc.).
>
> **Output Format:** Return ONLY a JSON array of objects with these keys: Brand, Model, MarketPrice, FloorPrice, Platform, Status (New/Duplicate).

### v2 inline user prompt (batch call)

> Group these images into unique items. Do not repeat items. Cross-reference with this existing inventory to avoid duplicates: `<existingInventory JSON>`

### v2 JSON output schema

Each element of the returned array:

```json
{
  "Brand": "string",
  "Model": "string",
  "MarketPrice": "string | number",
  "FloorPrice": "string | number",
  "Platform": "eBay | Poshmark | Etsy | Chairish | FB Marketplace",
  "Status": "New | Duplicate"
}
```

### v2 flow

1. Load `MasterInventory.csv` if it exists; project to `[{ Brand, Model }, ...]` and JSON-stringify it as the "Existing Inventory" memory.
2. Read every `.jpg` in the upload folder, base64-encode each, build a `parts` array of `inline_data` entries.
3. Append the user prompt text (including the existing-inventory JSON) as the final part.
4. Single POST to Gemini `gemini-1.5-flash:generateContent`.
5. Strip ```` ```json ```` fences from the candidate text and `JSON.parse` it.
6. For each item where `Status !== "Duplicate"`, append a row to `MasterInventory.csv` with: `Date, Brand, Model, Price (MarketPrice), Floor (FloorPrice), Platform`.

### v2 dedup strategy

- **Memory source of truth:** the master inventory itself, not image hashes. The model is asked to reason about brand + model semantic match against the existing list, not pixel-level identity.
- **Cross-photo grouping:** done in-call by Gemini's vision over the full batch. There is no client-side image clustering.
- **Pragmatic batching:** for 50+ items, the original recommendation is to split photos into `Batch1`, `Batch2`, etc., process each folder, and verify before moving on, to avoid request timeouts on very large image sets.

---

## 5. Why Gemini 1.5 Flash specifically

Reasons captured in the source chat:

- Optimized for high-speed vision tasks.
- Generous free-tier limits at the time of writing (15 RPM, 1,500 RPD).
- Context-aware, not just OCR — recognizes brand markers like a "Herman Miller" logo on the underside of a chair and infers the correct routing platform.

For the future dashboard build, this should be revisited against the current Gemini model lineup; the chat metadata also references `gemini-3-flash-preview` for the AI Studio session itself.

---

## 6. Carry-forward features mentioned but not implemented

These were called out in the source chat as natural next steps, useful to remember when planning the dashboard:

- **Per-item description files.** Generate a `.txt` companion per photo containing a pre-written, SEO-optimized listing description tailored to the chosen platform.
- **Batch folder workflow.** Manual folder splitting for large runs — the dashboard should handle this via background jobs / queueing instead.

---

## 7. What the dashboard should preserve from this pipeline

When the reseller dashboard is built, the following pieces from this pipeline are the load-bearing logic, not the PowerShell mechanics:

1. The **system prompt persona and constraints** (DB Strategic Resale Engine, zero-fluff output).
2. The **platform routing table** (size × type → platform → shipping logic).
3. The **v2 batch + grouping + dedup pattern**, with the existing master inventory passed in as memory.
4. The **JSON schema** with `Status: New | Duplicate`.
5. The **Brand + Model + MarketPrice + FloorPrice + Platform** as the minimum master-inventory row.

The PowerShell script, `C:\Resale\Uploads` folder, base64 inlining, and CSV-on-disk persistence are implementation details that will be replaced by the dashboard's upload UI, object storage, and database.
