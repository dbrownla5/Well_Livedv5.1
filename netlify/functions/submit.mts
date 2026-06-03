// Lead capture — emails every contact-form and bag-pickup submission to the
// owner via Resend. No database required for launch; a lead is never lost.
// Set RESEND_API_KEY (and optionally CONTACT_TO / CONTACT_FROM) in Netlify env.

export default async (req: Request): Promise<Response> => {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    });

  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  let b: Record<string, any> = {};
  try {
    b = await req.json();
  } catch {
    /* ignore – validated below */
  }

  if (!b.name || !b.email) {
    return json({ ok: false, error: "Name and email are required." }, 400);
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "dayna@thewelllivedcitizen.com";
  const from = process.env.CONTACT_FROM || "The Well Lived Citizen <onboarding@resend.dev>";

  const lines = [
    "New inquiry — The Well Lived Citizen",
    "",
    `Name: ${b.name}`,
    `Email: ${b.email}`,
    b.phone ? `Phone: ${b.phone}` : "",
    b.neighborhood ? `Area: ${b.neighborhood}` : "",
    b.summary ? `Service / summary: ${b.summary}` : "",
    b.situation ? `Details: ${b.situation}` : "",
    b.bagsCount ? `Bags: ${b.bagsCount}` : "",
    b.urgency ? `Urgency: ${b.urgency}` : "",
    b.pickupTime1 ? `Pickup window 1: ${b.pickupTime1}` : "",
    b.pickupTime2 ? `Pickup window 2: ${b.pickupTime2}` : "",
    b.pickupMethod ? `Pickup method: ${b.pickupMethod}` : "",
  ].filter(Boolean);
  const text = lines.join("\n");

  // Success shape covers both the contact form and the bag-pickup gate.
  const ok = (emailed: boolean) =>
    json({ ok: true, emailed, opened: true, blocked: false });

  // No key yet — don't lose the lead; log it and still confirm success.
  if (!key) {
    console.log("LEAD (RESEND_API_KEY not set):\n" + text);
    return ok(false);
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: b.email,
        subject: `[WLC] New inquiry — ${b.name}${b.summary ? ` (${b.summary})` : ""}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return json({ ok: false, error: "Email delivery failed." }, 502);
    }
    return ok(true);
  } catch (err) {
    console.error("submit error:", err);
    return json({ ok: false, error: "Unexpected error." }, 500);
  }
};
