"use client";

import { useState, useEffect, useMemo } from "react";

const framesByCategory: Record<string, string[]> = {
  W: ["/red01.png", "/red02.png"],
  M: ["/green01.png", "/green02.png"],
  G: ["/blue01.png", "/blue02.png"],
  wod: ["/cream01.png", "/cream02.png"],
  bg01: ["/bg-char01-01.png", "/bg-char01-02.png"],
  bg02: ["/bg-char02-01.png", "/bg-char02-02.png"],
  bg03: ["/bg-char03-01.png", "/bg-char03-02.png"],
  bg04: ["/bg-char04-01.png", "/bg-char04-02.png"],
  bg05: ["/bg-char05-01.png", "/bg-char05-02.png"],
  start: ["/crossFitDictionary-char01.png", "/crossFitDictionary-char01-move.png"],
  end: ["/protein01.png", "/protein02.png"],
};

export default function SpriteAnimation({
  category,
  className,
  interval = 400,
  delay = 0,
}: {
  category: string;
  className?: string;
  interval?: number;
  delay?: number;
}) {
  const [frame, setFrame] = useState(0);
  const frames = useMemo(() => framesByCategory[category] ?? framesByCategory.W, [category]);

  useEffect(() => {
    setFrame(0);
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      setFrame((prev) => (prev + 1) % frames.length);
      intervalId = setInterval(() => {
        setFrame((prev) => (prev + 1) % frames.length);
      }, interval);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [frames, interval, delay]);

  return (
    <div className={className ?? "flex justify-center items-end h-48"}>
      <div className="relative w-full h-full">
        {frames.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="movement character animation"
            className={`object-contain object-bottom w-full h-full ${
              i === 0 ? "" : "absolute inset-0"
            } ${i === frame ? "" : "invisible"}`}
          />
        ))}
      </div>
    </div>
  );
}
