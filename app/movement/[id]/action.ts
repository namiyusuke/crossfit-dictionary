"use server";

import { db } from "@/db";
import { practiceLog } from "@/db/schemas/practice";
import { auth } from "@/lib/auth";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

async function getCurrentUserId(): Promise<string | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user?.id ?? null;
}

export async function getPracticeLog(): Promise<string[]> {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const rows = await db
    .select({ movementId: practiceLog.movementId })
    .from(practiceLog)
    .where(eq(practiceLog.userId, userId));

  return rows.map((row) => row.movementId);
}

export async function togglePractice(
  prevState: { isPracticed: boolean },
  formData: FormData,
) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { isPracticed: prevState.isPracticed };
  }

  const movementId = formData.get("movementId") as string;

  const existing = await db
    .select()
    .from(practiceLog)
    .where(
      and(
        eq(practiceLog.userId, userId),
        eq(practiceLog.movementId, movementId),
      ),
    );

  if (existing.length > 0) {
    await db
      .delete(practiceLog)
      .where(
        and(
          eq(practiceLog.userId, userId),
          eq(practiceLog.movementId, movementId),
        ),
      );
  } else {
    await db.insert(practiceLog).values({
      userId,
      movementId,
    });
  }

  revalidatePath(`/movement/${movementId}`);
  return { isPracticed: !prevState.isPracticed };
}
