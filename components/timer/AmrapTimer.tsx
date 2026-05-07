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

  useEffect(() => {
    start();
  }, [start]);

  const progress = seconds / totalSeconds;

  // 全ムーブメントのレップ数合計を計算（端数repsカウンター用）
  const allMovements = wod.sets.flatMap((s) => s.movements);
  const totalRepsInRound = allMovements.length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* ヘッダー */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-bold text-white"
            style={{ backgroundColor: color }}
          >
            AMRAP
          </span>
          <h2 className="font-gothic text-lg">{wod.name}</h2>
        </div>
        <p className="text-text-secondary text-sm mt-1">{wod.duration}</p>
      </div>

      {/* プログレスリング + タイマー */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <ProgressRing progress={progress} color={color} size={260}>
          <TimerDisplay seconds={seconds} className="text-5xl font-bold" warning />
        </ProgressRing>
      </div>

      {/* ラウンド + Reps カウンター */}
      <div className="px-6 pb-4">
        <div className="rounded-xl bg-card-bg border border-border p-4">
          {/* ラウンドカウンター */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-text-secondary text-sm">ラウンド</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setRoundCount((r) => Math.max(0, r - 1))}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center active:scale-95 transition-transform"
              >
                <Minus size={20} />
              </button>
              <span className="font-mono text-3xl w-12 text-center" style={{ color }}>
                {roundCount}
              </span>
              <button
                type="button"
                onClick={() => setRoundCount((r) => r + 1)}
                className="w-12 h-12 rounded-full flex items-center justify-center text-black active:scale-95 transition-transform"
                style={{ backgroundColor: color }}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* 端数Repsカウンター */}
          <div className="flex items-center justify-between">
            <span className="text-text-secondary text-sm">+ 端数 reps</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setExtraReps((r) => Math.max(0, r - 1))}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-sm active:scale-95 transition-transform"
              >
                <Minus size={16} />
              </button>
              <span className="font-mono text-2xl w-12 text-center">
                {extraReps}
              </span>
              <button
                type="button"
                onClick={() => setExtraReps((r) => r + 1)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-sm active:scale-95 transition-transform"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ムーブメントリスト */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {allMovements.map((mov, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs border border-border bg-card-bg"
            >
              {mov.name} {mov.reps}
            </span>
          ))}
        </div>
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
