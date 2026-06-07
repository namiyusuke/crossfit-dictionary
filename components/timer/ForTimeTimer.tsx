"use client";

import { useState, useEffect } from "react";
import type { Wod } from "@/types/wod";
import { useTimer } from "@/hooks/useTimer";
import { useTimerSound } from "@/hooks/useTimerSound";
import { FORMAT_COLORS } from "@/lib/timer-utils";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import type { TimerResult } from "./CompletionScreen";
import { Plus, Minus } from "lucide-react";
import WodPageHeader from "@/app/wod/[id]/WodPageHeader";
import GlobalMenuNav from "@/components/GlobalMenuNav";

interface ForTimeTimerProps {
  wod: Wod;
  onComplete: (result: TimerResult) => void;
  onQuit: () => void;
}

export default function ForTimeTimer({ wod, onComplete, onQuit }: ForTimeTimerProps) {
  const color = FORMAT_COLORS.ForTime;
  const { vibrate } = useTimerSound();
  const totalRounds = wod.rounds ?? 1;
  const [currentRound, setCurrentRound] = useState(1);
  const totalMovements = wod.sets.reduce((acc, set) => acc + set.movements.length, 0);
  const [count, setCount] = useState(0);

  const { seconds, isPaused, toggle, start } = useTimer({
    mode: "countup",
    onTick: (elapsed) => {
      if (elapsed > 0 && elapsed % 60 === 0) vibrate();
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

  const handleFinish = () => {
    onComplete({
      format: "ForTime",
      wodName: wod.name,
      elapsedSeconds: seconds,
    });
  };

  const allMovements = wod.sets.flatMap((s) => s.movements);

  return (
    <>
      <WodPageHeader />
      <div className="fixed inset-0 z-100 flex flex-col md:max-w-[375px] md:mx-auto z-20 bg-gray min-h-screen">
        <div className="flex-1 overflow-auto">
          {/* ヘッダー */}
          <div className="px-6 pt-36 pb-2 mb-6">
            <div className="flex justify-between relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[4px] after:rounded-2xl after:bg-[#fff]">
              <div className="items-center gap-3 pb-2 relative">
                <div className="flex items-center gap-2">
                  <span className="text-xs p-2 rounded-[10px] font-bold bg-green text-black h-max leading-none">
                    ForTime
                  </span>
                  <h2 className="font-gothic text-[20px]">{wod.name}</h2>
                </div>
              </div>
              {totalRounds > 1 && (
                <div className="font-black">
                  ラウンド {currentRound}/{totalRounds}
                </div>
              )}
            </div>
          </div>

          {/* タイマー */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
            <TimerDisplay seconds={seconds} className="text-[40px] font-bold leading-none" />
            <p className="mt-2 text-base font-black">経過時間</p>
          </div>

          {/* カウンター */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-center border-green justify-between border border-[1px] px-[24px] py-[12px] rounded-[16px]">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setCount((c) => Math.max(0, c - 1))}
                  className="w-[26px] h-[26px] rounded-full border border-white flex items-center justify-center border-3"
                >
                  <Minus size={20} />
                </button>
                <span className="text-[24px] w-max text-center leading-none text-white font-black">
                  {count}/{totalMovements}
                </span>
                <button
                  type="button"
                  onClick={() => setCount((c) => Math.min(totalMovements, c + 1))}
                  className="w-[26px] h-[26px] rounded-full flex items-center justify-center border border-white border-3"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* ラウンドカウンター (rounds > 1 の場合) */}
          {totalRounds > 1 && (
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between border border-[1px] px-[24px] py-[12px] rounded-[16px]">
                <span className="text-[14px] font-black">ラウンド</span>
                <div className="flex items-center gap-6">
                  <button
                    type="button"
                    onClick={() => setCurrentRound((r) => Math.max(1, r - 1))}
                    className="w-[26px] h-[26px] rounded-full border border-white flex items-center justify-center border-3"
                  >
                    <Minus size={20} />
                  </button>
                  <span
                    className="text-5xl w-12 text-center leading-none text-black font-black"
                    style={{ WebkitTextStroke: "1px white" }}
                  >
                    {currentRound}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentRound((r) => Math.min(totalRounds, r + 1))}
                    className="w-[26px] h-[26px] rounded-full flex items-center justify-center border border-white border-3"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 完了ボタン */}
          <div className="px-6 pb-6 text-center">
            <button
              type="button"
              onClick={handleFinish}
              className="py-4 leading-none w-full max-w-[300px] rounded-[12px]  text-black text-base bg-green"
            >
              完了
            </button>
          </div>

          {/* コントロール */}
          <div className="px-6 pb-10">
            <TimerControls isPaused={isPaused} onToggle={toggle} onQuit={onQuit} formatColor={color} />
          </div>

          {/* ムーブメントリスト */}
          <div className="px-6 mb-40">
            <div className="rounded-[20px] bg-black px-8 py-7">
              <div className="flex flex-col flex-wrap gap-2 font-black">
                {allMovements.map((mov, i) => (
                  <span key={i} className="font-black text-[12px] flex justify-between w-full items-center">
                    <span>{mov.name}</span>
                    <span className="text-green text-[20px] ">{mov.reps}</span>
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
