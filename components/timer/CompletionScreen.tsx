"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { WodFormat } from "@/types/wod";
import { formatTime } from "@/lib/timer-utils";
import Link from "next/link";

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
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResultModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pt-[123px] z-50 flex flex-col items-center bg-[#553EEC] px-6 overflow-y-auto">
      {/* COMPLETE! テキスト */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center"
      >
        <p className="font-gothic text-[40px] mb-6 text-green">COMPLETE!</p>
        <p className="font-gothic text-[20px]">おつかれさまでした</p>
      </motion.div>
      <div className="mt-[83px]">
        <Image className="mx-auto" width={278} height={369} src="/protein01.png" alt="走るキャラクター" />
      </div>
      <div className="text-right w-full text-green mt-[33px] mb-10">
        <p>
          <Link href="/">WODトップに戻る</Link>
        </p>
      </div>
      {/* 結果モーダル */}
      <AnimatePresence>
        {showResultModal && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl px-6 pt-8 pb-10"
          >
            {/* <div className="text-center">
              {result.format === "AMRAP" && (
                <div className="mb-6">
                  <p className="text-6xl font-mono font-bold" style={{ color: formatColor }}>
                    {result.rounds ?? 0}
                  </p>
                  <p className="mt-1">ラウンド</p>
                  {(result.extraReps ?? 0) > 0 && <p className="text-2xl font-mono mt-2">+ {result.extraReps} reps</p>}
                </div>
              )}

              {result.format === "EMOM" && (
                <div className="mb-6">
                  <p className="text-4xl font-mono font-bold" style={{ color: formatColor }}>
                    全 {result.completedMinutes} 分完了
                  </p>
                </div>
              )}

              {result.format === "ForTime" && (
                <div className="mb-6">
                  <p className="text-6xl font-mono font-bold" style={{ color: formatColor }}>
                    {formatTime(result.elapsedSeconds)}
                  </p>
                  <p className="mt-1">タイム</p>
                </div>
              )}

              <p className="text-lg mb-8">おつかれさまでした！</p>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-4 rounded-2xl font-gothic bg-button text-black text-xl active:scale-95 transition-transform"
              >
                閉じる
              </button>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
