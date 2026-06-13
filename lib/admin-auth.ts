import { auth } from "./auth";
import { db } from "@/db";
import { users } from "@/db/schemas/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * 管理者ユーザーが1人でも存在するか。初期セットアップ要否の判定に使う。
 * "use server" を持たないモジュールに置くことで、クライアントから直接呼べる
 * Server Action としては公開されない（Server Component からのみ呼び出す）。
 */
export async function hasAdminUser(): Promise<boolean> {
  const admins = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, "admin"))
    .limit(1);
  return admins.length > 0;
}

export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/admin/login");
  }

  if (session.user.isAnonymous || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return session;
}

/**
 * 管理者かどうかを判定する。requireAdmin と違い redirect を投げないため、
 * try/catch を持つ Server Action のガードに使う（redirect の例外が catch に
 * 飲み込まれるのを防ぐ）。
 */
export async function isAdmin(): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return Boolean(session && !session.user.isAnonymous && session.user.role === "admin");
}
