export default function Home() {
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <span className="text-base font-semibold tracking-tight text-white">
            Bpath
          </span>
          <nav className="flex items-center gap-5">
            <a
              href="#plans"
              className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              プランを見る
            </a>
            <a
              href="#contact"
              className="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              テスト導入
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="px-6 pt-28 pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Private Beta
          </div>

          <h1 className="mb-5 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            コードを書いたら、
            <br />
            1秒で市場にShipする。
          </h1>

          <p className="mb-3 text-lg font-medium text-zinc-300">
            退屈な初期マーケティングと営業のセットアップを
            <br className="hidden sm:block" />
            すべてスキップしよう。
          </p>

          <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-zinc-500">
            プロダクトは完成した。しかし、最初の10人のユーザー獲得、Xでのゲリラ営業、B2Bのフォーム送信などの「泥臭い作業」に時間を奪われていませんか？Bpathが、その実行フローをバックエンドで引き受けます。
          </p>

          <a
            href="#plans"
            className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            プランを選択して実行する
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Plans ── */}
      <section id="plans" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-12 text-center text-xs font-semibold uppercase tracking-widest text-zinc-600">
            Pricing
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Indie Plan */}
            <div className="flex flex-col rounded-xl border border-zinc-800 bg-[#111111] p-8">
              <div className="mb-6">
                <span className="inline-block rounded-full border border-zinc-700 px-2.5 py-0.5 text-xs text-zinc-400">
                  個人開発者・Micro-SaaS向け
                </span>
              </div>

              <h3 className="mb-1 text-xl font-bold text-white">Indie Plan</h3>
              <p className="mb-4 text-sm text-zinc-500">
                完全非同期 · Zoomミーティング一切なし
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">¥30,000</span>
                <span className="ml-1 text-sm text-zinc-500">/ 月</span>
              </div>

              <p className="mb-8 text-sm text-zinc-400 leading-relaxed border-l-2 border-zinc-700 pl-4">
                タスクを投げたら、あとは寝て待つだけ。
              </p>

              <ul className="mb-10 flex flex-col gap-3">
                {indieFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 shrink-0 text-emerald-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-auto block rounded-md border border-zinc-700 py-3 text-center text-sm font-medium text-zinc-200 hover:border-zinc-500 hover:text-white transition-colors"
              >
                このプランで始める
              </a>
            </div>

            {/* Business Plan */}
            <div className="flex flex-col rounded-xl border border-zinc-100 bg-[#111111] p-8">
              <div className="mb-6 flex items-center justify-between">
                <span className="inline-block rounded-full border border-zinc-600 px-2.5 py-0.5 text-xs text-zinc-400">
                  中小企業・新規事業法人向け
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white">
                  おすすめ
                </span>
              </div>

              <h3 className="mb-1 text-xl font-bold text-white">Business Plan</h3>
              <p className="mb-4 text-sm text-zinc-500">
                伴走型 · 定期Zoomミーティングあり
              </p>

              <div className="mb-6">
                <span className="text-2xl font-bold text-white">レベニューシェアモデル</span>
                <p className="mt-1 text-xs text-zinc-500">
                  売上の数% · 初期検証費用は要相談
                </p>
              </div>

              <p className="mb-8 text-sm text-zinc-400 leading-relaxed border-l-2 border-zinc-400 pl-4">
                アプリを「どう売るか」の戦略策定から、
                <br />
                営業・SNS運用の実行までを共にする。
              </p>

              <ul className="mb-10 flex flex-col gap-3">
                {bizFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 shrink-0 text-zinc-300"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-auto block rounded-md bg-white py-3 text-center text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                詳細を相談する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Bpath ── */}
      <section className="px-6 py-24 border-t border-zinc-800/60">
        <div className="mx-auto max-w-5xl grid gap-16 md:grid-cols-2 md:items-center">
          {/* Left: text */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">
              Why Bpath?
            </p>
            <h2 className="mb-6 text-3xl font-bold leading-snug tracking-tight text-white">
              実行できる唯一の
              <br />
              ビジネスボイラープレート
            </h2>
            <p className="text-base leading-relaxed text-zinc-400">
              営業代行会社は、システムのことがわからない。コンサル会社は、手を動かさない。
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Bpathは、IBMのエンジニアとトップセールスが構築した、ビジネス実行のための「ボイラープレート（型）」です。認証・決済の実装を肩代わりするShipFastのように、Bpathは初期マーケティングと営業の実行を丸ごと引き受けます。
            </p>
          </div>

          {/* Right: Notion board mockup */}
          <div className="rounded-xl border border-zinc-800 bg-[#111111] p-6 select-none">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-zinc-700" />
              <span className="text-xs font-medium text-zinc-500">Bpath タスクボード</span>
            </div>

            {/* Column headers */}
            <div className="mb-3 grid grid-cols-3 gap-2 text-center">
              {["📥 Inbox", "⚡ 実行中", "✅ 完了"].map((col) => (
                <div
                  key={col}
                  className="rounded-md bg-zinc-800/60 px-2 py-1 text-xs font-medium text-zinc-500"
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Task rows */}
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
                      cell === "—"
                        ? "bg-transparent text-zinc-700"
                        : "bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}

            <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              3 tasks running
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="border-t border-zinc-800/60 px-6 py-10">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <span className="text-sm font-medium text-white">Bpath</span>
          <p className="text-xs text-zinc-600">
            © 2026 Bpath. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
