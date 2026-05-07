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
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* ヘッダー */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-bold text-white"
            style={{ backgroundColor: color }}
          >
            ForTime
          </span>
          <h2 className="font-gothic text-lg">{wod.name}</h2>
        </div>
        {totalRounds > 1 && (
          <p className="text-text-secondary text-sm mt-1">
            ラウンド {currentRound} / {totalRounds}
          </p>
        )}
      </div>

      {/* タイマー */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <TimerDisplay seconds={seconds} className="text-7xl font-bold" />
        <p className="text-text-secondary mt-2 text-sm">経過時間</p>
      </div>

      {/* ムーブメントリスト */}
      <div className="px-6 pb-4">
        <div className="rounded-xl bg-card-bg border border-border p-4 space-y-2 max-h-48 overflow-y-auto">
          {wod.sets.map((set, i) => (
            <div key={i}>
              {set.label && (
                <p className="text-xs font-bold text-text-secondary mb-1">{set.label}</p>
              )}
              {set.movements.map((mov, j) => (
                <div key={j} className="flex justify-between text-sm py-1">
                  <span>{mov.name}</span>
                  <span className="text-text-secondary">{mov.reps}</span>
                </div>
              ))}
            </div>
          ))}
          {wod.repScheme && (
            <p className="text-xs text-text-secondary">Rep Scheme: {wod.repScheme}</p>
          )}
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
      <div className="px-6 pb-4 text-center">
        <button
          type="button"
          onClick={handleFinish}
          className="py-4 px-12 rounded-2xl font-gothic text-white text-xl active:scale-95 transition-transform"
          style={{ backgroundColor: color }}
        >
          完了！
        </button>
      </div>

      {/* コントロール */}
      <div className="px-6 pb-8">
        <TimerControls
          isPaused={isPaused}
          onToggle={toggle}
          onQuit={onQuit}
          formatColor={color}
        />
      </div>
    </div>
  );
}
