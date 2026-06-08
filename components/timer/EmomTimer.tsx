"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Wod } from "@/types/wod";
import { parseDurationMinutes, getEmomSetForMinute, FORMAT_COLORS, formatTime } from "@/lib/timer-utils";
import ProgressRing from "./ProgressRing";
import TimerControls from "./TimerControls";
import type { TimerResult } from "./CompletionScreen";
import WodPageHeader from "@/app/wod/[id]/WodPageHeader";
import GlobalMenuNav from "@/components/GlobalMenuNav";

interface EmomTimerProps {
  wod: Wod;
  onComplete: (result: TimerResult) => void;
  onQuit: () => void;
}

export default function EmomTimer({ wod, onComplete, onQuit }: EmomTimerProps) {
  const color = FORMAT_COLORS.EMOM;
  const totalMinutes = parseDurationMinutes(wod.duration);
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
      onComplete({
        format: "EMOM",
        wodName: wod.name,
        elapsedSeconds: totalMinutes * 60,
        completedMinutes: totalMinutes,
      });
      return;
    }

    setCurrentMinute(Math.min(minute, totalMinutes));
    setSecondsInMinute(secInMin);
  }, [
    totalMinutes,
    currentMinute,
    clearTimer,
    onComplete,
    wod.name,
  ]);

  // タイマー表示中は背面ページのスクロールを無効化（二重スクロール防止）
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
  const nextSet = nextMinute <= totalMinutes ? getEmomSetForMinute(wod.sets, nextMinute) : null;

  const isRest = currentSet.movements.length === 0;
  const progress = secondsInMinute / 60;

  return (
    <>
      <WodPageHeader />
      <div className="fixed inset-0 z-100 flex flex-col md:max-w-[375px] md:mx-auto z-20 bg-gray min-h-screen">
        <div className="flex-1 overflow-auto">
          <div className="pt-36 pb-28">
            {/* ヘッダー */}
            <div className="px-6  pb-2 mb-6">
              <div className="flex items-center justify-between relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[4px] after:bg-[#fff] after:rounded-2xl">
                <div className="items-center gap-3 pb-2 relative">
                  <div className="flex items-center gap-2">
                    <span className="text-xs p-2 rounded-[10px] font-bold bg-green text-black h-max leading-none">
                      EMOM
                    </span>
                    <h2 className="font-gothic text-[20px]">{wod.name}</h2>
                  </div>
                </div>
                <div className="font-black w-[20%]">
                  {currentMinute}/{totalMinutes}分
                </div>
              </div>
            </div>
            {/* メインタイマー */}
            <div className="flex-1 flex flex-col items-center justify-center pb-6">
              <ProgressRing progress={progress} color={color} size={260}>
                <div className="text-center">
                  <span
                    className={`font-mono text-5xl font-bold tabular-nums ${secondsInMinute <= 10 ? "text-red-500" : ""}`}
                  >
                    {formatTime(secondsInMinute)}
                  </span>
                  {currentSet.label && <p className="text-sm mt-1">{currentSet.label}</p>}
                </div>
              </ProgressRing>
            </div>
            {/* 現在のセット */}
            <div className="px-6 pb-6">
              {isRest ? (
                <p className="text-center text-2xl font-gothic" style={{ color: "#2ECC71" }}>
                  REST
                </p>
              ) : (
                <div className="rounded-[20px] px-8 py-7 border border-green border-3">
                  <div className="flex flex-col flex-wrap gap-2">
                    {currentSet.movements.map((mov, i) => (
                      <span key={i} className="font-black text-base flex justify-between w-full">
                        <span>{mov.name}</span>
                        <span>{mov.reps}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* 次のセット（プレビュー） */}
            {nextSet && (
              <div className="px-6 pb-6">
                <p className="text-[12px] mb-2 font-black">NEXT</p>
                {nextSet.movements.length === 0 ? (
                  <p className="text-sm">REST</p>
                ) : (
                  <div className="rounded-[20px] px-8 py-7 border border-green border-3">
                    <div className="flex flex-col flex-wrap gap-2">
                      {nextSet.movements.map((mov, i) => (
                        <span key={i} className="font-black text-base flex justify-between w-full">
                          <span>{mov.name}</span>
                          <span>{mov.reps}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* コントロール */}
            <div className="px-6 pb-10">
              <TimerControls isPaused={isPaused} onToggle={toggle} onQuit={onQuit} formatColor={color} />
            </div>
          </div>
        </div>
      </div>
      <GlobalMenuNav active="WOD" />
    </>
  );
}
