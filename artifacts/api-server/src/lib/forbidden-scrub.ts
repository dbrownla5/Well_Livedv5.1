const FORBIDDEN_PHRASES = [
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

// Word-boundary terms — matched only when they appear as whole words
const FORBIDDEN_WORDS = ["lot", "lots"];

export function scrubForbidden(text: string): string {
  let out = text;
  for (const phrase of FORBIDDEN_PHRASES) {
    out = out.replace(new RegExp(phrase, "gi"), "");
  }
  for (const word of FORBIDDEN_WORDS) {
    out = out.replace(new RegExp(`\\b${word}\\b`, "gi"), "");
  }
  return out.replace(/\s{2,}/g, " ").trim();
}
