"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function MoodBackLinkInner({ children, className }: { children: React.ReactNode; className?: string }) {
  const searchParams = useSearchParams();
  const mood = searchParams.get("mood");
  return (
    <Link href={`/?section=WOD${mood ? `&mood=${mood}` : ""}`} className={className}>
      {children}
    </Link>
  );
}

export default function MoodBackLink({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Suspense
      fallback={
        <Link href="/?section=WOD" className={className}>
          {children}
        </Link>
      }
    >
      <MoodBackLinkInner className={className}>{children}</MoodBackLinkInner>
    </Suspense>
  );
}
