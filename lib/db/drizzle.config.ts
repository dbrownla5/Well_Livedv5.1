import { defineConfig } from "drizzle-kit";
import path from "path";

import fs from "fs";

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

if (!process.env.DATABASE_URL) {
  throw new Error(`DATABASE_URL not found in ${envPath}, ensure the database is provisioned`);
}

console.log("Configured DATABASE_URL:", process.env.DATABASE_URL.replace(/:[^:@]+@/, ":****@"));

export default defineConfig({
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
