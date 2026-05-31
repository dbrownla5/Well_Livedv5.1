import { Router, type IRouter } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";
import { logger } from "../lib/logger";
import { voiceProfile } from "../voice-profile";

const router: IRouter = Router();

interface CaptionRequest {
  situation?: string; // a photo description or a rough thought (required)
  service?: string; // Reset | House Call | Resale | Legacy | general
  vibe?: string; // launch | everyday | behind-the-scenes | client win
}

interface Caption {
  angle: string; // "dry" | "warm" | "straight"
  text: string;
  hashtags: string[];
}

/**
 * POST /api/voice/captions
 * Generates three on-brand social captions from a photo description or rough
 * thought, using the locked voice profile. Self-contained: no OpenAPI codegen.
 * Degrades with a clear error if the AI integration isn't configured.
 */
router.post("/voice/captions", async (req, res) => {
  const body = (req.body ?? {}) as CaptionRequest;
  const situation = (body.situation ?? "").trim();

  if (!situation) {
    res.status(400).json({
      ok: false,
      error: "Tell me what you want to post about — a photo description or a rough thought.",
    });
    return;
  }

  const systemPrompt = buildCaptionSystemPrompt();
  const userMessage = buildCaptionUserMessage(body, situation);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4",
      max_completion_tokens: 2048,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    let parsed: { captions?: Caption[] };
    try {
      parsed = JSON.parse(raw);
    } catch {
      logger.error({ raw }, "Caption generation: failed to parse AI response");
      res.status(502).json({ ok: false, error: "Couldn't read the response. Try again." });
      return;
    }

    const captions = Array.isArray(parsed.captions) ? parsed.captions.slice(0, 3) : [];
    if (captions.length === 0) {
      res.status(502).json({ ok: false, error: "No captions came back. Try rephrasing the situation." });
      return;
    }

    res.json({ ok: true, captions });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    logger.error({ err }, "Caption generation failed");
    res.status(503).json({
      ok: false,
      error:
        "The caption engine isn't reachable right now. This needs the AI integration configured on the server.",
      detail: message,
    });
  }
});

function buildCaptionSystemPrompt(): string {
  const orp = voiceProfile.operationalRealismPositioning;
  return `You write social captions in the voice of Dayna Brown, founder of The Well Lived Citizen — a Los Angeles service for the operational side of life (home resets, move support, legacy inventory, house calls, curated resale). Write ONLY in her voice.

## Identity
${voiceProfile.identity}

## Voice rules (follow all)
${voiceProfile.corePrinciples.map((p) => `- ${p}`).join("\n")}

## Register & tone
- Tone descriptors: ${orp.toneDescriptors.join(", ")}.
- The register is "chaos wrangler / professional problem-solver / there's an easier way to do that." Capable, warm, a little dry. Never crisis, pity, or hype.
- Dignity rule: ${orp.dignityRule}
- Restraint: ${orp.restraintRule}
- Recognition over selling: name a true, specific, lived-in moment the reader recognizes, then land it.

## Lines that show the target quality (do not copy verbatim — match the feel)
${orp.keepForeverLines.map((l) => `- ${l}`).join("\n")}

## Hard NOs
${voiceProfile.antiPatterns.map((p) => `- ${p}`).join("\n")}
- No emoji walls, no "✨", no "completely transform," no luxury-concierge language.
- No back-office words (free lane, loophole, low-value). Ever.
- Max 3 hashtags, lowercase, no keyword spam.

## Output
Return a JSON object exactly like:
{
  "captions": [
    { "angle": "dry",      "text": "<1-4 short lines>", "hashtags": ["#thewelllivedcitizen"] },
    { "angle": "warm",     "text": "<1-4 short lines>", "hashtags": ["#losangeles"] },
    { "angle": "straight", "text": "<1-4 short lines>", "hashtags": ["#homereset"] }
  ]
}
Three captions, three distinct angles (one dry, one warm, one straight/useful). Each 1–4 short lines. Land it, then stop. No preamble, no commentary — JSON only.`;
}

function buildCaptionUserMessage(body: CaptionRequest, situation: string): string {
  const service = body.service?.trim();
  const vibe = body.vibe?.trim();
  return `Write three captions.

Situation / photo: ${situation}${service ? `\nService it relates to: ${service}` : ""}${vibe ? `\nVibe: ${vibe}` : ""}`;
}

export default router;
