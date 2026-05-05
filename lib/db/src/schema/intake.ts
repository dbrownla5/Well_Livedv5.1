import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

export const intakeSubmissions = pgTable("intake_submissions", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  serviceType: text("service_type").notNull(),
  answers: jsonb("answers").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  realLife: text("real_life"),
  bestTime: text("best_time"),
  status: text("status").default("new").notNull(),
});

const _insertIntakeSchema = createInsertSchema(intakeSubmissions) as unknown as z.ZodTypeAny;
export const insertIntakeSchema = _insertIntakeSchema;
export type IntakeSubmission = typeof intakeSubmissions.$inferSelect;
export type InsertIntake = typeof intakeSubmissions.$inferInsert;
