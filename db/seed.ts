import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql/web";
import { movements as movementsTable } from "./schemas/movements";
import { wods as wodsTable } from "./schemas/wods";
import { movements as movementsData } from "../data/movements";
import { wods as wodsData } from "../data/wods";

const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL || "http://127.0.0.1:8080",
    authToken: process.env.TURSO_AUTH_TOKEN || "",
  },
});

async function seed() {
  console.log("Seeding movements...");
  for (const m of movementsData) {
    const values = {
      id: m.id,
      name: m.name,
      nameEn: m.nameEn,
      category: m.category,
      equipment: m.equipment,
      oneLiner: m.oneLiner,
      purpose: m.purpose,
      primaryEffect: m.primaryEffect,
      bodyPart: m.bodyPart,
      movementPattern: m.movementPattern,
      steps: m.steps,
      tips: m.tips,
      muscleMain: m.muscleMain,
      muscleSub: m.muscleSub,
      difficulty: m.difficulty,
      scaling: m.scaling,
      videoId: m.videoId,
      videoSource: m.videoSource ?? null,
      roadmap: m.roadmap,
    };
    await db
      .insert(movementsTable)
      .values(values)
      .onConflictDoUpdate({
        target: movementsTable.id,
        set: values,
      });
  }
  console.log(`  ${movementsData.length} movements seeded.`);

  console.log("Seeding wods...");
  for (const w of wodsData) {
    const values = {
      id: w.id,
      name: w.name,
      format: w.format,
      level: w.level,
      goal: w.goal,
      targetBodyPart: w.targetBodyPart,
      targetEffect: w.targetEffect,
      duration: w.duration,
      sets: w.sets,
      rounds: w.rounds ?? null,
      repScheme: w.repScheme ?? null,
      estimate: w.estimate,
      tip: w.tip,
      notes: w.notes ?? null,
    };
    await db
      .insert(wodsTable)
      .values(values)
      .onConflictDoUpdate({
        target: wodsTable.id,
        set: values,
      });
  }
  console.log(`  ${wodsData.length} wods seeded.`);

  console.log("Seed complete!");
}

seed().catch(console.error);
