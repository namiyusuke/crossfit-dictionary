import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql/web";
import { eq } from "drizzle-orm";
import { users } from "./schemas/auth";

const BASE_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";
const TURSO_URL = process.env.TURSO_DATABASE_URL || "http://127.0.0.1:8080";
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN || "";

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "admin12345678";
  const name = "Admin";

  console.log(`管理者ユーザーを作成中: ${email}`);

  // Step 1: better-auth APIでユーザーを作成（パスワードのハッシュ化を任せる）
  const signUpResponse = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  if (!signUpResponse.ok) {
    const error = await signUpResponse.text();
    console.log("サインアップ結果:", error);
    console.log("（既にユーザーが存在する場合はスキップしてrole更新に進みます）");
  } else {
    console.log("ユーザー作成完了");
  }

  // Step 2: Drizzleで直接roleをadminに更新
  const db = drizzle({
    connection: {
      url: TURSO_URL,
      authToken: TURSO_TOKEN,
    },
  });

  await db.update(users).set({ role: "admin" }).where(eq(users.email, email));
  console.log(`roleを"admin"に更新しました: ${email}`);
  console.log("管理者シード完了！");
}

seedAdmin().catch(console.error);
