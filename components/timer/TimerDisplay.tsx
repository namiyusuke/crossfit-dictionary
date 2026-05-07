"use client";

import { formatTime } from "@/lib/timer-utils";

interface TimerDisplayProps {
  seconds: number;
  className?: string;
  warning?: boolean; // 残り少ないとき赤くする
}

export default function TimerDisplay({
  seconds,
  className = "",
  warning = false,
}: TimerDisplayProps) {
  return (
    <span
      className={`font-mono tabular-nums ${warning && seconds <= 10 ? "text-red-500" : ""} ${className}`}
    >
      {formatTime(seconds)}
    </span>
  );
}
