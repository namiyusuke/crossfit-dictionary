"use client";

import { useState } from "react";
import { Pause, Play, X } from "lucide-react";
import { FORMAT_COLORS } from "@/lib/timer-utils";
interface TimerControlsProps {
  isPaused: boolean;
  onToggle: () => void;
  onQuit: () => void;
  formatColor: string;
}

export default function TimerControls({ isPaused, onToggle, onQuit, formatColor }: TimerControlsProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <>
      <div className="flex items-center justify-center gap-8">
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="w-12 h-12 rounded-full border-[3px] flex items-center justify-center border-white"
        >
          <X size={24} />
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="w-12 h-12 rounded-full flex items-center justify-center text-black bg-green"
        >
          {isPaused ? (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 2.92159C0 0.669922 2.44183 -0.732411 4.38667 0.401589L12.2932 5.01459C14.2217 6.13925 14.2217 8.92759 12.2932 10.0534L4.38667 14.6653C2.44183 15.7993 0 14.3969 0 12.1453V2.92159ZM3.50467 1.91359C3.32737 1.81013 3.12591 1.75528 2.92063 1.75458C2.71535 1.75389 2.51352 1.80736 2.33552 1.90962C2.15752 2.01187 2.00965 2.15929 1.90685 2.33697C1.80404 2.51465 1.74994 2.71631 1.75 2.92159V12.1453C1.74994 12.3505 1.80404 12.5522 1.90685 12.7299C2.00965 12.9076 2.15752 13.055 2.33552 13.1572C2.51352 13.2595 2.71535 13.313 2.92063 13.3123C3.12591 13.3116 3.32737 13.2567 3.50467 13.1533L11.4112 8.54142C11.5874 8.43871 11.7337 8.29158 11.8353 8.11471C11.9369 7.93785 11.9904 7.73742 11.9904 7.53342C11.9904 7.32943 11.9369 7.129 11.8353 6.95213C11.7337 6.77526 11.5874 6.62813 11.4112 6.52542L3.50467 1.91359Z"
                fill="black"
              />
            </svg>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H4C4.55228 15 5 14.5523 5 14V2C5 1.44772 4.55228 1 4 1Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M12 1H10C9.44772 1 9 1.44772 9 2V14C9 14.5523 9.44772 15 10 15H12C12.5523 15 13 14.5523 13 14V2C13 1.44772 12.5523 1 12 1Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* 中止確認ダイアログ */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70">
          <div className="bg-black rounded-2xl p-6 px-14 max-w-sm w-full">
            <p className="text-[20px] font-black mb-4">本当にやめますか？</p>
            <p className="text-sm  mb-6">
              このワークアウトの記録は
              <br />
              保存されません。
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-border border-green font-black "
              >
                つづける
              </button>
              <button type="button" onClick={onQuit} className="flex-1 py-3 rounded-xl bg-green text-black font-black">
                やめる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
