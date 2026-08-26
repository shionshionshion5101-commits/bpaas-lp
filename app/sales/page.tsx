import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import WorkleInteractions from "../components/WorkleInteractions";
import Icon from "../components/Icon";

const PAGE_URL = "https://www.workle-kle.com/sales";
const CONSULT_URL = "/consult";
const X_URL = "https://x.com/Workle_shion";

export const metadata: Metadata = {
  title: "営業組織の立ち上げ支援 | Workle — 必要なときに、必要なだけ",
  description:
    "採用も研修もなしに、営業の架電量だけを立ち上げる。設計コンサル・立ち上げ伴走・全面委託の3つの形で提供します。運用データは貴社に残ります。",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "営業組織の立ち上げ支援 | Workle",
    description: "採用も研修もなしに営業チームを立ち上げる。運用データは貴社に残ります。",
    url: PAGE_URL,
    siteName: "Workle",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "営業組織の立ち上げ支援 | Workle",
    description: "営業チームを、必要なときに、必要なだけ。",
  },
};

const METHOD_CARDS = [
  { n: "01", title: "リスト", body: "誰に当てるかが条件で定義され、抽出が再現できる状態" },
  { n: "02", title: "スクリプト", body: "初見の人が読んで、その日から成立する粒度まで落ちている" },
  { n: "03", title: "SOP", body: "何を記録し、どこでエスカレーションするかが手順化されている" },
  { n: "04", title: "レポート", body: "実数が自動で集まり、翌日の改善に接続されている" },
];

const OUTSOURCE_COMPARE = {
  cols: ["営業人材を採用", "営業代行を月額外注", "Workle 全面委託"],
  rows: [
    { k: "費用構造", v: ["全額が固定費", "全額が固定費", "小さな固定費 + 成果報酬"] },
    { k: "成果が出なかった月", v: ["給与は満額発生", "契約額は満額発生", "固定分のみ"] },
    { k: "立ち上がり", v: ["入社後3〜6ヶ月", "数週間", "翌営業日"] },
    { k: "撤退", v: ["解雇困難", "半年契約が多い", "月末連絡で翌月から"] },
    {
      k: "ノウハウの残り方",
      v: ["退職とともに失われる", "代行会社側に溜まる", "データで貴社に残る"],
      emph: true,
    },
  ],
};

const FLOW_STEPS = [
  {
    n: "01",
    title: "無料相談（15分）",
    body: "商材・ターゲット・社内の体制を確認し、3つのどれが合うかをその場でお伝えします。",
  },
  {
    n: "02",
    title: "設計案の提示",
    body: "ターゲット条件・スクリプトの方向性・KPI・初月のプランを1枚で提示します。",
  },
  {
    n: "03",
    title: "着手",
    body: "①②は1週間以内、③は翌営業日から稼働します。",
  },
  {
    n: "04",
    title: "実数で回す",
    body: "週次で実数を報告し、翌週の仮説とセットでお渡しします。",
  },
];

const FAQ_ITEMS = [
  {
    q: "どういう方が架電するのですか？",
    a: "スポットワーク（単発雇用）のプラットフォームを通じて募集した稼働メンバーが中心です。個人の営業力に依存しない設計にすることで成立させています。誰が入っても同じ会話ができる粒度までスクリプトとSOPを落とし込むのが、Workleの中心的な仕事です。商材が複雑な場合は、営業経験者・業界経験者を指名してアサインすることも可能です。",
  },
  {
    q: "人が入れ替わって、品質は保てるのですか？",
    a: "品質を人ではなくスクリプトとSOPに持たせています。加えて、どの方を配置した時にどのセグメントで成果が出たかを記録しているため、稼働を重ねるほど配置の精度が上がります。録音のサンプルチェックは毎日実施し、翌日のブリーフィングに反映します。",
  },
  {
    q: "①と②はどう違いますか？",
    a: "渡すものは同じで、実行を一緒にやるかどうかが違います。社内に動かせる人がいるなら①、これから作るなら②が向いています。",
  },
  {
    q: "設計だけ買って、あとで委託に切り替えられますか？",
    a: "できます。①→③の順で進む方が多いです。設計を共有した状態から入るので、立ち上がりが速くなります。",
  },
  {
    q: "稼働メンバーの募集はどうするんですか？",
    a: "②③では募集要件・時給設定・ブリーフィング資料までこちらで設計します。①の場合は設計書に含めてお渡しします。",
  },
  {
    q: "成果が出なかった場合は？",
    a: "③では固定分のみのご請求です。あわせて、架電記録から何が外れたのか——ターゲットなのか、トークなのか、商材なのか——を実数でお出しします。",
  },
  {
    q: "商談に同席してもらえますか？",
    a: "商談は貴社にお任せしています。そのぶんアポの量と質に集中します。ヒアリング内容と決裁者情報は引き継ぎます。",
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
      name: "Workle 営業組織の立ち上げ支援",
      serviceType: "営業組織立ち上げ支援・インサイドセールスコンサルティング",
      provider: { "@id": "https://www.workle-kle.com/#organization" },
      areaServed: "JP",
      audience: { "@type": "Audience", audienceType: "BtoB事業者" },
      description:
        "採用や研修に頼らず、稼働を日単位で編成する前提で営業組織を立ち上げる設計。コンサル・伴走・全面委託の3つの形で提供します。",
      offers: [
        { "@type": "Offer", name: "設計を渡す（コンサル）", price: "350000", priceCurrency: "JPY" },
        { "@type": "Offer", name: "一緒に立ち上げる（伴走）", price: "350000", priceCurrency: "JPY" },
        {
          "@type": "Offer",
          name: "まるごと引き受ける（全面委託）",
          price: "50000",
          priceCurrency: "JPY",
          description: "固定¥50,000/月 + 成果報酬¥20,000/商談",
        },
      ],
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
        { "@type": "ListItem", position: 2, name: "営業立ち上げ", item: PAGE_URL },
      ],
    },
  ],
};

export default function SalesLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static authored JSON-LD — not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <SiteNav
        active="sales"
        links={[
          { href: "#how", label: "なぜ成立するか" },
          { href: "#compounds", label: "蓄積されるもの" },
          { href: "#track", label: "実績" },
          { href: "#plans", label: "3つの関わり方" },
          { href: "#outsource", label: "全面委託" },
          { href: "#price", label: "料金" },
          { href: "#faq", label: "FAQ" },
        ]}
        cta={{ href: CONSULT_URL, label: "無料相談を予約" }}
      />

      <main id="top">

        {/* §1 HERO */}
        <section className="sv sv-hero" id="hero">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">BUILD IT.</p>
            <span className="sv-eyebrow"><Icon name="users" className="sv-eyebrow-icon" />営業組織の立ち上げ支援</span>
            <h1 className="sv-h" style={{ fontSize: "clamp(34px, 4.8vw, 54px)", maxWidth: 860 }}>
              営業チームを、<br />必要なときに、必要なだけ。
            </h1>
            <p className="sv-sub">
              採用も、研修も、固定費もなしに。人を増やさずに、架電量だけを立ち上げます。
            </p>
            <div className="sv-cta-row">
              <Link href={CONSULT_URL} className="btn btn-primary">
                立ち上げを相談する（無料15分） <span className="arr">→</span>
              </Link>
              <a href="#plans" className="btn btn-ghost-cream">
                3つの関わり方を見る
              </a>
            </div>
            <p className="sv-cta-note">15分 / オンライン / 費用・契約なし</p>
          </div>
        </section>

        {/* §2 なぜ成立するのか */}
        <section className="sv tight" id="how">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">THE METHOD.</p>
            <span className="sv-eyebrow"><Icon name="spark" className="sv-eyebrow-icon" />方法論</span>
            <h2 className="sv-h">営業は「採用して育てる」<br />以外の作り方がある。</h2>
            <p className="sv-sub">
              営業組織を作ろうとすると、まず採用の話になります。求人を出し、面接し、入社を待ち、研修する。立ち上がるまで3〜6ヶ月、コストは一人あたり数百万円。しかも、辞めれば振り出しです。
            </p>
            <p className="sv-prose">
              稼働を日単位で編成する前提に設計し直すと、この前提が崩れます。<strong>必要な日だけ人が立ち上がり、要らない日はゼロになる。</strong>
            </p>
            <div className="sv-note">
              ただし、人を集めれば回るわけではありません。稼働メンバーは日ごとに入れ替わるため、<strong>「できる人の頭の中」に頼った運用は成立しません。</strong> 機能している要素をすべて言語化し、外に出しておく必要があります。回るのは、次の4つが「型」になっている時だけです。
            </div>
            <div className="sv-steps g4">
              {METHOD_CARDS.map(({ n, title, body }) => (
                <div className="sv-step" key={n}>
                  <div className="sv-step-n">{n}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <p className="sv-prose">
              この4つを作るのがWorkleの仕事です。<strong>人を送り込むことではありません。</strong>
            </p>
          </div>
        </section>

        {/* §3 蓄積されるもの */}
        <section className="sv tight" id="compounds">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">IT COMPOUNDS.</p>
            <span className="sv-eyebrow"><Icon name="doc" className="sv-eyebrow-icon" />蓄積されるもの</span>
            <h2 className="sv-h">入れ替わるから、残る。</h2>
            <p className="sv-sub">
              「人が固定されないとノウハウが溜まらない」と言われます。実際は逆です。
            </p>
            <p className="sv-prose">
              正社員に営業を任せると、うまくいっている理由はその人の中に溜まります。<strong>そして辞めた瞬間に、まとめて消えます。</strong> 引き継ぎ資料に残るのは手順だけで、なぜ当たっていたのかは残りません。
            </p>
            <p className="sv-prose">
              日ごとに人が入れ替わる前提では、これができません。機能した要素を毎回外に出して記録しない限り、翌日の稼働が成立しないからです。結果として、<strong>運用のすべてがデータになります。</strong>
            </p>
            <div className="sv-steps g4">
              <div className="sv-step">
                <div className="sv-step-n">01</div>
                <h3>トークデータ</h3>
                <p>どの言い回しで受付を越えられたか。どこで切られたか。接続後の秒数まで含めて、フレーズ単位で残ります</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">02</div>
                <h3>アサインデータ</h3>
                <p>どんな経歴・年代・声質の方を配置した時に、どのセグメントでアポ率が高かったか</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">03</div>
                <h3>募集データ</h3>
                <p>どの募集文・条件で何名集まり、どの層が実務に耐えたか。人の集め方そのものが再現可能になります</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">04</div>
                <h3>セグメントデータ</h3>
                <p>業種・規模・役職・時間帯ごとの接続率とアポ率。次に当てるべき相手が数字で決まります</p>
              </div>
            </div>
            <div className="sv-def" style={{ marginTop: "clamp(28px, 3vw, 40px)" }}>
              <p className="sv-prose" style={{ margin: 0 }}>
                この4つは、契約終了時にそのままお渡しします。<strong>Workleを使わなくなっても、貴社に残ります。</strong>
              </p>
              <p className="sv-prose">
                私たちが売っているのは架電の時間ではなく、<strong>次に何をすれば当たるかが分かっている状態</strong>です。
              </p>
            </div>
          </div>
        </section>

        {/* §4 実績 */}
        <section className="sv tight" id="track">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">WHO.</p>
            <span className="sv-eyebrow"><Icon name="star" className="sv-eyebrow-icon" />実績</span>
            <h2 className="sv-h">誰がやるのか。</h2>
            <div className="proof-card" style={{ marginTop: "clamp(28px, 3vw, 40px)" }}>
              <div className="proof-avatar" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5" />
                </svg>
              </div>
              <div className="proof-body">
                <div className="proof-name-row">
                  <span className="proof-name">片倉詩音</span>
                  <a href={X_URL} target="_blank" rel="noopener noreferrer" className="proof-x-link" aria-label="片倉詩音のXアカウント">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.844L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    @Workle_shion
                  </a>
                </div>
                <p className="proof-role">Workle 代表・営業組織設計</p>
                <p className="sv-prose" style={{ marginTop: 12 }}>
                  上場企業でアウトバウンド営業組織の立ち上げにチームで参画し、ターゲット定義、リスト設計、トークスクリプト作成、稼働メンバーの運用設計とレポート基盤の構築を担当しました。
                </p>
                <p className="sv-prose">
                  個人の営業力ではなく、<strong>誰が入っても同じ結果が出る仕組みを作る</strong>のが専門領域です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* §4 3つの関わり方 */}
        <section className="sv tight" id="plans">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">THREE WAYS.</p>
            <span className="sv-eyebrow"><Icon name="sliders" className="sv-eyebrow-icon" />3つの関わり方</span>
            <h2 className="sv-h">設計だけ渡すか、一緒に作るか、<br />まるごと引き受けるか。</h2>
            <p className="sv-sub">関わる深さが違うだけで、渡している型は同じです。</p>

            <div className="way-cards">
              <div className="way-card">
                <div className="way-card-head">
                  <span className="way-card-num">01</span>
                  <h3>設計を渡す（コンサル）</h3>
                </div>
                <ul className="sv-def-list">
                  <li><span className="k">こんな方に</span><span>動かす人はいる。何をどう作ればいいかが分からない</span></li>
                  <li><span className="k">やること</span><span>ターゲット定義、リスト条件の設計、スクリプト作成、SOP整備、KPI設計、レポート基盤の構築</span></li>
                  <li><span className="k">成果物</span><span>そのまま運用に入れる設計書一式</span></li>
                  <li><span className="k">貴社がやること</span><span>実行と運用</span></li>
                  <li><span className="k">期間</span><span>2〜4週間</span></li>
                </ul>
              </div>

              <div className="way-card">
                <div className="way-card-head">
                  <span className="way-card-num">02</span>
                  <h3>一緒に立ち上げる（伴走）</h3>
                </div>
                <ul className="sv-def-list">
                  <li><span className="k">こんな方に</span><span>型も実行もこれから。最初の数週間を並走してほしい</span></li>
                  <li><span className="k">やること</span><span>①のすべて + 初期実行の伴走。稼働メンバーの募集要件・ブリーフィング設計・初日の立ち会い・録音レビューまで一緒に回します</span></li>
                  <li><span className="k">成果物</span><span>設計書一式 + 実際に回った状態の運用</span></li>
                  <li><span className="k">貴社がやること</span><span>引き継ぎ後の運用</span></li>
                  <li><span className="k">期間</span><span>4〜8週間</span></li>
                </ul>
              </div>

              <div className="way-card feat">
                <div className="way-card-banner">営業の固定費が、成果報酬に変わります</div>
                <div className="way-card-head">
                  <span className="way-card-num">03</span>
                  <h3>まるごと引き受ける（全面委託）</h3>
                </div>
                <ul className="sv-def-list">
                  <li><span className="k">こんな方に</span><span>営業機能ごと外に出したい。社内にリソースを置きたくない</span></li>
                  <li><span className="k">やること</span><span>設計から実行まで、Workleが編成するチームで回します</span></li>
                  <li><span className="k">成果物</span><span>商談。運用の実数レポート付き</span></li>
                  <li><span className="k">貴社がやること</span><span>商談に出ること</span></li>
                  <li><span className="k">期間</span><span>月次・継続</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* §5 全面委託とは何か */}
        <section className="sv tight" id="outsource">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">VARIABLE COST.</p>
            <span className="sv-eyebrow"><Icon name="refresh" className="sv-eyebrow-icon" />全面委託</span>
            <h2 className="sv-h">営業の固定費を、<br />成果報酬に変える。</h2>
            <p className="sv-sub">
              営業を社内に持つと、成果が出ても出なくても給与が出ていきます。月額の営業代行も同じで、動いた分ではなく契約した分を払うことになります。
            </p>
            <p className="sv-prose">
              全面委託では、この構造を裏返します。<strong>費用の大部分が、商談が生まれた時にだけ発生する。</strong>動かなかった月に、大きな請求は立ちません。
            </p>

            <div className="sv-compare">
              <table>
                <thead>
                  <tr>
                    <th />
                    {OUTSOURCE_COMPARE.cols.map((c, i) => (
                      <th key={c} className={i === OUTSOURCE_COMPARE.cols.length - 1 ? "cw" : undefined}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {OUTSOURCE_COMPARE.rows.map((row) => (
                    <tr key={row.k} className={row.emph ? "emph" : undefined}>
                      <th>{row.k}</th>
                      {row.v.map((val, i) => (
                        <td key={i} className={i === row.v.length - 1 ? "cw" : undefined}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="sv-compare-cards">
                {OUTSOURCE_COMPARE.cols.map((col, ci) => {
                  const isW = ci === OUTSOURCE_COMPARE.cols.length - 1;
                  return (
                    <div key={col} className={`sv-cc${isW ? " cw" : ""}`}>
                      <p className="sv-cc-title">{col}</p>
                      {OUTSOURCE_COMPARE.rows.map((row) => (
                        <div className={`sv-cc-row${row.emph ? " emph" : ""}`} key={row.k}>
                          <span className="k">{row.k}</span>
                          <span className="v">{row.v[ci]}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sv-def" style={{ marginTop: "clamp(32px, 4vw, 48px)" }}>
              <h3 style={{ fontFamily: '"Zen Kaku Gothic New","Hiragino Sans",sans-serif', fontWeight: 900, fontSize: "clamp(20px, 2vw, 24px)", margin: "0 0 18px", color: "var(--black)" }}>
                成果報酬にする以上、「アポ」の定義を先に決めます。
              </h3>
              <ul className="sv-def-list">
                <li><span className="k">課金対象</span><span>決裁に関与する方が同席し、日時が確定した<strong> 30分以上の商談</strong>のみ</span></li>
                <li><span className="k">キャンセル</span><span>先方都合は <strong>0.5カウント</strong>。こちらの都合や無断キャンセルは課金対象外</span></li>
                <li><span className="k">月間上限</span><span>月 <strong>15件</strong>まで。超過分は請求しません</span></li>
              </ul>
              <p className="sv-cta-note">定義は契約書にそのまま明記します。</p>
            </div>
          </div>
        </section>

        {/* §6 料金 */}
        <section className="sv tight" id="price">
          <div className="wrap">
            <span className="sv-eyebrow"><Icon name="yen" className="sv-eyebrow-icon" />料金</span>
            <h2 className="sv-h">料金。</h2>

            <div className="sv-price-grid cols-3">
              <div className="sv-price-col">
                <div className="sv-price-col-tag">① 設計を渡す</div>
                <p className="price-amt">¥350,000</p>
                <p className="sv-price-note">2〜4週間・単発</p>
              </div>
              <div className="sv-price-col">
                <div className="sv-price-col-tag">② 一緒に立ち上げる</div>
                <p className="price-amt">¥350,000〜</p>
                <p className="sv-price-note">内容に応じて実行分を加算</p>
              </div>
              <div className="sv-price-col">
                <div className="sv-price-col-tag">③ まるごと引き受ける</div>
                <p className="price-amt">月¥50,000<span className="price-amt-sub">+¥20,000 / 商談</span></p>
                <p className="sv-price-note">固定分は月3人日・架電450件目安。4人日目以降は+¥30,000/人日</p>
              </div>
            </div>

            <p className="sv-prose">
              ・初期費用は0円です<br />
              ・最低契約期間はありません<br />
              ・表示価格は税別です<br />
              ・実行を担うのは、スポットワーク経由で編成した稼働メンバーです。指名アサインをご希望の場合は別途ご相談ください。
            </p>

            <p className="sv-cta-note">
              単発のスポット架電（<strong>¥40,000 / 人日</strong>・最低3人日）にも対応しています。まず当たるかどうかを試したい場合はこちらから。
            </p>
          </div>
        </section>

        {/* §7 進め方 */}
        <section className="sv tight" id="flow">
          <div className="wrap">
            <span className="sv-eyebrow"><Icon name="flag" className="sv-eyebrow-icon" />進め方</span>
            <h2 className="sv-h">相談から着手まで、<br />最短で翌営業日。</h2>
            <div className="sv-steps four">
              {FLOW_STEPS.map(({ n, title, body }) => (
                <div className="sv-step" key={n}>
                  <div className="sv-step-n">{n}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* §8 お断りする場合 */}
        <section className="sv tight" id="no">
          <div className="wrap">
            <span className="sv-eyebrow"><Icon name="info" className="sv-eyebrow-icon" />先に、正直に</span>
            <h2 className="sv-h">お断りする場合も、<br />あります。</h2>
            <div className="sv-note">
              ・架電先が個人（BtoC）の場合。BtoBのみお受けしています<br />
              ・ターゲットが定まっておらず、誰に当てるべきかが決まっていない場合<br />
              ・商材単価が低く、成果報酬の単価が見合わない場合（③のみ）<br /><br />
              見極めの結果は、無料相談の場でそのままお伝えします。
            </div>
          </div>
        </section>

        {/* §9 FAQ */}
        <section className="sv tight" id="faq">
          <div className="wrap">
            <span className="sv-eyebrow"><Icon name="question" className="sv-eyebrow-icon" />FAQ</span>
            <h2 className="sv-h">よくある質問</h2>
            <div className="faq-list faq-cream" style={{ margin: "clamp(24px,3vw,36px) 0 0" }}>
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
              <p className="final-v2-en" aria-hidden="true">BUILD IT.<br />THEN SELL IT.</p>
              <p className="final-v2-jp">
                採用しないと営業組織が作れない、という前提を外してください。<br />
                設計だけでも、まるごとでも。15分で、どれが合うかをお伝えします。
              </p>
              <div className="final-v2-cta-row">
                <Link href={CONSULT_URL} className="btn btn-primary">
                  立ち上げを相談する <span className="arr">→</span>
                </Link>
              </div>
              <p className="final-v2-note">初期費用0円 · 最低契約期間なし · 最短翌営業日</p>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
      <WorkleInteractions />
    </>
  );
}
