import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";
import { db, contactSubmissions } from "@workspace/db";
import { dispatchWebhook } from "../lib/webhook";

const router: IRouter = Router();

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  neighborhood?: string;
  clientType?: string;
  summary?: string;
  situation?: string;
  bagsCount?: string;
  urgency?: string;
  pickupTime1?: string;
  pickupTime2?: string;
  pickupMethod?: string;
  pickupRelease?: boolean;
  courierNotes?: string;
  agreementAccepted?: boolean;
  agreementTimestamp?: string;
  estimatedItems?: string;
}

function isResalePath(body: ContactPayload): boolean {
  if (body.bagsCount || body.pickupMethod) return true;
  const s = (body.summary || "").toLowerCase();
  return ["fast bag", "resale", "consignment", "pickup"].some(kw => s.includes(kw));
}

router.post("/contact", async (req, res) => {
  const body = req.body as ContactPayload;

  if (!body.name || !body.email) {
    res.status(400).json({ ok: false, error: "Name and email are required." });
    return;
  }

  // System of record first: persist the submission so a lead is never lost,
  // even if email is unconfigured or the CRM webhook is down.
  try {
    await db.insert(contactSubmissions).values({
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      neighborhood: body.neighborhood ?? null,
      clientType: body.clientType ?? null,
      summary: body.summary ?? null,
      situation: body.situation ?? null,
      bagsCount: body.bagsCount ?? null,
      urgency: body.urgency ?? null,
      pickupTime1: body.pickupTime1 ?? null,
      pickupTime2: body.pickupTime2 ?? null,
      pickupMethod: body.pickupMethod ?? null,
      pickupRelease: body.pickupRelease ?? false,
      courierNotes: body.courierNotes ?? null,
    });
  } catch (err) {
    logger.error({ err }, "Failed to persist contact submission");
  }

  // Forward to external CRM (no-op if WEBHOOK_URL unset).
  void dispatchWebhook({ kind: "contact", ...body });

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "dayna@thewelllivedcitizen.com";
  const from = process.env.CONTACT_FROM || "WLC Contact Form <onboarding@resend.dev>";

  if (!resendKey) {
    // Not fatal anymore — the submission is already saved + forwarded.
    logger.warn("RESEND_API_KEY not set; submission saved without email notification");
    res.json({ ok: true, emailed: false });
    return;
  }

  const subject = `[WLC] ${body.summary || "General inquiry"} — ${body.name}`;

  const lines = [
    `New contact form submission`,
    ``,
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    body.phone ? `Phone: ${body.phone}` : "",
    body.neighborhood ? `Neighborhood: ${body.neighborhood}` : "",
    body.clientType ? `Client type: ${body.clientType}` : "",
    body.summary ? `Summary: ${body.summary}` : "",
    ``,
    `--- Their message ---`,
    body.situation || "(none)",
  ];

  if (body.bagsCount || body.urgency || body.pickupTime1 || body.pickupTime2 || body.pickupMethod) {
    lines.push("", "--- Pickup details (Fast Bag Fill) ---");
    if (body.bagsCount) lines.push(`Bags: ${body.bagsCount}`);
    if (body.estimatedItems) lines.push(`Estimated item count: ${body.estimatedItems}`);
    if (body.urgency) lines.push(`Urgency: ${body.urgency}`);
    if (body.pickupTime1) lines.push(`Pickup window 1: ${body.pickupTime1}`);
    if (body.pickupTime2) lines.push(`Pickup window 2: ${body.pickupTime2}`);
    if (body.pickupMethod) lines.push(`Pickup method: ${body.pickupMethod}`);
    if (body.pickupMethod === "in-person") {
      lines.push(`In-person release authorized: ${body.pickupRelease ? "Yes" : "No"}`);
    }
    if (body.pickupMethod === "courier" && body.courierNotes) {
      lines.push(`Courier access notes: ${body.courierNotes}`);
    }
  }

  if (isResalePath(body)) {
    let agreementLine = `Resale Agreement accepted at intake: ${body.agreementAccepted ? "YES — client signed at booking" : "NOT CONFIRMED"}`;
    if (body.agreementAccepted && body.agreementTimestamp) {
      const ts = new Date(body.agreementTimestamp);
      const datePT = ts.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles", month: "long", day: "numeric", year: "numeric" });
      const timePT = ts.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit", hour12: true });
      agreementLine += `\nAgreement accepted: ${datePT} ${timePT} PT`;
    }
    lines.push(
      "",
      "--- Agreement status ---",
      agreementLine,
      "Resale Agreement: https://thewelllivedcitizen.com/WLC-Resale-Agreement.pdf",
    );
  }

  const text = lines.filter(l => l !== undefined).join("\n");

  try {
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: body.email,
        subject,
        text,
      }),
    });

    if (!emailRes.ok) {
      const errorBody = await emailRes.text();
      logger.error({ errorBody }, "Resend API error");
      res.status(500).json({ ok: false, error: "Email delivery failed." });
      return;
    }

    logger.info({ name: body.name, summary: body.summary }, "Contact form submission sent via Resend");
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Contact form error");
    res.status(500).json({ ok: false, error: "Unexpected error." });
  }
});

export default router;
