"use client";

import { useState, useEffect } from "react";

export default function SpriteAnimation() {
  const [frame, setFrame] = useState(0);
  const frames = ["/movement-char-yellow-01.png", "/movement-char-yellow-02.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 400);
    return () => clearInterval(interval);
  }, []);

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
