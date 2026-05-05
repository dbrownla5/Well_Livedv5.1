import {
  pgTable,
  serial,
  text,
  timestamp,
  jsonb,
  integer,
  numeric,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

export const clients = pgTable("reseller_clients", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  name: text("name").notNull(),
  household: text("household"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  notes: text("notes"),
});

const _insertClientSchema = createInsertSchema(clients) as unknown as z.ZodTypeAny;
export const insertClientSchema = _insertClientSchema;
export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;

export const jobs = pgTable("reseller_jobs", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  jobType: text("job_type").notNull().default("estate-clearout"),
  status: text("status").notNull().default("active"),
  notes: text("notes"),
});

const _insertJobSchema = createInsertSchema(jobs) as unknown as z.ZodTypeAny;
export const insertJobSchema = _insertJobSchema;
export type Job = typeof jobs.$inferSelect;
export type InsertJob = typeof jobs.$inferInsert;

export const items = pgTable("reseller_items", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  marketPrice: numeric("market_price", { precision: 10, scale: 2 }),
  floorPrice: numeric("floor_price", { precision: 10, scale: 2 }),
  platform: text("platform").notNull(),
  shippingLogic: text("shipping_logic"),
  status: text("status").notNull().default("New"),
  disposition: text("disposition").notNull().default("list"),
  listingDescription: text("listing_description"),
  aiRaw: jsonb("ai_raw"),
  createdBy: text("created_by"),
});

const _insertItemSchema = createInsertSchema(items) as unknown as z.ZodTypeAny;
export const insertItemSchema = _insertItemSchema;
export type Item = typeof items.$inferSelect;
export type InsertItem = typeof items.$inferInsert;

export const itemPhotos = pgTable("reseller_item_photos", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),
  itemId: integer("item_id").references(() => items.id, { onDelete: "set null" }),
  filename: text("filename").notNull(),
  mimeType: text("mime_type").notNull(),
  data: text("data").notNull(),
});

export type ItemPhoto = typeof itemPhotos.$inferSelect;
