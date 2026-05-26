"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function MoodBackLink({ children, className }: { children: React.ReactNode; className?: string }) {
  const searchParams = useSearchParams();
  const mood = searchParams.get("mood");
  return (
    <Link href={`/?section=WOD${mood ? `&mood=${mood}` : ""}`} className={className}>
      {children}
    </Link>
  );
}
