import Link from "next/link";
import { getAllMovements } from "@/lib/data/movements";
import { categoryLabels, CATEGORY_COLORS } from "@/types/movement";
import type { Category } from "@/types/movement";
import { DeleteMovementButton } from "./DeleteButton";
import { requireAdmin } from "@/lib/admin-auth";

export default async function MovementsAdminPage() {
  await requireAdmin();
  const movements = await getAllMovements();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">種目管理</h1>
        <Link
          href="/admin/movements/new"
          className="bg-[#F1FE7D] text-[#0a0a0a] font-bold px-4 py-2 rounded-lg hover:bg-[#d4e06a] transition-colors"
        >
          + 新規作成
        </Link>
      </div>

      <div className="border border-[#333] rounded-xl overflow-x-auto">
        <table className="w-max">
          <thead className="bg-[#1a1a1a]">
            <tr className="text-left text-sm text-gray-400">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">種目名</th>
              <th className="px-4 py-3">カテゴリー</th>
              <th className="px-4 py-3">難易度</th>
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m) => (
              <tr key={m.id} className="border-t border-[#333] hover:bg-[#1a1a1a]">
                <td className="px-4 py-3 text-sm text-gray-400 font-mono">{m.id}</td>
                <td className="px-4 py-3">
                  <div>{m.name}</div>
                  <div className="text-sm text-gray-400">{m.nameEn}</div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: CATEGORY_COLORS[m.category as Category],
                      color: "#fff",
                    }}
                  >
                    {categoryLabels[m.category as Category].ja}
                  </span>
                </td>
                <td className="px-4 py-3">{m.difficulty}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/admin/movements/${m.id}/edit`} className="text-sm text-[#F1FE7D] hover:underline">
                      編集
                    </Link>
                    <DeleteMovementButton id={m.id} name={m.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
