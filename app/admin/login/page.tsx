"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hasAdminUser, setupInitialAdmin } from "./actions";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSetup, setIsSetup] = useState<boolean | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    hasAdminUser().then((exists) => setIsSetup(!exists));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({ email, password });

      if (result.error) {
        setError("メールアドレスまたはパスワードが正しくありません");
        setLoading(false);
        return;
      }

      const redirectTo = searchParams.get("redirect") || "/admin";
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("ログインに失敗しました");
      setLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await setupInitialAdmin({ name, email, password });

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // 作成したアカウントでログイン
      const loginResult = await authClient.signIn.email({ email, password });

      if (loginResult.error) {
        setError("アカウント作成後のログインに失敗しました");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("セットアップに失敗しました");
      setLoading(false);
    }
  };

  if (isSetup === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-gray-400">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-[#0a0a0a] border-[#333]">
        <CardHeader>
          <CardTitle className="text-center text-white text-xl">
            {isSetup ? "初期セットアップ" : "管理者ログイン"}
          </CardTitle>
          {isSetup && (
            <p className="text-center text-sm text-gray-400 mt-2">
              最初の管理者アカウントを作成してください
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={isSetup ? handleSetup : handleLogin} className="space-y-4">
            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-2">
                {error}
              </div>
            )}
            {isSetup && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  名前
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-[#1a1a1a] border-[#333] text-white"
                  placeholder="管理者"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                メールアドレス
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#1a1a1a] border-[#333] text-white"
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                パスワード
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="bg-[#1a1a1a] border-[#333] text-white"
                placeholder={isSetup ? "8文字以上" : ""}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F1FE7D] text-[#0a0a0a] hover:bg-[#d9e56e] font-bold"
            >
              {loading
                ? isSetup ? "作成中..." : "ログイン中..."
                : isSetup ? "管理者アカウントを作成" : "ログイン"
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
