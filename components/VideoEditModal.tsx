"use client";

import { useState } from "react";

interface VideoEditModalProps {
  currentVideoId: string;
  onSave: (videoId: string) => void;
  onClose: () => void;
}

function extractVideoId(input: string): string | null {
  const trimmed = input.trim();

  // ベアID（11文字の英数字・ハイフン・アンダースコア）
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // YouTube URL各形式
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export default function VideoEditModal({
  currentVideoId,
  onSave,
  onClose,
}: VideoEditModalProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    const videoId = extractVideoId(input);
    if (videoId) {
      onSave(videoId);
      onClose();
    } else {
      setError("有効なYouTube URLまたはVideo IDを入力してください");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-card-bg rounded-2xl p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-text-primary mb-4">
          参考動画を変更
        </h3>
        <p className="text-sm text-text-secondary mb-2">
          現在のVideo ID: {currentVideoId}
        </p>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          placeholder="YouTube URL または Video ID"
          className="w-full px-4 py-3 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-text-secondary/30 mb-2"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-border text-text-secondary hover:bg-border/30 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-lg bg-text-primary text-background font-medium hover:opacity-90 transition-opacity"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
