import type { Metadata } from "next";
import { Noto_Sans_JP, Dela_Gothic_One, Orbitron } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AutoAnonymousLogin from "@/components/AutoAnonymousLogin";
import BackgroundDecoration from "@/components/BackgroundDecoration";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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

export const metadata: Metadata = {
  title: "CrossFit 種目辞典 | 初心者向けクロスフィット種目ガイド",
  description:
    "クロスフィット初心者向けの種目辞典。20種目の動き・ポイント・達成ロードマップを日本語で直感的に理解できます。",
  openGraph: {
    title: "CrossFit 種目辞典",
    description: "クロスフィット初心者向けの種目辞典。種目名をタップするだけで動き・ポイント・達成ロードマップを確認。",
    type: "website",
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
      className={cn(
        "h-full",
        "antialiased",
        notoSansJP.variable,
        orbitron.variable,
        delaGothicOne.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary ">
        <div className="">
          <BackgroundDecoration />
          <div className=" md:max-w-[375px] md:mx-auto relative z-100  min-h-screen">
            <AutoAnonymousLogin />
            <NuqsAdapter>{children}</NuqsAdapter>
          </div>
        </div>
      </body>
    </html>
  );
}
