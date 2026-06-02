/**
 * Handshake API — the operational engine.
 *
 * Intake (the gate):
 *   POST /api/handshake/intake     — site form / webhook posts here; gate enforced
 *
 * Dashboard (internal):
 *   GET  /api/handshake            — board: all open handshakes + their step
 *   GET  /api/handshake/:id        — one record with items + audit events
 *   POST /api/handshake/:id/advance        — run the current step's action, advance
 *   POST /api/handshake/:id/items          — add an item to the inventory report
 *   POST /api/handshake/:id/items/:itemId  — update an item (sale actuals, tier, etc.)
 *   POST /api/handshake/:id/send-report    — build + send the intake report, open consent
 *   POST /api/handshake/:id/payout         — compute + record + email the payout
 *
 * Client-facing (token, no auth):
 *   GET  /api/handshake/consent/:token       — the client's item list to review
 *   POST /api/handshake/consent/:token       — client approves or pulls items
 */
import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";
import {
  sendEmail,
  tplDayBefore,
  tplCustody,
  tplReport,
  tplConsentReceived,
  tplPayout,
} from "../lib/email";
import {
  evaluateGate,
  canAdvance,
  nextStep,
  payoutTotalCents,
  computePayoutDate,
  formatCents,
  type HandshakeStep,
} from "../handshake/logic";
import * as store from "../handshake/storage";
import { dispatchWebhook } from "../lib/webhook";
import { DASHBOARD_HTML } from "../handshake/dashboard.html";

const router: IRouter = Router();

// Internal operations dashboard (keep behind hosting auth in production).
router.get("/handshake/dashboard", (_req, res) => {
  res.type("html").send(DASHBOARD_HTML);
});

function publicBase(): string {
  return process.env.PUBLIC_SITE_URL || "https://thewelllivedcitizen.com";
}

// ── Intake (the gate) ─────────────────────────────────────────────────────────

router.post("/handshake/intake", async (req, res) => {
  const b = req.body ?? {};
  if (!b.name || !b.email) {
    res.status(400).json({ ok: false, error: "Name and email are required." });
    return;
  }

  const gate = evaluateGate({
    agreementAccepted: b.agreementAccepted,
    agreementTimestamp: b.agreementTimestamp,
    signatureName: b.signatureName ?? b.name,
  });

  try {
    const hs = await store.createHandshake({
      clientName: b.name,
      clientEmail: b.email,
      clientPhone: b.phone ?? null,
      neighborhood: b.neighborhood ?? null,
      summary: b.summary ?? null,
      situation: b.situation ?? null,
      bagsCount: b.bagsCount ?? null,
      estimatedItems: b.estimatedItems ?? null,
      urgency: b.urgency ?? null,
      pickupMethod: b.pickupMethod ?? null,
      pickupTime1: b.pickupTime1 ?? null,
      pickupTime2: b.pickupTime2 ?? null,
      pickupRelease: b.pickupRelease ?? false,
      courierNotes: b.courierNotes ?? null,
      agreementAccepted: gate.open,
      agreementTimestamp: b.agreementTimestamp ? new Date(b.agreementTimestamp) : null,
      signatureName: b.signatureName ?? null,
      blocked: gate.blocked,
      step: "intake",
    });
    await store.logEvent(hs.id, "intake", gate.open ? "record_opened" : "blocked_no_signature", { reason: gate.reason });

    // Forward to external CRM (no-op if WEBHOOK_URL unset).
    void dispatchWebhook({ kind: "handshake_intake", id: hs.id, token: hs.token, opened: gate.open, ...b });

    logger.info({ id: hs.id, open: gate.open }, "Handshake intake");
    res.json({ ok: true, id: hs.id, token: hs.token, opened: gate.open, blocked: gate.blocked, reason: gate.reason });
  } catch (err) {
    // Database not provisioned yet (no DATABASE_URL) or DB write failed.
    // Never lose a lead: email the intake to the owner and still confirm success
    // to the client. Full chain-of-custody tracking resumes once the DB is on.
    logger.error({ err }, "Handshake intake DB write failed — falling back to email capture");
    try {
      const to = process.env.CONTACT_TO || "dayna@thewelllivedcitizen.com";
      const lines = [
        "New booking intake (captured by email — database not yet provisioned)",
        "",
        `Name: ${b.name}`,
        `Email: ${b.email}`,
        b.phone ? `Phone: ${b.phone}` : "",
        b.neighborhood ? `Neighborhood: ${b.neighborhood}` : "",
        b.summary ? `Service / summary: ${b.summary}` : "",
        b.situation ? `Details: ${b.situation}` : "",
        b.bagsCount ? `Bags: ${b.bagsCount}` : "",
        b.urgency ? `Urgency: ${b.urgency}` : "",
        b.pickupTime1 ? `Pickup window 1: ${b.pickupTime1}` : "",
        b.pickupTime2 ? `Pickup window 2: ${b.pickupTime2}` : "",
        b.pickupMethod ? `Pickup method: ${b.pickupMethod}` : "",
        "",
        `Agreement accepted: ${gate.open ? "YES" : "NO"}${gate.open && b.agreementTimestamp ? ` (${b.agreementTimestamp})` : ""}`,
        b.signatureName ? `Signed: ${b.signatureName}` : "",
      ].filter(Boolean);
      const emailRes = await sendEmail({
        to,
        subject: `[WLC] New intake — ${b.name}${b.summary ? ` (${b.summary})` : ""}`,
        text: lines.join("\n"),
        replyTo: b.email,
      });
      void dispatchWebhook({ kind: "handshake_intake", opened: gate.open, captured: "email", ...b });
      logger.info({ name: b.name, emailed: emailRes.delivered }, "Handshake intake captured via email fallback");
      res.json({ ok: true, id: null, token: null, opened: gate.open, blocked: gate.blocked, reason: gate.reason, captured: "email", emailed: emailRes.delivered });
    } catch (err2) {
      logger.error({ err: err2 }, "Handshake intake email fallback also failed");
      res.status(500).json({ ok: false, error: "Could not save submission." });
    }
  }
});

// ── Dashboard reads ───────────────────────────────────────────────────────────

router.get("/handshake", async (_req, res) => {
  try {
    const all = await store.listHandshakes();
    res.json({ ok: true, handshakes: all });
  } catch (err) {
    logger.error({ err }, "List handshakes failed");
    res.status(500).json({ ok: false, error: "Could not load board." });
  }
});

router.get("/handshake/:id", async (req, res) => {
  const id = Number(req.params.id);
  const hs = await store.getHandshake(id);
  if (!hs) {
    res.status(404).json({ ok: false, error: "Not found." });
    return;
  }
  const [items, events] = await Promise.all([store.listItems(id), store.listEvents(id)]);
  res.json({ ok: true, handshake: hs, items, events });
});

// ── Advance a step (runs that step's action + emails the client) ─────────────────

router.post("/handshake/:id/advance", async (req, res) => {
  const id = Number(req.params.id);
  const hs = await store.getHandshake(id);
  if (!hs) {
    res.status(404).json({ ok: false, error: "Not found." });
    return;
  }
  if (hs.blocked) {
    res.status(409).json({ ok: false, error: "Record is blocked — no signature at intake." });
    return;
  }

  const current = hs.step as HandshakeStep;
  const target = (req.body?.target as HandshakeStep | undefined) ?? nextStep(current) ?? undefined;
  const guard = canAdvance(current, target);
  if (!guard.ok) {
    res.status(409).json({ ok: false, error: guard.reason });
    return;
  }

  const now = new Date();
  const patch: Record<string, unknown> = { step: target };
  let email: { subject: string; text: string } | null = null;

  switch (target) {
    case "day_before": {
      patch.dayBeforeAt = now;
      const when = req.body?.when || hs.pickupTime1 || "as scheduled";
      email = tplDayBefore(hs.clientName, when);
      break;
    }
    case "custody": {
      patch.custodyAt = now;
      email = tplCustody(hs.clientName);
      break;
    }
    case "inventory":
      patch.inventoryAt = now;
      break;
    case "evaluation":
      patch.evaluationAt = now;
      break;
    case "report":
      // report content is sent via /send-report; advancing just marks the stage
      break;
    case "consent":
      // consent opens when the report is sent; allow manual advance too
      break;
    case "review":
      patch.reviewAt = now;
      break;
    case "payout":
      // payout figures are computed via /payout
      break;
    case "closed":
      break;
  }

  const updated = await store.updateHandshake(id, patch);
  let emailResult = null;
  if (email) {
    emailResult = await sendEmail({ to: hs.clientEmail, subject: email.subject, text: email.text });
  }
  await store.logEvent(id, target!, "advanced", { from: current, emailDelivered: emailResult?.delivered ?? null });
  res.json({ ok: true, handshake: updated, emailDelivered: emailResult?.delivered ?? null });
});

// ── Inventory report builder ────────────────────────────────────────────────────

router.post("/handshake/:id/items", async (req, res) => {
  const id = Number(req.params.id);
  const hs = await store.getHandshake(id);
  if (!hs) {
    res.status(404).json({ ok: false, error: "Not found." });
    return;
  }
  const b = req.body ?? {};
  if (!b.description) {
    res.status(400).json({ ok: false, error: "Item description is required." });
    return;
  }
  const item = await store.addItem({
    handshakeId: id,
    description: b.description,
    platform: b.platform ?? null,
    tier: b.tier ?? "standard",
    disposition: b.disposition ?? "list",
    startPriceCents: b.startPriceCents ?? null,
    estSaleCents: b.estSaleCents ?? null,
    estTurnDays: b.estTurnDays ?? null,
  });
  await store.logEvent(id, hs.step, "item_added", { itemId: item.id, description: item.description });
  res.json({ ok: true, item });
});

router.post("/handshake/:id/items/:itemId", async (req, res) => {
  const itemId = Number(req.params.itemId);
  const b = req.body ?? {};
  const patch: Record<string, unknown> = {};
  for (const k of ["description", "platform", "tier", "disposition", "startPriceCents", "estSaleCents", "estTurnDays", "soldGrossCents", "feesCents", "shippingCents", "clientPulled"]) {
    if (k in b) patch[k] = b[k];
  }
  const item = await store.updateItem(itemId, patch);
  await store.logEvent(Number(req.params.id), "evaluation", "item_updated", { itemId, patch });
  res.json({ ok: true, item });
});

router.post("/handshake/:id/send-report", async (req, res) => {
  const id = Number(req.params.id);
  const hs = await store.getHandshake(id);
  if (!hs) {
    res.status(404).json({ ok: false, error: "Not found." });
    return;
  }
  const items = await store.listItems(id);
  if (items.length === 0) {
    res.status(400).json({ ok: false, error: "Add at least one item before sending the report." });
    return;
  }
  const lines = items
    .map((it) => {
      const est = it.estSaleCents ? ` — est. ${formatCents(it.estSaleCents)}` : "";
      const disp = it.disposition !== "list" ? ` [${it.disposition}]` : "";
      return `• ${it.description}${it.platform ? ` (${it.platform})` : ""}${est}${disp}`;
    })
    .join("\n");
  const consentUrl = `${publicBase()}/consent/${hs.token}`;
  const tpl = tplReport(hs.clientName, consentUrl, lines);
  const email = await sendEmail({ to: hs.clientEmail, subject: tpl.subject, text: tpl.text });

  const updated = await store.updateHandshake(id, { step: "consent", reportSentAt: new Date() });
  await store.logEvent(id, "report", "report_sent", { items: items.length, emailDelivered: email.delivered, consentUrl });
  res.json({ ok: true, handshake: updated, consentUrl, emailDelivered: email.delivered });
});

// ── Payout ──────────────────────────────────────────────────────────────────────

router.post("/handshake/:id/payout", async (req, res) => {
  const id = Number(req.params.id);
  const hs = await store.getHandshake(id);
  if (!hs) {
    res.status(404).json({ ok: false, error: "Not found." });
    return;
  }
  const items = await store.listItems(id);
  const totalCents = payoutTotalCents(
    items.map((it) => ({
      tier: (it.tier as any) ?? "standard",
      disposition: it.disposition,
      clientPulled: it.clientPulled,
      soldGrossCents: it.soldGrossCents,
      feesCents: it.feesCents,
      shippingCents: it.shippingCents,
    })),
  );
  // Payout clock anchors on the consent decision date when present, else now.
  const anchor = hs.consentDecisionAt ?? new Date();
  const payoutDate = computePayoutDate(anchor);

  const updated = await store.updateHandshake(id, {
    step: "payout",
    payoutClientTotalCents: totalCents,
    payoutDate,
    payoutPaidAt: req.body?.markPaid ? new Date() : null,
  });
  const tpl = tplPayout(hs.clientName, formatCents(totalCents), payoutDate.toDateString());
  const email = await sendEmail({ to: hs.clientEmail, subject: tpl.subject, text: tpl.text });
  await store.logEvent(id, "payout", "payout_recorded", { totalCents, payoutDate, emailDelivered: email.delivered });

  res.json({ ok: true, handshake: updated, totalCents, total: formatCents(totalCents), payoutDate, emailDelivered: email.delivered });
});

// ── Client-facing consent (token) ───────────────────────────────────────────────

router.get("/handshake/consent/:token", async (req, res) => {
  const hs = await store.getHandshakeByToken(req.params.token);
  if (!hs || hs.blocked) {
    res.status(404).json({ ok: false, error: "Not found." });
    return;
  }
  const items = await store.listItems(hs.id);
  res.json({
    ok: true,
    clientName: hs.clientName,
    step: hs.step,
    decided: !!hs.consentDecisionAt,
    items: items.map((it) => ({
      id: it.id,
      description: it.description,
      platform: it.platform,
      estSaleCents: it.estSaleCents,
      disposition: it.disposition,
      clientPulled: it.clientPulled,
    })),
  });
});

router.post("/handshake/consent/:token", async (req, res) => {
  const hs = await store.getHandshakeByToken(req.params.token);
  if (!hs || hs.blocked) {
    res.status(404).json({ ok: false, error: "Not found." });
    return;
  }
  if (hs.consentDecisionAt) {
    res.status(409).json({ ok: false, error: "This decision has already been recorded." });
    return;
  }
  const pulledIds: number[] = Array.isArray(req.body?.pulledItemIds) ? req.body.pulledItemIds.map(Number) : [];
  const decision = pulledIds.length > 0 ? "changes" : "approved";
  const now = new Date();

  for (const itemId of pulledIds) {
    await store.updateItem(itemId, { clientPulled: true, disposition: "return" });
  }

  const updated = await store.updateHandshake(hs.id, {
    consentDecision: decision,
    consentDecisionAt: now,
    step: "review",
    reviewAt: now,
  });
  const tpl = tplConsentReceived(hs.clientName, decision);
  await sendEmail({ to: hs.clientEmail, subject: tpl.subject, text: tpl.text });
  await store.logEvent(hs.id, "consent", "client_decision", { decision, pulledIds });

  res.json({ ok: true, decision, step: updated.step });
});

export default router;
