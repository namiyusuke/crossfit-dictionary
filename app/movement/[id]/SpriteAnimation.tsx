"use client";

import { useState, useEffect, useMemo } from "react";

const framesByCategory: Record<string, string[]> = {
  weightlifting: ["/red01.png", "/red02.png"],
  cardio: ["/green01.png", "/green02.png"],
  gymnastics: ["/blue01.png", "/blue02.png"],
  bodyweight: ["/cream01.png", "/cream02.png"],
};

export default function SpriteAnimation({ category }: { category: string }) {
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
    <div className="flex justify-center items-end h-48">
      <img
        src={frames[frame]}
        alt="movement character animation"
        className="max-w-2xs h-48 object-contain object-bottom"
      />
    </div>
  );
}
