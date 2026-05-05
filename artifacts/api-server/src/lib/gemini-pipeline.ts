import { ai } from "@workspace/integrations-gemini-ai";
import { scrubForbidden } from "./forbidden-scrub";

export interface AnalyzedItem {
  brand: string;
  model: string;
  marketPrice: string | null;
  floorPrice: string | null;
  platform: string;
  shippingLogic: string | null;
  status: "New" | "Duplicate";
  disposition: "list" | "donate" | "wipe-recycle";
}

export interface ExistingInventoryRow {
  brand: string;
  model: string;
}

const ALLOWED_PLATFORMS = [
  "eBay",
  "Poshmark",
  "Etsy",
  "Chairish",
  "Facebook Marketplace",
  "Local Pickup",
];

function buildPrompt(existing: ExistingInventoryRow[]): string {
  const existingList = existing.length
    ? existing.map((r) => `- ${r.brand} | ${r.model}`).join("\n")
    : "(none)";

  return `You are the resale-pipeline analyst for an estate clear-out operations team in Los Angeles run by Dayna Brown.
You will receive a batch of photos taken at a single household. The photos may show the SAME item from multiple angles.

Your job:
1. GROUP the photos by physical object (multi-angle shots of one item collapse into ONE entry).
2. For each grouped item, extract: brand, model (or descriptive model name), estimated market price (USD), suggested floor price (USD), and the BEST resale platform.
3. DEDUPE against existing master inventory (listed below). If the same brand+model already exists, set status="Duplicate". Otherwise status="New".
4. DISPOSITION:
   - "list" if the item is resaleable on a real platform.
   - "donate" if low-value (under ~$15 resale) or commodity (basic mugs, used linens, partial sets).
   - "wipe-recycle" if electronics/appliances that need data wipe before disposal.
5. SHIPPING LOGIC: short note like "USPS Priority Medium box", "Local pickup only - oversized", "Poshmark prepaid label".

PLATFORM CONSTRAINTS — only use one of these EXACT strings:
${ALLOWED_PLATFORMS.map((p) => `- ${p}`).join("\n")}
Do NOT suggest Depop, Grailed, Mercari, or Thumbtack. Ever.

EXISTING INVENTORY (treat brand+model match as duplicate):
${existingList}

Return ONLY a JSON array. Each element must match this shape exactly:
{
  "brand": "string",
  "model": "string",
  "marketPrice": "string-decimal or null",
  "floorPrice": "string-decimal or null",
  "platform": "one of the allowed platforms above",
  "shippingLogic": "string or null",
  "status": "New" | "Duplicate",
  "disposition": "list" | "donate" | "wipe-recycle"
}

No prose. No markdown fences. Just the JSON array.`;
}

function coercePlatform(p: unknown): string {
  if (typeof p !== "string") return "eBay";
  const match = ALLOWED_PLATFORMS.find(
    (a) => a.toLowerCase() === p.toLowerCase(),
  );
  return match ?? "eBay";
}

function coercePrice(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === "number") return v.toFixed(2);
  if (typeof v === "string") {
    const cleaned = v.replace(/[^0-9.]/g, "");
    if (!cleaned) return null;
    const n = Number(cleaned);
    return Number.isFinite(n) ? n.toFixed(2) : null;
  }
  return null;
}

function coerceStatus(s: unknown): "New" | "Duplicate" {
  return s === "Duplicate" ? "Duplicate" : "New";
}

function coerceDisposition(d: unknown): "list" | "donate" | "wipe-recycle" {
  if (d === "donate" || d === "wipe-recycle") return d;
  return "list";
}

export async function analyzeBatch(
  photos: { mimeType: string; dataBase64: string }[],
  existing: ExistingInventoryRow[],
): Promise<AnalyzedItem[]> {
  const parts: Array<
    { text: string } | { inlineData: { mimeType: string; data: string } }
  > = [{ text: buildPrompt(existing) }];

  for (const p of photos) {
    parts.push({
      inlineData: { mimeType: p.mimeType, data: p.dataBase64 },
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts }],
    config: { responseMimeType: "application/json" },
  });

  const text = response.text ?? "[]";
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    const match = text.match(/\[[\s\S]*\]/);
    parsed = match ? JSON.parse(match[0]) : [];
  }

  const arr = Array.isArray(parsed) ? parsed : [];
  return arr.map((raw) => {
    const item = raw as Record<string, unknown>;
    return {
      brand: typeof item["brand"] === "string" ? item["brand"] : "Unknown",
      model: typeof item["model"] === "string" ? item["model"] : "Unknown",
      marketPrice: coercePrice(item["marketPrice"]),
      floorPrice: coercePrice(item["floorPrice"]),
      platform: coercePlatform(item["platform"]),
      shippingLogic:
        typeof item["shippingLogic"] === "string"
          ? item["shippingLogic"]
          : null,
      status: coerceStatus(item["status"]),
      disposition: coerceDisposition(item["disposition"]),
    };
  });
}

export async function generateListingDescription(item: {
  brand: string;
  model: string;
  platform: string;
  marketPrice: string | null;
  floorPrice: string | null;
  shippingLogic: string | null;
}): Promise<{ title: string; description: string }> {
  const prompt = `Write an SEO-optimized resale listing for the platform "${item.platform}".
Item: ${item.brand} ${item.model}
Suggested market price: ${item.marketPrice ?? "n/a"}
Floor price: ${item.floorPrice ?? "n/a"}
Shipping note: ${item.shippingLogic ?? "n/a"}

Rules:
- Tone matches the platform (eBay = factual + keyword-dense; Poshmark = friendly + style-aware; Etsy = warm + craft-aware; Chairish = elevated + design-aware; Facebook Marketplace = direct + local-friendly).
- Pre-owned items must be honestly described as pre-owned / gently used.
- DO NOT use any of these terms or anything similar: elder care, estate sale, asset management, liquidation, fall prevention, small repairs, closet systems, luxury organizing, ADHD closet edits.
- DO NOT mention death, wills, or "from a household clearout".
- 90-160 word body. Include 3-6 likely search keywords woven naturally into the prose.

Return ONLY JSON: { "title": "string (max 80 chars)", "description": "string" }
No prose, no markdown.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { responseMimeType: "application/json" },
  });

  const text = response.text ?? "{}";
  let parsed: { title?: unknown; description?: unknown } = {};
  try {
    parsed = JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) parsed = JSON.parse(m[0]);
  }

  const titleRaw =
    typeof parsed.title === "string"
      ? parsed.title
      : `${item.brand} ${item.model}`;
  const descRaw =
    typeof parsed.description === "string" ? parsed.description : "";

  return {
    title: scrubForbidden(titleRaw).slice(0, 80),
    description: scrubForbidden(descRaw),
  };
}
