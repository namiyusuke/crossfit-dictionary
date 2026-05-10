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
      <div className="text-center">
        <div className="relative inline-block">
          <button
            onClick={handleClick}
            className="py-5 px-7 rounded-2xl font-gothic bg-button text-black text-2xl mx-auto"
            type="button"
          >
            きょうはこれをやる！
          </button>
          <span className="bg-white -z-10 absolute w-full h-full rounded-2xl block right-[-4px] top-[4px]"></span>
        </div>
      </div>
      {isTimerOpen && <WodTimerOverlay wod={wod} onClose={() => setIsTimerOpen(false)} />}
    </>
  );
}
