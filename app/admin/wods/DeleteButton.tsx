"use client";

import { useRouter } from "next/navigation";
import { deleteWodAction } from "./actions";

export function DeleteWodButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`「${name}」を削除しますか？`)) return;
    const result = await deleteWodAction(id);
    if (result?.error) {
      alert(result.error);
    } else {
      router.refresh();
    }
  };

  return (
    <button onClick={handleDelete} className="text-sm text-red-400 hover:underline cursor-pointer">
      削除
    </button>
  );
}
