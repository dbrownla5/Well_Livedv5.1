import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { fileURLToPath } from "url";
import { voiceProfile } from "../../artifacts/api-server/src/voice-profile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load dotenv manually
const envPath = path.resolve(__dirname, "../../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.trim().match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}

const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;

if (!apiKey || !baseURL) {
  console.error("Error: OpenAI API integrations keys not found in .env");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey,
  baseURL,
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

  return `You are a voice consistency editor for the brand "The Well Lived Citizen". Your job is to analyze page copy against the detailed brand voice profile below and return a structured JSON analysis.

## Brand Identity
${voiceProfile.identity}

## Core Principles
${voiceProfile.corePrinciples.map((p) => `- ${p}`).join("\n")}

## Rhythm Patterns
${voiceProfile.rhythmPatterns.map((p) => `- ${p}`).join("\n")}

## Anti-Patterns (CRITICAL - FLAG THESE)
${voiceProfile.antiPatterns.map((p) => `- ${p}`).join("\n")}

## Routing vs Verdict Rule
${voiceProfile.routingVsVerdictRule.rule}
Verdict examples (BANNED): ${voiceProfile.routingVsVerdictRule.verdictExamples.join(", ")}
Routing examples (APPROVED): ${voiceProfile.routingVsVerdictRule.routingExamples.join(", ")}

## Internal Language Firewall
${voiceProfile.internalLanguageFirewall.rule}
Banned back-office words: ${voiceProfile.internalLanguageFirewall.backOfficeWords.join(", ")}
Approved client-facing equivalents: ${voiceProfile.internalLanguageFirewall.clientFacingEquivalents.join(", ")}

## Emotional Architecture
${voiceProfile.emotionalArchitecture.rule}
${voiceProfile.emotionalArchitecture.approach}

## Strong Phrases (approved to use)
${voiceProfile.emotionalArchitecture.strongPhrases.map((p) => `- ${p}`).join("\n")}

## Demographic Language Rules
${voiceProfile.demographicLanguageRules.rule}
Approved: ${voiceProfile.demographicLanguageRules.approvedFraming.join(", ")}
Banned: ${voiceProfile.demographicLanguageRules.bannedFraming.join(", ")}

## Annotated Examples
${examples}

## Output JSON Schema
You must return a JSON object in this exact shape:
{
  "score": <number 0-100, where 100 = perfect voice match>,
  "summary": "<1-2 sentence overall assessment>",
  "flags": [
    {
      "phrase": "<exact copy snippet that drifts from voice>",
      "issue": "<category of issue, e.g., 'Internal Language Leak', 'Verdict Tone', 'SEO-speak', 'Lecturing'>",
      "explanation": "<detailed explanation of what is wrong>",
      "suggestion": "<rewritten suggestion for this specific phrase>"
    }
  ]
}
`;
}

async function auditFile(filePath: string): Promise<any> {
  const content = fs.readFileSync(filePath, "utf-8");
  const filename = path.basename(filePath);
  console.log(`Auditing ${filename}...`);

  const systemPrompt = buildSystemPrompt();
  const userMessage = `Please analyze the copy inside this React file for brand voice compliance:\n\n---\n${content}\n---`;

  try {
    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
    });

    const resultText = response.choices[0]?.message?.content ?? "{}";
    return JSON.parse(resultText);
  } catch (err) {
    console.error(`Error auditing ${filename}:`, err);
    return { score: 0, error: String(err), summary: "Failed to audit", flags: [] };
  }
}

async function run() {
  const pagesDir = path.resolve(__dirname, "../../artifacts/wlc-site/src/pages");
  const files = [
    "Home.tsx",
    "Services.tsx",
    "TheReset.tsx",
    "HouseCalls.tsx",
    "HouseCallsPillar.tsx",
    "LegacyPillar.tsx",
    "FastBagFill.tsx",
    "Pricing.tsx",
  ];

  let totalScore = 0;
  let auditedCount = 0;
  const reports: any[] = [];

  for (const file of files) {
    const filePath = path.join(pagesDir, file);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping missing file: ${file}`);
      continue;
    }

    const auditRes = await auditFile(filePath);
    auditRes.file = file;
    reports.push(auditRes);
    totalScore += auditRes.score || 0;
    auditedCount++;

    console.log(`Finished ${file}. Score: ${auditRes.score}/100. Flags: ${auditRes.flags?.length || 0}`);
  }

  const avgScore = auditedCount > 0 ? Math.round(totalScore / auditedCount) : 0;
  console.log(`Audit complete. Average score: ${avgScore}/100`);

  // Write MD report
  let md = `# Brand Voice Audit Report\n\n`;
  md += `**Date:** ${new Date().toISOString().split("T")[0]}\n`;
  md += `**Average Compliance Score:** \`${avgScore}/100\`\n\n`;
  md += `## Executive Summary\n`;
  md += `This report outlines the brand voice compliance audit results for all user-facing pages in the *Well Lived Citizen* build. All pages were audited against the canonical voice profile rules using the OpenAI-compatible Gemini engine.\n\n`;

  md += `## Page Results\n\n`;
  for (const report of reports) {
    md += `### ${report.file}\n`;
    md += `- **Score:** \`${report.score}/100\`\n`;
    md += `- **Summary:** ${report.summary}\n`;
    
    if (report.flags && report.flags.length > 0) {
      md += `\n| Phrase | Issue | Explanation | Suggestion |\n`;
      md += `| :--- | :--- | :--- | :--- |\n`;
      for (const flag of report.flags) {
        md += `| \`${flag.phrase.replace(/\n/g, " ")}\` | **${flag.issue}** | ${flag.explanation} | *${flag.suggestion}* |\n`;
      }
    } else {
      md += `\n> [!NOTE]\n> No voice compliance issues found. Copy is clean and on-brand.\n`;
    }
    md += `\n---\n\n`;
  }

  const outputPath = path.resolve(__dirname, "../../voice-audit-report.md");
  fs.writeFileSync(outputPath, md);
  console.log(`Voice audit report written to: ${outputPath}`);

  // Also write to artifacts directory
  const artifactPath = "C:\\Users\\dayna\\.gemini\\antigravity\\brain\\4f3d87a4-8fc9-4ec3-8c50-cad3612a00c6\\site_sweep_report.md";
  fs.writeFileSync(artifactPath, md);
  console.log(`Voice audit report written to artifact: ${artifactPath}`);
}

run().catch(console.error);
