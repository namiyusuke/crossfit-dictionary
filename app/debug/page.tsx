"use client";

import { useState } from "react";
import CompletionScreen, { type TimerResult } from "@/components/timer/CompletionScreen";
import type { WodFormat } from "@/types/wod";

const FORMAT_COLORS: Record<WodFormat, string> = {
  AMRAP: "#22c55e",
  EMOM: "#3b82f6",
  ForTime: "#ef4444",
};

const MOCK_RESULTS: Record<WodFormat, TimerResult> = {
  AMRAP: {
    format: "AMRAP",
    wodName: "Cindy",
    elapsedSeconds: 1200,
    rounds: 18,
    extraReps: 5,
  },
  EMOM: {
    format: "EMOM",
    wodName: "Death by Burpees",
    elapsedSeconds: 600,
    completedMinutes: 10,
  },
  ForTime: {
    format: "ForTime",
    wodName: "Fran",
    elapsedSeconds: 245,
  },
};

export default function DebugCompletionPage() {
  const [activeFormat, setActiveFormat] = useState<WodFormat | null>(null);

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-gothic mb-6">Debug: CompletionScreen</h1>
      <div className="flex flex-col gap-4">
        {(Object.keys(MOCK_RESULTS) as WodFormat[]).map((format) => (
          <button
            key={format}
            type="button"
            onClick={() => setActiveFormat(format)}
            className="py-3 px-6 rounded-xl text-black font-gothic text-lg"
            style={{ backgroundColor: FORMAT_COLORS[format] }}
          >
            {format} を表示
          </button>
        ))}
      </div>

      {activeFormat && (
        <CompletionScreen
          result={MOCK_RESULTS[activeFormat]}
          formatColor={FORMAT_COLORS[activeFormat]}
          onClose={() => setActiveFormat(null)}
        />
      )}
    </div>
  );
}
