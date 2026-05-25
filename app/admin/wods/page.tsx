import Link from "next/link";
import { getAllWods } from "@/lib/data/wods";
import type { WodFormat } from "@/types/wod";
import { DeleteWodButton } from "./DeleteButton";

const FORMAT_COLORS: Record<WodFormat, string> = {
  AMRAP: "#2ECC71",
  EMOM: "#3A8FE8",
  ForTime: "#E85D3A",
};

export default async function WodsAdminPage() {
  const wods = await getAllWods();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">WOD管理</h1>
        <Link
          href="/admin/wods/new"
          className="bg-[#F1FE7D] text-[#0a0a0a] font-bold px-4 py-2 rounded-lg hover:bg-[#d4e06a] transition-colors"
        >
          + 新規作成
        </Link>
      </div>

      <div className="border border-[#333] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#1a1a1a]">
            <tr className="text-left text-sm text-gray-400">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">名前</th>
              <th className="px-4 py-3">形式</th>
              <th className="px-4 py-3">レベル</th>
              <th className="px-4 py-3">時間</th>
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {wods.map((w) => (
              <tr key={w.id} className="border-t border-[#333] hover:bg-[#1a1a1a]">
                <td className="px-4 py-3 text-sm text-gray-400 font-mono">{w.id}</td>
                <td className="px-4 py-3">{w.name}</td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: FORMAT_COLORS[w.format as WodFormat] }}
                  >
                    {w.format}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{w.level}</td>
                <td className="px-4 py-3 text-sm">{w.duration}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/wods/${w.id}/edit`}
                      className="text-sm text-[#F1FE7D] hover:underline"
                    >
                      編集
                    </Link>
                    <DeleteWodButton id={w.id} name={w.name} />
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
