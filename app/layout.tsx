import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.workle-kle.com"),
  title: "Workle — いいプロダクトは、ある。届ける手が、足りない。",
  description:
    "マーケと営業の実務を、まるごと外に出す。元メガベンチャー事業開発・大手人材業界トップセールス・外資ITエンジニアの実働チームが、あなたの代わりに手を動かします。",
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
    <html lang="ja" className={jetbrainsMono.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Zen Kaku Gothic New: headings — Noto Sans JP: body */}
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-JDW1QX1NR2" />
    </html>
  );
}
