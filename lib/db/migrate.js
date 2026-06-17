import fs from 'fs';
import path from 'path';
import pg from 'pg';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Simple parser to load dotenv manually
const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
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

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL not found in .env");
  process.exit(1);
}

const connectionString = process.env.DATABASE_URL;
console.log(`Connecting to: ${connectionString.replace(/:[^:@]+@/, ':****@')}`);

const client = new pg.Client({
  connectionString,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to database. Applying migrations...");

    const sqlPath = path.resolve(__dirname, './drizzle/0000_small_elektra.sql');
    if (!fs.existsSync(sqlPath)) {
      console.error(`Migration file not found at: ${sqlPath}`);
      process.exit(1);
    }

    const rawSql = fs.readFileSync(sqlPath, 'utf-8');
    // Split statements by drizzle's statement breakpoint
    const statements = rawSql.split('--> statement-breakpoint').map(s => s.trim()).filter(Boolean);

    for (const statement of statements) {
      console.log(`Executing statement:\n${statement.substring(0, 100)}...\n`);
      await client.query(statement);
    }

    console.log("SUCCESS: All migration statements applied successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
