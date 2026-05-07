"use client";

import { useRef, useCallback } from "react";

export function useTimerSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playBeep = useCallback(
    (frequency: number = 880, duration: number = 0.1) => {
      try {
        const ctx = getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.value = frequency;
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + duration
        );
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
      } catch {
        // Audio not available
      }
    },
    [getContext]
  );

  const playCountdownBeep = useCallback(() => playBeep(880, 0.1), [playBeep]);

  const playStartBeep = useCallback(() => playBeep(1200, 0.3), [playBeep]);

  const playMinuteChangeBeep = useCallback(() => {
    playBeep(1000, 0.1);
    setTimeout(() => playBeep(1200, 0.15), 150);
  }, [playBeep]);

  const playCompleteBeep = useCallback(() => {
    playBeep(800, 0.15);
    setTimeout(() => playBeep(1000, 0.15), 200);
    setTimeout(() => playBeep(1200, 0.3), 400);
  }, [playBeep]);

  const vibrate = useCallback((pattern: number | number[] = 200) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  /** iOS Safari 対応: ユーザーインタラクション時に呼んでAudioContextを初期化 */
  const initAudio = useCallback(() => {
    getContext();
  }, [getContext]);

  return {
    playCountdownBeep,
    playStartBeep,
    playMinuteChangeBeep,
    playCompleteBeep,
    vibrate,
    initAudio,
  };
}
