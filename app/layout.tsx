import type { Metadata } from "next";
import { Geist, Geist_Mono, M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 見出し用の丸ゴシック（"Workle = work がくるくる" の親しみやすさを表現）
const rounded = M_PLUS_Rounded_1c({
  weight: ["700", "800"],
  variable: "--font-rounded",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Workle — コードを書いたら、1秒で市場にShipする",
  description:
    "初期マーケティング・営業の泥臭い実行をすべて代行。Notionにタスクを積むだけで、エンジニアとセールスが動きます。個人開発者・Micro-SaaS向け Indie Plan ¥30,000/月から。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${rounded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
