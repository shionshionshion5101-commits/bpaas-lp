import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import WorkleInteractions from "../components/WorkleInteractions";

const PAGE_URL = "https://www.workle-kle.com/sales";
const CONSULT_URL = "/consult";
const X_URL = "https://x.com/Workle_shion";

export const metadata: Metadata = {
  title: "営業代行 成果報酬（スタートアップ向け）| Workle — 固定¥50,000+¥20,000/商談",
  description:
    "営業を雇う前に、試せる営業。リスト構築・フォーム営業・架電まで。固定¥50,000＋成果報酬¥20,000/商談・初期費用0円。『アポ』の定義を契約前に確定するから請求で揉めません。",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "営業代行 成果報酬（スタートアップ向け）| Workle",
    description:
      "営業を雇う前に、試せる営業。固定¥50,000＋成果報酬¥20,000/商談・初期費用0円。",
    url: PAGE_URL,
    siteName: "Workle",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "営業代行 成果報酬（スタートアップ向け）| Workle",
    description: "営業を雇う前に、試せる営業。固定¥50,000+成果¥20,000/商談。",
  },
};

const COMPARE = {
  cols: ["営業代行を単体外注", "営業人材を採用", "Workle 営業代行"],
  rows: [
    { k: "月額", v: ["50〜70万円", "給与40〜50万円+社保", "固定¥50,000＋成果¥20,000/商談"] },
    { k: "初期費用", v: ["5〜25万円", "採用費50〜100万円", "0円"] },
    { k: "リスク構造", v: ["成果に関わらず固定費", "成果に関わらず給与発生", "商談が増えた分だけ課金"] },
    { k: "契約", v: ["半年縛りが多い", "雇用（解雇困難）", "月契約・いつでも解約可"] },
    { k: "稼働開始", v: ["数週間", "入社後3〜6ヶ月", "翌営業日"] },
  ],
};

const FAQ_ITEMS = [
  {
    q: "フォーム営業と架電、どちらで進めますか？",
    a: "商材とターゲットに応じて配分します。届きやすいチャネルから当て、週次で効果を見ながら調整します。どちらも標準の提供内容に含まれます。",
  },
  {
    q: "月300件以上アプローチしてほしい場合は？",
    a: "商材とリストの質を確認した上で、追加分の設計とお見積もりをご案内します。",
  },
  {
    q: "商談に同席してもらえますか？",
    a: "商談は貴社にお任せしています。そのぶんアポの質と量に集中し、ヒアリング内容と決裁者情報を引き継ぐことで、初回商談の精度を上げています。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "最低契約期間はありません。月末までにご連絡いただければ翌月から解約でき、違約金・解約手数料はかかりません。",
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
      name: "Workle 営業代行（成果報酬型）",
      serviceType: "営業代行・インサイドセールス代行",
      provider: { "@id": "https://www.workle-kle.com/#organization" },
      areaServed: "JP",
      audience: { "@type": "Audience", audienceType: "スタートアップ・BtoB事業者" },
      offers: {
        "@type": "Offer",
        price: "50000",
        priceCurrency: "JPY",
        description: "固定¥50,000/月＋成果報酬¥20,000/商談・初期費用0円",
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
        { "@type": "ListItem", position: 2, name: "営業代行", item: PAGE_URL },
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
        links={[
          { href: "#scope", label: "提供内容" },
          { href: "#apo", label: "成果報酬" },
          { href: "#price", label: "料金" },
          { href: "#compare", label: "比較" },
          { href: "#faq", label: "FAQ" },
        ]}
        ghost={{ href: "/", label: "他のサービス" }}
        cta={{ href: CONSULT_URL, label: "無料相談を予約" }}
      />

      <main id="top">

        {/* §1 HERO */}
        <section className="sv sv-hero" id="hero">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">SELL IT.</p>
            <span className="sv-eyebrow">営業代行 — 成果報酬型</span>
            <h1 className="sv-h" style={{ fontSize: "clamp(28px, 4.4vw, 50px)", maxWidth: 820 }}>
              営業を雇う前に、<br />試せる営業。
            </h1>
            <p className="sv-sub">
              リスト構築からフォーム営業・架電まで。獲ったアポは、商談にすぐ入れる状態で引き渡します。
            </p>
            <div className="sv-chips">
              <span className="sv-chip">固定 <span className="sv-chip-num">¥50,000</span> / 月</span>
              <span className="sv-chip">成果報酬 <span className="sv-chip-num">¥20,000</span> / 商談</span>
              <span className="sv-chip">初期費用 0円</span>
            </div>
            <div className="sv-cta-row">
              <Link href={CONSULT_URL} className="btn btn-primary">
                無料相談を予約する（15分） <span className="arr">→</span>
              </Link>
              <a href="#apo" className="btn btn-ghost-cream">
                「アポ」の定義を見る
              </a>
            </div>
            <p className="sv-cta-note">15分 / オンライン / 費用・契約なし</p>
          </div>
        </section>

        {/* §2 提供内容 */}
        <section className="sv tight" id="scope">
          <div className="wrap">
            <span className="sv-eyebrow">提供内容</span>
            <h2 className="sv-h">アポにつながる実務を、<br />まるごと引き取ります。</h2>
            <div className="sv-steps g4">
              <div className="sv-step">
                <div className="sv-step-n">01</div>
                <h3>リスト構築</h3>
                <p>ターゲット条件を定義し、決裁関与者にたどり着くリストを構築します。標準設計：月500件。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">02</div>
                <h3>アプローチ実行</h3>
                <p>フォーム営業と架電を、商材に合わせた配分で実行します。標準設計：月300件。届きやすいチャネルから当てます。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">03</div>
                <h3>商談前の引き継ぎ</h3>
                <p>獲ったアポは、ヒアリング内容・温度感・決裁者情報をまとめて引き渡します。初回商談を、ゼロから始めさせません。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">04</div>
                <h3>週次 実数レポート</h3>
                <p>送信数・架電数・返信率・アポ数を毎週実数で報告。何が効いているかを一緒に検証します。</p>
              </div>
            </div>
            <p className="sv-cta-note" style={{ marginTop: 20 }}>
              件数は標準設計です。商材・ターゲットに応じて最適な配分に調整します。
            </p>
          </div>
        </section>

        {/* §3 成果報酬の定義 */}
        <section className="sv tight" id="apo">
          <div className="wrap">
            <span className="sv-eyebrow">成果報酬の定義</span>
            <h2 className="sv-h">「アポ」の定義を、<br />先に決めます。</h2>
            <p className="sv-sub">
              成果報酬でいちばん揉めるのは「これはアポにカウントするのか」です。契約前に、課金対象を数字で確定させます。
            </p>
            <div className="sv-def">
              <ul className="sv-def-list">
                <li><span className="k">課金対象</span><span>決裁に関与する方が同席し、日時が確定した<strong> 30分以上の商談</strong>のみ。</span></li>
                <li><span className="k">キャンセル</span><span>先方都合のキャンセルは <strong>0.5カウント</strong>。こちらの都合や無断キャンセルは課金対象外。</span></li>
                <li><span className="k">月間上限</span><span>1ヶ月あたり <strong>15件</strong>まで。超過分は請求しません（青天井の請求は起きません）。</span></li>
                <li><span className="k">単価</span><span>1商談あたり <strong>¥20,000</strong>。固定費 ¥50,000/月 とあわせて請求します。</span></li>
              </ul>
            </div>
            <p className="sv-cta-note">請求で揉める曖昧さを、契約前に潰します。定義は契約書にそのまま明記します。</p>
          </div>
        </section>

        {/* §3.5 料金 */}
        <section className="sv tight" id="price">
          <div className="wrap">
            <span className="sv-eyebrow">料金</span>
            <h2 className="sv-h">アポ1件、¥20,000。以上。</h2>
            <div className="sv-chips">
              <span className="sv-chip">固定 <span className="sv-chip-num">¥50,000</span> / 月</span>
              <span className="sv-chip">成果報酬 <span className="sv-chip-num">¥20,000</span> / 商談</span>
              <span className="sv-chip">初期費用 0円</span>
            </div>
            <div className="sv-cta-row">
              <Link href={CONSULT_URL} className="btn btn-primary">
                無料相談を予約する <span className="arr">→</span>
              </Link>
            </div>
            <p className="sv-cta-note">最低契約期間なし · いつでも解約可 · 翌営業日稼働</p>
          </div>
        </section>

        {/* §4 比較表 */}
        <section className="sv tight" id="compare">
          <div className="wrap">
            <span className="sv-eyebrow">比較</span>
            <h2 className="sv-h">固定費の営業と、<br />何が違うのか。</h2>

            <div className="sv-compare">
              {/* Desktop table */}
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

              {/* Mobile cards */}
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
          </div>
        </section>

        {/* §5 お断りする場合 */}
        <section className="sv tight" id="honest">
          <div className="wrap">
            <span className="sv-eyebrow">先に、正直に</span>
            <h2 className="sv-h">お断りする場合も、<br />あります。</h2>
            <p className="sv-sub">
              成果報酬でお受けする以上、商材とターゲットの相性を、その場で見極めます。次のケースでは、お受けしない判断をすることがあります。
            </p>
            <div className="sv-note">
              ・商材単価が低く、アポ単価（¥20,000）が見合わない場合<br />
              ・ターゲットが不明確で、誰に当てるべきかが定まっていない場合<br /><br />
              これは体力温存ではなく、成果報酬というリスクを一緒に背負う以上、当てて外す前に見極めるべきだからです。見極めの結果は無料相談でそのままお伝えします。
            </div>
          </div>
        </section>

        {/* §6 進め方 */}
        <section className="sv tight" id="flow">
          <div className="wrap">
            <span className="sv-eyebrow">進め方</span>
            <h2 className="sv-h">相談から稼働まで、<br />翌営業日。</h2>
            <div className="sv-steps four">
              <div className="sv-step">
                <div className="sv-step-n">01</div>
                <h3>無料相談（15分）</h3>
                <p>現状をヒアリングし、商材とターゲットの相性を、その場で見極めます。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">02</div>
                <h3>実行プラン提示</h3>
                <p>リスト条件・スクリプト・KPI・初月の実行プランを提示。アポ定義も明文化します。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">03</div>
                <h3>実務実行（非同期）</h3>
                <p>合意後、翌営業日に稼働開始。進捗はボードでリアルタイムに確認できます。</p>
              </div>
              <div className="sv-step">
                <div className="sv-step-n">04</div>
                <h3>週次レポート</h3>
                <p>送信数・返信率・アポ数を実数で報告。翌週の改善仮説とセットで渡します。</p>
              </div>
            </div>
          </div>
        </section>

        {/* §7 FAQ */}
        <section className="sv tight" id="faq">
          <div className="wrap">
            <span className="sv-eyebrow">FAQ</span>
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

        {/* §8 FINAL CTA */}
        <section className="final-v2">
          <div className="wrap">
            <div className="final-v2-inner reveal">
              <p className="final-v2-en" aria-hidden="true">MAKE<br />MEETINGS.</p>
              <p className="final-v2-jp">
                固定費で「動いてもらう」のは終わり。<br />
                商談が増えた分だけ払う営業へ。
              </p>
              <div className="final-v2-cta-row">
                <Link href={CONSULT_URL} className="btn btn-primary">
                  無料相談を予約する <span className="arr">→</span>
                </Link>
                <Link href="/sns" className="btn btn-ghost">
                  SNS運用と併用する
                </Link>
              </div>
              <p className="final-v2-note">固定¥50,000/月＋成果¥20,000/商談 · 初期費用0円 · 翌営業日稼働</p>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
      <WorkleInteractions />
    </>
  );
}
