import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import WorkleInteractions from "../components/WorkleInteractions";
import { SampleReportModal } from "./SampleReportModal";

const PAGE_URL = "https://www.workle-kle.com/test";
const CONSULT_URL = "/consult";

// Stripe Payment Links — set via env vars. Falls back to the booking page when unset.
const STRIPE_LIGHT_URL = process.env.NEXT_PUBLIC_STRIPE_LIGHT_URL ?? CONSULT_URL;
const STRIPE_STANDARD_URL = process.env.NEXT_PUBLIC_STRIPE_STANDARD_URL ?? CONSULT_URL;

const X_URL = "https://x.com/Workle_shion";

export const metadata: Metadata = {
  title: "ユーザーテスト代行 格安 | Workle — 実在の10人が使い、詰まった場所を全部報告",
  description:
    "設計・募集・実施・分析まで丸投げできる対面ユーザーテスト代行。実在ユーザーがあなたのサービスを使い、詰まった場所と『なぜ』を報告します。個人開発¥19,800〜 / 企業¥98,000〜。競合比較テストも。",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "ユーザーテスト代行 格安 | Workle",
    description:
      "あなたのサービス、実在の10人に使わせて、詰まった場所を全部報告します。個人開発¥19,800〜。",
    url: PAGE_URL,
    siteName: "Workle",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ユーザーテスト代行 格安 | Workle",
    description: "なぜ使われないのか、実在の10人が答えます。個人開発¥19,800〜。",
  },
};

const COMPARE = {
  cols: ["海外テストPF", "国内調査会社", "セルフ型ツール", "Workle"],
  rows: [
    { k: "実施頻度", v: ["都度依頼", "年1〜2回", "都度（自分で）", "毎月でも"] },
    { k: "1人あたり", v: ["2〜4万円", "—", "5,000円〜", "¥1,980〜"] },
    { k: "総額目安", v: ["人数×2〜4万円", "数十万円〜/案件", "人数×5,000＋自分の工数", "¥19,800〜（5人）"] },
    { k: "検証後の改善", v: ["レポートのみ", "レポートのみ", "生データのみ", "優先度つき改善提案"] },
    { k: "言語", v: ["英語中心", "日本語", "日本語", "日本語"] },
    { k: "進め方", v: ["自分で設計", "日程調整あり", "日程調整あり", "非同期で進行"] },
  ],
};

const FAQ_ITEMS = [
  {
    q: "未公開・未リリースのサービスでもテストできますか？",
    a: "できます。被験者全員と秘密保持に同意した上で実施するため、クローズドβや未公開プロトタイプでも問題ありません。画面や機能が外部に漏れることはありません。",
  },
  {
    q: "被験者の属性（性別・年代など）は指定できますか？",
    a: "性別・年代など2条件まで指定可能です（例：30代・ビジネス職）。応募状況により実施日程を調整する場合があります。3条件目以降や希少な条件は、ペルソナ追加指定オプション（+¥5,000/条件）でお受けします。",
  },
  {
    q: "アプリストアのレビュー投稿もお願いできますか？",
    a: "お受けしません。各ストアの規約とステマ規制（景品表示法）に抵触するため、レビューの投稿代行や星評価の操作は一切行いません。Workleが行うのは、実際に使った上での率直なフィードバックの収集だけです。",
  },
  {
    q: "対面ではなくオンラインで実施できますか？",
    a: "できます。対面／オンラインはサービスの性質に合わせて選べます。オンラインでも画面共有と発話思考法で「どこで、なぜ詰まったか」を同じ精度で記録します。",
  },
  {
    q: "結果が悪かったら、どうなりますか？",
    a: "悪い結果こそ価値です。リリース後に静かに離脱していくはずだったユーザーを、公開前に先に発見できたと考えてください。私たちは良い結果を作るのではなく、正確な結果を渡すことに責任を持ちます。",
  },
  {
    q: "返金保証の条件を教えてください。",
    a: "10人が実際に使い、優先度をつけるべき発見点が3件に満たなかった場合、全額を返金します。私たちは良い結果を作ることではなく、意味のある発見を渡すことに責任を持つためです。対象は初回の検証で、適用条件は事前にご案内します。",
  },
  {
    q: "サンプルと同じレポートがもらえますか？",
    a: "同じ形式でお届けします。サンプルは架空のアプリを題材にしたもので、実際の納品では貴社サービスの検証結果が入ります。",
  },
  {
    q: "スプレッドシートの生データももらえますか？",
    a: "設計シートと実施記録シートの2種をお渡しします。加工前の記録をそのまま共有しますので、社内で再分析いただけます。",
  },
  {
    q: "支払い方法は？",
    a: "個人開発者向けプランはクレジットカード決済（Stripe）、企業向けプランは請求書払いに対応しています。",
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
      name: "Workle ユーザーテスト代行・リサーチ代行",
      serviceType: "ユーザーテスト代行・UXリサーチ代行",
      provider: { "@id": "https://www.workle-kle.com/#organization" },
      areaServed: "JP",
      audience: { "@type": "Audience", audienceType: "個人開発者・スタートアップ・事業会社" },
      offers: {
        "@type": "Offer",
        price: "19800",
        priceCurrency: "JPY",
        description: "対面ユーザーテスト＋改善レポート。個人開発¥19,800〜 / 企業¥98,000〜",
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
        { "@type": "ListItem", position: 2, name: "リサーチ・ユーザーテスト", item: PAGE_URL },
      ],
    },
  ],
};

export default function TestLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static authored JSON-LD — not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <SiteNav
        links={[
          { href: "#how", label: "内容" },
          { href: "#deliverables", label: "納品物" },
          { href: "#pricing", label: "料金" },
          { href: "#faq", label: "FAQ" },
        ]}
        ghost={{ href: "/", label: "他のサービス" }}
        cta={{ href: CONSULT_URL, label: "無料相談を予約" }}
      />

      <main id="top">

        {/* §1 HERO */}
        <section className="sv sv-hero" id="hero">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">TEST IT.</p>
            <span className="sv-eyebrow">リサーチ・ユーザーテスト代行</span>
            <h1 className="sv-h" style={{ fontSize: "clamp(27px, 4.2vw, 50px)", maxWidth: 820 }}>
              1回の完璧な調査より、<br className="sp-break" />12回の検証。
            </h1>
            <p className="sv-sub">
              サービスは毎月変わるのに、調査は年に一度きり。Workleは実在の10人を使い、詰まった場所と「なぜ」を、必要なときに何度でも。設計・募集・実施・分析まで丸投げできます。
            </p>
            <div className="sv-cta-row">
              <a href="#pricing" className="btn btn-primary">
                プランを見る <span className="arr">→</span>
              </a>
              <button
                type="button"
                className="btn btn-ghost-cream"
                data-action="open-sample-modal"
              >
                サンプルレポートを見る
              </button>
            </div>
            <p className="sv-cta-note">申込から10営業日（最短7営業日）/ 個人開発者向けはその場でお申し込みいただけます</p>
          </div>
        </section>

        {/* §2 問題提起 */}
        <section className="sv tight" id="problem">
          <div className="wrap">
            <span className="sv-eyebrow">なぜ、この調査が要るのか</span>
            <h2 className="sv-h">リリースしたのに、使われない。<br />でも「なぜ」が分からない。</h2>
            <p className="sv-prose">
              アナリティクスが教えてくれるのは「<strong>どこで</strong>離脱したか」まで。「<strong>なぜ</strong>」は、実際に使う人の手の動きと、詰まった瞬間の表情の中にしかありません。<br /><br />
              友人に頼めば忖度され、SNSで募っても偏った少数しか集まらない。結果、いちばん知りたい「初見のユーザーが、どこで、なぜ諦めるのか」だけが、ずっと分からないまま残ります。
            </p>
          </div>
        </section>

        {/* §3 サービス内容 3ステップ */}
        <section className="sv tight" id="how">
          <div className="wrap">
            <span className="sv-eyebrow">サービス内容</span>
            <h2 className="sv-h">あなたがやることは、<br />フォーム入力と、結果を読むこと。</h2>
            <div className="sv-steps">
              <div className="sv-step">
                <div className="sv-step-n">01</div>
                <h3>フォームで送る</h3>
                <p>サービスのURL・検証したい仮説・希望する被験者の属性をフォームで送るだけ。仕様書や資料の用意はいりません。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">02</div>
                <h3>設計・募集・実施</h3>
                <p>Workleがテストを設計し、被験者を募集・実施します。対面／オンライン、性別・年代など2条件まで指定可能（応募状況により実施日程を調整する場合があります）。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">03</div>
                <h3>レポート納品</h3>
                <p>詰まった場所の発見点リストと、優先度つきの改善提案レポートを納品。発言はそのまま引用で残します。</p>
              </div>
            </div>
            <div className="sv-note" style={{ marginTop: 22 }}>
              あなたがやることは、<strong>フォーム入力と、結果を読むこと</strong>だけ。設計も、募集も、当日の進行も、分析も、こちらで巻き取ります。基本は非同期（フォーム入稿→Notionでのすり合わせ→レポート納品）で進みます。設計内容によっては、オンラインでのご相談も可能です。
            </div>
          </div>
        </section>

        {/* §4 なぜ何度でも頼めるのか（比較表） */}
        <section className="sv tight" id="why-price">
          <div className="wrap">
            <span className="sv-eyebrow">なぜ、何度でも頼めるのか</span>
            <h2 className="sv-h">調査会社は、<br />年に1回しか呼べません。</h2>

            <div className="sv-compare">
              <table>
                <thead>
                  <tr>
                    <th />
                    {COMPARE.cols.map((c, i) => (
                      <th key={c} className={i === COMPARE.cols.length - 1 ? "cw" : undefined}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.rows.map((row) => (
                    <tr key={row.k}>
                      <th>{row.k}</th>
                      {row.v.map((val, i) => (
                        <td key={i} className={i === row.v.length - 1 ? "cw" : undefined}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="sv-compare-cards">
                {COMPARE.cols.map((col, ci) => {
                  const isW = ci === COMPARE.cols.length - 1;
                  return (
                    <div key={col} className={`sv-cc${isW ? " cw" : ""}`}>
                      <p className="sv-cc-title">{col}</p>
                      {COMPARE.rows.map((row) => (
                        <div className="sv-cc-row" key={row.k}>
                          <span className="k">{row.k}</span>
                          <span className="v">{row.v[ci]}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="sv-prose">
              数十万円の調査は、年に一度が限界です。でも、サービスは毎月変わります。<strong>Workleは固定のオフィスも常勤の調査員も持たないチーム</strong>だから、同じ精度の検証を、必要なときに何度でも回せます。安いのは手を抜くからではなく、抱えている固定費が違うからです。
            </p>
          </div>
        </section>

        {/* §5 独自商品: 競合比較テスト */}
        <section className="sv tight" id="versus">
          <div className="wrap">
            <span className="sv-eyebrow">独自メニュー — 競合比較テスト</span>
            <h2 className="sv-h">なぜ競合が選ばれて、<br />あなたが選ばれないのか。</h2>
            <p className="sv-sub">
              同じ10人が、あなたのサービスと競合2つを実際に使い比べ、最後に「どれを使い続けるか」を選びます。選ばれた理由と、選ばれなかった理由を、発言そのままで納品します。機能比較表では絶対に出てこない、意思決定の瞬間が手に入ります。
            </p>
            <div className="sv-flow">
              <div className="sv-flow-node">
                <span className="n-tag">STEP 01</span>
                <h3>3サービスを使い比べ</h3>
                <p>同一被験者が、あなた＋競合2つを同条件で操作。</p>
              </div>
              <div className="sv-flow-arrow" aria-hidden="true">→</div>
              <div className="sv-flow-node">
                <span className="n-tag">STEP 02</span>
                <h3>「どれを使い続けるか」</h3>
                <p>最後に一つを選択。迷った理由まで発話で記録。</p>
              </div>
              <div className="sv-flow-arrow" aria-hidden="true">→</div>
              <div className="sv-flow-node">
                <span className="n-tag">STEP 03</span>
                <h3>選定理由を納品</h3>
                <p>選ばれた／選ばれなかった理由を、発言そのままで。</p>
              </div>
            </div>
          </div>
        </section>

        {/* §6 納品物 */}
        <section className="sv tight" id="deliverables">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">DELIVERABLES</p>
            <span className="sv-eyebrow">納品物</span>
            <h2 className="sv-h">届くのは、3つです。</h2>
            <div className="dlv-grid">
              <div className="dlv-card">
                <p className="dlv-num">01</p>
                <h3 className="dlv-title">設計シート<small>スプレッドシート</small></h3>
                <p className="dlv-body">検証したいタスクと質問項目を、Workleが設計してご共有します。コメントで修正できます。実施前の合意はここで完結します。</p>
              </div>
              <div className="dlv-card">
                <p className="dlv-num">02</p>
                <h3 className="dlv-title">実施記録シート<small>スプレッドシート</small></h3>
                <p className="dlv-body">被験者ごとのタスク完遂・つまずき箇所・発言を、当日その場で1人1行に記録。加工前の生データをそのままお渡しします。</p>
              </div>
              <div className="dlv-card">
                <p className="dlv-num">03</p>
                <h3 className="dlv-title">レポート<small>PDF</small></h3>
                <p className="dlv-body">サマリー・発見点リスト（重要度別）・改善提案・被験者属性をまとめたA4レポート。録画リンク付き。</p>
              </div>
            </div>
            <p className="dlv-sample-cue">
              <button
                type="button"
                className="dlv-sample-link"
                data-action="open-sample-modal"
              >
                サンプルレポートを見る →
              </button>
            </p>
          </div>
        </section>

        {/* §7 進め方 */}
        <section className="sv tight" id="process">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">PROCESS</p>
            <span className="sv-eyebrow">進め方</span>
            <h2 className="sv-h">申込から納品まで。</h2>
            <div className="proc-grid">
              <div className="proc-step">
                <p className="proc-num">STEP 01</p>
                <h3 className="proc-title">申込</h3>
                <p className="proc-body">個人開発者向けはその場で決済まで完結。企業のお客様は15分の無料相談から。</p>
              </div>
              <div className="proc-step">
                <p className="proc-num">STEP 02</p>
                <h3 className="proc-title">入稿（フォーム）</h3>
                <p className="proc-body">サービスURL・検証したいタスク・一番知りたいこと・希望する被験者属性をフォームでご記入いただきます。所要5分。</p>
              </div>
              <div className="proc-step">
                <p className="proc-num">STEP 03</p>
                <h3 className="proc-title">設計の確認（非同期）</h3>
                <p className="proc-body">Workleが設計シートを作成し共有します。コメントでご確認ください。48時間ご連絡がなければ確定として進行します。企業のお客様は30分の設計打ち合わせを1回実施します。</p>
              </div>
              <div className="proc-step">
                <p className="proc-num">STEP 04</p>
                <h3 className="proc-title">実施・納品</h3>
                <p className="proc-body">被験者を募集し、Workleが立ち会って実施。実施記録シートとPDFレポートを納品します。申込から10営業日（最短7営業日）が目安です。</p>
              </div>
            </div>
          </div>
        </section>

        {/* §7.5 差別化 — レポートで終わらない */}
        <section className="sv tight" id="why-workle">
          <div className="wrap">
            <span className="sv-eyebrow">レポートで終わらない</span>
            <h2 className="sv-h">渡して終わり、にしません。</h2>
            <p className="sv-sub">
              調査会社の納品物は、たいてい分厚いレポート1冊で終わります。Workleは、詰まった場所を<strong>優先度つきの改善提案</strong>にまで落とし、直したあとの再検証、その先の「実際に届ける」ところまで一緒に考えます。
            </p>
            <div className="dlv-grid" style={{ marginTop: 28 }}>
              <div className="dlv-card">
                <p className="dlv-num">01</p>
                <h3 className="dlv-title">被験者の質<small>初見・毎回入れ替え</small></h3>
                <p className="dlv-body">友人でも既存ファンでもない、初見のユーザーです。スポットワークで毎回異なる人を集めるため、忖度も慣れも入りません。性別・年代など2条件まで指定できます。</p>
              </div>
              <div className="dlv-card">
                <p className="dlv-num">02</p>
                <h3 className="dlv-title">実施するのは誰か<small>全テスト立ち会い</small></h3>
                <p className="dlv-body">外注の丸投げではありません。人材業界で営業組織づくりに関わってきた運営者が、すべてのテストに立ち会い、設計から分析まで担当します。だから「なぜ詰まったか」を現場で拾えます。</p>
              </div>
              <div className="dlv-card">
                <p className="dlv-num">03</p>
                <h3 className="dlv-title">返金保証<small>発見点3件未満なら全額返金</small></h3>
                <p className="dlv-body">10人が使って、優先度をつけるべき発見点が3件に満たなかったら、全額返金します。私たちは良い結果ではなく、意味のある発見に責任を持ちます。</p>
              </div>
            </div>
          </div>
        </section>

        {/* §8 料金表（2系統） */}
        <section className="sv tight" id="pricing">
          <div className="wrap">
            <span className="sv-eyebrow">料金</span>
            <h2 className="sv-h">まず、続けられる形から。</h2>
            <p className="sv-sub">
              一度きりの調査より、直して測り続けるほうが効きます。だからWorkleは<strong>継続プランを基本</strong>に置いています。もちろん、単発でのお試しもできます。
            </p>

            {/* 継続プラン — 筆頭・推奨 */}
            <div className="sv-price-col feat" style={{ marginTop: 28 }}>
              <div className="sv-price-col-tag">継続検証プラン — おすすめ</div>
              <div className="sv-bigprice">
                <span className="amt">¥50,000</span>
                <span className="unit">/ 月</span>
              </div>
              <div className="sv-def" style={{ marginTop: 16 }}>
                <ul className="sv-def-list">
                  <li><span className="k">毎月</span><span>5人テストを毎月実施し、改善の効果を継続計測</span></li>
                  <li><span className="k">掲載打診</span><span>メディア・レビュアー <strong>30件</strong> への掲載打診</span></li>
                  <li><span className="k">レポート</span><span>実数レポートを毎月納品（数字は盛りません）</span></li>
                  <li><span className="k">形式</span><span>完全非同期・ミーティングなし・解約自由</span></li>
                </ul>
              </div>
              <p className="sv-price-note sv-price-note-em">
                直して、また測る。このループを月額で回します。
              </p>
              <div className="sv-price-cta-group">
                <Link
                  href={CONSULT_URL}
                  className="btn btn-primary"
                  data-action="track-consult"
                  data-location="pricing_monthly"
                >
                  継続プランを相談する <span className="arr">→</span>
                </Link>
              </div>
            </div>

            <h3 className="sv-eyebrow" style={{ marginTop: 44, display: "block" }}>単発でまず試す</h3>
            <div className="sv-price-grid" style={{ marginTop: 12 }}>
              {/* 個人開発者向け — Stripe決済 */}
              <div className="sv-price-col feat">
                <div className="sv-price-col-tag">テストパック — 個人開発者向け</div>
                <div className="sv-price-row">
                  <span className="pr-name">ライト<small>5人テスト</small></span>
                  <span className="pr-val">¥19,800</span>
                </div>
                <div className="sv-price-row">
                  <span className="pr-name">スタンダード<small>10人テスト</small></span>
                  <span className="pr-val">¥49,800</span>
                </div>
                <p className="sv-price-note">
                  ※ 録画+発見点リスト納品。
                </p>
                <p className="sv-price-note sv-price-note-em">
                  決済後、入稿フォームのご案内メールが届きます。会議は不要です。
                </p>
                <div className="sv-price-cta-group">
                  <a
                    href={STRIPE_LIGHT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    data-action="track-checkout"
                    data-plan="light"
                  >
                    ライトに申し込む <span className="arr">→</span>
                  </a>
                  <a
                    href={STRIPE_STANDARD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    data-action="track-checkout"
                    data-plan="standard"
                  >
                    スタンダードに申し込む <span className="arr">→</span>
                  </a>
                </div>
              </div>

              {/* 企業向け — 専用ページへ誘導 */}
              <div className="sv-price-col">
                <div className="sv-price-col-tag">検証レポート — 企業向け</div>
                <div className="sv-price-row">
                  <span className="pr-name">初回検証<small>10人・発見フェーズ</small></span>
                  <span className="pr-val">¥98,000</span>
                </div>
                <div className="sv-price-row">
                  <span className="pr-name">継続検証<small>毎月5人・確認フェーズ</small></span>
                  <span className="pr-val">¥58,000<small>/月</small></span>
                </div>
                <p className="sv-price-note">
                  ※ NDA締結・請求書払い・結果非公開。競合比較テストや動画つきプランもあります。
                </p>
                <p className="sv-price-note sv-price-note-em">
                  発見フェーズと確認フェーズの詳しい内容は、企業向けページにまとめています。
                </p>
                <div className="sv-price-cta-group">
                  <Link
                    href="/test-biz"
                    className="btn btn-ghost-cream"
                    data-action="track-consult"
                    data-location="pricing_enterprise"
                  >
                    企業向けの詳細を見る <span className="arr">→</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="sv-def" style={{ marginTop: 16 }}>
              <div className="sv-price-col-tag">オプション</div>
              <ul className="sv-def-list">
                <li><span className="k">ペルソナ追加</span><span>属性の追加指定 <strong>+¥5,000</strong> / 1条件（2条件までは無料）</span></li>
                <li><span className="k">被験者追加</span><span>5人追加ごと <strong>+¥15,000</strong>〜</span></li>
                <li><span className="k">特急</span><span>短納期での実施 <strong>+¥10,000</strong></span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* §10 FAQ */}
        <section className="sv tight" id="faq">
          <div className="wrap">
            <span className="sv-eyebrow">FAQ</span>
            <h2 className="sv-h">よくある質問</h2>
            <div className="faq-list" style={{ margin: "clamp(24px,3vw,36px) 0 0" }}>
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

        {/* §11 FINAL CTA */}
        <section className="final-v2">
          <div className="wrap">
            <div className="final-v2-inner reveal">
              <p className="final-v2-en" aria-hidden="true">FIND<br />THE WHY.</p>
              <p className="final-v2-jp">
                「なぜ使われないか」を、今月中に手に入れる。
              </p>
              <div className="final-v2-cta-row">
                <a href="#pricing" className="btn btn-primary">
                  プランを見る <span className="arr">→</span>
                </a>
                <button
                  type="button"
                  className="btn btn-ghost"
                  data-action="open-sample-modal"
                >
                  サンプルレポートを見る
                </button>
              </div>
              <p className="final-v2-note">個人開発¥19,800〜 · 丸投げOK · 非同期で進行</p>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
      <WorkleInteractions />
      <SampleReportModal />
    </>
  );
}
