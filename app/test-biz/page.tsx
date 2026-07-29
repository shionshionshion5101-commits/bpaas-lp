import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import WorkleInteractions from "../components/WorkleInteractions";
import { SampleReportModal } from "../test/SampleReportModal";

const PAGE_URL = "https://www.workle-kle.com/test-biz";
const CONSULT_URL = "/consult";
const X_URL = "https://x.com/Workle_shion";

export const metadata: Metadata = {
  title: "ユーザーテスト代行 企業向け | Workle — 発見フェーズと確認フェーズで、継続的に検証",
  description:
    "中小企業のための対面ユーザーテスト代行。初回は10人で「発見」、継続は5人で「確認」。設計・募集・実施・分析まで丸投げ。NDA締結・請求書払い・結果非公開。初回検証¥98,000〜。",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "ユーザーテスト代行 企業向け | Workle",
    description:
      "初回は10人で発見、継続は5人で確認。設計から分析まで丸投げできる企業向けリサーチ代行。初回¥98,000〜。",
    url: PAGE_URL,
    siteName: "Workle",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ユーザーテスト代行 企業向け | Workle",
    description: "初回は10人で発見、継続は5人で確認。NDA・請求書払い対応。初回¥98,000〜。",
  },
};

const COMPARE = {
  cols: ["国内調査会社", "セルフ型ツール", "社内でやる", "Workle"],
  rows: [
    { k: "実施頻度", v: ["年1〜2回", "都度（自分で）", "手が空いたとき", "毎月でも"] },
    { k: "総額目安", v: ["数十万円〜/案件", "人数×5,000＋工数", "本業の時間を圧迫", "¥98,000〜（初回）"] },
    { k: "設計・分析", v: ["お任せ", "自分で", "自分で", "お任せ"] },
    { k: "検証後の改善", v: ["レポートのみ", "生データのみ", "属人的", "優先度つき改善提案"] },
    { k: "秘密保持", v: ["対応", "規約次第", "—", "NDA締結・結果非公開"] },
    { k: "進め方", v: ["日程調整あり", "日程調整あり", "調整不要だが属人的", "非同期で進行"] },
  ],
};

const FAQ_ITEMS = [
  {
    q: "個人開発者向けのプランとの違いは何ですか？",
    a: "対象人数と目的が違います。企業向けは初回10人での「発見」を基本とし、NDA締結・請求書払い・結果非公開に対応します。個人開発者向け（/test）は5人からの手軽な検証で、事例・動画の公開が前提です。非公開で進めたい場合は企業向けプランをお選びください。",
  },
  {
    q: "初回と継続で人数が違うのはなぜですか？",
    a: "役割が違うからです。初回は「まだ気づいていない問題を見つける」発見フェーズなので10人。継続は「直した改善が効いたかを確かめる」確認フェーズなので5人で十分です。発見の8割は最初の数人で出るため、確認フェーズは少人数で回します。",
  },
  {
    q: "未公開・未リリースのサービスでもテストできますか？",
    a: "できます。被験者全員とNDAを締結した上で実施するため、クローズドβや未公開プロトタイプでも問題ありません。画面や機能が外部に漏れることはなく、結果も非公開で納品します。",
  },
  {
    q: "被験者の属性は指定できますか？",
    a: "性別・年代など2条件まで指定可能です（例：30代・ビジネス職）。3条件目以降や希少な条件は、被験者追加オプションで対応します。応募状況により実施日程を調整する場合があります。",
  },
  {
    q: "レビュー投稿や星評価の操作はお願いできますか？",
    a: "お受けしません。各ストアの規約とステマ規制（景品表示法）に抵触するため、レビュー投稿代行や評価操作は一切行いません。Workleが行うのは、実際に使った上での率直なフィードバックの収集だけです。",
  },
  {
    q: "返金保証はありますか？",
    a: "初回検証で、10人が使って優先度をつけるべき発見点が3件に満たなかった場合、全額を返金します。適用条件は事前にご案内します。",
  },
  {
    q: "支払い方法は？",
    a: "請求書払いに対応しています。秘密保持契約の締結後、設計内容の確認のため30分のオンライン打ち合わせを1回お願いしています。",
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
      name: "Workle ユーザーテスト代行（企業向け）",
      serviceType: "ユーザーテスト代行・UXリサーチ代行",
      provider: { "@id": "https://www.workle-kle.com/#organization" },
      areaServed: "JP",
      audience: { "@type": "Audience", audienceType: "中小企業・事業会社" },
      offers: {
        "@type": "Offer",
        price: "98000",
        priceCurrency: "JPY",
        description: "対面ユーザーテスト＋改善レポート。初回検証¥98,000〜 / 継続検証¥58,000/月〜",
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
        { "@type": "ListItem", position: 2, name: "ユーザーテスト代行（企業向け）", item: PAGE_URL },
      ],
    },
  ],
};

export default function TestBizLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static authored JSON-LD — not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <SiteNav
        links={[
          { href: "#phases", label: "2つのフェーズ" },
          { href: "#deliverables", label: "納品物" },
          { href: "#pricing", label: "料金" },
          { href: "#faq", label: "FAQ" },
        ]}
        ghost={{ href: "/test", label: "個人開発者向け" }}
        cta={{ href: CONSULT_URL, label: "無料相談を予約" }}
      />

      <main id="top">

        {/* §1 HERO */}
        <section className="sv sv-hero" id="hero">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">TEST IT.</p>
            <span className="sv-eyebrow">企業向け — リサーチ・ユーザーテスト代行</span>
            <h1 className="sv-h" style={{ fontSize: "clamp(27px, 4.2vw, 50px)", maxWidth: 840 }}>
              そのリリース、実在の10人に<br className="sp-break" />先に使わせませんか。
            </h1>
            <p className="sv-sub">
              初回は10人で「まだ気づいていない問題」を発見し、継続は5人で「直した効果」を確認する。設計・募集・実施・分析まで丸投げできる、非公開対応のリサーチ代行です。
            </p>
            <div className="sv-cta-row">
              <Link href={CONSULT_URL} className="btn btn-primary" data-action="track-consult" data-location="biz_hero">
                無料相談を予約（15分） <span className="arr">→</span>
              </Link>
              <button
                type="button"
                className="btn btn-ghost-cream"
                data-action="open-sample-modal"
              >
                サンプルレポートを見る
              </button>
            </div>
            <p className="sv-cta-note">NDA締結・請求書払い・結果非公開 / 申込から10営業日（最短7営業日）</p>
          </div>
        </section>

        {/* §2 問題提起 */}
        <section className="sv tight" id="problem">
          <div className="wrap">
            <span className="sv-eyebrow">なぜ、社内では分からないのか</span>
            <h2 className="sv-h">作った人には、<br />詰まる場所が見えません。</h2>
            <p className="sv-prose">
              毎日触っている人には、初見のユーザーがどこで手を止めるかは見えなくなります。社内テストは「使えるはずだ」という前提から始まってしまうからです。<br /><br />
              いちばん知りたい「初めて触った人が、どこで、なぜ諦めるのか」は、忖度のない第三者に、実際に使ってもらうしかありません。Workleは、その場面を丸ごと記録して渡します。
            </p>
          </div>
        </section>

        {/* §3 2つのフェーズ */}
        <section className="sv tight" id="phases">
          <div className="wrap">
            <span className="sv-eyebrow">2つのフェーズ</span>
            <h2 className="sv-h">見つける検証と、<br />確かめる検証。</h2>
            <p className="sv-sub">
              一度きりで終わらせないために、目的の違う2つのフェーズを用意しています。初回で問題を洗い出し、継続で改善の効果を測り続けます。
            </p>
            <div className="dlv-grid" style={{ marginTop: 28 }}>
              <div className="dlv-card">
                <p className="dlv-num">01</p>
                <h3 className="dlv-title">初回 — 発見<small>10人</small></h3>
                <p className="dlv-body">まだ気づいていない問題を洗い出すフェーズ。10人に使ってもらい、詰まった場所と「なぜ」を優先度つきの改善提案にまとめます。まずここから始めます。</p>
              </div>
              <div className="dlv-card">
                <p className="dlv-num">02</p>
                <h3 className="dlv-title">継続 — 確認<small>毎月5人</small></h3>
                <p className="dlv-body">改善が本当に効いたかを確かめるフェーズ。毎月5人で再検証し、前月との差分をレポートします。直して、また測る。このループを月額で回します。</p>
              </div>
              <div className="dlv-card">
                <p className="dlv-num">03</p>
                <h3 className="dlv-title">競合比較<small>3サービス使い比べ</small></h3>
                <p className="dlv-body">同じ10人が、あなたと競合2つを使い比べ、最後に「どれを使い続けるか」を選択。選ばれた理由と選ばれなかった理由を、発言そのままで納品します。</p>
              </div>
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

        {/* §5 差別化 */}
        <section className="sv tight" id="why-workle">
          <div className="wrap">
            <span className="sv-eyebrow">レポートで終わらない</span>
            <h2 className="sv-h">渡して終わり、にしません。</h2>
            <p className="sv-sub">
              分厚いレポート1冊で終わらせません。詰まった場所を<strong>優先度つきの改善提案</strong>にまで落とし、直したあとの再検証まで一緒に回します。
            </p>
            <div className="dlv-grid" style={{ marginTop: 28 }}>
              <div className="dlv-card">
                <p className="dlv-num">01</p>
                <h3 className="dlv-title">被験者の質<small>初見・毎回入れ替え</small></h3>
                <p className="dlv-body">既存顧客でも社員でもない、初見のユーザーです。スポットワークで毎回異なる人を集めるため、忖度も慣れも入りません。性別・年代など2条件まで指定できます。</p>
              </div>
              <div className="dlv-card">
                <p className="dlv-num">02</p>
                <h3 className="dlv-title">実施するのは誰か<small>全テスト立ち会い</small></h3>
                <p className="dlv-body">外注の丸投げではありません。人材業界で営業組織づくりに関わってきた運営者が、すべてのテストに立ち会い、設計から分析まで担当します。</p>
              </div>
              <div className="dlv-card">
                <p className="dlv-num">03</p>
                <h3 className="dlv-title">秘密保持と返金保証<small>非公開で安心</small></h3>
                <p className="dlv-body">被験者全員とNDAを締結し、結果は非公開で納品。さらに初回検証で発見点が3件未満なら全額返金します。良い結果ではなく、意味のある発見に責任を持ちます。</p>
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
                <p className="dlv-body">検証したいタスクと質問項目を、Workleが設計してご共有します。コメントで修正でき、実施前の合意はここで完結します。</p>
              </div>
              <div className="dlv-card">
                <p className="dlv-num">02</p>
                <h3 className="dlv-title">実施記録シート<small>スプレッドシート</small></h3>
                <p className="dlv-body">被験者ごとのタスク完遂・つまずき箇所・発言を、当日その場で1人1行に記録。加工前の生データをそのままお渡しします。</p>
              </div>
              <div className="dlv-card">
                <p className="dlv-num">03</p>
                <h3 className="dlv-title">レポート<small>PDF</small></h3>
                <p className="dlv-body">サマリー・発見点リスト（重要度別）・改善提案・被験者属性をまとめたA4レポート。継続プランでは前月比較つき。</p>
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
            <h2 className="sv-h">相談から納品まで。</h2>
            <div className="proc-grid">
              <div className="proc-step">
                <p className="proc-num">STEP 01</p>
                <h3 className="proc-title">無料相談</h3>
                <p className="proc-body">15分のオンライン相談で、検証したいことと進め方をすり合わせます。NDAが必要な場合はここで締結します。</p>
              </div>
              <div className="proc-step">
                <p className="proc-num">STEP 02</p>
                <h3 className="proc-title">入稿（フォーム）</h3>
                <p className="proc-body">サービスURL・検証したいタスク・一番知りたいこと・希望する被験者属性をフォームでご記入いただきます。所要5分。</p>
              </div>
              <div className="proc-step">
                <p className="proc-num">STEP 03</p>
                <h3 className="proc-title">設計の確認</h3>
                <p className="proc-body">Workleが設計シートを作成し共有します。30分の設計打ち合わせを1回実施し、内容を確定します。</p>
              </div>
              <div className="proc-step">
                <p className="proc-num">STEP 04</p>
                <h3 className="proc-title">実施・納品</h3>
                <p className="proc-body">被験者を募集し、Workleが立ち会って実施。実施記録シートとPDFレポートを納品します。申込から10営業日（最短7営業日）が目安です。</p>
              </div>
            </div>
          </div>
        </section>

        {/* §8 料金 */}
        <section className="sv tight" id="pricing">
          <div className="wrap">
            <span className="sv-eyebrow">料金</span>
            <h2 className="sv-h">発見から始め、<br />確認で続ける。</h2>
            <p className="sv-sub">
              まず初回で問題を洗い出し、継続で改善の効果を測り続けます。すべてNDA締結・請求書払い・結果非公開に対応します。
            </p>

            <div className="sv-price-grid" style={{ marginTop: 28 }}>
              {/* 初回 */}
              <div className="sv-price-col feat">
                <div className="sv-price-col-tag">初回検証 — 発見フェーズ</div>
                <div className="sv-price-row">
                  <span className="pr-name">初回検証<small>10人・フルレポート</small></span>
                  <span className="pr-val">¥98,000</span>
                </div>
                <p className="sv-price-note">
                  ※ 改善提案書・重要度別の発見点リスト付き。NDA締結・請求書払い・結果非公開。
                </p>
                <p className="sv-price-note sv-price-note-em">
                  発見点3件未満なら全額返金。
                </p>
                <div className="sv-price-cta-group">
                  <Link
                    href={CONSULT_URL}
                    className="btn btn-primary"
                    data-action="track-consult"
                    data-location="biz_pricing_initial"
                  >
                    無料相談を予約（15分） <span className="arr">→</span>
                  </Link>
                </div>
              </div>

              {/* 継続 */}
              <div className="sv-price-col">
                <div className="sv-price-col-tag">継続検証 — 確認フェーズ</div>
                <div className="sv-price-row">
                  <span className="pr-name">継続検証<small>毎月5人・前月比較つき</small></span>
                  <span className="pr-val">¥58,000<small>/月</small></span>
                </div>
                <p className="sv-price-note">
                  ※ 初回検証の実施が条件。完全非同期・解約自由。
                </p>
                <p className="sv-price-note">
                  競合比較テストや被験者の操作映像つきなど、拡張はオプションでご用意しています。
                </p>
                <div className="sv-price-cta-group">
                  <Link
                    href={CONSULT_URL}
                    className="btn btn-ghost-cream"
                    data-action="track-consult"
                    data-location="biz_pricing_monthly"
                  >
                    継続プランを相談する
                  </Link>
                </div>
              </div>
            </div>

            <div className="sv-def" style={{ marginTop: 16 }}>
              <div className="sv-price-col-tag">オプション</div>
              <ul className="sv-def-list">
                <li><span className="k">競合比較テスト</span><span>同じ10人が3サービスを使い比べ <strong>¥198,000</strong></span></li>
                <li><span className="k">操作映像つき</span><span>継続検証に被験者の操作映像を追加 <strong>+¥30,000</strong>/月</span></li>
                <li><span className="k">被験者追加</span><span>継続を5人→10人へ <strong>+¥40,000</strong></span></li>
                <li><span className="k">ペルソナ追加</span><span>属性の追加指定 <strong>+¥5,000</strong> / 1条件（2条件までは無料）</span></li>
                <li><span className="k">特急</span><span>短納期での実施 <strong>+¥10,000</strong></span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* §9 FAQ */}
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

        {/* §10 FINAL CTA */}
        <section className="final-v2">
          <div className="wrap">
            <div className="final-v2-inner reveal">
              <p className="final-v2-en" aria-hidden="true">FIND<br />THE WHY.</p>
              <p className="final-v2-jp">
                「なぜ使われないか」を、公開前に手に入れる。
              </p>
              <div className="final-v2-cta-row">
                <Link href={CONSULT_URL} className="btn btn-primary" data-action="track-consult" data-location="biz_final">
                  無料相談を予約（15分） <span className="arr">→</span>
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost"
                  data-action="open-sample-modal"
                >
                  サンプルレポートを見る
                </button>
              </div>
              <p className="final-v2-note">初回検証¥98,000〜 · NDA・請求書払い対応 · 非同期で進行</p>
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
