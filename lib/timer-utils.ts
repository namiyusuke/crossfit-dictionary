import type { WodSet, WodFormat } from "@/types/wod";

/** duration 文字列から分数を抽出 */
export function parseDurationMinutes(duration: string): number {
  const cleaned = duration.replace(/^〜/, "");
  const match = cleaned.match(/(\d+)/);
  if (!match) return 10; // fallback
  return parseInt(match[1], 10);
}

/** 秒数を mm:ss 形式に変換 */
export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/** EMOMの特定分に対応するセットを取得 (minute は 1-indexed) */
export function getEmomSetForMinute(sets: WodSet[], minute: number): WodSet {
  const hasOddEvenLabels = sets.some((s) => s.label === "奇数分");

  if (hasOddEvenLabels) {
    return minute % 2 === 1
      ? sets.find((s) => s.label === "奇数分")!
      : sets.find((s) => s.label === "偶数分")!;
  }

  // "1分目", "2分目", ... パターンまたはラベルなし
  const setIndex = (minute - 1) % sets.length;
  return sets[setIndex];
}

/** フォーマットに対応する色 */
export const FORMAT_COLORS: Record<WodFormat, string> = {
  AMRAP: "#2ECC71",
  EMOM: "#3A8FE8",
  ForTime: "#E85D3A",
};
