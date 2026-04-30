import type { Metadata } from "next";
import { Noto_Sans_JP, Space_Mono } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CrossFit 種目辞典 | 初心者向けクロスフィット種目ガイド",
  description:
    "クロスフィット初心者向けの種目辞典。20種目の動き・ポイント・達成ロードマップを日本語で直感的に理解できます。",
  openGraph: {
    title: "CrossFit 種目辞典",
    description:
      "クロスフィット初心者向けの種目辞典。種目名をタップするだけで動き・ポイント・達成ロードマップを確認。",
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
      className={`${notoSansJP.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
