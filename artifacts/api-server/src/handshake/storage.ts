/**
 * Storage layer for handshakes — all DB access lives here so routes stay thin
 * and the business logic (./logic.ts) stays pure. Uses the shared Drizzle
 * client from @workspace/db.
 */
import { randomBytes } from "node:crypto";
import { eq, desc } from "drizzle-orm";
import {
  db,
  handshakes,
  handshakeItems,
  handshakeEvents,
  type Handshake,
  type HandshakeItem,
  type InsertHandshake,
  type InsertHandshakeItem,
} from "@workspace/db";

export function newToken(): string {
  return randomBytes(24).toString("base64url");
}

export async function createHandshake(data: Omit<InsertHandshake, "token"> & { token?: string }): Promise<Handshake> {
  const token = data.token ?? newToken();
  const [row] = await db.insert(handshakes).values({ ...data, token }).returning();
  return row!;
}

export async function getHandshake(id: number): Promise<Handshake | undefined> {
  const [row] = await db.select().from(handshakes).where(eq(handshakes.id, id));
  return row;
}

export async function getHandshakeByToken(token: string): Promise<Handshake | undefined> {
  const [row] = await db.select().from(handshakes).where(eq(handshakes.token, token));
  return row;
}

export async function listHandshakes(): Promise<Handshake[]> {
  return db.select().from(handshakes).orderBy(desc(handshakes.updatedAt));
}

export async function updateHandshake(id: number, patch: Partial<InsertHandshake>): Promise<Handshake> {
  const [row] = await db
    .update(handshakes)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(handshakes.id, id))
    .returning();
  return row!;
}

export async function listItems(handshakeId: number): Promise<HandshakeItem[]> {
  return db.select().from(handshakeItems).where(eq(handshakeItems.handshakeId, handshakeId));
}

export async function addItem(data: InsertHandshakeItem): Promise<HandshakeItem> {
  const [row] = await db.insert(handshakeItems).values(data).returning();
  return row!;
}

export async function updateItem(id: number, patch: Partial<InsertHandshakeItem>): Promise<HandshakeItem> {
  const [row] = await db.update(handshakeItems).set(patch).where(eq(handshakeItems.id, id)).returning();
  return row!;
}

export async function logEvent(handshakeId: number, step: string, action: string, detail?: unknown): Promise<void> {
  await db.insert(handshakeEvents).values({ handshakeId, step, action, detail: detail ?? null });
}

export async function listEvents(handshakeId: number) {
  return db.select().from(handshakeEvents).where(eq(handshakeEvents.handshakeId, handshakeId)).orderBy(handshakeEvents.createdAt);
}
