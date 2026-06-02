"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label }: { label: string }) {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm">
      ＜　{label}
    </button>
  );
}
