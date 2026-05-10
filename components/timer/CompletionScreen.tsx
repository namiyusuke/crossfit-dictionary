"use client";

import { motion } from "motion/react";
import type { WodFormat } from "@/types/wod";
import { formatTime } from "@/lib/timer-utils";

export interface TimerResult {
  format: WodFormat;
  wodName: string;
  elapsedSeconds: number;
  rounds?: number;
  extraReps?: number;
  completedMinutes?: number;
}

interface CompletionScreenProps {
  result: TimerResult;
  formatColor: string;
  onClose: () => void;
}

export default function CompletionScreen({ result, formatColor, onClose }: CompletionScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center"
      >
        <p className="font-gothic text-5xl mb-4" style={{ color: formatColor }}>
          COMPLETE!
        </p>
        <p className="text-xl  mb-8">{result.wodName}</p>

        {/* AMRAP結果 */}
        {result.format === "AMRAP" && (
          <div className="mb-8">
            <p className="text-6xl font-mono font-bold" style={{ color: formatColor }}>
              {result.rounds ?? 0}
            </p>
            <p className=" mt-1">ラウンド</p>
            {(result.extraReps ?? 0) > 0 && <p className="text-2xl font-mono mt-2">+ {result.extraReps} reps</p>}
          </div>
        )}

        {/* EMOM結果 */}
        {result.format === "EMOM" && (
          <div className="mb-8">
            <p className="text-4xl font-mono font-bold" style={{ color: formatColor }}>
              全 {result.completedMinutes} 分完了
            </p>
          </div>
        )}

        {/* ForTime結果 */}
        {result.format === "ForTime" && (
          <div className="mb-8">
            <p className="text-6xl font-mono font-bold" style={{ color: formatColor }}>
              {formatTime(result.elapsedSeconds)}
            </p>
            <p className=" mt-1">タイム</p>
          </div>
        )}

        <p className="text-lg mb-12">おつかれさまでした！</p>

        <button
          type="button"
          onClick={onClose}
          className="py-4 px-10 rounded-2xl font-gothic bg-button text-black text-xl active:scale-95 transition-transform"
        >
          閉じる
        </button>
      </motion.div>
    </div>
  );
}
