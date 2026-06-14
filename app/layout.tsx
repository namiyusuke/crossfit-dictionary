import type { Metadata } from "next";
import { Noto_Sans_JP, Dela_Gothic_One, Orbitron } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AutoAnonymousLogin from "@/components/AutoAnonymousLogin";
import BackgroundDecoration from "@/components/BackgroundDecoration";
import IntroAnimation from "@/components/IntroAnimation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { MotionConfig, LazyMotion, domAnimation } from "motion/react";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

const delaGothicOne = Dela_Gothic_One({
  variable: "--font-dela-gothic",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// 本番ドメイン。プレビュー環境などでは NEXT_PUBLIC_SITE_URL で上書きできる。
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wodex.attcraft.com";
const siteName = "CrossFit 種目辞典";
const siteDescription =
  "クロスフィット初心者向けの種目辞典。種目の動き・ポイント・達成ロードマップや、気分で選べるWODを日本語で直感的に確認できます。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | 初心者向けクロスフィット種目ガイド`,
    // 子ページ(種目・WOD詳細)の title に自動で付与される接尾辞
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "クロスフィット",
    "CrossFit",
    "種目",
    "辞典",
    "WOD",
    "初心者",
    "トレーニング",
    "ワークアウト",
    "AMRAP",
    "EMOM",
    "For Time",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName,
    title: siteName,
    description: siteDescription,
    // app/opengraph-image.png が自動で OG 画像として使われる
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      // CSS ロード前(next dev の FOUC や CSS 遅延)に既定の白背景が一瞬見える
      // 「白フラッシュ」を防ぐため、背景色は CSS に依存しないインラインでも指定する。
      style={{ backgroundColor: "#0a0a0a" }}
      className={cn(
        "h-full",
        "antialiased",
        notoSansJP.variable,
        orbitron.variable,
        delaGothicOne.variable,
        "font-sans",
      )}
    >
      {/* 2回目以降はパース時にCSSでintroを隠し、描画前にちらつきを防ぐ */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("intro-played"))document.documentElement.classList.add("intro-played")}catch(_){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text-primary ">
        <div className="">
          <BackgroundDecoration />
          <div className=" lg:max-w-[375px] lg:mx-auto relative z-100 bg-gray min-h-screen">
            <AutoAnonymousLogin />
            {/* LazyMotion + domAnimation で motion の全機能バンドル(約30kb)を遅延ロードし、
                各コンポーネントは軽量な `m` を使う。reducedMotion="user" は OS の
                「視差効果を減らす」設定に全 motion を追従させる (WCAG 2.3.3)。 */}
            <LazyMotion features={domAnimation}>
              <MotionConfig reducedMotion="user">
                {/* イントロの覆いは nuqs(useSearchParams) を含む page の <Suspense> の外で描画する。
                    page 側に置くと、その Suspense が静的プリレンダー時に
                    BAILOUT_TO_CLIENT_SIDE_RENDERING でクライアント送りになり、覆いが
                    初期HTMLに出ず「本体が先に見えてからイントロが被る」ちらつきになるため。 */}
                <IntroAnimation />
                <NuqsAdapter>{children}</NuqsAdapter>
              </MotionConfig>
            </LazyMotion>
          </div>
        </div>
      </body>
    </html>
  );
}
