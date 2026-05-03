import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

export const insertIntakeSchema = createInsertSchema(intakeSubmissions).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertIntake = z.infer<typeof insertIntakeSchema>;
export type IntakeSubmission = typeof intakeSubmissions.$inferSelect;
