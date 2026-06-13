"use server";

import { createWod, updateWod, deleteWod } from "@/lib/data/wods";
import { revalidatePath } from "next/cache";
import type { Wod } from "@/types/wod";
import { isAdmin } from "@/lib/admin-auth";

export async function createWodAction(jsonData: string): Promise<{ error?: string }> {
  if (!(await isAdmin())) return { error: "権限がありません" };
  try {
    const data: Wod = JSON.parse(jsonData);
    await createWod(data);
    revalidatePath("/admin/wods");
    revalidatePath("/");
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "作成に失敗しました" };
  }
}

export async function updateWodAction(jsonData: string): Promise<{ error?: string }> {
  if (!(await isAdmin())) return { error: "権限がありません" };
  try {
    const data: Wod = JSON.parse(jsonData);
    const { id, ...rest } = data;
    await updateWod(id, rest);
    revalidatePath("/admin/wods");
    revalidatePath("/");
    revalidatePath(`/wod/${id}`);
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "更新に失敗しました" };
  }
}

export async function deleteWodAction(id: string): Promise<{ error?: string }> {
  if (!(await isAdmin())) return { error: "権限がありません" };
  try {
    await deleteWod(id);
    revalidatePath("/admin/wods");
    revalidatePath("/");
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "削除に失敗しました" };
  }
}
