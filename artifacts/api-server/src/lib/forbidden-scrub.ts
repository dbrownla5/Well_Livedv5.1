const FORBIDDEN_LANGUAGE = [
  "elder care",
  "estate sale",
  "asset management",
  "liquidation",
  "fall prevention",
  "small repairs",
  "closet systems",
  "luxury organizing",
  "ADHD closet edits",
];

export function scrubForbidden(text: string): string {
  let out = text;
  for (const term of FORBIDDEN_LANGUAGE) {
    const re = new RegExp(term, "gi");
    out = out.replace(re, "");
  }
  return out.replace(/\s{2,}/g, " ").trim();
}
