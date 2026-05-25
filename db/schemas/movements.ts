import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import type { Roadmap } from "@/types/movement";

export const movements = sqliteTable("movements", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  category: text("category").notNull(),
  equipment: text("equipment", { mode: "json" }).notNull().$type<string[]>(),
  oneLiner: text("one_liner").notNull(),
  purpose: text("purpose").notNull(),
  primaryEffect: text("primary_effect", { mode: "json" }).notNull().$type<string[]>(),
  bodyPart: text("body_part", { mode: "json" }).notNull().$type<string[]>(),
  steps: text("steps", { mode: "json" }).notNull().$type<string[]>(),
  tips: text("tips", { mode: "json" }).notNull().$type<string[]>(),
  muscleMain: text("muscle_main", { mode: "json" }).notNull().$type<string[]>(),
  muscleSub: text("muscle_sub", { mode: "json" }).notNull().$type<string[]>(),
  difficulty: integer("difficulty").notNull(),
  scaling: text("scaling").notNull(),
  videoId: text("video_id").notNull(),
  roadmap: text("roadmap", { mode: "json" }).$type<Roadmap | null>(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
});
