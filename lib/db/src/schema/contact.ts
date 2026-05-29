import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  neighborhood: text("neighborhood"),
  clientType: text("client_type"),
  summary: text("summary"),
  situation: text("situation"),
  bagsCount: text("bags_count"),
  urgency: text("urgency"),
  pickupTime1: text("pickup_time_1"),
  pickupTime2: text("pickup_time_2"),
  pickupMethod: text("pickup_method"),
  pickupRelease: boolean("pickup_release").default(false),
  courierNotes: text("courier_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
