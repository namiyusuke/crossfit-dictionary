"use client";

import { useState, useCallback } from "react";
import type { Wod } from "@/types/wod";
import { FORMAT_COLORS } from "@/lib/timer-utils";
import { useWakeLock } from "@/hooks/useWakeLock";
import CountdownIntro from "./CountdownIntro";
import AmrapTimer from "./AmrapTimer";
import EmomTimer from "./EmomTimer";
import ForTimeTimer from "./ForTimeTimer";
import CompletionScreen, { type TimerResult } from "./CompletionScreen";

type TimerPhase = "intro" | "active" | "completed";

interface WodTimerOverlayProps {
  wod: Wod;
  onClose: () => void;
}

export default function WodTimerOverlay({ wod, onClose }: WodTimerOverlayProps) {
  const [phase, setPhase] = useState<TimerPhase>("intro");
  const [result, setResult] = useState<TimerResult | null>(null);
  const color = FORMAT_COLORS[wod.format];

  useWakeLock(phase === "active");

  const handleIntroComplete = useCallback(() => {
    setPhase("active");
  }, []);

  const handleTimerComplete = useCallback((timerResult: TimerResult) => {
    setResult(timerResult);
    setPhase("completed");
  }, []);

  const handleQuit = useCallback(() => {
    onClose();
  }, [onClose]);

  if (phase === "intro") {
    return <CountdownIntro formatColor={color} onComplete={handleIntroComplete} />;
  }

  if (phase === "completed" && result) {
    return (
      <CompletionScreen
        result={result}
        formatColor={color}
        onClose={onClose}
      />
    );
  }

  // active phase
  switch (wod.format) {
    case "AMRAP":
      return (
        <AmrapTimer wod={wod} onComplete={handleTimerComplete} onQuit={handleQuit} />
      );
    case "EMOM":
      return (
        <EmomTimer wod={wod} onComplete={handleTimerComplete} onQuit={handleQuit} />
      );
    case "ForTime":
      return (
        <ForTimeTimer wod={wod} onComplete={handleTimerComplete} onQuit={handleQuit} />
      );
  }
}
