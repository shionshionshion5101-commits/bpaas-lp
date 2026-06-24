import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Workle — つくる・売る・本業。ぜんぶは、回らない。",
  description:
    "マーケと営業の実務を、まるごと外に出す。元メガベンチャー事業開発・大手人材業界トップセールス・外資ITエンジニアの実働チームが、あなたの代わりに手を動かします。会議ゼロの非同期Starterから、伴走型のGrowthまで。",
  verification: {
    google: "am8KdpmW-IX04lXlUkB5oLB7MGf-83Q1XANY8BMSMVU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Japanese fonts: Google dynamic subsetting is far more efficient than self-hosting (10MB+ CJK files) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-JDW1QX1NR2" />
    </html>
  );
}
