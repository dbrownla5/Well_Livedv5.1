/**
 * Runnable logic tests — no DB, no network.
 * Run with:  node --experimental-strip-types src/handshake/logic.test.ts
 * (executed from artifacts/api-server). Asserts the gate, step machine,
 * payout math, and date rules behave exactly as specified.
 */
import assert from "node:assert/strict";
import {
  evaluateGate,
  nextStep,
  canAdvance,
  itemNetCents,
  itemClientShareCents,
  payoutTotalCents,
  firstMondayAfter,
  computePayoutDate,
  tierSharePct,
} from "./logic.ts";

let passed = 0;
function check(name: string, fn: () => void) {
  fn();
  passed++;
  console.log(`  ✓ ${name}`);
}

console.log("Handshake logic tests\n");

// ── Gate ──
check("unsigned submission is blocked, kept off board", () => {
  const r = evaluateGate({ agreementAccepted: false });
  assert.equal(r.open, false);
  assert.equal(r.blocked, true);
});
check("accepted but no typed name is blocked", () => {
  const r = evaluateGate({ agreementAccepted: true, agreementTimestamp: new Date().toISOString(), signatureName: "" });
  assert.equal(r.open, false);
});
check("signed + named + timestamped opens the record", () => {
  const r = evaluateGate({ agreementAccepted: true, agreementTimestamp: new Date().toISOString(), signatureName: "Jane Client" });
  assert.equal(r.open, true);
  assert.equal(r.blocked, false);
});

// ── Step machine ──
check("steps advance one at a time, in order", () => {
  assert.equal(nextStep("intake"), "day_before");
  assert.equal(nextStep("consent"), "review");
  assert.equal(nextStep("closed"), null);
});
check("cannot skip steps", () => {
  assert.equal(canAdvance("intake", "custody").ok, false);
  assert.equal(canAdvance("intake", "day_before").ok, true);
});
check("cannot move backward", () => {
  assert.equal(canAdvance("custody", "intake").ok, false);
});

// ── Payout math (the worked example from the spec) ──
check("net = gross − fees − shipping", () => {
  assert.equal(itemNetCents({ tier: "designer", soldGrossCents: 7000, feesCents: 1000, shippingCents: 800 }), 5200);
});
check("designer tier pays 50%: $52 net → $26 to client", () => {
  const item = { tier: "designer" as const, soldGrossCents: 7000, feesCents: 1000, shippingCents: 800 };
  assert.equal(tierSharePct("designer"), 0.5);
  assert.equal(itemClientShareCents(item), 2600);
});
check("client share never negative", () => {
  assert.equal(itemClientShareCents({ tier: "luxury", soldGrossCents: 500, feesCents: 1000, shippingCents: 0 }), 0);
});
check("payout total ignores pulled / non-listed items", () => {
  const items = [
    { tier: "designer" as const, disposition: "list", soldGrossCents: 7000, feesCents: 1000, shippingCents: 800 }, // 2600
    { tier: "designer" as const, disposition: "list", soldGrossCents: 7000, feesCents: 1000, shippingCents: 800, clientPulled: true }, // excluded
    { tier: "standard" as const, disposition: "return", soldGrossCents: 7000, feesCents: 1000, shippingCents: 800 }, // excluded
  ];
  assert.equal(payoutTotalCents(items), 2600);
});

// ── Dates ──
check("firstMondayAfter returns a strictly-later Monday", () => {
  // 2026-05-30 is a Saturday → next Monday is 2026-06-01
  const m = firstMondayAfter(new Date("2026-05-30T00:00:00Z"));
  assert.equal(m.getUTCDay(), 1);
  assert.equal(m.toISOString().slice(0, 10), "2026-06-01");
});
check("payout date = first Monday after consent + 30 days", () => {
  const d = computePayoutDate(new Date("2026-05-30T00:00:00Z")); // +30 = 2026-06-29 (Mon) → strictly after → 2026-07-06
  assert.equal(d.getUTCDay(), 1);
  assert.equal(d.toISOString().slice(0, 10), "2026-07-06");
});

console.log(`\n${passed} checks passed.`);
