"use client";

import { useState, useEffect } from "react";
import type { Wod } from "@/types/wod";
import { useTimer } from "@/hooks/useTimer";
import { useTimerSound } from "@/hooks/useTimerSound";
import { FORMAT_COLORS } from "@/lib/timer-utils";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import type { TimerResult } from "./CompletionScreen";

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

  return (
    <div className="fixed inset-0 z-100 flex flex-col md:max-w-[375px] md:mx-auto z-20 bg-black min-h-screen">
      <div className="flex-1 overflow-auto">
        {/* ヘッダー */}
        <div className="px-6 pt-10 pb-2 mb-[100px]">
          <div className="flex items-center gap-3 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#E85D3A]">
            <span className="text-xs px-2 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: color }}>
              ForTime
            </span>
            <h2 className="font-gothic text-[20px]">{wod.name}</h2>
          </div>
          {totalRounds > 1 && (
            <p className="text-sm mt-2">
              ラウンド {currentRound} / {totalRounds}
            </p>
          )}
        </div>

        {/* タイマー */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <TimerDisplay seconds={seconds} className="text-7xl font-bold" />
          <p className="mt-2 text-base font-black">経過時間</p>
        </div>
        {/* カウンター */}
        <div className="flex items-center font-black justify-center gap-6 px-6 pb-20">
          <button
            type="button"
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            className="w-8 h-8 rounded-full border border-[#fff] border-[2px] flex items-center justify-center text-2xl"
          >
            −
          </button>
          <span className="text-[20px] font-black w-24 text-center">
            {count}/{totalMovements}
          </span>
          <button
            type="button"
            onClick={() => setCount((c) => Math.min(totalMovements, c + 1))}
            className="w-8 h-8 rounded-full border border-[#fff] flex border-[2px] items-center justify-center text-2xl "
          >
            +
          </button>
        </div>

        {/* ムーブメントリスト */}
        <div className="px-6 pb-6">
          <div className="flex flex-col flex-wrap gap-2">
            {wod.sets.map((set, i) => (
              <div key={i} className="flex flex-col flex-wrap gap-2">
                {set.label && <p className="text-xs font-bold mb-1">{set.label}</p>}
                {set.movements.map((mov, j) => (
                  <span
                    key={j}
                    className="px-4 py-3 font-black rounded-[12px] text-[12px] bg-[#414141] inline-block w-max"
                  >
                    {mov.name} {mov.reps}
                  </span>
                ))}
              </div>
            ))}
            {/* {wod.repScheme && <p className="text-xs mt-2">Rep Scheme: {wod.repScheme}</p>} */}
          </div>
        </div>

        {/* ラウンドカウンター (rounds > 1 の場合) */}
        {totalRounds > 1 && (
          <div className="px-6 pb-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentRound((r) => Math.max(1, r - 1))}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-2xl active:scale-95 transition-transform"
            >
              -
            </button>
            <span className="font-mono text-2xl w-20 text-center">
              {currentRound}/{totalRounds}
            </span>
            <button
              type="button"
              onClick={() => setCurrentRound((r) => Math.min(totalRounds, r + 1))}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-2xl active:scale-95 transition-transform"
            >
              +
            </button>
          </div>
        )}

        {/* 完了ボタン */}
        <div className="px-6 pb-10 text-center">
          <button
            type="button"
            onClick={handleFinish}
            className="py-4 leading-none w-full max-w-[262px] rounded-[12px] font-gothic text-white text-xl active:scale-95 transition-transform"
            style={{ backgroundColor: color }}
          >
            完了！
          </button>
        </div>

        {/* コントロール */}
        <div className="px-6 pb-8">
          <TimerControls isPaused={isPaused} onToggle={toggle} onQuit={onQuit} formatColor={color} />
        </div>
      </div>
    </div>
  );
}
