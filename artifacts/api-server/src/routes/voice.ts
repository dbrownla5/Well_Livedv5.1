import { Router, type IRouter } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";
import { AnalyzeVoiceBody, GetVoiceProfileResponse, AnalyzeVoiceResponse } from "@workspace/api-zod";
import { voiceProfile } from "../voice-profile";

const router: IRouter = Router();

router.get("/voice/profile", (_req, res) => {
  const data = GetVoiceProfileResponse.parse(voiceProfile);
  res.json(data);
});

router.post("/voice/analyze", async (req, res) => {
  const parseResult = AnalyzeVoiceBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid request: 'copy' is required" });
    return;
  }

  const { copy, context } = parseResult.data;

  const systemPrompt = buildSystemPrompt();
  const userMessage = buildUserMessage(copy, context);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4",
      max_completion_tokens: 8192,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      res.status(500).json({ error: "Failed to parse AI response" });
      return;
    }

    const result = AnalyzeVoiceResponse.safeParse(parsed);
    if (!result.success) {
      res.status(500).json({ error: "AI response did not match expected schema" });
      return;
    }

    res.json(result.data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: `Analysis failed: ${message}` });
  }
});

function buildSystemPrompt(): string {
  const examples = voiceProfile.annotatedExamples
    .map(
      (ex, i) =>
        `Example ${i + 1} (${ex.context}):
BAD: "${ex.bad}"
Problems: ${ex.bad_problems.join("; ")}
GOOD: "${ex.good}"
Why it works: ${ex.good_strengths.join("; ")}`
    )
    .join("\n\n");

  return `You are a voice consistency editor for a specific brand voice. Your job is to analyze copy against a detailed voice profile and return a structured JSON analysis.

## The Voice Profile

**Identity:** ${voiceProfile.identity}

**Core principles:**
${voiceProfile.corePrinciples.map((p) => `- ${p}`).join("\n")}

**Rhythm patterns:**
${voiceProfile.rhythmPatterns.map((p) => `- ${p}`).join("\n")}

**Anti-patterns to flag:**
${voiceProfile.antiPatterns.map((p) => `- ${p}`).join("\n")}

**Voice tests (ask these about each piece of copy):**
${voiceProfile.voiceTests.map((t) => `- ${t}`).join("\n")}

**Emotional architecture rule:**
${voiceProfile.emotionalArchitecture.rule}
${voiceProfile.emotionalArchitecture.approach}

**Strong phrases to draw from when rewriting:**
${voiceProfile.emotionalArchitecture.strongPhrases.map((p) => `- ${p}`).join("\n")}

## Annotated Examples

${examples}

## Your Output

Return a JSON object with exactly this shape:
{
  "score": <number 0-100, where 100 = perfect voice match>,
  "summary": "<1-2 sentence overall assessment — direct, specific, not vague>",
  "flags": [
    {
      "phrase": "<the exact phrase or sentence that drifts from the voice>",
      "issue": "<named problem category — be specific: 'operational language leaking', 'missing emotional routing', 'corporate sanitizer tone', 'SEO-speak', 'lecturing', 'closed door with no next step', etc.>",
      "explanation": "<why this phrase drifts from the voice — what is it doing wrong emotionally or structurally>",
      "suggestion": "<a rewritten version of just this phrase that stays true to the voice>"
    }
  ],
  "rewrite": "<full rewrite of the entire input copy in the brand voice — not just the flagged parts, the whole thing>"
}

If the copy already matches the voice well, return a high score, minimal or empty flags array, and a rewrite that is close to the original with light polish only.

Do NOT be vague. Name specific problems. Do NOT say "doesn't sound right" — say what it's actually doing wrong. Every flag must have a concrete suggestion.`;
}

function buildUserMessage(copy: string, context?: string): string {
  const contextLine = context ? `\n\nContext: This copy appears on the ${context}.` : "";
  return `Please analyze the following copy against the voice profile:${contextLine}

---
${copy}
---`;
}

export default router;
