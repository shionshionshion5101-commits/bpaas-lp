import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import WorkleInteractions from "../components/WorkleInteractions";
import Icon from "../components/Icon";

const PAGE_URL = "https://www.workle-kle.com/sns";
const CONSULT_URL = "/consult";
const X_URL = "https://x.com/Workle_shion";

export const metadata: Metadata = {
  title: "SNS運用代行（実装まで）| Workle — 月¥98,000・作れるチームが手を動かす",
  description:
    "発信が続かない会社の実行部隊になります。アカウント設計・月20本の投稿制作/運用・記事月2本・GA4計測と月次レポートまで、作れるエンジニア兼マーケターが提案で終わらず実装まで代行。月¥98,000。",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SNS運用代行（実装まで）| Workle",
    description:
      "発信が続かない会社の実行部隊に。投稿制作から記事・GA4計測・レポートまで実装ごと代行。月¥98,000。",
    url: PAGE_URL,
    siteName: "Workle",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SNS運用代行（実装まで）| Workle",
    description: "発信を、実務ごと引き取ります。月¥98,000。",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.workle-kle.com/#organization",
      name: "Workle",
      url: "https://www.workle-kle.com/",
      sameAs: [X_URL],
    },
    {
      "@type": "Service",
      name: "Workle SNS運用代行",
      serviceType: "SNS運用代行・コンテンツマーケティング",
      provider: { "@id": "https://www.workle-kle.com/#organization" },
      areaServed: "JP",
      offers: {
        "@type": "Offer",
        price: "98000",
        priceCurrency: "JPY",
        description: "月額¥98,000・アカウント設計・投稿制作/運用・記事制作・GA4計測レポート",
      },
      url: PAGE_URL,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Workle", item: "https://www.workle-kle.com/" },
        { "@type": "ListItem", position: 2, name: "SNS運用代行", item: PAGE_URL },
      ],
    },
  ],
};

export default function SnsLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static authored JSON-LD — not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <SiteNav
        active="sns"
        links={[
          { href: "#scope", label: "内容" },
          { href: "#why", label: "強み" },
          { href: "#price", label: "料金" },
        ]}
        cta={{ href: CONSULT_URL, label: "無料相談を予約" }}
      />

      <main id="top">

        {/* §1 HERO */}
        <section className="sv sv-hero" id="hero">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">POST IT.</p>
            <span className="sv-eyebrow"><Icon name="spark" className="sv-eyebrow-icon" />SNS運用代行 — 実装まで</span>
            <h1 className="sv-h" style={{ fontSize: "clamp(26px, 4vw, 46px)", maxWidth: 760 }}>
              発信が続かない会社の、<br />実行部隊になります。
            </h1>
            <p className="sv-sub">
              アカウント設計から投稿制作・運用、記事、GA4計測レポートまで。「作れるチーム」が、提案で終わらずその場で実装まで引き取ります。
            </p>
            <div className="sv-chips">
              <span className="sv-chip"><span className="sv-chip-num">¥98,000</span> / 月</span>
              <span className="sv-chip">月20本 投稿制作・運用</span>
              <span className="sv-chip">記事 月2本</span>
            </div>
            <div className="sv-cta-row">
              <Link href={CONSULT_URL} className="btn btn-primary">
                無料相談を予約する <span className="arr">→</span>
              </Link>
              <Link href="/sales" className="btn btn-ghost-cream">
                営業代行と併用する
              </Link>
            </div>
            <p className="sv-cta-note">15分 / オンライン / 費用・契約なし</p>
          </div>
        </section>

        {/* §2 提供内容 */}
        <section className="sv tight" id="scope">
          <div className="wrap">
            <span className="sv-eyebrow"><Icon name="clipboard" className="sv-eyebrow-icon" />提供内容</span>
            <h2 className="sv-h">毎月、これだけ手を動かします。</h2>
            <div className="sv-steps">
              <div className="sv-step">
                <div className="sv-step-n">01</div>
                <h3>アカウント設計</h3>
                <p>ターゲット・トンマナ・投稿方針・KPIを設計。プロフィールと固定投稿まで整えます。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">02</div>
                <h3>月20本 投稿制作・運用</h3>
                <p>X（旧Twitter）を中心に、月20本の投稿を企画・制作・運用まで。反応を見て毎月改善します。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">03</div>
                <h3>記事 月2本</h3>
                <p>Zenn・note・オウンドメディア向けの記事を月2本制作。検索とSNSの両輪で流入を作ります。</p>
              </div>
            </div>
            <div className="sv-note" style={{ marginTop: 22 }}>
              計測とレポートまで含みます — GA4・GTMの計測設置、月次で「何が伸びて、何が伸びなかったか」を実数で報告します。数字を盛らず、翌月の改善仮説とセットで渡します。
            </div>
          </div>
        </section>

        {/* §3 独自性 */}
        <section className="sv tight" id="why">
          <div className="wrap">
            <span className="sv-eyebrow"><Icon name="star" className="sv-eyebrow-icon" />Workleの独自性</span>
            <h2 className="sv-h">作れるチームだから、<br />提案で終わらない。</h2>
            <p className="sv-sub">
              多くのSNS代行は「投稿の外注」で止まります。Workleは外資ITでの開発経験を持つエンジニア兼マーケターが担当するため、LP改善・計測実装・自動化まで、その場で手を動かして完了させます。「作る」と「届ける」を分断しません。
            </p>

            {/* 投稿サンプル（イメージ） */}
            <div className="post-samples">
              <article className="post-mock">
                <div className="pm-head">
                  <span className="pm-av" />
                  <div className="pm-id"><b>Your Brand</b><span>@yourbrand</span></div>
                  <span className="pm-tag">サンプル</span>
                </div>
                <p className="pm-body">
                  「なぜ使われないか」を10人に聞いてみたら、機能じゃなくて“最初の3秒”で決まっていた。検証ログを公開します。
                </p>
                <div className="pm-foot" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1.9-5A8.4 8.4 0 1 1 21 11.5Z"/></svg>
                </div>
              </article>

              <article className="post-mock">
                <div className="pm-head">
                  <span className="pm-av" />
                  <div className="pm-id"><b>Your Brand</b><span>@yourbrand</span></div>
                  <span className="pm-tag">サンプル</span>
                </div>
                <p className="pm-body">
                  【事例】BtoB SaaSのフォーム営業を1ヶ月回した結果、返信率が変わったポイントは3つ。実際の文面を添えて解説します。
                </p>
                <div className="pm-foot" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1.9-5A8.4 8.4 0 1 1 21 11.5Z"/></svg>
                </div>
              </article>

              <article className="post-mock">
                <div className="pm-head">
                  <span className="pm-av" />
                  <div className="pm-id"><b>Your Brand</b><span>@yourbrand</span></div>
                  <span className="pm-tag">サンプル</span>
                </div>
                <p className="pm-body">
                  リリースして終わりにしない。GA4で「どこで離脱したか」を毎週見て、LPを直し続けた3週間の記録。
                </p>
                <div className="pm-foot" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1.9-5A8.4 8.4 0 1 1 21 11.5Z"/></svg>
                </div>
              </article>
            </div>
            <p className="sv-cta-note">※ 投稿サンプルはイメージです。トンマナ・テーマはアカウント設計時にすり合わせます。</p>

            {/* 運用フロー */}
            <div className="sv-flow" style={{ marginTop: "clamp(28px,3vw,40px)" }}>
              <div className="sv-flow-node">
                <span className="n-tag">STEP 01</span>
                <h3>設計</h3>
                <p>ターゲット・トンマナ・投稿方針・KPIを決める。</p>
              </div>
              <div className="sv-flow-arrow" aria-hidden="true">→</div>
              <div className="sv-flow-node">
                <span className="n-tag">STEP 02</span>
                <h3>制作・投稿</h3>
                <p>月20本の投稿と月2本の記事を制作・運用。</p>
              </div>
              <div className="sv-flow-arrow" aria-hidden="true">→</div>
              <div className="sv-flow-node">
                <span className="n-tag">STEP 03</span>
                <h3>計測・改善</h3>
                <p>GA4で数値を見て、翌月の投稿とLPを直す。</p>
              </div>
            </div>
          </div>
        </section>

        {/* §4 料金 + 併用割引 */}
        <section className="sv tight" id="price">
          <div className="wrap">
            <span className="sv-eyebrow"><Icon name="yen" className="sv-eyebrow-icon" />料金</span>
            <h2 className="sv-h">月¥98,000。<br />実装まで込み。</h2>
            <div className="sv-bigprice">
              <span className="amt">¥98,000</span>
              <span className="unit">/ 月</span>
            </div>
            <p className="sv-price-note" style={{ maxWidth: 620 }}>
              アカウント設計・月20本の投稿制作/運用・記事月2本・GA4計測・月次レポートまで含む。初期費用0円・最低契約期間なし・完全非同期。
            </p>
            <p className="sv-cta-note">
              ※ 営業代行との併用も可能です。詳しくは
              <Link href="/sales" style={{ color: "var(--orange)", textDecoration: "underline" }}>営業代行ページ</Link>
              をご覧ください。
            </p>
          </div>
        </section>

        {/* §5 FINAL CTA */}
        <section className="final-v2">
          <div className="wrap">
            <div className="final-v2-inner reveal">
              <p className="final-v2-en" aria-hidden="true">SHIP<br />CONTENT.</p>
              <p className="final-v2-jp">
                「発信しなきゃ」で止まっている時間を、実行に変える。<br />
                アカウントごと、実務を引き取ります。
              </p>
              <div className="final-v2-cta-row">
                <Link href={CONSULT_URL} className="btn btn-primary">
                  無料相談を予約する <span className="arr">→</span>
                </Link>
                <Link href="/sales" className="btn btn-ghost">
                  営業代行を見る
                </Link>
              </div>
              <p className="final-v2-note">最低契約期間なし · 完全非同期 · 会議は最小限</p>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
      <WorkleInteractions />
    </>
  );
}
