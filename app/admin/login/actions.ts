"use server";

import { db } from "@/db";
import { users } from "@/db/schemas/auth";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { hasAdminUser } from "@/lib/admin-auth";

// 初期管理者の作成。管理者が存在しない間だけ実行できる bootstrap 用アクションで、
// 性質上ログイン前から呼べる必要があるため認証ガードは付けず、既存管理者の有無で制御する。
export async function setupInitialAdmin(formData: {
  name: string;
  email: string;
  password: string;
}) {
  // 既に管理者が存在する場合は拒否
  const exists = await hasAdminUser();
  if (exists) {
    return { error: "管理者は既に登録されています" };
  }

  // better-auth APIでユーザー作成
  const result = await auth.api.signUpEmail({
    body: {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    },
  });

  if (!result?.user) {
    return { error: "アカウント作成に失敗しました" };
  }

  // roleをadminに更新
  await db
    .update(users)
    .set({ role: "admin" })
    .where(eq(users.id, result.user.id));

  return { success: true };
}
