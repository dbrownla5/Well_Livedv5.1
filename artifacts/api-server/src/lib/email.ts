/**
 * Email module — Resend with a graceful fallback.
 *
 * If RESEND_API_KEY is set, mail is sent via Resend. If it is not set, the app
 * does NOT crash and does NOT lose the message: the email is logged in full and
 * the function reports `delivered: false`. This lets the system be hosted and
 * exercised end-to-end before email is switched on, then "just work" once the
 * key is added — no code change.
 */
import { logger } from "./logger";

export interface SendArgs {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

export interface SendResult {
  delivered: boolean;
  reason: string;
}

export async function sendEmail({ to, subject, text, replyTo }: SendArgs): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM || "The Well Lived Citizen <onboarding@resend.dev>";

  if (!key) {
    logger.warn({ to, subject, text }, "EMAIL (not sent — RESEND_API_KEY missing; logged instead)");
    return { delivered: false, reason: "RESEND_API_KEY not set — logged instead of sent." };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!res.ok) {
      const body = await res.text();
      logger.error({ to, subject, body }, "Resend API error");
      return { delivered: false, reason: `Resend error: ${res.status}` };
    }
    logger.info({ to, subject }, "Email sent via Resend");
    return { delivered: true, reason: "sent" };
  } catch (err) {
    logger.error({ err, to, subject }, "Email send threw");
    return { delivered: false, reason: "send threw — logged instead." };
  }
}

// ── Templates ─────────────────────────────────────────────────────────────────

const SIG = "\n\n— Dayna\nThe Well Lived Citizen\n(323) 433-1350";

export function tplDayBefore(name: string, when: string): { subject: string; text: string } {
  return {
    subject: "Confirming your pickup tomorrow",
    text: `Hi ${name},\n\nJust confirming I'll be by for your pickup ${when}. If anything's changed, reply to this email and we'll adjust.${SIG}`,
  };
}

export function tplCustody(name: string): { subject: string; text: string } {
  return {
    subject: "I've got your things — here's what happens next",
    text: `Hi ${name},\n\nYour items are now in my care. Next I'll do a full count within 48 hours and send you an inventory so you can see exactly what came in.${SIG}`,
  };
}

export function tplReport(name: string, consentUrl: string, itemLines: string): { subject: string; text: string } {
  return {
    subject: "Your inventory report — please review",
    text: `Hi ${name},\n\nHere's everything I've cataloged from your pickup:\n\n${itemLines}\n\nReview your list and tell me if there's anything you'd like to pull back. You have a 24-hour window:\n${consentUrl}\n\nIf I don't hear from you, everything proceeds as listed.${SIG}`,
  };
}

export function tplConsentReceived(name: string, decision: string): { subject: string; text: string } {
  const body =
    decision === "changes"
      ? "Got your changes — I've pulled the items you flagged and they'll be returned to you. Everything else proceeds."
      : "Got your approval — everything proceeds as listed.";
  return { subject: "Got it — thank you", text: `Hi ${name},\n\n${body}${SIG}` };
}

export function tplPayout(name: string, total: string, when: string): { subject: string; text: string } {
  return {
    subject: "Your payout summary",
    text: `Hi ${name},\n\nYour items have sold and your payout is set. Your total is ${total}, scheduled for ${when}.\n\nThank you for trusting me with this.${SIG}`,
  };
}
