/**
 * Outbound webhook — fire-and-forget POST of a submission to an external CRM
 * (Google AppSheet, a Cloud Function, a Manus receiver, etc.). Configured via
 * env so no third-party URL is ever hardcoded in source or committed to git.
 *
 * This is the portable seam: the website does not care who receives the data.
 * Point WEBHOOK_URL anywhere and the same JSON shows up there. If WEBHOOK_URL
 * is unset, this is a no-op — the DB row remains the system of record, so a
 * receiver being down or absent never loses a lead.
 *
 * Env:
 *   WEBHOOK_URL    — the receiver endpoint (a Replit Secret; not in the repo)
 *   WEBHOOK_SECRET — optional; when set, sent as `Authorization: Bearer <secret>`
 *                    and `X-Webhook-Secret: <secret>` so the receiver can reject
 *                    forged requests. Strongly recommended for any endpoint that
 *                    writes to a client database.
 */
import { logger } from "./logger";

export async function dispatchWebhook(payload: Record<string, unknown>): Promise<{ sent: boolean; reason: string }> {
  const url = process.env.WEBHOOK_URL;
  if (!url) return { sent: false, reason: "WEBHOOK_URL not set — skipped." };

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = process.env.WEBHOOK_SECRET;
  if (secret) {
    headers["Authorization"] = `Bearer ${secret}`;
    headers["X-Webhook-Secret"] = secret;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      logger.error({ status: res.status }, "Webhook non-OK");
      return { sent: false, reason: `Webhook responded ${res.status}` };
    }
    return { sent: true, reason: "sent" };
  } catch (err) {
    logger.error({ err }, "Webhook threw");
    return { sent: false, reason: "webhook threw" };
  }
}
