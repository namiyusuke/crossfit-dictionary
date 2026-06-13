import { Suspense } from "react";
import { hasAdminUser } from "@/lib/admin-auth";
import AdminLoginForm from "./AdminLoginForm";

export default async function AdminLoginPage() {
  // セットアップ要否はサーバー側で判定し、クライアントへ prop で渡す。
  // （クライアントから直接呼べる Server Action として hasAdminUser を公開しない）
  const isSetup = !(await hasAdminUser());

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <p className="text-gray-400">読み込み中...</p>
        </div>
      }
    >
      <AdminLoginForm isSetup={isSetup} />
    </Suspense>
  );
}
