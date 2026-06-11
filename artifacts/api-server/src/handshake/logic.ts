/**
 * Handshake business logic — pure, side-effect-free functions.
 *
 * Everything that has a "correct answer" lives here so it can be unit-tested
 * without a database or network: the agreement gate, the step machine, the
 * payout math, and the date rules. The route handlers in ./routes call into
 * these and handle persistence/IO only.
 *
 * Documented business assumptions (change here, in one place):
 *  - Tier client share: standard 40%, contemporary 45%, designer 50%, luxury 60%.
 *  - Item net = sold gross − platform fees − shipping (never below 0 to client).
 *  - Payout date = the first Monday strictly after (consent date + 30 days).
 *  - A record only opens (reaches the board) with a typed signature AND timestamp.
 */

/**
 * This module is intentionally self-contained — it imports nothing, so it can be
 * run directly (no DB, no bundler) for fast unit tests. The string values below
 * are the contract shared with the DB layer (lib/db/src/schema/handshake.ts):
 * the `step`, `tier`, and `disposition` text columns store exactly these values.
 */
export const HANDSHAKE_STEPS = [
  "intake",
  "day_before",
  "custody",
  "inventory",
  "evaluation",
  "report",
  "consent",
  "review",
  "payout",
  "closed",
] as const;
export type HandshakeStep = (typeof HANDSHAKE_STEPS)[number];

export const ITEM_TIERS = ["standard", "contemporary", "designer", "luxury"] as const;
export type ItemTier = (typeof ITEM_TIERS)[number];

// ── The gate ────────────────────────────────────────────────────────────────

export interface GateInput {
  agreementAccepted?: boolean | null;
  agreementTimestamp?: string | Date | null;
  signatureName?: string | null;
}

export interface GateResult {
  /** true when the record may open on the board */
  open: boolean;
  /** true when it must be stored but kept off the board, flagged */
  blocked: boolean;
  reason: string;
}

/**
 * The legal gate. No typed signature + timestamp, no open handshake.
 * This is the single source of truth for "did the handshake actually open".
 */
export function evaluateGate(input: GateInput): GateResult {
  const hasName = typeof input.signatureName === "string" && input.signatureName.trim().length > 1;
  const hasTimestamp = !!input.agreementTimestamp && !Number.isNaN(new Date(input.agreementTimestamp).getTime());
  const accepted = input.agreementAccepted === true;

  if (accepted && hasName && hasTimestamp) {
    return { open: true, blocked: false, reason: "Signature, name, and timestamp present — record opened." };
  }
  const missing: string[] = [];
  if (!accepted) missing.push("agreement not accepted");
  if (!hasName) missing.push("typed signature missing");
  if (!hasTimestamp) missing.push("agreement timestamp missing");
  return { open: false, blocked: true, reason: `Blocked — ${missing.join(", ")}.` };
}

// ── The step machine ──────────────────────────────────────────────────────────

const ORDER: HandshakeStep[] = [...HANDSHAKE_STEPS];

export function stepIndex(step: HandshakeStep): number {
  return ORDER.indexOf(step);
}

export function nextStep(step: HandshakeStep): HandshakeStep | null {
  const i = stepIndex(step);
  if (i < 0 || i >= ORDER.length - 1) return null;
  return ORDER[i + 1]!;
}

/**
 * Steps advance forward one at a time and never skip or go backward.
 * `target` defaults to the immediate next step.
 */
export function canAdvance(current: HandshakeStep, target?: HandshakeStep): { ok: boolean; reason: string } {
  const want = target ?? nextStep(current);
  if (!want) return { ok: false, reason: `"${current}" is terminal — nothing to advance to.` };
  const ci = stepIndex(current);
  const ti = stepIndex(want);
  if (ti !== ci + 1) {
    return { ok: false, reason: `Cannot move from "${current}" to "${want}" — steps advance one at a time.` };
  }
  return { ok: true, reason: `OK to advance "${current}" → "${want}".` };
}

// ── Payout math (all money in integer cents) ──────────────────────────────────

const TIER_SHARE: Record<ItemTier, number> = {
  standard: 0.4,
  contemporary: 0.45,
  designer: 0.5,
  luxury: 0.6,
};

export function tierSharePct(tier: ItemTier): number {
  return TIER_SHARE[tier] ?? TIER_SHARE.standard;
}

export interface SoldItem {
  tier: ItemTier;
  disposition?: string | null;
  clientPulled?: boolean | null;
  soldGrossCents?: number | null;
  feesCents?: number | null;
  shippingCents?: number | null;
}

/** Net proceeds for one item before the split: gross − fees − shipping. */
export function itemNetCents(item: SoldItem): number {
  const gross = item.soldGrossCents ?? 0;
  const fees = item.feesCents ?? 0;
  const shipping = item.shippingCents ?? 0;
  return gross - fees - shipping;
}

/** The client's cut for one sold item; never negative. */
export function itemClientShareCents(item: SoldItem): number {
  const net = itemNetCents(item);
  if (net <= 0) return 0;
  return Math.round(net * tierSharePct(item.tier));
}

/** Sum of client shares across items that actually sold and weren't pulled/returned. */
export function payoutTotalCents(items: SoldItem[]): number {
  return items
    .filter((it) => !it.clientPulled && it.disposition === "list" && (it.soldGrossCents ?? 0) > 0)
    .reduce((sum, it) => sum + itemClientShareCents(it), 0);
}

// ── Date rules ────────────────────────────────────────────────────────────────

export function addDays(date: Date, days: number): Date {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

/** The first Monday strictly after the given date. */
export function firstMondayAfter(date: Date): Date {
  const d = new Date(date.getTime());
  do {
    d.setUTCDate(d.getUTCDate() + 1);
  } while (d.getUTCDay() !== 1); // 1 = Monday
  return d;
}

/** Payout date = first Monday strictly after (consent date + 30 days). */
export function computePayoutDate(consentDate: Date): Date {
  return firstMondayAfter(addDays(consentDate, 30));
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
