// Netlify Function: /api/contact
// Receives contact form submission, sends it to Dayna via email.
//
// SETUP REQUIRED:
//   1. Sign up at https://resend.com (free tier: 3,000 emails/month, 100/day)
//   2. Verify the sending domain or use Resend's test sender during dev
//   3. Set env vars in Netlify: Site settings → Environment variables:
//      - RESEND_API_KEY = your Resend API key
//      - CONTACT_TO = dayna@thewelllivedcitizen.com
//      - CONTACT_FROM = "WLC Contact Form <noreply@thewelllivedcitizen.com>"

import type { Handler } from "@netlify/functions";

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
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}") as ContactPayload;

    if (!body.name || !body.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Name and email are required." }),
      };
    }

    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO || "dayna@thewelllivedcitizen.com";
    const from = process.env.CONTACT_FROM || "WLC Contact Form <onboarding@resend.dev>";

    if (!resendKey) {
      console.error("RESEND_API_KEY not set in environment");
      return {
        statusCode: 500,
        body: JSON.stringify({ ok: false, error: "Email service not configured." }),
      };
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

    if (body.bagsCount || body.urgency || body.pickupTime1 || body.pickupTime2) {
      lines.push("", "--- Pickup details (Fast Bag Fill) ---");
      if (body.bagsCount) lines.push(`Bags: ${body.bagsCount}`);
      if (body.urgency) lines.push(`Urgency: ${body.urgency}`);
      if (body.pickupTime1) lines.push(`Pickup window 1: ${body.pickupTime1}`);
      if (body.pickupTime2) lines.push(`Pickup window 2: ${body.pickupTime2}`);
    }

    const text = lines.filter(Boolean).join("\n");

    const res = await fetch("https://api.resend.com/emails", {
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

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("Resend error:", errorBody);
      return {
        statusCode: 500,
        body: JSON.stringify({ ok: false, error: "Email delivery failed." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("Contact form error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: "Unexpected error." }),
    };
  }
};

export { handler };
