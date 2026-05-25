import { db } from "@/db";
import { wods as wodsTable } from "@/db/schemas/wods";
import { eq } from "drizzle-orm";
import type { Wod } from "@/types/wod";

type WodRow = typeof wodsTable.$inferSelect;

function mapRowToWod(row: WodRow): Wod {
  return {
    id: row.id,
    name: row.name,
    format: row.format as Wod["format"],
    level: row.level as Wod["level"],
    goal: row.goal,
    targetBodyPart: row.targetBodyPart as Wod["targetBodyPart"],
    targetEffect: row.targetEffect as Wod["targetEffect"],
    duration: row.duration,
    sets: row.sets,
    rounds: row.rounds ?? undefined,
    repScheme: row.repScheme ?? undefined,
    estimate: row.estimate,
    tip: row.tip,
    notes: row.notes ?? null,
  };
}

export async function getAllWods(): Promise<Wod[]> {
  const rows = await db.select().from(wodsTable);
  return rows.map(mapRowToWod);
}

export async function getWodById(id: string): Promise<Wod | null> {
  const rows = await db.select().from(wodsTable).where(eq(wodsTable.id, id));
  return rows[0] ? mapRowToWod(rows[0]) : null;
}

export async function createWod(data: Wod) {
  await db.insert(wodsTable).values({
    id: data.id,
    name: data.name,
    format: data.format,
    level: data.level,
    goal: data.goal,
    targetBodyPart: data.targetBodyPart,
    targetEffect: data.targetEffect,
    duration: data.duration,
    sets: data.sets,
    rounds: data.rounds ?? null,
    repScheme: data.repScheme ?? null,
    estimate: data.estimate,
    tip: data.tip,
    notes: data.notes ?? null,
  });
}

export async function updateWod(id: string, data: Omit<Wod, "id">) {
  await db
    .update(wodsTable)
    .set({
      name: data.name,
      format: data.format,
      level: data.level,
      goal: data.goal,
      targetBodyPart: data.targetBodyPart,
      targetEffect: data.targetEffect,
      duration: data.duration,
      sets: data.sets,
      rounds: data.rounds ?? null,
      repScheme: data.repScheme ?? null,
      estimate: data.estimate,
      tip: data.tip,
      notes: data.notes ?? null,
      updatedAt: new Date(),
    })
    .where(eq(wodsTable.id, id));
}

export async function deleteWod(id: string) {
  await db.delete(wodsTable).where(eq(wodsTable.id, id));
}
