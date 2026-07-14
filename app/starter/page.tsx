import type { Metadata } from "next";
import Link from "next/link";
import WorkleInteractions from "../components/WorkleInteractions";

const PAGE_URL = "https://www.workle-kle.com/starter";
const STRIPE_URL = "https://buy.stripe.com/4gM7sL5unbqh7TpflV3F600";
const DEMO_BOARD_URL =
  "https://app.notion.com/p/Workle-Board-Demo-37d8c4486f5281ca8a70fe5ac1572dab";
const X_URL = "https://x.com/Workle_shion";

export const metadata: Metadata = {
  title: "個人開発の営業代行・マーケティング外注 | Workle Starter — 月¥50,000・完全非同期",
  description:
    "個人開発者専用の営業代行・マーケティング外注。月¥50,000のクレジット制で、営業リスト構築・フォーム営業・SNS運用・LP改善をプロチームが代行。会議ゼロ・完全非同期、Notionにタスクを投げるだけ。最低契約期間なし。",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "個人開発の営業代行・マーケ外注 | Workle Starter",
    description:
      "月¥50,000で、個人開発の「売る」を外注する。会議ゼロ・完全非同期・最低契約期間なし。",
    url: PAGE_URL,
    siteName: "Workle",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "個人開発の営業代行・マーケ外注 | Workle Starter",
    description:
      "月¥50,000で、個人開発の「売る」を外注する。会議ゼロ・完全非同期・最低契約期間なし。",
  },
};

const FAQ_ITEMS = [
  {
    q: "個人でも営業代行を契約できますか？法人でなくても大丈夫？",
    a: "はい、個人のまま契約できます。Workle Starterは個人開発者向けに設計されたプランで、契約書のやりとりや請求書払いは不要、クレジットカード決済だけで翌営業日から稼働します。屋号や法人格の有無は問いません。",
  },
  {
    q: "月5万円で具体的に何をしてもらえますか？",
    a: "毎月10クレジットが付与され、メニューから自由に使えます。例：ターゲットリスト抽出100件で3クレジット、B2Bフォーム営業100社で4クレジット、SNS投稿作成10本で3クレジット、LP改善診断で5クレジットなど。組み合わせは毎月変えられます。",
  },
  {
    q: "なぜ相場より安い月5万円でできるのですか？",
    a: "会議・日程調整・定例レポート会をすべて廃止し、Notionボード上の非同期テキストコミュニケーションに一本化しているためです。一般的な営業代行の価格には営業担当の会議工数が含まれます。Workleはその工数を実務だけに使います。",
  },
  {
    q: "実績や事例はありますか？",
    a: "公開できる導入事例は現在準備中です。代わりに、Workle自身の営業・マーケティングの過程を、数字を盛らずにX（@Workle_shion）で公開しています。どんな手を打ち、何が失敗したかまで見た上でご判断ください。",
  },
  {
    q: "解約はいつでもできますか？クレジットは繰り越せますか？",
    a: "最低契約期間はなく、月末までのご連絡で翌月から解約できます。違約金はありません。未消化クレジットの翌月繰り越しはできず、当月末に失効します。",
  },
  {
    q: "どんなプロダクトに向いていますか？",
    a: "B2B向けのSaaS・ツール・受託サービスは、リスト構築とフォーム営業・アウトリーチが直接効くため特に相性が良いです。B2C向けプロダクトはSNS運用・コンテンツ制作を中心に組み立てます。どちらか迷う場合は、タスクとして「届け方の診断」を投げることもできます。",
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
      sameAs: [X_URL],
    },
    {
      "@type": "Service",
      name: "Workle Starter — 個人開発者向け営業代行・マーケティング代行",
      serviceType: "営業代行・マーケティング代行",
      provider: { "@id": "https://www.workle-kle.com/#organization" },
      areaServed: "JP",
      audience: { "@type": "Audience", audienceType: "個人開発者・Micro-SaaS運営者" },
      offers: {
        "@type": "Offer",
        price: "50000",
        priceCurrency: "JPY",
        description: "月額¥50,000・クレジット制・最低契約期間なし",
      },
      url: PAGE_URL,
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Workle", item: "https://www.workle-kle.com/" },
        { "@type": "ListItem", position: 2, name: "Starter", item: PAGE_URL },
      ],
    },
  ],
};

export default function StarterLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static authored JSON-LD — not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* NAV */}
      <header className="nav" id="nav">
        <div className="wrap nav-in">
          <Link className="brand" href="/" aria-label="Workle トップへ">
            <span className="brand-mark">
              <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="brand-name">Workle</span>
          </Link>
          <nav className="nav-links">
            <a href="#how">仕組み</a>
            <a href="#menu">メニュー</a>
            <a href="#price">料金</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-cta">
            <Link href="/" className="btn btn-ghost nav-ghost-btn">
              法人の方はこちら
            </Link>
            <a
              href={STRIPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: "9px 16px", fontSize: 13 }}
            >
              Starterを始める
            </a>
          </div>
        </div>
      </header>

      <main id="top">

        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-in">
            <h1 className="reveal">
              <span className="ln">個人開発の営業とマーケ、</span>
              <span className="ln"><span style={{ color: "var(--accent)" }}>月5万円</span>で外注する。</span>
            </h1>
            <p className="hero-sub reveal d1">
              Workle Starterは、個人開発者専用の<span className="nowrap">営業代行・マーケティング外注</span>サービス。<br />
              打ち合わせは一切なし。Notionのボードにタスクを置けば、<br />
              プロの実働チームが非同期で<span className="nowrap">リスト構築からSNS運用まで</span>代行します。
            </p>
            <div className="hero-cta-row reveal d2">
              <a
                href={STRIPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Starterを始める（¥50,000/月） <span className="arr">→</span>
              </a>
              <a
                href={DEMO_BOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                サンプルボードを見る
              </a>
            </div>
            <p className="hero-cta-note reveal d2">
              クレジットカード決済 / 最低契約期間なし / 翌営業日稼働
            </p>
          </div>
        </section>

        {/* 痛み — なぜ個人開発に営業代行か */}
        <section className="section-dark" id="why" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="reveal">
              <span className="eyebrow">なぜ個人開発に営業代行か</span>
              <h2 className="h-sec">作る力と、売る力は、<br />別物。</h2>
              <p className="sub">
                AIとノーコードで「作る」のハードルは下がりました。個人開発者が本当に詰まるのは、その先の集客と営業です。
              </p>
            </div>
            <ul className="pain-list reveal d1">
              <li>リリースポストが数十インプレッションのまま流れて終わった</li>
              <li>Product Huntに上げたが、使ってくれたのは知り合いだけ</li>
              <li>マーケの勉強をする時間があるなら、機能開発に使いたい</li>
              <li>営業代行を調べたら、法人向けばかりで月50万円〜だった</li>
            </ul>
            <p className="lp-prose reveal d1">
              個人開発者がこれまで営業代行やマーケティング外注を使えなかった理由は、価格と形式です。相場は月数十万円、定例会議と半年契約が前提で、個人が「ちょっと売る部分だけ任せる」ことはできませんでした。Workle Starterは、その前提を設計から外した個人開発者専用プランです。
            </p>
          </div>
        </section>

        {/* 仕組み */}
        <section className="section-dark" id="how" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="reveal" style={{ marginBottom: 48 }}>
              <span className="eyebrow">仕組み</span>
              <h2 className="h-sec">投げてから、<br />寝て待つだけ。</h2>
              <p className="sub">
                タスクをNotionの専用ボードに置くだけ。プロチームが非同期で受け取り、稼働し、完了を積み上げます。
              </p>
              <p className="strike-note">
                <s>Zoom</s> ・ <s>定例会議</s> ・ <s>日程調整</s> — すべて不要。テキストで完結。
              </p>
            </div>
            <div className="steps">
              <div className="step reveal">
                <div className="step-n">STEP 01</div>
                <div className="step-status request">REQUEST</div>
                <h3>投げる</h3>
                <p>専用Notionボードの「リクエスト」にタスクカードを置くだけ。仕様書も口頭説明も会議もいりません。</p>
              </div>
              <div className="step reveal d1">
                <div className="step-n">STEP 02</div>
                <div className="step-status inprogress">IN PROGRESS</div>
                <h3>稼働する</h3>
                <p>チームが非同期で受け取り稼働中へ。原則3営業日以内に着手し、進捗はカード上で可視化されます。</p>
              </div>
              <div className="step reveal d2">
                <div className="step-n">STEP 03</div>
                <div className="step-status done">DONE</div>
                <h3>積み上がる</h3>
                <p>完遂したタスクは「完了」へ。成果物はボードに残り、いつでも確認できます。</p>
              </div>
            </div>
            <div className="mid-cta reveal d2">
              <a
                href={DEMO_BOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                サンプルボードを見る
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <p className="mid-cta-note">読み取り専用のデモNotionボードを公開中</p>
            </div>
          </div>
        </section>

        {/* メニュー */}
        <section className="section-dark" id="menu" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="reveal" style={{ marginBottom: 40 }}>
              <span className="eyebrow">メニュー</span>
              <h2 className="h-sec">営業もマーケも、<br />タスク単位で頼める。</h2>
              <p className="sub">
                毎月10クレジットを、必要なメニューに自由に配分。営業もSNSも、月ごとに組み替えられます。
              </p>
            </div>
            <div className="starter-menu reveal d1">
              <div className="starter-menu-head">
                <span>メニュー</span>
                <span>クレジット</span>
              </div>
              <div className="starter-menu-row">
                <span>リスト抽出（100件）</span>
                <span className="credit-badge">3 pt</span>
              </div>
              <div className="starter-menu-row">
                <span>競合リサーチ</span>
                <span className="credit-badge">2 pt</span>
              </div>
              <div className="starter-menu-row">
                <span>Xアウトリーチ（50通）</span>
                <span className="credit-badge">3 pt</span>
              </div>
              <div className="starter-menu-row">
                <span>B2Bフォーム営業（100社）</span>
                <span className="credit-badge">4 pt</span>
              </div>
              <div className="starter-menu-row">
                <span>SNS投稿作成（10本）</span>
                <span className="credit-badge">3 pt</span>
              </div>
              <div className="starter-menu-row">
                <span>LP改善診断</span>
                <span className="credit-badge">5 pt</span>
              </div>
              <div className="starter-menu-row">
                <span>GA4・GTM計測設置</span>
                <span className="credit-badge">3 pt</span>
              </div>
              <div className="starter-menu-row">
                <span>自動化構築（小）</span>
                <span className="credit-badge">5 pt</span>
              </div>
              <div className="starter-menu-more">
                月10クレジット — ほか全メニューはボードで確認
              </div>
            </div>
          </div>
        </section>

        {/* 料金 */}
        <section className="section-dark" id="price" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="reveal" style={{ marginBottom: 32 }}>
              <span className="eyebrow">料金</span>
              <h2 className="h-sec">月¥50,000。<br />それ以外は、かからない。</h2>
            </div>
            <div className="price-box reveal d1">
              <div className="price-main">
                <span className="mono-num">¥50,000</span>
                <span className="mono-num-unit">/月</span>
              </div>
              <ul className="price-points">
                <li>初期費用 0円・追加費用なし</li>
                <li>毎月10クレジット付与（繰り越しなし）</li>
                <li>最低契約期間なし・違約金なし</li>
                <li>クレジットカード決済で翌営業日稼働</li>
              </ul>
            </div>
            <div className="starter-cta reveal d2">
              <a
                href={STRIPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-block"
              >
                Starterを始める（¥50,000/月） <span className="arr">→</span>
              </a>
              <p className="starter-cta-note">クレジットカード決済 / 最低契約期間なし / 翌営業日稼働</p>
            </div>
          </div>
        </section>

        {/* 斜め境界 */}
        <div className="seam" aria-hidden="true" />

        {/* 比較 */}
        <section className="section-light" id="compare">
          <div className="wrap">
            <div className="reveal" style={{ marginBottom: 32 }}>
              <span className="eyebrow">比較</span>
              <h2 className="h-sec">一般的な営業代行との違い</h2>
              <p className="sub">
                「個人開発の規模で頼めるか」で比べてください。
              </p>
            </div>
            <div className="reveal d1">
              <div className="compare-scroll-hint">← 横スクロールで全列を確認</div>
              <div className="compare-wrap">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>営業代行会社（法人向け）</th>
                      <th>マーケ人材を採用</th>
                      <th>全部自分でやる</th>
                      <th className="col-workle">Workle Starter</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>月額</th>
                      <td>50〜70万円</td>
                      <td>給与40〜50万円+社保</td>
                      <td>0円（開発時間が消える）</td>
                      <td className="col-workle">¥50,000 固定</td>
                    </tr>
                    <tr>
                      <th>個人契約</th>
                      <td>ほぼ不可</td>
                      <td>現実的でない</td>
                      <td>—</td>
                      <td className="col-workle">可（クレカ決済のみ）</td>
                    </tr>
                    <tr>
                      <th>契約期間</th>
                      <td>半年縛りが多い</td>
                      <td>雇用（解消困難）</td>
                      <td>—</td>
                      <td className="col-workle">月契約・いつでも解約可</td>
                    </tr>
                    <tr>
                      <th>形式</th>
                      <td>定例会議あり</td>
                      <td>マネジメントが必要</td>
                      <td>—</td>
                      <td className="col-workle">完全非同期・会議ゼロ</td>
                    </tr>
                    <tr>
                      <th>範囲</th>
                      <td>営業のみ</td>
                      <td>1名分のスキル</td>
                      <td>全部</td>
                      <td className="col-workle">営業+マーケ+技術</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 透明性 — Build in Public */}
        <section className="section-light" id="proof" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="reveal" style={{ marginBottom: 28 }}>
              <span className="eyebrow">実績について</span>
              <h2 className="h-sec">数字は、盛らずに<br />過程ごと公開する。</h2>
              <p className="sub">
                公開できる導入事例は現在準備中です。その代わり、Workle自身がどう営業し、何に失敗し、何が効いたかを、実数のままXで公開しています。判断材料は、そこにあります。
              </p>
            </div>
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bip-card reveal d1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.844L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>
                <b>@Workle_shion</b> — 人脈ゼロから自社の営業を自動化する過程を全部公開中
              </span>
              <span className="arr">→</span>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-light" id="faq" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 40 }}>
              <span className="eyebrow">FAQ</span>
              <h2 className="h-sec" style={{ textAlign: "center" }}>よくある質問</h2>
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

        {/* FINAL CTA */}
        <section className="final-section">
          <div className="wrap">
            <div className="final-card reveal">
              <h2>
                開発に、戻ろう。<br />
                売るのは、投げればいい。
              </h2>
              <p>
                今日投げたタスクは、翌営業日には動き出しています。<span className="cursor" style={{ verticalAlign: "-3px" }} />
              </p>
              <div className="final-cta-row">
                <a
                  href={STRIPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Starterを始める（¥50,000/月） <span className="arr">→</span>
                </a>
                <a
                  href={DEMO_BOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  サンプルボードを見る
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-in">
            <div className="foot-brand">
              <Link className="brand" href="/">
                <span className="brand-mark">
                  <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="brand-name">Workle</span>
              </Link>
              <p>個人開発者専用の営業代行・マーケティング外注。<br />会議ゼロ・完全非同期、Notionにタスクを投げるだけ。</p>
            </div>
            <div className="foot-cols">
              <div className="foot-col">
                <h4>Product</h4>
                <a href="#how">仕組み</a>
                <a href="#menu">メニュー</a>
                <a href="#price">料金</a>
                <Link href="/">法人向け（Growth）</Link>
              </div>
              <div className="foot-col">
                <h4>Contact</h4>
                <a href={X_URL} target="_blank" rel="noopener noreferrer">X (Build in Public)</a>
              </div>
              <div className="foot-col">
                <h4>Legal</h4>
                <Link href="/tokushoho">特定商取引法に基づく表記</Link>
                <Link href="/terms">利用規約</Link>
                <Link href="/privacy">プライバシーポリシー</Link>
              </div>
            </div>
          </div>
          <div className="foot-base">
            <span>© 2026 Workle</span>
            <span style={{ fontFamily: "var(--f-mono)" }}>made async · no meetings were held</span>
          </div>
        </div>
      </footer>

      <WorkleInteractions />
    </>
  );
}
