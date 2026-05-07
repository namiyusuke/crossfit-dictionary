"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Wod } from "@/types/wod";
import { useTimerSound } from "@/hooks/useTimerSound";
import {
  parseDurationMinutes,
  getEmomSetForMinute,
  FORMAT_COLORS,
  formatTime,
} from "@/lib/timer-utils";
import ProgressRing from "./ProgressRing";
import TimerControls from "./TimerControls";
import type { TimerResult } from "./CompletionScreen";

interface EmomTimerProps {
  wod: Wod;
  onComplete: (result: TimerResult) => void;
  onQuit: () => void;
}

export default function EmomTimer({ wod, onComplete, onQuit }: EmomTimerProps) {
  const color = FORMAT_COLORS.EMOM;
  const totalMinutes = parseDurationMinutes(wod.duration);
  const { playCountdownBeep, playMinuteChangeBeep, playCompleteBeep, vibrate } =
    useTimerSound();

  const [currentMinute, setCurrentMinute] = useState(1);
  const [secondsInMinute, setSecondsInMinute] = useState(60);
  const [isPaused, setIsPaused] = useState(false);

  const startTimeRef = useRef(0);
  const pausedElapsedRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const elapsedMs = Date.now() - startTimeRef.current + pausedElapsedRef.current * 1000;
    const totalElapsedSeconds = Math.floor(elapsedMs / 1000);

    const minute = Math.floor(totalElapsedSeconds / 60) + 1;
    const secInMin = 60 - (totalElapsedSeconds % 60);

    if (minute > totalMinutes && !completedRef.current) {
      completedRef.current = true;
      clearTimer();
      playCompleteBeep();
      vibrate([200, 100, 200]);
      onComplete({
        format: "EMOM",
        wodName: wod.name,
        elapsedSeconds: totalMinutes * 60,
        completedMinutes: totalMinutes,
      });
      return;
    }

    // 分の切り替え検知
    if (minute !== currentMinute && minute <= totalMinutes) {
      playMinuteChangeBeep();
      vibrate(150);
    }

    // 残り3秒のビープ
    if (secInMin <= 3 && secInMin > 0) {
      playCountdownBeep();
    }

    setCurrentMinute(Math.min(minute, totalMinutes));
    setSecondsInMinute(secInMin);
  }, [
    totalMinutes,
    currentMinute,
    clearTimer,
    onComplete,
    wod.name,
    playCountdownBeep,
    playMinuteChangeBeep,
    playCompleteBeep,
    vibrate,
  ]);

  // 開始
  useEffect(() => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(tick, 200);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback(() => {
    if (isPaused) {
      // 再開
      startTimeRef.current = Date.now();
      setIsPaused(false);
      clearTimer();
      intervalRef.current = setInterval(tick, 200);
    } else {
      // 一時停止
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      pausedElapsedRef.current += elapsed;
      setIsPaused(true);
      clearTimer();
    }
  }, [isPaused, tick, clearTimer]);

  const currentSet = getEmomSetForMinute(wod.sets, currentMinute);
  const nextMinute = currentMinute + 1;
  const nextSet =
    nextMinute <= totalMinutes ? getEmomSetForMinute(wod.sets, nextMinute) : null;

  const isRest = currentSet.movements.length === 0;
  const progress = secondsInMinute / 60;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* ヘッダー */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold text-white"
              style={{ backgroundColor: color }}
            >
              EMOM
            </span>
            <h2 className="font-gothic text-lg">{wod.name}</h2>
          </div>
          <span className="font-mono text-sm text-text-secondary">
            {currentMinute}/{totalMinutes}分
          </span>
        </div>
        {/* 全体プログレスバー */}
        <div className="mt-3 h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${((currentMinute - 1 + (60 - secondsInMinute) / 60) / totalMinutes) * 100}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>

      {/* メインタイマー */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <ProgressRing progress={progress} color={color} size={260}>
          <div className="text-center">
            <span
              className={`font-mono text-5xl font-bold tabular-nums ${secondsInMinute <= 10 ? "text-red-500" : ""}`}
            >
              {formatTime(secondsInMinute)}
            </span>
            {currentSet.label && (
              <p className="text-sm text-text-secondary mt-1">{currentSet.label}</p>
            )}
          </div>
        </ProgressRing>
      </div>

      {/* 現在のセット */}
      <div className="px-6 pb-3">
        <div
          className="rounded-xl border p-4"
          style={{
            borderColor: isRest ? "#2ECC71" : color,
            backgroundColor: isRest ? "rgba(46,204,113,0.1)" : "rgba(58,143,232,0.1)",
          }}
        >
          {isRest ? (
            <p className="text-center text-2xl font-gothic" style={{ color: "#2ECC71" }}>
              REST
            </p>
          ) : (
            <div className="space-y-2">
              {currentSet.movements.map((mov, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="font-bold">{mov.name}</span>
                  <span className="font-mono" style={{ color }}>
                    {mov.reps}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 次のセット（プレビュー） */}
      {nextSet && (
        <div className="px-6 pb-4">
          <p className="text-xs text-text-secondary mb-1">NEXT</p>
          <div className="rounded-lg border border-border p-3 opacity-50">
            {nextSet.movements.length === 0 ? (
              <p className="text-sm text-text-secondary">REST</p>
            ) : (
              <div className="space-y-1">
                {nextSet.movements.map((mov, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{mov.name}</span>
                    <span className="text-text-secondary">{mov.reps}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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
