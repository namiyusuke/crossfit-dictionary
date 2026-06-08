"use client";

import { useState } from "react";
import type { Wod } from "@/types/wod";
import WodTimerOverlay from "./WodTimerOverlay";

interface WodTimerLauncherProps {
  wod: Wod;
}

export default function WodTimerLauncher({ wod }: WodTimerLauncherProps) {
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  const handleClick = () => {
    setIsTimerOpen(true);
  };

  return (
    <>
      <div className="text-center">
        <div className="relative inline-block">
          <button
            onClick={handleClick}
            className="py-5 px-[60px] rounded-2xl font-gothic bg-button text-black text-[20px] mx-auto cursor-pointer"
            type="button"
          >
            きょうはこれをやる！
          </button>
          {/* <span className="bg-white -z-10 absolute w-full h-full rounded-2xl block right-[-4px] top-[4px]"></span> */}
        </div>
      </div>
      {isTimerOpen && <WodTimerOverlay wod={wod} onClose={() => setIsTimerOpen(false)} />}
    </>
  );
}
