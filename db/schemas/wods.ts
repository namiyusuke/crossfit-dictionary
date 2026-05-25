import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import type { WodSet, WodEstimate } from "@/types/wod";

export const wods = sqliteTable("wods", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  format: text("format").notNull(),
  level: text("level").notNull(),
  goal: text("goal").notNull(),
  targetBodyPart: text("target_body_part", { mode: "json" }).notNull().$type<string[]>(),
  targetEffect: text("target_effect", { mode: "json" }).notNull().$type<string[]>(),
  duration: text("duration").notNull(),
  sets: text("sets", { mode: "json" }).notNull().$type<WodSet[]>(),
  rounds: integer("rounds"),
  repScheme: text("rep_scheme"),
  estimate: text("estimate", { mode: "json" }).notNull().$type<WodEstimate>(),
  tip: text("tip").notNull(),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
});
