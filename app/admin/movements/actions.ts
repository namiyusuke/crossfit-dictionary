"use server";

import { createMovement, updateMovement, deleteMovement } from "@/lib/data/movements";
import { revalidatePath } from "next/cache";
import type { Movement } from "@/types/movement";
import { isAdmin } from "@/lib/admin-auth";

export async function createMovementAction(jsonData: string): Promise<{ error?: string }> {
  if (!(await isAdmin())) return { error: "権限がありません" };
  try {
    const data: Movement = JSON.parse(jsonData);
    await createMovement(data);
    revalidatePath("/admin/movements");
    revalidatePath("/");
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "作成に失敗しました" };
  }
}

export async function updateMovementAction(jsonData: string): Promise<{ error?: string }> {
  if (!(await isAdmin())) return { error: "権限がありません" };
  try {
    const data: Movement = JSON.parse(jsonData);
    const { id, ...rest } = data;
    await updateMovement(id, rest);
    revalidatePath("/admin/movements");
    revalidatePath("/");
    revalidatePath(`/movement/${id}`);
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "更新に失敗しました" };
  }
}

export async function deleteMovementAction(id: string): Promise<{ error?: string }> {
  if (!(await isAdmin())) return { error: "権限がありません" };
  try {
    await deleteMovement(id);
    revalidatePath("/admin/movements");
    revalidatePath("/");
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "削除に失敗しました" };
  }
}
