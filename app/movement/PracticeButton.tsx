"use client";
import { useActionState } from "react";
import { togglePractice } from "@/app/movement/[id]/action";

export default function PracticeButton({
  movementId,
  initialIsPracticed,
}: {
  movementId: string;
  initialIsPracticed: boolean;
}) {
  const [state, formAction, isPending] = useActionState(
    togglePractice,
    { isPracticed: initialIsPracticed }, // 初期状態z
  );
  return (
    <form action={formAction}>
      <input type="hidden" name="movementId" value={movementId} />
      <button type="submit" disabled={isPending}>
        {isPending ? "処理中..." : state.isPracticed ? "練習済み ✓" : "練習済みにする"}
      </button>
    </form>
  );
}
