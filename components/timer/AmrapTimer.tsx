"use client";

import { useState, useEffect } from "react";
import type { Wod } from "@/types/wod";
import { useTimer } from "@/hooks/useTimer";
import { useTimerSound } from "@/hooks/useTimerSound";
import { parseDurationMinutes, FORMAT_COLORS } from "@/lib/timer-utils";
import TimerDisplay from "./TimerDisplay";
import ProgressRing from "./ProgressRing";
import TimerControls from "./TimerControls";
import type { TimerResult } from "./CompletionScreen";
import { Plus, Minus } from "lucide-react";
import WodPageHeader from "@/app/wod/[id]/WodPageHeader";
import GlobalMenuNav from "@/components/GlobalMenuNav";

interface AmrapTimerProps {
  wod: Wod;
  onComplete: (result: TimerResult) => void;
  onQuit: () => void;
}

export default function AmrapTimer({ wod, onComplete, onQuit }: AmrapTimerProps) {
  const color = FORMAT_COLORS.AMRAP;
  const totalMinutes = parseDurationMinutes(wod.duration);
  const totalSeconds = totalMinutes * 60;
  const { playCountdownBeep, playCompleteBeep, vibrate } = useTimerSound();

  const [roundCount, setRoundCount] = useState(0);
  const [extraReps, setExtraReps] = useState(0);

  const { seconds, isPaused, toggle, start } = useTimer({
    mode: "countdown",
    totalSeconds,
    onTick: (remaining) => {
      if (remaining <= 3 && remaining > 0) {
        playCountdownBeep();
        vibrate(100);
      }
    },
    onComplete: () => {
      playCompleteBeep();
      vibrate([200, 100, 200]);
      onComplete({
        format: "AMRAP",
        wodName: wod.name,
        elapsedSeconds: totalSeconds,
        rounds: roundCount,
        extraReps,
      });
    },
  });

  // タイマー表示中は背面ページのスクロールを無効化（二重スクロール防止）
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    start();
  }, [start]);

  const progress = seconds / totalSeconds;

  // 全ムーブメントのレップ数合計を計算（端数repsカウンター用）
  const allMovements = wod.sets.flatMap((s) => s.movements);
  const totalRepsInRound = allMovements.length;

  return (
    <>
      <WodPageHeader />
      <div className="fixed inset-0 z-100 flex flex-col md:max-w-[375px] md:mx-auto z-20 bg-gray min-h-screen">
        <div className="flex-1 overflow-auto">
          {/* ヘッダー */}
          <div className="px-6 pt-36 pb-2 mb-6">
            <div className="flex  justify-between relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#fff]">
              <div className="items-center gap-3 pb-2 relative">
                <div className="flex items-center gap-2">
                  <span className="text-xs p-2 rounded-[10px] font-bold bg-green text-black h-max leading-none">
                    AMRAP
                  </span>
                  <h2 className="font-gothic text-[20px]">{wod.name}</h2>
                </div>
              </div>
              <div className="font-black">{totalMinutes}分</div>
            </div>
          </div>
          {/* プログレスリング + タイマー */}
          <div className="flex-1 flex flex-col items-center justify-center pb-6">
            <ProgressRing progress={progress} color={color} size={260}>
              <TimerDisplay seconds={seconds} className="text-5xl font-bold" warning />
            </ProgressRing>
          </div>
          {/* ラウンド + Reps カウンター */}
          <div className="px-6 pb-6">
            <div className="">
              {/* ラウンドカウンター */}
              <div className="flex items-center justify-between mb-3 border border-[1px] border-green px-[24px] py-[12px] rounded-[16px]">
                <span className="text-[14px] font-black">ラウンド</span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setRoundCount((r) => Math.max(0, r - 1))}
                    className="w-[26px] h-[26px] rounded-full border border-white flex items-center justify-center border-3"
                  >
                    <Minus size={20} />
                  </button>
                  <span
                    className="text-5xl w-12 text-center leading-none text-black font-black"
                    style={{ WebkitTextStroke: "1px white" }}
                  >
                    {roundCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRoundCount((r) => r + 1)}
                    className="w-[26px] h-[26px] rounded-full flex items-center justify-center border border-white border-3"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              {/* 端数Repsカウンター */}
              <div className="flex items-center justify-between border  border-[1px] border-green px-[24px] py-[12px] rounded-[16px] font-black">
                <span className="text-[14px] font-black">+ 端数 reps</span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setExtraReps((r) => Math.max(0, r - 1))}
                    className="w-[26px] h-[26px] rounded-full border border-border border-white flex items-center justify-center text-sm border-3"
                  >
                    <Minus size={16} />
                  </button>
                  <span
                    className="text-5xl w-12 text-center leading-none text-black"
                    style={{ WebkitTextStroke: "1px white" }}
                  >
                    {extraReps}
                  </span>
                  <button
                    type="button"
                    onClick={() => setExtraReps((r) => r + 1)}
                    className="w-[26px] h-[26px] rounded-full border border-border flex items-center justify-center text-sm border border-white border-3"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* コントロール */}
          <div className="px-6 pb-10">
            <TimerControls isPaused={isPaused} onToggle={toggle} onQuit={onQuit} formatColor={color} />
          </div>
          {/* ムーブメントリスト */}
          <div className="px-6 mb-40">
            <div className="rounded-[20px] bg-black px-8 py-7">
              <div className="flex flex-col flex-wrap gap-2">
                {allMovements.map((mov, i) => (
                  <span key={i} className="font-black text-[12px] flex justify-between w-full">
                    <span>{mov.name}</span>
                    <span className="text-green">{mov.reps}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <GlobalMenuNav active="WOD" />
    </>
  );
}
