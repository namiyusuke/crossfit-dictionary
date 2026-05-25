import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-[#333] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex gap-6 text-sm">
            <Link href="/admin" className="hover:text-[#F1FE7D] transition-colors">
              ダッシュボード
            </Link>
            <Link href="/admin/movements" className="hover:text-[#F1FE7D] transition-colors">
              種目管理
            </Link>
            <Link href="/admin/wods" className="hover:text-[#F1FE7D] transition-colors">
              WOD管理
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              サイトへ戻る
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
