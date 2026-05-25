import Link from "next/link";
import { getAllMovements } from "@/lib/data/movements";
import { getAllWods } from "@/lib/data/wods";

export default async function AdminPage() {
  const [movements, wods] = await Promise.all([getAllMovements(), getAllWods()]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">ダッシュボード</h1>
      <div className="grid grid-cols-2 gap-6">
        <Link
          href="/admin/movements"
          className="block border border-[#333] rounded-xl p-6 hover:border-[#F1FE7D] transition-colors"
        >
          <p className="text-4xl font-bold text-[#F1FE7D] mb-2">{movements.length}</p>
          <p className="text-lg">種目（Movements）</p>
          <p className="text-sm text-gray-400 mt-2">管理・追加・編集</p>
        </Link>
        <Link
          href="/admin/wods"
          className="block border border-[#333] rounded-xl p-6 hover:border-[#F1FE7D] transition-colors"
        >
          <p className="text-4xl font-bold text-[#F1FE7D] mb-2">{wods.length}</p>
          <p className="text-lg">WOD</p>
          <p className="text-sm text-gray-400 mt-2">管理・追加・編集</p>
        </Link>
      </div>
    </div>
  );
}
