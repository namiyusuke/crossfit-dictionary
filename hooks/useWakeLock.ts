"use client";

import { useEffect, useRef } from "react";

export function useWakeLock(enabled: boolean) {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (!enabled) {
      wakeLockRef.current?.release();
      return;
    }

    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        }
      } catch {
        // Wake Lock not supported or denied
      }
    };

    requestWakeLock();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && enabled) {
        requestWakeLock();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      wakeLockRef.current?.release();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled]);
}
