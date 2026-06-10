import WorkleInteractions from "./components/WorkleInteractions";

export default function Home() {
  return (
    <>
      {/* NAV */}
      <header className="nav" id="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top" aria-label="Workle">
            <span className="brand-mark">&gt;_</span>
            <span className="brand-name">Workle</span>
          </a>
          <nav className="nav-links">
            <a href="#how">仕組み</a>
            <a href="#why">機能</a>
            <a href="#pricing">料金</a>
            <a href="#team">チーム</a>
          </nav>
          <div className="nav-cta">
            <a
              href="#pricing"
              className="btn btn-primary"
              style={{ padding: "10px 18px", fontSize: 14 }}
            >
              タスクを投げる
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" id="hero">
          <div className="hero-glow" />
          <div className="wrap hero-in">
            <span className="pill reveal">
              <span className="live" />
              会議ゼロ / 完全非同期 BPaaS for Developers
            </span>

            <h1 className="reveal d1">
              <span className="ln">会議は、ゼロ。</span>
              <span className="ln">
                タスクは、<span className="accent-tx">投げるだけ。</span>
              </span>
            </h1>

            <p className="hero-sub reveal d2">
              プロダクトに集中。マーケも営業も、泥臭い実務はプロチームに丸投げ。
              元タイミー事業開発・大手人材トップセールス・外資ITエンジニアが、
              <strong style={{ color: "var(--tx)" }}>あなたの稼働ゼロ</strong>
              で完遂します。
            </p>

            <div className="hero-cta reveal d2">
              <a href="#pricing" className="btn btn-primary">
                専用Notionボードを受け取る <span className="arr">→</span>
              </a>
              <a href="#how" className="btn btn-ghost">
                仕組みを見る
              </a>
            </div>

            <p className="hero-note reveal d3">
              <s>Zoom</s> ・ <s>定例会議</s> ・ <s>日程調整</s>{" "}
              — すべて不要。テキストで完結。
            </p>

            <div className="terminal reveal d3" id="terminal">
              <div className="term-bar">
                <span className="term-dot r" />
                <span className="term-dot y" />
                <span className="term-dot g" />
                <span className="term-title">~/workle — task dispatch</span>
              </div>
              <div className="term-body" id="termBody" />
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="marquee" aria-label="投げられるタスクの例">
          <div className="marquee-label">投げられる実務 — ほんの一例</div>
          <div className="marquee-track" id="marquee" />
        </section>

        {/* HOW IT WORKS */}
        <section className="section" id="how">
          <div className="wrap">
            <div
              className="center reveal"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 46,
              }}
            >
              <span className="eyebrow">
                <span className="dot" />
                <span className="num">01</span> / 仕組み
              </span>
              <h2 className="h-sec">
                投げてから、<span className="accent-tx">寝て待つだけ。</span>
              </h2>
              <p className="sub center">
                タスクをNotionの専用ボードに置く。あとは裏側のプロチームが非同期で受け取り、稼働し、完了を積み上げていきます。あなたが画面を見ていなくても、ボードは前に進みます。
              </p>
            </div>

            <div className="steps">
              <div className="step reveal">
                <div className="step-n">STEP 01</div>
                <h3>📥 投げる</h3>
                <p>
                  専用Notionボードの「リクエスト」にタスクカードを置くだけ。仕様も口頭説明も会議もいりません。
                </p>
              </div>
              <div className="step reveal d1">
                <div className="step-n">STEP 02</div>
                <h3>🏃 稼働する</h3>
                <p>
                  プロチームが非同期で受け取り「稼働中」へ。進捗はカード上で静かに可視化されます。
                </p>
              </div>
              <div className="step reveal d2">
                <div className="step-n">STEP 03</div>
                <h3>✅ 積み上がる</h3>
                <p>
                  完遂したタスクは「完了」へ。成果物はボードに残り、いつでも確認できます。
                </p>
              </div>
            </div>

            <div className="board reveal d1" id="board">
              <div className="board-top">
                <span className="b-ico" />
                <b>Workle Board</b>
                <span className="b-path">
                  notion.so / your-workspace / tasks
                </span>
              </div>
              <div className="board-cols">
                <div className="col">
                  <div className="col-h">
                    📥 リクエスト{" "}
                    <span className="cnt" data-cnt="req">
                      0
                    </span>
                  </div>
                  <div className="col-stack" id="col-req" />
                </div>
                <div className="col">
                  <div className="col-h">
                    🏃 稼働中{" "}
                    <span className="cnt" data-cnt="run">
                      0
                    </span>
                  </div>
                  <div className="col-stack" id="col-run" />
                </div>
                <div className="col done">
                  <div className="col-h">
                    ✅ 完了{" "}
                    <span className="cnt" data-cnt="done">
                      0
                    </span>
                  </div>
                  <div className="col-stack" id="col-done" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY / FEATURES */}
        <section className="section" id="why" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="reveal" style={{ marginBottom: 42 }}>
              <span className="eyebrow">
                <span className="dot" />
                <span className="num">02</span> / なぜ開発者に刺さるのか
              </span>
              <h2 className="h-sec">
                実務を、<span className="accent-tx">APIのように叩く。</span>
              </h2>
              <p className="sub">
                慣れ親しんだ開発体験そのまま。型のあるタスクを投げれば、結果が返ってくる。新しいツールも、会議体も、増やしません。
              </p>
            </div>

            <div className="bento">
              <article className="card card-lg span-4 reveal">
                <div className="ico" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h3>APIのような使い心地</h3>
                <p>
                  タスクは「型」を持ちます。投げれば受理され、ステータスが返る。ドキュメントのように静かで、予測可能なワークフロー。
                </p>
                {/* Static authored HTML — no user input */}
                <div
                  className="snippet"
                  dangerouslySetInnerHTML={{
                    __html: [
                      '<span style="color:var(--accent)">POST</span> /v1/tasks',
                      "{",
                      '  <span style="color:#c792ea">"type"</span>: <span style="color:#6dd58c">"x_dm_outreach"</span>,',
                      '  <span style="color:#c792ea">"target"</span>: <span style="color:#6dd58c">"SaaS founders / 個人開発者"</span>,',
                      '  <span style="color:#c792ea">"volume"</span>: <span style="color:var(--accent-2)">30</span>',
                      "}",
                      '<span style="color:var(--tx-4)">→ 202 Accepted · status: "queued" · 非同期で順次完遂</span>',
                    ].join("\n"),
                  }}
                />
              </article>

              <article className="card span-2 reveal d1">
                <div className="ico" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 8-6 4 6 4V8Z" />
                    <rect x="2" y="6" width="14" height="12" rx="2" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                </div>
                <h3>Zoom、不要。</h3>
                <p>
                  日程調整のSlack往復も、画面共有の30分もゼロ。すべてテキストで完結します。
                </p>
                <div className="status-row">
                  <span className="stat ok">meetings: 0</span>
                  <span className="stat">sync_calls: 0</span>
                </div>
              </article>

              <article className="card span-2 reveal">
                <div className="ico" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <h3>非同期で前に進む</h3>
                <p>
                  あなたが寝ている間も、コードを書いている間も、ボードのタスクは消化されていきます。
                </p>
                <div className="status-row">
                  <span className="stat acc">async: always-on</span>
                </div>
              </article>

              <article className="card span-2 reveal d1">
                <div className="ico" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 3v18M3 9h6" />
                  </svg>
                </div>
                <h3>Notionで完結</h3>
                <p>
                  新しい管理ツールは増やしません。使い慣れた専用Notionボードが、唯一のインターフェース。
                </p>
                <div className="status-row">
                  <span className="stat">tools_added: 0</span>
                </div>
              </article>

              <article className="card span-2 reveal d2">
                <div className="ico" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3>実働するのはプロ</h3>
                <p>
                  テンプレ納品でも、AI丸投げでもない。事業開発・営業・実装の現場一流が、実際に手を動かします。
                </p>
                <div className="status-row">
                  <span className="stat ok">status: shipped</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="section" id="team" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="reveal" style={{ marginBottom: 40 }}>
              <span className="eyebrow">
                <span className="dot" />
                <span className="num">03</span> / 実働チーム
              </span>
              <h2 className="h-sec">
                手を動かすのは、
                <span className="accent-tx">現場の一流。</span>
              </h2>
              <p className="sub">
                「投げるだけ」の裏側にいるのは、各領域で結果を出してきたプロフェッショナル。匿名のクラウドワーカーではありません。
              </p>
            </div>
            <div
              className="bento"
              style={{ gridTemplateColumns: "repeat(3,1fr)" }}
            >
              <article
                className="card span-2 reveal"
                style={{ gridColumn: "span 2" }}
              >
                <div
                  className="k-foot"
                  style={{ justifyContent: "flex-start", gap: 14 }}
                >
                  <span
                    className="brand-mark"
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 13,
                      fontSize: 17,
                    }}
                  >
                    T
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--f-display)",
                        fontWeight: 700,
                        fontSize: 18,
                      }}
                    >
                      元タイミー 事業開発
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 12,
                        color: "var(--tx-4)",
                      }}
                    >
                      growth &amp; biz-dev
                    </div>
                  </div>
                </div>
                <p style={{ marginTop: 18 }}>
                  急成長スタートアップで事業を立ち上げた知見で、グロース設計・事業開発・パートナーシップ構築を担当。
                </p>
              </article>

              <article
                className="card span-2 reveal d1"
                style={{ gridColumn: "span 2" }}
              >
                <div
                  className="k-foot"
                  style={{ justifyContent: "flex-start", gap: 14 }}
                >
                  <span
                    className="brand-mark"
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 13,
                      fontSize: 17,
                    }}
                  >
                    S
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--f-display)",
                        fontWeight: 700,
                        fontSize: 18,
                      }}
                    >
                      大手人材 トップセールス
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 12,
                        color: "var(--tx-4)",
                      }}
                    >
                      b2b sales
                    </div>
                  </div>
                </div>
                <p style={{ marginTop: 18 }}>
                  全国トップ実績の営業力で、B2Bフォーム営業・商談・ターゲットリスト構築を実行。泥臭い営業を肩代わり。
                </p>
              </article>

              <article
                className="card span-2 reveal d2"
                style={{ gridColumn: "span 2" }}
              >
                <div
                  className="k-foot"
                  style={{ justifyContent: "flex-start", gap: 14 }}
                >
                  <span
                    className="brand-mark"
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 13,
                      fontSize: 17,
                    }}
                  >
                    E
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--f-display)",
                        fontWeight: 700,
                        fontSize: 18,
                      }}
                    >
                      外資IT エンジニア
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 12,
                        color: "var(--tx-4)",
                      }}
                    >
                      eng &amp; automation
                    </div>
                  </div>
                </div>
                <p style={{ marginTop: 18 }}>
                  実装・自動化・スクレイピングまで。開発者の言語が通じるからこそ、技術的な実務もそのまま投げられます。
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="pricing">
          <div className="wrap">
            <div
              className="center reveal"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 46,
              }}
            >
              <span className="eyebrow">
                <span className="dot" />
                <span className="num">04</span> / 料金
              </span>
              <h2 className="h-sec">プランを選ぶ</h2>
              <p className="sub center">
                非同期で完結させる
                <strong style={{ color: "var(--tx)" }}>スタート</strong>
                か、伴走しながら売上まで作る
                <strong style={{ color: "var(--tx)" }}>グロース</strong>
                か。月額定額、いつでも解約可能。
              </p>
            </div>

            <div className="price-grid">
              <article className="plan reveal">
                <div className="plan-tags">
                  <span className="plan-aud">個人開発者・Micro-SaaS向け</span>
                </div>
                <h3 className="plan-name">Starter Plan</h3>
                <p className="plan-mode">完全非同期 ・ Zoomミーティング一切なし</p>
                <div className="plan-price">
                  <span className="yen">¥50,000</span>
                  <span className="per">/ 月</span>
                </div>
                <p className="plan-quote">タスクを投げたら、あとは寝て待つだけ。</p>
                <ul className="plan-list">
                  <li>
                    <span className="ck">✓</span>
                    専用Notionボードの提供（タスクカードを積むだけ）
                  </li>
                  <li>
                    <span className="ck">✓</span>
                    X（Twitter）でのターゲットへのゲリラDM営業代行
                  </li>
                  <li>
                    <span className="ck">✓</span>
                    Zenn / note 等の技術記事のゴーストライティング・認知拡大
                  </li>
                  <li>
                    <span className="ck">✓</span>
                    1タスクずつの並行稼働・消化
                  </li>
                </ul>
                <div className="plan-cta">
                  <a href="#" className="btn btn-primary btn-block">
                    決済して、専用Notionボードを受け取る
                  </a>
                </div>
                <p className="plan-foot">クレジットカード決済 · 最低契約期間なし</p>
              </article>

              <article className="plan feat reveal d1">
                <div className="plan-tags">
                  <span className="plan-aud">中小企業・新規事業法人向け</span>
                  <span className="plan-rec">★ おすすめ · 毎月2社限定</span>
                </div>
                <h3 className="plan-name">Growth Plan</h3>
                <p className="plan-mode">伴走型 ・ 定期Zoomミーティングあり</p>
                <div className="plan-price">
                  <span className="yen">¥98,000</span>
                  <span className="per">/ 月</span>
                </div>
                <p className="plan-quote">
                  アプリを「どう売るか」の戦略策定から、営業・SNS運用の実行までを共にする。
                </p>
                <ul className="plan-list">
                  <li>
                    <span className="ck">✓</span>
                    戦略立案のための定期Zoomミーティング・壁打ち
                  </li>
                  <li>
                    <span className="ck">✓</span>
                    B2Bフォーム営業・ターゲットリストのスクレイピング構築
                  </li>
                  <li>
                    <span className="ck">✓</span>
                    包括的なマーケティング戦略 &amp; SNSアカウントの運用代行
                  </li>
                  <li>
                    <span className="ck">✓</span>
                    プロのエンジニアとトップセールスによる実務実行
                  </li>
                </ul>
                <div className="plan-cta">
                  <a href="#" className="btn btn-ghost btn-block">
                    詳細を相談する
                  </a>
                </div>
                <p className="plan-foot">枠に限りあり · まずは無料ヒアリングから</p>
              </article>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section final">
          <div className="final-glow" />
          <div className="wrap">
            <div className="final-card reveal">
              <span className="pill" style={{ marginBottom: 24 }}>
                <span className="live" />
                今日から非同期で。
              </span>
              <h2>
                会議の予定で、
                <br />
                カレンダーを埋めるのは終わり。
              </h2>
              <p>
                タスクを投げて、プロダクトに戻ろう。実務はプロチームが完遂します。
                <span className="cursor" style={{ verticalAlign: "-3px" }} />
              </p>
              <div
                className="hero-cta"
                style={{ justifyContent: "center", marginTop: 0 }}
              >
                <a href="#pricing" className="btn btn-primary">
                  専用Notionボードを受け取る <span className="arr">→</span>
                </a>
                <a href="#" className="btn btn-ghost">
                  資料をダウンロード
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
              <a className="brand" href="#top">
                <span className="brand-mark">&gt;_</span>
                <span className="brand-name">Workle</span>
              </a>
              <p>
                開発者特化型BPaaS。会議ゼロ、完全非同期。タスクを投げるだけで、現場一流のプロチームが実務を完遂します。
              </p>
            </div>
            <div className="foot-cols">
              <div className="foot-col">
                <h4>Product</h4>
                <a href="#how">仕組み</a>
                <a href="#why">機能</a>
                <a href="#pricing">料金</a>
                <a href="#team">実働チーム</a>
              </div>
              <div className="foot-col">
                <h4>Company</h4>
                <a href="#">運営会社</a>
                <a href="#">お問い合わせ</a>
                <a href="#">採用情報</a>
              </div>
              <div className="foot-col">
                <h4>Legal</h4>
                <a href="#">利用規約</a>
                <a href="#">プライバシー</a>
                <a href="#">特定商取引法</a>
              </div>
            </div>
          </div>
          <div className="foot-base">
            <span>© 2026 Workle Inc. — ship product, throw the rest.</span>
            <span>made async · no meetings were held</span>
          </div>
        </div>
      </footer>

      <WorkleInteractions />
    </>
  );
}
