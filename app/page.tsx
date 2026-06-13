import { Suspense } from "react";
import { getAllMovements } from "@/lib/data/movements";
import { getAllWods } from "@/lib/data/wods";
import CrossFitDictionary from "@/components/CrossFitDictionary";
import IntroAnimation from "@/components/IntroAnimation";

export default async function Page() {
  const [movements, wods] = await Promise.all([getAllMovements(), getAllWods()]);

  return (
    <Suspense>
      <IntroAnimation />
      <div className="relative">
        {/* フレーム枠 */}
        <div className="inset-0 pointer-events-none mx-auto w-[375px] fixed z-30 before:absolute before:left-0 md:before:rounded-[24px] before:right-0 before:inset-y-0 before:border before:border-[#939393] before:border-3 before:content-[''] hidden md:block"></div>
        {/* 角丸マスク（4隅のみ） */}
        <div className="fixed inset-0 pointer-events-none mx-auto w-[375px] z-20 rounded-[24px] hidden md:block ">
          <div
            className="absolute top-0 left-0 w-6 h-6"
            style={{ background: "radial-gradient(circle at 100% 100%, transparent 23px, #262626 24px)" }}
          />
          <div
            className="absolute top-0 right-0 w-6 h-6"
            style={{ background: "radial-gradient(circle at 0% 100%, transparent 23px, #262626 24px)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-6 h-6"
            style={{ background: "radial-gradient(circle at 100% 0%, transparent 23px, #262626 24px)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-6 h-6"
            style={{ background: "radial-gradient(circle at 0% 0%, transparent 23px, #262626 24px)" }}
          />
        </div>
        {/* コンテンツ（ボディスクロール） */}
        <div className="relative z-10 mx-auto md:w-[375px]">
          <CrossFitDictionary movements={movements} wods={wods} />
        </div>
      </div>
    </Suspense>
  );
}
