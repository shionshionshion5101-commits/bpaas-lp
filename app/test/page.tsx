import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import WorkleInteractions from "../components/WorkleInteractions";
import Icon from "../components/Icon";
import Image from "next/image";
import { SampleReportModal } from "./SampleReportModal";

const PAGE_URL = "https://www.workle-kle.com/test";
const CONSULT_URL = "/consult";

// Stripe Payment Links — set via env vars. Falls back to the booking page when unset.
const STRIPE_LIGHT_URL = process.env.NEXT_PUBLIC_STRIPE_LIGHT_URL ?? CONSULT_URL;

const X_URL = "https://x.com/Workle_shion";

export const metadata: Metadata = {
  title: "ユーザーテスト代行 | Workle — 1回の完璧な調査より、12回の検証。",
  description:
    "設計・募集・実施・分析まで丸投げできる対面ユーザーテスト代行。実在ユーザーがあなたのサービスを使い、詰まった場所と『なぜ』を特定。まず1回試して、合えば毎月の検証に。改善提案まで手を動かします。",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "ユーザーテスト代行 | Workle",
    description:
      "1回の完璧な調査より、12回の検証。実在の10人が使い、詰まった場所と『なぜ』を特定。設計から改善提案まで丸投げできます。",
    url: PAGE_URL,
    siteName: "Workle",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ユーザーテスト代行 | Workle",
    description: "1回の完璧な調査より、12回の検証。なぜ使われないのか、実在の10人が答えます。",
  },
};

const COMPARE = {
  cols: ["海外テストPF", "国内調査会社", "セルフ型ツール", "Workle"],
  rows: [
    { k: "実施頻度", v: ["都度依頼", "年1〜2回", "都度（自分で）", "毎月でも"] },
    { k: "検証後の改善", v: ["レポートのみ", "レポートのみ", "生データのみ", "優先度つき改善提案"] },
    { k: "進め方", v: ["自分で設計", "日程調整あり", "日程調整あり", "非同期で進行"] },
    { k: "納期", v: ["数日〜", "数週間〜", "自分の空き次第", "10営業日（最短7）"] },
    { k: "言語", v: ["英語中心", "日本語", "日本語", "日本語"] },
    { k: "総額目安", v: ["人数×2〜4万円", "数十万円〜/案件", "人数×5,000＋自分の工数", "¥19,800〜（5人）"] },
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
        description: "対面ユーザーテスト＋改善レポート。まず1回試して、合えば毎月の継続検証へ。",
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
        active="research"
        links={[
          { href: "#how", label: "内容" },
          { href: "#deliverables", label: "納品物" },
          { href: "#pricing", label: "料金" },
          { href: "#faq", label: "FAQ" },
        ]}
        cta={{ href: CONSULT_URL, label: "無料相談を予約" }}
      />

      <main id="top">

        {/* §1 HERO */}
        <section className="sv sv-hero" id="hero">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">TEST IT.</p>
            <span className="sv-eyebrow"><Icon name="eye" className="sv-eyebrow-icon" />リサーチ・ユーザーテスト代行</span>
            <h1 className="sv-h" style={{ fontSize: "clamp(27px, 4.2vw, 50px)", maxWidth: 820 }}>
              1回の完璧な調査より、<br />12回の検証。
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
            <span className="sv-eyebrow"><Icon name="search" className="sv-eyebrow-icon" />なぜ、この調査が要るのか</span>
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
            <span className="sv-eyebrow"><Icon name="clipboard" className="sv-eyebrow-icon" />サービス内容</span>
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
            <span className="sv-eyebrow"><Icon name="refresh" className="sv-eyebrow-icon" />なぜ、何度でも頼めるのか</span>
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
            <span className="sv-eyebrow"><Icon name="compare" className="sv-eyebrow-icon" />独自メニュー — 競合比較テスト</span>
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
            <div className="versus-price">
              <span className="versus-price-val">競合比較テスト <strong>¥198,000</strong><small>（単発）</small></span>
              <Link
                href={CONSULT_URL}
                className="btn btn-ghost-cream"
                data-action="track-consult"
                data-location="versus"
              >
                競合比較テストを相談する <span className="arr">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* §6 納品物 */}
        <section className="sv tight" id="deliverables">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">DELIVERABLES</p>
            <span className="sv-eyebrow"><Icon name="doc" className="sv-eyebrow-icon" />納品物</span>
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
                <p className="dlv-body">サマリー・発見点リスト（重要度別）・改善提案・被験者属性をまとめたA4レポート。</p>
              </div>
            </div>
            <div className="dlv-figure">
              <div className="dlv-figure-img">
                <Image
                  src="/samples/sample-cover.png"
                  alt="サンプルレポートの表紙"
                  width={280}
                  height={396}
                />
              </div>
              <div className="dlv-figure-body">
                <p className="dlv-figure-tag">SAMPLE</p>
                <h3>これが、実際に届くレポートです。</h3>
                <p>架空のアプリを題材にしたサンプル（A4・5ページ）。実際の納品では、貴社サービスの発見点と改善提案が入ります。</p>
                <button
                  type="button"
                  className="dlv-sample-link"
                  data-action="open-sample-modal"
                  style={{ alignSelf: "flex-start" }}
                >
                  サンプル全文をメールで受け取る →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* §7 進め方 */}
        <section className="sv tight" id="process">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">PROCESS</p>
            <span className="sv-eyebrow"><Icon name="flag" className="sv-eyebrow-icon" />進め方</span>
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

        {/* §7.5 A レポートで終わらない — 4ステップ */}
        <section className="sv tight" id="why-workle">
          <div className="wrap">
            <span className="sv-eyebrow"><Icon name="sliders" className="sv-eyebrow-icon" />レポートで終わらない</span>
            <h2 className="sv-h">調査会社は、<br />レポートを出したら終わります。</h2>
            <p className="sv-sub">Workle は、そのあとも手を動かします。</p>
            <div className="sv-steps four" style={{ marginTop: 28 }}>
              <div className="sv-step">
                <div className="sv-step-n">01</div>
                <Icon name="eye" className="sv-step-ico" />
                <h3>検証する</h3>
                <p>実在ユーザーが使い、詰まった場所を特定。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">02</div>
                <Icon name="sliders" className="sv-step-ico" />
                <h3>直す</h3>
                <p>発見点をもとに、優先度つきの改善提案。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">03</div>
                <Icon name="speaker" className="sv-step-ico" />
                <h3>届ける</h3>
                <p>
                  実際にユーザーを連れてくる。
                  <span className="sv-step-links">
                    <Link href="/sales">営業 →</Link>
                    <Link href="/sns">SNS運用 →</Link>
                  </span>
                </p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">04</div>
                <Icon name="refresh" className="sv-step-ico" />
                <h3>また測る</h3>
                <p>同じ設計でもう一度検証し、効果を数字で確認。</p>
              </div>
            </div>
            <p className="sv-note" style={{ marginTop: 22 }}>
              <strong>01だけでも、04まででも。</strong>単品から頼めます。
            </p>
          </div>
        </section>

        {/* §7.6 B 安心して頼めるように */}
        <section className="sv tight" id="assurance">
          <div className="wrap">
            <span className="sv-eyebrow"><Icon name="shield" className="sv-eyebrow-icon" />安心して頼めるように</span>
            <h2 className="sv-h">誰が、どんな人に、<br />どう責任を持つか。</h2>
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

        {/* §8 料金 — 順路（まず1回 → 続ける） */}
        <section className="sv tight" id="pricing">
          <div className="wrap">
            <span className="sv-eyebrow"><Icon name="yen" className="sv-eyebrow-icon" />料金</span>
            <h2 className="sv-h">まず1回。合えば、続ける。</h2>
            <p className="sv-sub">
              検証は、1回で終わるものではありません。まず1回試して、続ける価値があると思えたら月額に切り替える。それだけです。
            </p>

            {/* STEP 1 — まず1回やる */}
            <div className="price-step" style={{ marginTop: 32 }}>
              <p className="price-step-tag">STEP 1 ｜ まず1回やる</p>
              <p className="sv-prose" style={{ marginTop: 8 }}>
                結果を事例として公開させていただける場合、被験者の募集コストの一部を当社が負担できるため、価格が下がります。非公開をご希望の場合は企業向けプランになります。
              </p>
              <div className="sv-price-grid" style={{ marginTop: 20 }}>
                {/* ライト — 公開できる方（個人開発者向け） */}
                <div className="sv-price-col feat">
                  <div className="sv-price-col-tag">ライト — 結果を公開できる方</div>
                  <div className="sv-price-row">
                    <span className="pr-name">5人テスト<small>個人開発者向け</small></span>
                    <span className="pr-val">¥19,800</span>
                  </div>
                  <div className="sv-def" style={{ marginTop: 12 }}>
                    <ul className="sv-def-list">
                      <li><span className="k">人数</span><span>5人</span></li>
                      <li><span className="k">納品</span><span>発見点リスト</span></li>
                      <li><span className="k">条件</span><span>事例としての公開に同意</span></li>
                      <li><span className="k">枠</span><span>月3枠限定</span></li>
                    </ul>
                  </div>
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
                      その場で決済して申し込む <span className="arr">→</span>
                    </a>
                  </div>
                </div>

                {/* 初回検証 — 非公開にしたい方（企業向け） */}
                <div className="sv-price-col">
                  <div className="sv-price-col-tag">初回検証 — 結果を非公開にしたい方</div>
                  <div className="sv-price-row">
                    <span className="pr-name">10人検証<small>企業向け</small></span>
                    <span className="pr-val">¥98,000</span>
                  </div>
                  <div className="sv-def" style={{ marginTop: 12 }}>
                    <ul className="sv-def-list">
                      <li><span className="k">人数</span><span>10人</span></li>
                      <li><span className="k">納品</span><span>設計シート／実施記録シート／PDFレポート</span></li>
                      <li><span className="k">条件</span><span>NDA締結・請求書払い・結果非公開</span></li>
                      <li><span className="k">保証</span><span>発見点3件未満なら全額返金</span></li>
                    </ul>
                  </div>
                  <div className="sv-price-cta-group">
                    <Link
                      href={CONSULT_URL}
                      className="btn btn-ghost-cream"
                      data-action="track-consult"
                      data-location="pricing_initial"
                    >
                      15分の無料相談から <span className="arr">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2 — 続ける */}
            <div className="price-step price-step-next" style={{ marginTop: 20 }}>
              <div className="price-step-arrow" aria-hidden="true">↓</div>
              <p className="price-step-tag">STEP 2 ｜ 続ける</p>
              <div className="sv-price-col feat" style={{ marginTop: 12 }}>
                <div className="sv-price-col-tag">継続検証 — 確認フェーズ</div>
                <div className="sv-bigprice">
                  <span className="amt">¥58,000</span>
                  <span className="unit">/ 月</span>
                </div>
                <p className="sv-prose" style={{ marginTop: 4 }}>
                  毎月5人。直したものが効いたかを確認するフェーズです。
                </p>
                <div className="sv-def" style={{ marginTop: 16 }}>
                  <ul className="sv-def-list">
                    <li><span className="k">毎月</span><span>5人テストを実施し、前月からの変化を比較</span></li>
                    <li><span className="k">レポート</span><span>優先度つき改善提案レポートを毎月納品</span></li>
                    <li><span className="k">形式</span><span>完全非同期・ミーティングなし・解約はいつでも</span></li>
                  </ul>
                </div>
                <div className="sv-note" style={{ marginTop: 16 }}>
                  <strong>加入条件：初回検証（10人）を実施済みの方。</strong> 継続検証は「直したものが効いたか」を確認するフェーズです。何が問題かを特定する初回検証を経ていないと、比較する基準がないため成立しません。そのため、初回検証を実施いただいた方のみのプランとしています。
                </div>
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
            </div>

            {/* オプション（折りたたみ） */}
            <details className="price-options" style={{ marginTop: 24 }}>
              <summary>オプションを見る +</summary>
              <div className="sv-def" style={{ marginTop: 12 }}>
                <ul className="sv-def-list">
                  <li><span className="k">ペルソナ追加</span><span>属性の追加指定 <strong>+¥5,000</strong> / 1条件（2条件までは無料）</span></li>
                  <li><span className="k">被験者追加</span><span>5人追加ごと <strong>+¥15,000</strong>〜</span></li>
                  <li><span className="k">特急</span><span>短納期での実施 <strong>+¥10,000</strong></span></li>
                </ul>
              </div>
            </details>
          </div>
        </section>

        {/* §10 FAQ */}
        <section className="sv tight" id="faq">
          <div className="wrap">
            <span className="sv-eyebrow"><Icon name="question" className="sv-eyebrow-icon" />FAQ</span>
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
              <p className="final-v2-note">毎月回せる検証 · 申込から10営業日 · 改善提案まで</p>
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
