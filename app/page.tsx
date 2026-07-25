import Link from "next/link";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import WorkleInteractions from "./components/WorkleInteractions";

const TALLY_URL = "https://tally.so/r/5BrZLP";
const X_URL = "https://x.com/Workle_shion";

const FAQ_ITEMS = [
  {
    q: "解約はいつでもできますか？",
    a: "はい、いずれのサービスも最低契約期間はありません。月末までにご連絡いただければ翌月から解約でき、違約金・解約手数料は一切かかりません。",
  },
  {
    q: "対応できない業務はありますか？",
    a: "法律・税務・労務・医療など専門資格が必要な業務は直接対応しておらず、必要な場合は提携する専門家をご紹介します。また、違法行為・不正競争・個人情報の不正取得を伴う業務、各種ストアのレビュー操作などはお断りしています。",
  },
  {
    q: "ツールやアカウントの情報はどう管理されますか？",
    a: "業務に必要な最小限の権限のみをご共有いただきます。情報は業務目的以外に使用せず、契約終了後は速やかに削除・返却します。詳細はプライバシーポリシーをご覧ください。",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.workle-kle.com/#organization",
      name: "Workle",
      url: "https://www.workle-kle.com/",
      description:
        "実在ユーザーによる検証・フォーム営業・SNS運用まで、届ける実務を単品から代行するチーム。",
      sameAs: [X_URL],
    },
    {
      "@type": "Service",
      name: "リサーチ・ユーザーテスト代行",
      serviceType: "ユーザーテスト代行",
      provider: { "@id": "https://www.workle-kle.com/#organization" },
      areaServed: "JP",
      url: "https://www.workle-kle.com/test",
    },
    {
      "@type": "Service",
      name: "営業代行（成果報酬型）",
      serviceType: "営業代行",
      provider: { "@id": "https://www.workle-kle.com/#organization" },
      areaServed: "JP",
      url: "https://www.workle-kle.com/sales",
    },
    {
      "@type": "Service",
      name: "SNS運用代行",
      serviceType: "SNS運用代行",
      provider: { "@id": "https://www.workle-kle.com/#organization" },
      areaServed: "JP",
      url: "https://www.workle-kle.com/sns",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static authored JSON-LD — not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <SiteNav
        links={[
          { href: "/test", label: "リサーチ" },
          { href: "/sales", label: "営業代行" },
          { href: "/sns", label: "SNS運用" },
          { href: "#faq", label: "FAQ" },
        ]}
        cta={{ href: TALLY_URL, label: "無料相談を予約", external: true }}
      />

      <main id="top">

        {/* ====================================================
            §1 HERO — H1 は現行コピーを維持、CTAは置かず3カードへ誘導
            ==================================================== */}
        <section className="hero-v2" id="hero">
          <div className="hero-v2-inner">

            <div className="hero-v2-top">
              <p className="hero-en hero-load" aria-hidden="true">SHIP IT.</p>
              <div className="hero-load hero-load-d2">
                <h1 className="hero-h1">
                  いいプロダクトは、ある。<br />届ける手が、足りない。
                </h1>
                <p className="hero-h1-sub">
                  実在ユーザーによる検証、フォーム営業、SNS運用——届ける実務を、単品から代行します。
                </p>
              </div>
            </div>

            <div className="hero-v2-mid">
              <div className="hero-stack-wrap hero-load hero-load-d1" aria-hidden="true">
                <div className="hero-stack" id="hero-stack">
                  {/* front → mid → back の順に流れる（8秒ごと・JSで回転） */}
                  <div className="hcard" data-slot="front" data-status="queued">
                    <span className="hc-status queued">QUEUED</span>
                    <p className="hc-title">掲載打診 30件</p>
                    <div className="hc-prog-wrap">
                      <div className="hc-prog"><i /></div>
                      <span className="hc-meta">計測中</span>
                    </div>
                  </div>
                  <div className="hcard" data-slot="mid" data-status="prog">
                    <span className="hc-status prog">IN PROGRESS</span>
                    <p className="hc-title">B2Bフォーム営業</p>
                    <div className="hc-prog-wrap">
                      <div className="hc-prog"><i style={{ width: "67%" }} /></div>
                      <span className="hc-meta">67%</span>
                    </div>
                  </div>
                  <div className="hcard" data-slot="back" data-status="done">
                    <span className="hc-status done">DONE ✓</span>
                    <p className="hc-title">ユーザーテスト 10人</p>
                    <div className="hc-prog-wrap">
                      <div className="hc-prog"><i /></div>
                      <span className="hc-meta">計測中</span>
                    </div>
                  </div>
                </div>
                <div className="hero-scribble" aria-hidden="true">
                  <svg width="66" height="46" viewBox="0 0 66 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="scribble-wobble" x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" seed="4" result="n" />
                        <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" />
                      </filter>
                    </defs>
                    <g filter="url(#scribble-wobble)" stroke="#111111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
                      <path d="M6 8 C 20 2, 46 6, 58 30" />
                      <path d="M50 24 L58 31 L61 21" />
                    </g>
                  </svg>
                  <span className="scribble-word">non-stop</span>
                </div>
              </div>
            </div>

            <div className="hero-v2-bottom">
              <a href="#services" className="hero-scroll-cue hero-load hero-load-d2" aria-label="サービス一覧へスクロール">
                <span className="cue-arrow">↓</span> 3つのサービスを見る
              </a>
              <p className="hero-en hero-load hero-load-d1" aria-hidden="true">THEN SELL IT.</p>
            </div>

          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee-v2" aria-hidden="true">
          <div className="marquee-v2-inner">
            {[
              "USER TESTING ¥19,800〜",
              "FORM OUTREACH 300社/MO",
              "NO MEETINGS",
              "SNS MARKETING 月20本",
              "SHIP IT TODAY →",
              "B2B OUTBOUND 月500件",
              "NON-STOP ASYNC",
              "USER TESTING ¥19,800〜",
              "FORM OUTREACH 300社/MO",
              "NO MEETINGS",
              "SNS MARKETING 月20本",
              "SHIP IT TODAY →",
              "B2B OUTBOUND 月500件",
              "NON-STOP ASYNC",
            ].map((item, i) => (
              <span key={i} className="marquee-v2-item">
                {item}
                <span className="marquee-v2-sep" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>

        {/* ====================================================
            §2 SERVICES — 3商品カード → スポーク
            ==================================================== */}
        <section className="services-v2" id="services">
          <div className="wrap">
            <div className="services-v2-head reveal">
              <h2 className="services-v2-title">OUR SERVICES</h2>
              <p className="services-v2-sub">届ける実務を、単品から。3つのメニュー。</p>
              <a href={TALLY_URL} target="_blank" rel="noopener noreferrer" className="rotating-badge-wrap" aria-label="無料相談を予約する">
                <svg className="rotating-badge" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="98" fill="#FF5A1F" />
                  <circle cx="100" cy="100" r="9" fill="white" />
                  <defs>
                    <path id="svc-badge-path" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                  </defs>
                  <text fill="white" fontFamily="Anton, var(--font-anton), sans-serif" fontSize="13.5" letterSpacing="4.5">
                    <textPath href="#svc-badge-path" startOffset="0%">
                      LET&apos;S SHIP IT →&nbsp; LET&apos;S SHIP IT →&nbsp;
                    </textPath>
                  </text>
                </svg>
              </a>
            </div>

            <div className="services-v2-grid">
              <Link href="/test" className="svc-card reveal">
                <div className="svc-card-num">01</div>
                <div className="svc-card-tag">Research &amp; Test</div>
                <h3 className="svc-card-title">リサーチ</h3>
                <p className="svc-card-desc">なぜ使われないのか、実在の10人が答えます。</p>
                <p className="svc-card-price">¥19,800<span className="unit">〜</span></p>
                <span className="svc-card-cta">詳しく見る <span className="arr">→</span></span>
              </Link>

              <Link href="/sales" className="svc-card reveal d1">
                <div className="svc-card-num">02</div>
                <div className="svc-card-tag">Sales Outreach</div>
                <h3 className="svc-card-title">営業代行</h3>
                <p className="svc-card-desc">商談を、固定＋成果報酬で作ります。</p>
                <p className="svc-card-price">¥50,000<span className="unit">＋¥20,000/商談</span></p>
                <span className="svc-card-cta">詳しく見る <span className="arr">→</span></span>
              </Link>

              <Link href="/sns" className="svc-card reveal d2">
                <div className="svc-card-num">03</div>
                <div className="svc-card-tag">SNS Marketing</div>
                <h3 className="svc-card-title">SNS運用</h3>
                <p className="svc-card-desc">発信を、実務ごと引き取ります。</p>
                <p className="svc-card-price">¥98,000<span className="unit">/月</span></p>
                <span className="svc-card-cta">詳しく見る <span className="arr">→</span></span>
              </Link>
            </div>
          </div>
        </section>

        {/* ====================================================
            §3 一気通貫 — 診断から、実行まで
            ==================================================== */}
        <section className="sv stack-light" id="why">
          <div className="wrap">
            <p className="sv-en reveal" aria-hidden="true">DIAGNOSE
              <br />THEN SHIP.</p>
            <span className="sv-eyebrow">Workleの独自性</span>
            <h2 className="sv-h">診断から、実行まで。</h2>
            <p className="sv-sub">
              多くの代行会社は「実行」だけを売ります。Workleは実在ユーザーの検証で課題を特定してから実行に入るため、打ち手が外れません。
            </p>
            <div className="sv-flow">
              <div className="sv-flow-node">
                <span className="n-tag">診断</span>
                <h3>検証で課題を特定</h3>
                <p>実在ユーザーが使い、「なぜ売れないか」を先に突き止める。</p>
              </div>
              <div className="sv-flow-arrow" aria-hidden="true">→</div>
              <div className="sv-flow-node">
                <span className="n-tag">実行</span>
                <h3>営業 / SNSで届ける</h3>
                <p>特定した課題に合わせて、商談づくりと発信を実行する。</p>
              </div>
              <div className="sv-flow-arrow" aria-hidden="true">→</div>
              <div className="sv-flow-node">
                <span className="n-tag">改善</span>
                <h3>数字で回し続ける</h3>
                <p>実数レポートで効いた打ち手を残し、また測って直す。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            §4 TEAM
            ==================================================== */}
        <section className="section-light" id="team" style={{ paddingTop: 64 }}>
          <div className="wrap">
            <p className="sxn-en reveal" aria-hidden="true">THE TEAM.</p>

            <div className="reveal" style={{ marginBottom: 48 }}>
              <span className="eyebrow">実働チーム</span>
              <h2 className="h-sec">手を動かすのは、<br />現場の一流。</h2>
              <p className="sub">匿名のクラウドワーカーではありません。</p>
            </div>

            <div className="team-grid">
              {/* 片倉詩音 */}
              <article className="team-card reveal">
                <div className="team-avatar avatar-rep" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5" />
                  </svg>
                </div>
                <div className="team-role-label">統括・戦略設計・クロージング</div>
                <div className="team-meta">
                  <span className="team-name">片倉詩音</span>
                  <a href={X_URL} target="_blank" rel="noopener noreferrer" className="team-x-link" aria-label="片倉詩音のXアカウント">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.844L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    @Workle_shion
                  </a>
                </div>
                <div className="team-role-tag">Workle 代表 / growth &amp; biz-dev</div>
                <div className="team-career">大手メガベンチャー / 新規事業開発 · スキマバイトプラットフォーム大手でアウトバウンド営業組織の立ち上げを経験</div>
                <p className="team-bio">
                  事業開発・グロース設計・パートナーシップ構築を担当。<br />
                  Growthでは「何から手をつけるか」の戦略設計から実行プランの組み立てまで巻き取ります。
                </p>
              </article>

              {/* B2Bセールス担当 */}
              <article className="team-card reveal d1">
                <div className="team-avatar avatar-sales" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <div className="team-role-label">① 営業代行の顔</div>
                <div className="team-meta">
                  <span className="team-name">B2Bセールス担当</span>
                </div>
                <div className="team-role-tag">b2b sales</div>
                <div className="team-career">大手人材業界で全国トップクラスの営業実績</div>
                <p className="team-bio">
                  リスト構築 → アポ → 商談 → フォローまで、BtoB営業を一気通貫で代行。<br />
                  広告からDX・ブランディングまで、幅広い商材を売ってきた現場力で、あなたのプロダクトを売り切ります。
                </p>
              </article>

              {/* エンジニア兼マーケター */}
              <article className="team-card reveal d2">
                <div className="team-avatar avatar-eng" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div className="team-role-label">② SNSマーケ代行の顔</div>
                <div className="team-meta">
                  <span className="team-name">エンジニア兼マーケター</span>
                </div>
                <div className="team-role-tag">eng &amp; marketing</div>
                <div className="team-career">外資大手IT企業でのエンジニア経験・マーケティング実務を兼ね備える</div>
                <p className="team-bio">
                  SNS運用・広報戦略・広告プランニングから撮影・編集まで、マーケの実行を丸ごと。<br />
                  Webアプリ開発・UI/UX・AI駆動開発まで対応し、「作る」と「届ける」を分断せず一人で最後まで。
                </p>
              </article>
            </div>

          </div>
        </section>

        {/* ====================================================
            §5 FAQ — 全商品共通の3つ
            ==================================================== */}
        <section className="section-light" id="faq" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 40 }}>
              <span className="eyebrow">FAQ</span>
              <h2 className="h-sec" style={{ textAlign: "center" }}>よくある質問</h2>
              <p className="sub" style={{ textAlign: "center" }}>各サービス固有の質問は、それぞれの詳細ページに記載しています。</p>
            </div>
            <div className="faq-list reveal">
              {FAQ_ITEMS.map(({ q, a }) => (
                <details className="faq-item" key={q}>
                  <summary className="faq-q">{q}</summary>
                  <div className="faq-a">
                    <p>{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================
            §6 CLOSING
            ==================================================== */}
        <section className="final-v2">
          <div className="wrap">
            <div className="final-v2-inner reveal">
              <p className="final-v2-en" aria-hidden="true">SHIP IT.<br />SELL IT.</p>
              <p className="final-v2-jp">
                会議の予定で、カレンダーを埋めるのは終わり。<br />
                届ける実務は、単品から投げればいい。
              </p>
              <div className="final-v2-cta-row">
                <Link href="/test" className="btn btn-primary">リサーチ <span className="arr">→</span></Link>
                <Link href="/sales" className="btn btn-ghost">営業代行 <span className="arr">→</span></Link>
                <Link href="/sns" className="btn btn-ghost">SNS運用 <span className="arr">→</span></Link>
              </div>
              <p className="final-v2-note">最低契約期間なし · 完全非同期 · 単品から</p>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
      <WorkleInteractions />
    </>
  );
}
