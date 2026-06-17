import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { eq } from 'drizzle-orm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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

async function run() {
  console.log("Starting End-to-End Database Persistence Simulation...");

  const { db, contactSubmissions, handshakes } = await import('../../lib/db/src/index');

  // Define unique mock client data
  const mockName = `Simulation Client ${Math.floor(Math.random() * 1000)}`;
  const mockEmail = `simulation.${Math.floor(Math.random() * 1000)}@example.com`;
  
  console.log(`Inserting mock contact submission for: ${mockName} (${mockEmail})...`);
  
  try {
    // 1. Simulate Contact Intake Submission
    const [submission] = await db.insert(contactSubmissions).values({
      name: mockName,
      email: mockEmail,
      phone: "310-555-0199",
      neighborhood: "Santa Monica",
      clientType: "Resale",
      summary: "Quick Resale Pickup",
      situation: "Overwhelmed with clothing after move.",
      bagsCount: "3 bags",
      urgency: "This week",
      pickupMethod: "in-person",
      pickupRelease: true
    }).returning();

    console.log(`✓ Persisted contact submission in DB with ID: ${submission.id}`);

    // 2. Simulate Handshake Creation (Workflow Intake Gate)
    const uniqueToken = `sim-tok-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const [handshake] = await db.insert(handshakes).values({
      token: uniqueToken,
      contactSubmissionId: submission.id,
      clientName: submission.name,
      clientEmail: submission.email,
      clientPhone: submission.phone,
      neighborhood: submission.neighborhood,
      summary: submission.summary,
      situation: submission.situation,
      bagsCount: submission.bagsCount,
      urgency: submission.urgency,
      pickupMethod: submission.pickupMethod,
      pickupRelease: submission.pickupRelease,
      agreementAccepted: true,
      agreementTimestamp: new Date(),
      signatureName: submission.name,
      step: "intake",
      blocked: false
    }).returning();

    console.log(`✓ Persisted handshake workflow entry with ID: ${handshake.id} (Token: ${handshake.token})`);

    // 3. Verify Database Persistence by querying it back
    console.log("Querying records back from database to verify persistence...");
    const verifiedSubmission = await db.query.contactSubmissions.findFirst({
      where: eq(contactSubmissions.id, submission.id)
    });
    
    if (verifiedSubmission && verifiedSubmission.email === mockEmail) {
      console.log(`✓ VERIFIED: Submission record exists in DB and email matches: ${verifiedSubmission.email}`);
    } else {
      throw new Error("Verification failed: Submission record not found or mismatch!");
    }

    const verifiedHandshake = await db.query.handshakes.findFirst({
      where: eq(handshakes.id, handshake.id)
    });
    
    if (verifiedHandshake && verifiedHandshake.token === uniqueToken) {
      console.log(`✓ VERIFIED: Handshake record exists in DB and token matches: ${verifiedHandshake.token}`);
      console.log(`Current workflow step is: "${verifiedHandshake.step}"`);
    } else {
      throw new Error("Verification failed: Handshake record not found or mismatch!");
    }

    // 4. Simulate State Transition: Advance step from 'intake' to 'day_before' to 'custody'
    console.log("Simulating workflow state transitions (intake -> day_before -> custody)...");
    
    const [updatedHandshake] = await db.update(handshakes)
      .set({
        step: "custody",
        dayBeforeAt: new Date(),
        custodyAt: new Date()
      })
      .where(eq(handshakes.id, handshake.id))
      .returning();

    console.log(`✓ SUCCESS: Advanced handshake ID ${updatedHandshake.id} step to: "${updatedHandshake.step}"`);
    console.log(`Workflow Custody Transfer timestamp set to: ${updatedHandshake.custodyAt}`);
    
    // Clean up simulation records from DB to prevent cluttering production DB
    console.log("Cleaning up simulation records from database...");
    await db.delete(handshakes).where(eq(handshakes.id, handshake.id));
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, submission.id));
    console.log("✓ Cleanup finished. Database is clean.");
    console.log("\nDATABASE E2E SIMULATION COMPLETED SUCCESSFULLY!");
  } catch (err) {
    console.error("Simulation failed:", err);
    process.exit(1);
  }
}

run();
