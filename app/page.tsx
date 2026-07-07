import { Suspense } from "react";
import { getAllMovements } from "@/lib/data/movements";
import { getAllWods } from "@/lib/data/wods";
import CrossFitDictionary from "@/components/CrossFitDictionary";
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wodex.attcraft.com";
const siteName = "CrossFit 種目辞典";
const siteDescription =
  "クロスフィット初心者向けの種目辞典。種目の動き・ポイント・達成ロードマップや、気分で選べるWODを日本語で直感的に確認できます。";

export default async function Page() {
  const [movements, wods] = await Promise.all([getAllMovements(), getAllWods()]);

  // サイト全体(WebSite)と種目一覧(ItemList)の構造化データ。
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    inLanguage: "ja",
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "クロスフィット種目一覧",
    numberOfItems: movements.length,
    itemListElement: movements.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/movement/${m.id}`,
      name: m.name,
    })),
  };

  return (
    <Suspense>
      <JsonLd data={[websiteLd, itemListLd]} />
      {/*
        トップの本体(CrossFitDictionary)は localStorage のハイドレーション完了まで
        null を返すため、初期HTMLに種目コンテンツも内部リンクも出ない。
        クローラ向けに、SSRで必ず出力される見出し・説明・全詳細ページへのリンクを
        sr-only で用意する（ハイドレーション後に表示されるUIと同じ導線）。
      */}
      <section className="sr-only">
        <h1>
          {siteName} | 初心者向けクロスフィット種目ガイド
        </h1>
        <p>{siteDescription}</p>
        <nav aria-label="種目一覧">
          <h2>種目一覧</h2>
          <ul>
            {movements.map((m) => (
              <li key={m.id}>
                <a href={`/movement/${m.id}`}>
                  {m.name}（{m.nameEn}）
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="WOD一覧">
          <h2>WOD一覧</h2>
          <ul>
            {wods.map((w) => (
              <li key={w.id}>
                <a href={`/wod/${w.id}`}>
                  {w.name}（{w.format}・{w.level}）
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <div className="relative">
        {/* フレーム枠 */}
        <div className="inset-0 pointer-events-none mx-auto w-[375px] fixed z-30 before:absolute before:left-0 md:before:rounded-[24px] before:right-0 before:inset-y-0 before:border before:border-[#939393] before:border-3 before:content-[''] hidden lg:block"></div>
        {/* 角丸マスク（4隅のみ） */}
        <div className="fixed inset-0 pointer-events-none mx-auto w-[375px] z-20 rounded-[24px] hidden lg:block ">
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
        <div className="relative z-10 mx-auto lg:w-[375px]">
          <CrossFitDictionary movements={movements} wods={wods} />
        </div>
      </div>
    </Suspense>
  );
}
