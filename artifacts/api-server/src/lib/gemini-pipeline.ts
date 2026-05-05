import { ai } from "@workspace/integrations-gemini-ai";
import { scrubForbidden } from "./forbidden-scrub";

export interface AnalyzedItem {
  brand: string;
  model: string;
  category: string | null;
  color: string | null;
  condition: string | null;
  conditionNotes: string | null;
  style: string | null;
  fabric: string | null;
  angleLabels: string[];
  photoIndices: number[];
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

export interface MarketSource {
  platform: string;
  title: string;
  price: number;
  condition: string;
  soldDate: string;
}

export interface MarketPricingResult {
  priceLow: number;
  priceHigh: number;
  estimatedDaysToSell: number;
  recommendedPlatform: string;
  platformRationale: string;
  sources: MarketSource[];
}

export interface ListingCopyPlatform {
  title: string;
  description: string;
  hashtags: string[];
  measurements: string;
}

export interface ListingCopyResult {
  poshmark: ListingCopyPlatform;
  ebay: ListingCopyPlatform;
  etsy: ListingCopyPlatform;
  facebook: ListingCopyPlatform;
}

const ALLOWED_PLATFORMS = [
  "eBay",
  "Poshmark",
  "Etsy",
  "Chairish",
  "Facebook Marketplace",
  "Local Pickup",
];

const ITEM_CATEGORIES = [
  "Clothing",
  "Shoes",
  "Accessories",
  "Jewelry",
  "Furniture",
  "Decor",
  "Art",
  "Electronics",
  "Kitchen",
  "Books",
  "Toys",
  "Vintage",
  "Collectibles",
  "Other",
];

function buildPrompt(existing: ExistingInventoryRow[]): string {
  const existingList = existing.length
    ? existing.map((r) => `- ${r.brand} | ${r.model}`).join("\n")
    : "(none)";

  return `You are the resale-pipeline analyst for an estate clear-out operations team in Los Angeles run by Dayna Brown.
You will receive a batch of photos taken at a single household. The photos may show the SAME item from multiple angles.

Your job:
1. GROUP the photos by physical object (multi-angle shots of one item collapse into ONE entry).
2. For each grouped item, extract all attributes listed below.
3. DEDUPE against existing master inventory (listed below). If the same brand+model already exists, set status="Duplicate". Otherwise status="New".
4. DISPOSITION:
   - "list" if the item is resaleable on a real platform.
   - "donate" if low-value (under ~$15 resale) or commodity (basic mugs, used linens, partial sets).
   - "wipe-recycle" if electronics/appliances that need data wipe before disposal.
5. SHIPPING LOGIC: short note like "USPS Priority Medium box", "Local pickup only - oversized", "Poshmark prepaid label".

PLATFORM CONSTRAINTS — only use one of these EXACT strings:
${ALLOWED_PLATFORMS.map((p) => `- ${p}`).join("\n")}
Do NOT suggest Depop, Grailed, Mercari, or Thumbtack. Ever.

CATEGORY — only use one of these EXACT strings:
${ITEM_CATEGORIES.map((c) => `- ${c}`).join("\n")}

CONDITION — only use one of: Excellent, Good, Fair, Poor

EXISTING INVENTORY (treat brand+model match as duplicate):
${existingList}

Return ONLY a JSON array. Each element must match this shape exactly:
{
  "brand": "string",
  "model": "string",
  "category": "one of the allowed categories above",
  "color": "primary color as a simple string (e.g. Black, Navy Blue, Ivory)",
  "condition": "Excellent | Good | Fair | Poor",
  "conditionNotes": "brief note on flaws/wear or null if pristine",
  "style": "overall style descriptor e.g. Mid-Century Modern, Bohemian, Classic, Streetwear, Art Deco, or null if not applicable",
  "fabric": "primary material or fabric e.g. Cotton, Linen, Velvet, Walnut, Brass, Ceramic, or null if not determinable",
  "angleLabels": ["front", "back"] (subset of: front|back|left-side|right-side|top|bottom|detail|label|damage — only include angles visible in the photos for this item),
  "photoIndices": [0, 1, 2] (zero-based indices of the input photos that belong to this item — these are the photos you grouped to identify it),
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

function coerceString(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

function coerceNumber(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return Math.max(0, v);
  if (typeof v === "string") {
    const n = Number(v.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? Math.max(0, n) : 0;
  }
  return 0;
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
      category: coerceString(item["category"]),
      color: coerceString(item["color"]),
      condition: coerceString(item["condition"]),
      conditionNotes: coerceString(item["conditionNotes"]),
      style: coerceString(item["style"]),
      fabric: coerceString(item["fabric"]),
      angleLabels: Array.isArray(item["angleLabels"])
        ? (item["angleLabels"] as unknown[]).filter((l): l is string => typeof l === "string")
        : [],
      photoIndices: Array.isArray(item["photoIndices"])
        ? (item["photoIndices"] as unknown[]).filter(
            (i): i is number => typeof i === "number" && Number.isInteger(i) && i >= 0,
          )
        : [],
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

export async function fetchMarketPricing(item: {
  brand: string;
  model: string;
  category: string | null;
  color: string | null;
  condition: string | null;
  conditionNotes: string | null;
  platform: string;
}): Promise<MarketPricingResult> {
  const prompt = `You are a resale market pricing expert with deep knowledge of eBay sold listings, Poshmark sales, Etsy, and Facebook Marketplace.

Provide realistic market pricing data for this pre-owned item:
Brand: ${item.brand}
Model/Description: ${item.model}
Category: ${item.category ?? "Unknown"}
Color: ${item.color ?? "Unknown"}
Condition: ${item.condition ?? "Good"}
Condition notes: ${item.conditionNotes ?? "None"}
Current platform assignment: ${item.platform}

Based on your knowledge of actual resale prices for similar items:
1. Generate 4-8 comparable sold listings (realistic items that sell on these platforms)
2. A price range (low = quick sale price, high = patient seller price)
3. Estimated days to sell at the midpoint price
4. The single best platform recommendation with a one-sentence reason

PLATFORM — only recommend one of: eBay, Poshmark, Etsy, Chairish, Facebook Marketplace

Return ONLY JSON:
{
  "priceLow": number,
  "priceHigh": number,
  "estimatedDaysToSell": number,
  "recommendedPlatform": "platform name",
  "platformRationale": "one sentence reason",
  "sources": [
    { "platform": "eBay|Poshmark|Etsy|Facebook Marketplace|Chairish", "title": "string", "price": number, "condition": "string", "soldDate": "YYYY-MM" }
  ]
}
No prose, no markdown fences. Just the JSON.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { responseMimeType: "application/json" },
  });

  const text = response.text ?? "{}";
  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(text) as Record<string, unknown>;
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) parsed = JSON.parse(m[0]) as Record<string, unknown>;
  }

  const sourcesRaw = Array.isArray(parsed["sources"]) ? parsed["sources"] : [];
  const sources: MarketSource[] = sourcesRaw.map((s) => {
    const src = s as Record<string, unknown>;
    return {
      platform: coerceString(src["platform"]) ?? "eBay",
      title: coerceString(src["title"]) ?? `${item.brand} ${item.model}`,
      price: coerceNumber(src["price"]),
      condition: coerceString(src["condition"]) ?? "Good",
      soldDate: coerceString(src["soldDate"]) ?? "",
    };
  });

  return {
    priceLow: coerceNumber(parsed["priceLow"]),
    priceHigh: coerceNumber(parsed["priceHigh"]),
    estimatedDaysToSell: Math.round(coerceNumber(parsed["estimatedDaysToSell"])) || 30,
    recommendedPlatform: coercePlatform(parsed["recommendedPlatform"]),
    platformRationale: coerceString(parsed["platformRationale"]) ?? "",
    sources,
  };
}

export async function generateListingCopy(item: {
  brand: string;
  model: string;
  category: string | null;
  color: string | null;
  condition: string | null;
  conditionNotes: string | null;
  marketPrice: string | null;
  floorPrice: string | null;
  shippingLogic: string | null;
  priceLow?: number | null;
  priceHigh?: number | null;
}): Promise<ListingCopyResult> {
  const priceRange =
    item.priceLow && item.priceHigh
      ? `$${item.priceLow}–$${item.priceHigh}`
      : item.floorPrice
        ? `$${item.floorPrice}`
        : item.marketPrice
          ? `$${item.marketPrice}`
          : "price TBD";

  const prompt = `Write pre-owned resale listing copy for 4 platforms for this item.

Brand: ${item.brand}
Model/Description: ${item.model}
Category: ${item.category ?? "General"}
Color: ${item.color ?? "see photos"}
Condition: ${item.condition ?? "Good"}
Condition notes: ${item.conditionNotes ?? "None"}
Price range: ${priceRange}
Shipping: ${item.shippingLogic ?? "Standard shipping"}

Platform tone guidelines:
- Poshmark: friendly, conversational, community feel, includes measurements, 5-8 hashtags
- eBay: factual, keyword-dense, condition-forward, shipping details prominent, no hashtags
- Etsy: warm, story-driven, vintage/unique aesthetic emphasized if applicable, 5-8 hashtags
- Facebook Marketplace: direct, local-buyer-friendly, concise, no hashtags

Rules:
- Do NOT use any of these terms: estate sale, liquidation, lot, elder care, deceased, inherited, clearout, asset management
- Describe all items as pre-owned, gently used, or vintage as appropriate
- Each title: max 80 characters, keyword-rich
- Each description: 60-120 words
- Measurements: provide realistic estimates if unknown (e.g. clothing: "approx. size S/M"; bags: "approx. 12\\"W × 8\\"H × 4\\"D"; furniture: include approx. dimensions)

Return ONLY JSON:
{
  "poshmark": { "title": "string", "description": "string", "hashtags": ["string"], "measurements": "string" },
  "ebay": { "title": "string", "description": "string", "hashtags": [], "measurements": "string" },
  "etsy": { "title": "string", "description": "string", "hashtags": ["string"], "measurements": "string" },
  "facebook": { "title": "string", "description": "string", "hashtags": [], "measurements": "string" }
}
No prose, no markdown fences. Just the JSON.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { responseMimeType: "application/json" },
  });

  const text = response.text ?? "{}";
  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(text) as Record<string, unknown>;
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) parsed = JSON.parse(m[0]) as Record<string, unknown>;
  }

  function parsePlatformCopy(key: string): ListingCopyPlatform {
    const raw = (parsed[key] ?? {}) as Record<string, unknown>;
    const title = scrubForbidden(coerceString(raw["title"]) ?? `${item.brand} ${item.model}`).slice(0, 80);
    const description = scrubForbidden(coerceString(raw["description"]) ?? "");
    const hashtags = Array.isArray(raw["hashtags"])
      ? (raw["hashtags"] as unknown[])
          .filter((h): h is string => typeof h === "string")
          .map((h) => scrubForbidden(h))
      : [];
    const measurements = scrubForbidden(coerceString(raw["measurements"]) ?? "");
    return { title, description, hashtags, measurements };
  }

  return {
    poshmark: parsePlatformCopy("poshmark"),
    ebay: parsePlatformCopy("ebay"),
    etsy: parsePlatformCopy("etsy"),
    facebook: parsePlatformCopy("facebook"),
  };
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
