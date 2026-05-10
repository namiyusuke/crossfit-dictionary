"use client";

import { useState } from "react";
import { Pause, Play, X } from "lucide-react";

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
          className="w-14 h-14 rounded-full border border-border flex items-center justify-center  active:scale-95 transition-transform"
        >
          <X size={24} />
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="w-16 h-16 rounded-full flex items-center justify-center text-black active:scale-95 transition-transform"
          style={{ backgroundColor: formatColor }}
        >
          {isPaused ? <Play size={28} fill="black" /> : <Pause size={28} fill="black" />}
        </button>
      </div>

      {/* 中止確認ダイアログ */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70">
          <div className="bg-card-bg border border-border rounded-2xl p-6 mx-8 max-w-sm w-full">
            <p className="text-lg font-bold mb-2">本当にやめますか？</p>
            <p className="text-sm  mb-6">このワークアウトの記録は保存されません。</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-border text-text-primary font-medium active:scale-95 transition-transform"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={onQuit}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-medium active:scale-95 transition-transform"
              >
                やめる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
