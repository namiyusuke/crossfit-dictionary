"use client";

import { useState, useEffect, useMemo } from "react";

const framesByCategory: Record<string, string[]> = {
  weightlifting: ["/red01.png", "/red02.png"],
  cardio: ["/green01.png", "/green02.png"],
  gymnastics: ["/blue01.png", "/blue02.png"],
  bodyweight: ["/cream01.png", "/cream02.png"],
  wod: ["/cream01.png", "/cream02.png"],
  bg01: ["/bg-char01-01.png", "/bg-char01-02.png"],
  bg02: ["/bg-char02-01.png", "/bg-char02-02.png"],
  bg03: ["/bg-char03-01.png", "/bg-char03-02.png"],
  bg04: ["/bg-char04-01.png", "/bg-char04-02.png"],
};

export default function SpriteAnimation({ category, className }: { category: string; className?: string }) {
  const [frame, setFrame] = useState(0);
  const frames = useMemo(() => framesByCategory[category] ?? framesByCategory.red, [category]);

  useEffect(() => {
    setFrame(0);
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 400);
    return () => clearInterval(interval);
  }, [frames]);

  return (
    <div className={className ?? "flex justify-center items-end h-48"}>
      <img
        src={frames[frame]}
        alt="movement character animation"
        className="w-full h-full object-contain object-bottom"
      />
    </div>
  );
}
