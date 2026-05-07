"use client";

import { useState } from "react";
import type { Wod } from "@/types/wod";
import { useTimerSound } from "@/hooks/useTimerSound";
import WodTimerOverlay from "./WodTimerOverlay";

interface WodTimerLauncherProps {
  wod: Wod;
}

export default function WodTimerLauncher({ wod }: WodTimerLauncherProps) {
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const { initAudio } = useTimerSound();

  const handleClick = () => {
    initAudio(); // iOS Safari: ユーザーインタラクション時にAudioContextを初期化
    setIsTimerOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="py-5 px-7 rounded-2xl font-gothic bg-button text-black text-2xl mx-auto"
        type="button"
      >
        きょうはこれをやる！
      </button>
      {isTimerOpen && (
        <WodTimerOverlay wod={wod} onClose={() => setIsTimerOpen(false)} />
      )}
    </>
  );
}
