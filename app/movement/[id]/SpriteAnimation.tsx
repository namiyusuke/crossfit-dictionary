"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
const framesByCategory: Record<string, string[]> = {
  W: ["/red01.webp", "/red02.webp"],
  M: ["/green01.webp", "/green02.webp"],
  G: ["/blue01.webp", "/blue02.webp"],
  wod: ["/cream01.webp", "/cream02.webp"],
  bg01: ["/bg-char01-01.webp", "/bg-char01-02.webp"],
  bg02: ["/bg-char02-01.webp", "/bg-char02-02.webp"],
  bg03: ["/bg-char03-01.webp", "/bg-char03-02.webp"],
  bg04: ["/bg-char04-01.webp", "/bg-char04-02.webp"],
  bg05: ["/bg-char05-01.webp", "/bg-char05-02.webp"],
  start: ["/crossFitDictionary-char01.webp", "/crossFitDictionary-char01-move.webp"],
  end: ["/protein01.webp", "/protein02.webp"],
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
    <div className={className ?? "flex justify-center items-end h-48 relative"}>
      <span className="absolute top-8 left-14 -rotate-140">
        <span className="block animate-sweat-x">
          <Image className="animate-sweat-y" width={21} height={28} src="/water.webp" alt="汗" />
        </span>
      </span>
      <span className="absolute top-20 left-10 -rotate-160">
        <span className="block animate-sweat-x" style={{ animationDelay: "0.4s" }}>
          <Image
            className="animate-sweat-y"
            style={{ animationDelay: "0.4s" }}
            width={21}
            height={28}
            src="/water.webp"
            alt="汗"
          />
        </span>
      </span>
      <span className="absolute top-8 right-11 rotate-150">
        <span className="block animate-sweat-x" style={{ animationDelay: "0.2s" }}>
          <Image
            className="animate-sweat-y"
            style={{ animationDelay: "0.2s" }}
            width={21}
            height={28}
            src="/water.webp"
            alt="汗"
          />
        </span>
      </span>
      <span className="absolute top-20 right-10 rotate-160">
        <span className="block animate-sweat-x" style={{ animationDelay: "0.6s" }}>
          <Image
            className="animate-sweat-y"
            style={{ animationDelay: "0.6s" }}
            width={21}
            height={28}
            src="/water.webp"
            alt="汗"
          />
        </span>
      </span>
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
