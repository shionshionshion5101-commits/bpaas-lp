import { Fragment } from "react";

// ── Icons (inline SVG) ─────────────────────────────────────────────────────
function IconClipboard() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-3" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ── "くるくる" spinning ring (work が回る motif) ────────────────────────────
function SpinRing({
  size = 18,
  className = "",
  duration = "7s",
  dashed = false,
}: {
  size?: number;
  className?: string;
  duration?: string;
  dashed?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`spin-ring inline-block shrink-0 rounded-full ${
        dashed
          ? "border border-dashed border-amber-400/40"
          : "border-2 border-amber-400/60 border-t-transparent"
      } ${className}`}
      style={{ width: size, height: size, animation: `spin ${duration} linear infinite` }}
    />
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const indieFeatures = [
  "専用Notionボードの提供（タスクカードを積むだけ）",
  "X（Twitter）でのターゲットへのゲリラDM営業代行",
  "Zenn / note 等の技術記事のゴーストライティング・認知拡大",
  "1タスクずつの並行稼働・消化",
];

const bizFeatures = [
  "戦略立案のための定期Zoomミーティング・壁打ち",
  "B2Bフォーム営業・ターゲットリストのスクレイピング構築",
  "包括的なマーケティング戦略 & SNSアカウントの運用代行",
  "プロのエンジニアとトップセールスによる実務実行",
];

const steps = [
  {
    icon: <IconClipboard />,
    num: "01",
    title: "タスクを積む",
    desc: "専用のNotionボードに依頼を書く。フォーマットはシンプル。1行でも動く。",
  },
  {
    icon: <IconZap />,
    num: "02",
    title: "プロが実行",
    desc: "エンジニアとセールスが裏側で稼働。Zoomも承認フローも不要。",
  },
  {
    icon: <IconCheckCircle />,
    num: "03",
    title: "Ship完了",
    desc: "通知を受け取り、Notionで結果を確認する。あなたの作業はゼロ。",
  },
];

const comparisons = [
  {
    label: "ミーティング",
    Workle: "一切なし（非同期完結）",
    old: "定期的なZoom・要件定義",
  },
  {
    label: "料金・見積もり",
    Workle: "月額定額 ＋ 成果報酬",
    old: "都度見積もり・不透明",
  },
  {
    label: "やり取りのUI",
    Workle: "Notionボードのみ",
    old: "長文メール・Slack・Excel",
  },
];

const faqs = [
  {
    q: "本当に事前のミーティング（Zoom）なしで依頼できるのですか？",
    a: "はい。タスクの要件定義から納品まで、すべてNotion上のコメントとテキストで完結します。あなたの開発のフロー状態を阻害しません。ご購入後の初期セットアップも、専用のLoom動画とテキストフォームで即座に完了します。",
  },
  {
    q: "依頼できるタスクに制限はありますか？",
    a: "Starter Planは「1タスクずつ並行稼働」が基本です。XのゲリラDM、技術記事のゴーストライティング、B2Bフォーム送信、ターゲットリスト作成などの実行系タスクが対象です。難易度の高い戦略立案やSNSアカウントの継続運用が必要な場合は、Growth Planをご検討ください。",
  },
  {
    q: "成果が出なかった場合の料金はどうなりますか？",
    a: "月額定額分は実行（稼働）に対する対価のため発生します。一方、成果報酬パートは定義した成果（例：アポ獲得・サインアップ）が発生した分のみ課金されるため、コストが青天井になることはありません。料金体系は契約前にNotionとLoomで明示します。",
  },
];

// 繰り返し使うブランドグラデーション（オレンジ→アンバー）
const btnGradient =
  "bg-gradient-to-r from-orange-400 to-amber-300 text-zinc-950 transition-all hover:from-orange-300 hover:to-amber-200";
const textGradient =
  "bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent";

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="grain relative min-h-screen bg-[#0a0a0a] text-zinc-100">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <span className="flex items-center gap-2 text-base font-bold tracking-tight text-white font-rounded">
            <SpinRing size={16} duration="6s" />
            Workle
          </span>
          <nav className="flex items-center gap-5">
            <a href="#plans" className="text-sm text-zinc-400 hover:text-amber-300 transition-colors">
              プランを見る
            </a>
            <a
              href="https://tally.so/r/1A6Yzg" target="_blank" rel="noopener noreferrer"
              className={`rounded-md px-4 py-1.5 text-sm font-semibold ${btnGradient}`}
            >
              テスト導入
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pt-28 pb-32">
        {/* オレンジ→黄の放射グラデ光 */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[480px] w-[680px] max-w-full -translate-x-1/2 -translate-y-1/4 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(251,146,60,0.28), rgba(252,211,77,0.12), transparent)",
          }}
        />
        {/* くるくる回るリング装飾 */}
        <SpinRing
          dashed
          size={520}
          duration="40s"
          className="pointer-events-none absolute left-1/2 top-10 -z-0 -translate-x-1/2 opacity-30"
        />
        <SpinRing
          dashed
          size={340}
          duration="28s"
          className="pointer-events-none absolute left-1/2 top-24 -z-0 -translate-x-1/2 opacity-20"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-xs text-amber-200/90">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Private Beta
          </div>
          <h1 className="mb-5 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl font-rounded">
            コードを書いたら、
            <br />
            1秒で市場に
            <span className={textGradient}>
              Ship
            </span>
            する。
          </h1>
          <p className="mb-3 text-lg font-medium text-zinc-300">
            退屈な初期マーケティングと営業のセットアップを
            <br className="hidden sm:block" />
            すべてスキップしよう。
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-zinc-500">
            プロダクトは完成した。しかし、最初の10人のユーザー獲得、Xでのゲリラ営業、B2Bのフォーム送信などの「泥臭い作業」に時間を奪われていませんか？Workleが、その実行フローをバックエンドで引き受けます。
          </p>
          <a
            href="#plans"
            className={`inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 hover:shadow-orange-500/40 ${btnGradient}`}
          >
            プランを選択して実行する
            <IconArrowRight />
          </a>
        </div>
      </section>

      {/* ── Pain & Solution ── */}
      <section className="border-t border-zinc-800/60 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-orange-400/90">
            How it works
          </p>
          <h2 className="mb-16 text-center text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl font-rounded">
            あなたはコードを書くだけ。<br />
            <span className="text-zinc-400">泥臭い実行はすべてAPI（Workle）に投げてください。</span>
          </h2>

          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {steps.map((step, i) => (
              <Fragment key={step.num}>
                <div className="card-surface flex flex-col gap-4 rounded-xl border border-zinc-800 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-orange-400">{step.num}</span>
                    <span className="text-amber-400">{step.icon}</span>
                  </div>
                  <div>
                    <p className="mb-1.5 font-semibold text-white">{step.title}</p>
                    <p className="text-sm leading-relaxed text-zinc-500">{step.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center text-orange-400/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="border-t border-zinc-800/60 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-orange-400/90">
            Why Workle?
          </p>
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl font-rounded">
            従来の代行業者との違い
          </h2>

          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="w-[30%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    比較項目
                  </th>
                  <th className="w-[35%] bg-amber-400/[0.06] px-6 py-4 text-left">
                    <span className="text-sm font-semibold text-amber-300 font-rounded">Workle</span>
                  </th>
                  <th className="w-[35%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    従来の代行業者
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i < comparisons.length - 1 ? "border-b border-zinc-800/60" : ""}
                  >
                    <td className="px-6 py-5 text-xs font-medium text-zinc-500">
                      {row.label}
                    </td>
                    <td className="bg-amber-400/[0.06] px-6 py-5">
                      <span className="flex items-center gap-2 font-medium text-amber-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {row.Workle}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-zinc-500">
                      <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-zinc-700">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        {row.old}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section id="plans" className="border-t border-zinc-800/60 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-orange-400/90">
            Pricing
          </p>
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl font-rounded">
            プランを選ぶ
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Indie Plan */}
            <div className="card-surface flex flex-col rounded-xl border border-zinc-800 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/30">
              <div className="mb-6">
                <span className="inline-block rounded-full border border-zinc-700 px-2.5 py-0.5 text-xs text-zinc-400">
                  個人開発者・Micro-SaaS向け
                </span>
              </div>
              <h3 className="mb-1 text-xl font-bold text-white font-rounded">Starter Plan</h3>
              <p className="mb-4 text-sm text-zinc-500">完全非同期 · Zoomミーティング一切なし</p>
              <div className="mb-6">
                <span className={`text-4xl font-bold font-rounded ${textGradient}`}>¥50,000</span>
                <span className="ml-1 text-sm text-zinc-500">/ 月</span>
              </div>
              <p className="mb-8 border-l-2 border-zinc-700 pl-4 text-sm leading-relaxed text-zinc-400">
                タスクを投げたら、あとは寝て待つだけ。
              </p>
              <ul className="mb-10 flex flex-col gap-3">
                {indieFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                    <IconCheck className="mt-0.5 shrink-0 text-amber-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://tally.so/r/1A6Yzg" target="_blank" rel="noopener noreferrer"
                className={`mt-auto block rounded-md py-3 text-center text-sm font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 ${btnGradient}`}
              >
                決済して、専用Notionボードを受け取る
              </a>
            </div>

            {/* Business Plan */}
            <div className="card-surface relative flex flex-col rounded-xl border border-amber-400/40 p-8 shadow-2xl shadow-orange-500/10">
              <div className="mb-6 flex items-center justify-between">
                <span className="inline-block rounded-full border border-zinc-600 px-2.5 py-0.5 text-xs text-zinc-400">
                  中小企業・新規事業法人向け
                </span>
                <span className="rounded-full bg-orange-400/15 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                  おすすめ
                </span>
              </div>
              <h3 className="mb-1 text-xl font-bold text-white font-rounded">Growth Plan</h3>
              <p className="mb-4 text-sm text-zinc-500">伴走型 · 定期Zoomミーティングあり</p>
              <div className="mb-6">
                <span className={`text-4xl font-bold font-rounded ${textGradient}`}>¥98,000</span>
                <span className="ml-1 text-sm text-zinc-500">/ 月</span>
              </div>
              <p className="mb-8 border-l-2 border-zinc-400 pl-4 text-sm leading-relaxed text-zinc-400">
                アプリを「どう売るか」の戦略策定から、
                <br />
                営業・SNS運用の実行までを共にする。
              </p>
              <ul className="mb-10 flex flex-col gap-3">
                {bizFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                    <IconCheck className="mt-0.5 shrink-0 text-zinc-300" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://tally.so/r/1A6Yzg" target="_blank" rel="noopener noreferrer"
                className="mt-auto block rounded-md border border-amber-400/40 py-3 text-center text-sm font-semibold text-amber-300 hover:bg-amber-400/5 transition-colors"
              >
                詳細を相談する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Workle (Notion mockup) ── */}
      <section className="border-t border-zinc-800/60 px-6 py-24">
        <div className="mx-auto max-w-5xl grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-orange-400/90">
              背景
            </p>
            <h2 className="mb-6 text-3xl font-bold leading-snug tracking-tight text-white font-rounded">
              実行できる唯一の
              <br />
              ビジネスボイラープレート
            </h2>
            <p className="text-base leading-relaxed text-zinc-400">
              営業代行会社は、システムのことがわからない。コンサル会社は、手を動かさない。
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Workleは、外資IT出身のエンジニアとトップセールスが構築した、ビジネス実行のための「ボイラープレート（型）」です。認証・決済の実装を肩代わりするShipFastのように、Workleは初期マーケティングと営業の実行を丸ごと引き受けます。
            </p>
          </div>

          <div className="card-surface select-none rounded-xl border border-zinc-800 p-6 shadow-xl shadow-black/40">
            <div className="mb-4 flex items-center gap-2">
              <SpinRing size={12} duration="5s" />
              <span className="text-xs font-medium text-zinc-500 font-rounded">Workle タスクボード</span>
            </div>
            <div className="mb-3 grid grid-cols-3 gap-2 text-center">
              {["📥 Inbox", "⚡ 実行中", "✅ 完了"].map((col) => (
                <div key={col} className="rounded-md bg-zinc-800/60 px-2 py-1 text-xs font-medium text-zinc-500">
                  {col}
                </div>
              ))}
            </div>
            {[
              ["XゲリラDM（SaaS層）", "Zennゴーストライティング", "プロフ最適化"],
              ["B2Bフォーム送信 x50", "ターゲットリスト作成", "記事投稿完了"],
              ["競合調査レポート", "—", "DM返信フォロー"],
            ].map((row, ri) => (
              <div key={ri} className="mb-2 grid grid-cols-3 gap-2">
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    className={`rounded-md px-2 py-2 text-xs leading-tight ${
                      cell === "—" ? "bg-transparent text-zinc-700" : "bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
            <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-600">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              3 tasks running
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800/60 px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-orange-400/90">
            FAQ
          </p>
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-white font-rounded">
            よくある質問
          </h2>

          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="card-surface group rounded-xl border border-zinc-800 transition-colors open:border-amber-400/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-medium text-zinc-200 hover:text-white [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-zinc-600 transition-transform group-open:rotate-180 group-open:text-amber-400"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="border-t border-zinc-800/60 px-6 py-5 text-sm leading-relaxed text-zinc-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-800/60 px-6 py-10">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <span className="flex items-center gap-2 text-sm font-bold text-white font-rounded">
            <SpinRing size={14} duration="6s" />
            Workle
          </span>
          <p className="text-xs text-zinc-600">© 2026 Workle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
