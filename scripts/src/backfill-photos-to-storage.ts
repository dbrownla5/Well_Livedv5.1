/**
 * Backfill script: migrate reseller_item_photos rows that still have the old
 * `data` (base64) column to object storage, writing back the `storage_key`.
 *
 * Usage (run once on environments upgraded from the pre-storage schema):
 *   pnpm --filter @workspace/scripts run backfill-photos-to-storage
 *
 * Safe to run multiple times — rows that already have a storage_key are skipped.
 * Rows whose `data` column no longer exists are silently skipped (fully migrated).
 */

import { Pool } from "pg";
import { randomUUID } from "crypto";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

async function getSignedUploadUrl(
  privateObjectDir: string,
): Promise<{ signedUrl: string; objectPath: string }> {
  const objectId = randomUUID();
  const fullPath = `${privateObjectDir}/uploads/${objectId}`;

  // Parse bucket + object name from path like /bucket/object/path
  const parts = fullPath.startsWith("/") ? fullPath.slice(1).split("/") : fullPath.split("/");
  const bucketName = parts[0];
  const objectName = parts.slice(1).join("/");

  const res = await fetch(`${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bucket_name: bucketName,
      object_name: objectName,
      method: "PUT",
      expires_at: new Date(Date.now() + 900_000).toISOString(),
    }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`Sidecar sign error: ${res.status}`);
  const { signed_url } = (await res.json()) as { signed_url: string };

  const normalizedPath = `/objects/${objectName.slice(objectName.indexOf("/uploads/") + 1)}`;
  return { signedUrl: signed_url, objectPath: `/objects/uploads/${objectId}` };
}

async function uploadBuffer(signedUrl: string, buffer: Buffer, mimeType: string): Promise<void> {
  const res = await fetch(signedUrl, {
    method: "PUT",
    headers: { "Content-Type": mimeType },
    body: buffer,
  });
  if (!res.ok) throw new Error(`GCS upload failed: ${res.status}`);
}

async function main() {
  const privateObjectDir = process.env.PRIVATE_OBJECT_DIR;
  if (!privateObjectDir) throw new Error("PRIVATE_OBJECT_DIR env var not set");

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  // Check if the old `data` column still exists
  const colCheck = await pool.query<{ exists: boolean }>(`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'reseller_item_photos' AND column_name = 'data'
    ) AS exists
  `);
  if (!colCheck.rows[0]?.exists) {
    console.log("Column `data` does not exist — table already fully migrated. Nothing to do.");
    await pool.end();
    return;
  }

  // Fetch rows that still have base64 data but no storage_key
  const { rows } = await pool.query<{
    id: string;
    data: string;
    mime_type: string;
  }>(`
    SELECT id, data, mime_type
    FROM reseller_item_photos
    WHERE data IS NOT NULL AND data != ''
      AND (storage_key IS NULL OR storage_key = '')
  `);

  if (rows.length === 0) {
    console.log("No rows require backfill.");
    await pool.end();
    return;
  }

  console.log(`Backfilling ${rows.length} photo row(s)...`);
  let ok = 0;
  let fail = 0;

  for (const row of rows) {
    try {
      const buffer = Buffer.from(row.data, "base64");
      const { signedUrl, objectPath } = await getSignedUploadUrl(privateObjectDir);
      await uploadBuffer(signedUrl, buffer, row.mime_type);
      await pool.query(
        `UPDATE reseller_item_photos SET storage_key = $1 WHERE id = $2`,
        [objectPath, row.id],
      );
      console.log(`  ✓ ${row.id} → ${objectPath}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${row.id}:`, err);
      fail++;
    }
  }

  console.log(`Done: ${ok} migrated, ${fail} failed.`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
