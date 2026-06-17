import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load dotenv manually
const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split('\n')) {
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

async function testModel(modelName: string) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
  const body = {
    model: modelName,
    messages: [{ role: 'user', content: 'Hello' }]
  };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });
    const text = await res.text();
    console.log(`[${modelName}] Status: ${res.status}. Response: ${text.trim().substring(0, 300)}`);
  } catch (err) {
    console.error(`[${modelName}] Error:`, err);
  }
}

async function run() {
  const models = [
    'gpt-3.5-turbo',
    'gpt-4o',
    'gpt-4o-mini',
    'gpt-5.4',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.0-flash',
    'gemini-2.5-flash',
    'text-embedding-3-small'
  ];
  for (const model of models) {
    await testModel(model);
  }
}

run();
