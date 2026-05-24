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
  start: ["/crossFitDictionary-char01.png", "/crossFitDictionary-char01-move.png"],
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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const frames = useMemo(() => framesByCategory[category] ?? framesByCategory.red, [category]);

  // 全フレーム画像をプリロード
  useEffect(() => {
    setImagesLoaded(false);
    let cancelled = false;

    const promises = frames.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }),
    );

    Promise.all(promises).then(() => {
      if (!cancelled) setImagesLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [frames]);

  // プリロード完了後にアニメーション開始
  useEffect(() => {
    if (!imagesLoaded) return;

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
  }, [frames, interval, delay, imagesLoaded]);

  return (
    <div className={className ?? "flex justify-center items-end h-48"}>
      {imagesLoaded && (
        <img
          src={frames[frame]}
          alt="movement character animation"
          className="w-full h-full object-contain object-bottom"
        />
      )}
    </div>
  );
}
