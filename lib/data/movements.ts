import { db } from "@/db";
import { movements as movementsTable } from "@/db/schemas/movements";
import { eq } from "drizzle-orm";
import type { Movement } from "@/types/movement";

type MovementRow = typeof movementsTable.$inferSelect;

function mapRowToMovement(row: MovementRow): Movement {
  return {
    id: row.id,
    name: row.name,
    nameEn: row.nameEn,
    category: row.category as Movement["category"],
    equipment: row.equipment as Movement["equipment"],
    oneLiner: row.oneLiner,
    purpose: row.purpose,
    primaryEffect: row.primaryEffect as Movement["primaryEffect"],
    bodyPart: row.bodyPart as Movement["bodyPart"],
    steps: row.steps,
    tips: row.tips,
    muscleMain: row.muscleMain,
    muscleSub: row.muscleSub,
    difficulty: row.difficulty,
    scaling: row.scaling,
    videoId: row.videoId,
    roadmap: row.roadmap ?? null,
  };
}

export async function getAllMovements(): Promise<Movement[]> {
  const rows = await db.select().from(movementsTable);
  return rows.map(mapRowToMovement);
}

export async function getMovementById(id: string): Promise<Movement | null> {
  const rows = await db.select().from(movementsTable).where(eq(movementsTable.id, id));
  return rows[0] ? mapRowToMovement(rows[0]) : null;
}

export async function createMovement(data: Movement) {
  await db.insert(movementsTable).values({
    id: data.id,
    name: data.name,
    nameEn: data.nameEn,
    category: data.category,
    equipment: data.equipment,
    oneLiner: data.oneLiner,
    purpose: data.purpose,
    primaryEffect: data.primaryEffect,
    bodyPart: data.bodyPart,
    steps: data.steps,
    tips: data.tips,
    muscleMain: data.muscleMain,
    muscleSub: data.muscleSub,
    difficulty: data.difficulty,
    scaling: data.scaling,
    videoId: data.videoId,
    roadmap: data.roadmap,
  });
}

export async function updateMovement(id: string, data: Omit<Movement, "id">) {
  await db
    .update(movementsTable)
    .set({
      name: data.name,
      nameEn: data.nameEn,
      category: data.category,
      equipment: data.equipment,
      oneLiner: data.oneLiner,
      purpose: data.purpose,
      primaryEffect: data.primaryEffect,
      bodyPart: data.bodyPart,
      steps: data.steps,
      tips: data.tips,
      muscleMain: data.muscleMain,
      muscleSub: data.muscleSub,
      difficulty: data.difficulty,
      scaling: data.scaling,
      videoId: data.videoId,
      roadmap: data.roadmap,
      updatedAt: new Date(),
    })
    .where(eq(movementsTable.id, id));
}

export async function deleteMovement(id: string) {
  await db.delete(movementsTable).where(eq(movementsTable.id, id));
}
