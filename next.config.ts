import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 旧Starterページ（個人開発向け営業代行）はリサーチLPへ集約
      { source: "/starter", destination: "/test", permanent: true },
      // 旧Growthページ（法人向け）は営業代行LPへ集約
      { source: "/growth", destination: "/sales", permanent: true },
      // 旧単独ページはハブ内アンカーへ集約
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/team", destination: "/#team", permanent: true },
      // 企業向けリサーチは /test に統合（価格差の理由をページ内に明記したため分離不要）
      { source: "/test-biz", destination: "/test#pricing", statusCode: 301 },
    ];
  },
};

export default nextConfig;
