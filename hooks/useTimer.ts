"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseTimerOptions {
  mode: "countdown" | "countup";
  totalSeconds?: number; // countdown モードで必須
  onTick?: (seconds: number) => void;
  onComplete?: () => void;
}

interface UseTimerReturn {
  seconds: number; // countdown: 残り秒, countup: 経過秒
  isPaused: boolean;
  isRunning: boolean;
  toggle: () => void;
  start: () => void;
  reset: () => void;
}

export function useTimer({
  mode,
  totalSeconds = 0,
  onTick,
  onComplete,
}: UseTimerOptions): UseTimerReturn {
  const [seconds, setSeconds] = useState(mode === "countdown" ? totalSeconds : 0);
  const [isPaused, setIsPaused] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const startTimeRef = useRef(0);
  const pausedElapsedRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTickRef = useRef(onTick);
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);

  onTickRef.current = onTick;
  onCompleteRef.current = onComplete;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const elapsed =
      Math.floor((Date.now() - startTimeRef.current) / 1000) +
      pausedElapsedRef.current;

    if (mode === "countdown") {
      const remaining = Math.max(0, totalSeconds - elapsed);
      setSeconds(remaining);
      onTickRef.current?.(remaining);

      if (remaining <= 0 && !completedRef.current) {
        completedRef.current = true;
        clearTimer();
        setIsPaused(true);
        onCompleteRef.current?.();
      }
    } else {
      setSeconds(elapsed);
      onTickRef.current?.(elapsed);
    }
  }, [mode, totalSeconds, clearTimer]);

  const start = useCallback(() => {
    completedRef.current = false;
    pausedElapsedRef.current = 0;
    startTimeRef.current = Date.now();
    setIsRunning(true);
    setIsPaused(false);
    setSeconds(mode === "countdown" ? totalSeconds : 0);

    clearTimer();
    intervalRef.current = setInterval(tick, 200);
  }, [mode, totalSeconds, tick, clearTimer]);

  const toggle = useCallback(() => {
    if (isPaused) {
      // 再開
      startTimeRef.current = Date.now();
      setIsPaused(false);
      clearTimer();
      intervalRef.current = setInterval(tick, 200);
    } else {
      // 一時停止
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      pausedElapsedRef.current += elapsed;
      setIsPaused(true);
      clearTimer();
    }
  }, [isPaused, tick, clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    completedRef.current = false;
    pausedElapsedRef.current = 0;
    setIsRunning(false);
    setIsPaused(true);
    setSeconds(mode === "countdown" ? totalSeconds : 0);
  }, [mode, totalSeconds, clearTimer]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return { seconds, isPaused, isRunning, toggle, start, reset };
}
