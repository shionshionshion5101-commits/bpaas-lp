import WorkleInteractions from "./components/WorkleInteractions";

export default function Home() {
  return (
    <>
      {/* NAV */}
      <header className="nav" id="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top" aria-label="Workle">
            <span className="brand-mark">
              <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="brand-name">Workle</span>
          </a>
          <nav className="nav-links">
            <a href="#starter">Starter</a>
            <a href="#growth">Growth</a>
            <a href="#team">チーム</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-cta">
            <a href="https://tally.so/r/5BrZLP" target="_blank" rel="noopener noreferrer" className="btn btn-ghost nav-ghost-btn">
              無料相談を予約
            </a>
            <a href="https://buy.stripe.com/4gM7sL5unbqh7TpflV3F600" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "9px 16px", fontSize: 13 }}>
              Starterを始める
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" id="hero">
          <div className="hero-glow" />
          <div className="wrap hero-in">
            <h1 className="reveal d1">
              <span className="ln">いいプロダクトは、ある。</span>
              <span className="ln">届ける手が、<span className="accent-tx">足りない。</span></span>
            </h1>

            <p className="hero-sub reveal d2">
              マーケと営業の実務を、まるごと外に出す。<br className="sp-break" /><span className="nowrap">元メガベンチャー事業開発</span>・<br />
              <span className="nowrap">大手人材業界トップセールス</span>・<span className="nowrap">外資ITエンジニアの実働チームが、</span><br /><br className="sp-break" />
              あなたの代わりに手を動かします。
            </p>

            <div className="lane-split reveal d2">
              <a href="#starter" className="lane-card">
                <div className="lane-label">個人開発者の方へ</div>
                <div className="lane-name">Starter</div>
                <div className="lane-desc">会議ゼロ・タスクを投げるだけ</div>
                <div className="lane-price">¥50,000<span className="lane-per">/月</span></div>
                <div className="lane-go">詳細を見る <span className="arr">→</span></div>
              </a>
              <a href="https://tally.so/r/5BrZLP" target="_blank" rel="noopener noreferrer" className="lane-card lane-feat">
                <div className="lane-label">法人・事業責任者の方へ</div>
                <div className="lane-name">Growth</div>
                <div className="lane-desc">戦略から実行まで伴走</div>
                <div className="lane-price">¥250,000<span className="lane-per">〜/月</span></div>
                <div className="lane-go">無料相談を予約 <span className="arr">→</span></div>
              </a>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="marquee" aria-label="投げられるタスクの例">
          <div className="marquee-label">投げられる実務 — ほんの一例</div>
          <div className="marquee-track" id="marquee" />
        </section>

        {/* MENU TABLE */}
        <section className="section" id="menu" style={{ background: "var(--bg-1)" }}>
          <div className="wrap">
            <div className="center reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 48 }}>
              <span className="eyebrow">
                <span className="dot" />
                <span className="num">01</span> / 実務メニュー
              </span>
              <h2 className="h-sec">投げられる実務と<span className="accent-tx">クレジット</span></h2>
              <p className="sub center">
                Starterは月<strong style={{ color: "var(--tx)" }}>10クレジット</strong>。タスクごとの消費分だけ使えます。Growthは全メニューを月額定額に含みます。
              </p>
              <p className="menu-strength center reveal d1">
                Workleの強みは、マーケと開発を<strong style={{ color: "var(--tx)" }}>同じチーム</strong>が持つこと。<br className="menu-strength-br" />
                <span className="accent-tx">&ldquo;改善提案で終わらず、その場で実装まで&rdquo;</span>が可能です。
              </p>
            </div>

            <div className="menu-tagline reveal d1">
              <p className="menu-kv">Starterは『タスク』を投げる。Growthは『課題』を投げる。</p>
              <p className="menu-kv-sub">Starterはメニューから選んで投げる定額タスク消化。Growthは課題ごと渡せば、何をすべきかの設計から巻き取ります。</p>
            </div>

            {/* Mobile-only tab switcher (CSS :checked driven). Hidden on desktop
                where all three cards show side by side. */}
            <input type="radio" id="menu-tab-1" name="menu-tab" className="menu-tab-radio" defaultChecked />
            <input type="radio" id="menu-tab-2" name="menu-tab" className="menu-tab-radio" />
            <input type="radio" id="menu-tab-3" name="menu-tab" className="menu-tab-radio" />
            <div className="menu-tabs">
              <label htmlFor="menu-tab-1" className="menu-tab">マーケ・営業</label>
              <label htmlFor="menu-tab-2" className="menu-tab">エンジニアリング</label>
              <label htmlFor="menu-tab-3" className="menu-tab">戦略・伴走</label>
            </div>

            <div className="menu-cards">
              {/* CARD 1 — マーケ・営業 */}
              <div className="menu-card reveal">
                <div className="menu-card-head">
                  <span className="menu-card-ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </span>
                  <h3 className="menu-card-title">マーケ・営業</h3>
                  <p className="menu-card-lead">リスト作成から商談獲得まで、売るための実務を丸ごと。</p>
                </div>
                <div className="menu-rows">
                  <div className="menu-rows-head">
                    <span>メニュー</span>
                    <span className="menu-col-s">Starter</span>
                    <span className="menu-col-g">Growth</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">リスト抽出（100件）</span>
                    <span className="credit-badge">3 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">競合リサーチ（1社）</span>
                    <span className="credit-badge">2 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">X ターゲット精査型アウトリーチ（50通）</span>
                    <span className="credit-badge">3 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">B2Bフォーム営業（100社）</span>
                    <span className="credit-badge">4 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">DM・メール文面作成</span>
                    <span className="credit-badge">2 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">記事ゴーストライティング（1本）</span>
                    <span className="credit-badge">4 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">SNS投稿作成（10本）<span className="menu-impl-tag">+実装まで可</span></span>
                    <span className="credit-badge">3 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">LP改善診断<span className="menu-impl-tag">+実装まで可</span></span>
                    <span className="credit-badge">5 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">営業トークスクリプト作成（架電・商談用）</span>
                    <span className="credit-badge">3 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">アウトバウンド架電リスト設計（ターゲット定義＋優先度スコアリング）</span>
                    <span className="credit-badge">3 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">営業KPI設計・ダッシュボード構築</span>
                    <span className="credit-badge">4 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">セールスプレイブック簡易版</span>
                    <span className="credit-badge">5 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                </div>
              </div>

              {/* CARD 2 — エンジニアリング */}
              <div className="menu-card reveal d1">
                <div className="menu-card-head">
                  <span className="menu-card-ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4 17 10 11 4 5" />
                      <line x1="12" y1="19" x2="20" y2="19" />
                    </svg>
                  </span>
                  <h3 className="menu-card-title">エンジニアリング</h3>
                  <p className="menu-card-lead">計測・改善・自動化。&ldquo;作れるチーム&rdquo;だからできる技術実務。</p>
                </div>
                <div className="menu-rows">
                  <div className="menu-rows-head">
                    <span>メニュー</span>
                    <span className="menu-col-s">Starter</span>
                    <span className="menu-col-g">Growth</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">GA4 / GTM 計測設置<span className="menu-impl-tag">+実装まで可</span></span>
                    <span className="credit-badge">3 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">テクニカルSEO監査</span>
                    <span className="credit-badge">4 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">セキュリティ簡易診断<span className="menu-footnote-mark">※</span></span>
                    <span className="credit-badge">4 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">個人開発プロダクト向けセキュリティチェック<br /><span className="menu-row-sub">認証・権限・依存ライブラリ・公開設定の実務チェック</span></span>
                    <span className="credit-badge">5 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">スクレイピング・データ収集</span>
                    <span className="credit-badge">5 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">LP軽微改修</span>
                    <span className="credit-badge">2 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">自動化構築（小）</span>
                    <span className="credit-badge">5 pt</span>
                    <span className="incl-badge">included</span>
                  </div>
                </div>
              </div>

              {/* CARD 3 — 戦略・伴走（Growth） */}
              <div className="menu-card menu-card-feat reveal d2">
                <div className="menu-card-head">
                  <span className="menu-card-ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                    </svg>
                  </span>
                  <h3 className="menu-card-title">戦略・伴走<span className="menu-card-tag">Growth</span></h3>
                  <p className="menu-card-lead">課題ごと預けたい法人向け。戦略設計から実行まで。</p>
                </div>
                <div className="menu-rows">
                  <div className="menu-rows-head">
                    <span>メニュー</span>
                    <span className="menu-col-s">Starter</span>
                    <span className="menu-col-g">Growth</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name"><strong>アウトバウンド営業組織の立ち上げ支援</strong><br /><span className="menu-row-sub">戦略・スクリプト・KPI・オンボーディング設計</span></span>
                    <span className="unavail">—</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">インサイドセールス代行<br /><span className="menu-row-sub">月間コール数上限あり・要相談</span></span>
                    <span className="unavail">—</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">戦略壁打ち・定期 Zoom（月2回）</span>
                    <span className="unavail">—</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">SNSアカウント運用代行（週次）<span className="menu-impl-tag">+実装まで可</span></span>
                    <span className="unavail">—</span>
                    <span className="incl-badge">included</span>
                  </div>
                  <div className="menu-row">
                    <span className="menu-row-name">週次レポーティング</span>
                    <span className="unavail">—</span>
                    <span className="incl-badge">included</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-footnotes reveal d1">
              <p className="menu-fn">
                <span className="menu-footnote-mark">※</span>
                公開情報と自動スキャンによる外形診断です。本格的な脆弱性診断は提携専門会社をご紹介します。
              </p>
              <p className="menu-fn">
                商談対応・クロージングを含む営業代行は Growth Plan で承ります。
              </p>
            </div>
          </div>
        </section>

        {/* STARTER LANE */}
        <section className="section" id="starter">
          <div className="wrap">
            <div className="center reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 46 }}>
              <span className="eyebrow">
                <span className="dot" />
                <span className="num">02</span> / Starter
              </span>
              <span className="section-plan-badge badge-starter">STARTER</span>
              <h2 className="h-sec">
                投げてから、<span className="accent-tx">寝て待つだけ。</span>
              </h2>
              <p className="sub center">
                タスクをNotionの専用ボードに置くだけ。裏側のプロチームが非同期で受け取り、稼働し、完了を積み上げていきます。
              </p>
              <p className="strike-note reveal d1">
                <s>Zoom</s> ・ <s>定例会議</s> ・ <s>日程調整</s> — すべて不要。テキストで完結。
              </p>
            </div>

            <div className="steps">
              <div className="step reveal">
                <div className="step-n">STEP 01</div>
                <div className="step-status request">REQUEST</div>
                <h3>投げる</h3>
                <p>専用Notionボードの「リクエスト」にタスクカードを置くだけ。仕様も口頭説明も会議もいりません。</p>
              </div>
              <div className="step reveal d1">
                <div className="step-n">STEP 02</div>
                <div className="step-status inprogress">IN PROGRESS</div>
                <h3>稼働する</h3>
                <p>プロチームが非同期で受け取り稼働中へ。進捗はカード上で静かに可視化されます。</p>
              </div>
              <div className="step reveal d2">
                <div className="step-n">STEP 03</div>
                <div className="step-status done">DONE</div>
                <h3>積み上がる</h3>
                <p>完遂したタスクは「完了」へ。成果物はボードに残り、いつでも確認できます。</p>
              </div>
            </div>

            {/* Static authored HTML — not user input */}
            <div className="api-mock reveal d1">
              <div className="api-mock-bar">
                <span className="api-method">POST</span>
                <span className="api-path">/v1/tasks</span>
              </div>
              <div
                className="snippet"
                dangerouslySetInnerHTML={{
                  __html: [
                    "{",
                    '  <span style="color:#c792ea">"type"</span>: <span style="color:#6dd58c">"outreach"</span>,',
                    '  <span style="color:#c792ea">"target"</span>: <span style="color:#6dd58c">"SaaS founders"</span>,',
                    '  <span style="color:#c792ea">"volume"</span>: <span style="color:var(--accent-2)">50</span>',
                    "}",
                    '<span style="color:var(--tx-4)">→ 202 Accepted · status: "queued" · 非同期で順次完遂</span>',
                  ].join("\n"),
                }}
              />
            </div>

            <div className="board reveal d1" id="board">
              <div className="board-top">
                <span className="b-ico" />
                <b>Workle Board</b>
                <span className="b-path">workle / your-workspace / tasks</span>
                <span className="board-live">
                  <span className="live" />
                  non-stop
                </span>
              </div>
              <div className="board-cols">
                <div className="col req">
                  <div className="col-h">
                    REQUEST <span className="cnt" data-cnt="req">2</span>
                  </div>
                  <div className="col-stack" id="col-req" />
                </div>
                <div className="col run">
                  <div className="col-h">
                    IN PROGRESS <span className="cnt" data-cnt="run">1</span>
                  </div>
                  <div className="col-stack" id="col-run" />
                </div>
                <div className="col done">
                  <div className="col-h">
                    DONE <span className="cnt" data-cnt="done">47</span>
                  </div>
                  <div className="col-stack" id="col-done" />
                </div>
              </div>
            </div>

            <div className="mid-cta reveal d2">
              <a href="https://app.notion.com/p/Workle-Board-Demo-37d8c4486f5281ca8a70fe5ac1572dab" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                サンプルボードを見る
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <p className="mid-cta-note">読み取り専用のデモNotionボードを公開中</p>
            </div>

            <div className="starter-payment-cta reveal d2">
              <a href="https://buy.stripe.com/4gM7sL5unbqh7TpflV3F600" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block">
                Starterを始める（¥50,000/月） <span className="arr">→</span>
              </a>
              <p className="starter-cta-note">クレジットカード決済 / 最低契約期間なし / 翌営業日稼働</p>
            </div>
          </div>
        </section>

        {/* GROWTH LANE */}
        <section className="section" id="growth" style={{ background: "var(--bg-1)" }}>
          <div className="wrap">
            <div className="reveal" style={{ marginBottom: 48 }}>
              <span className="eyebrow">
                <span className="dot" />
                <span className="num">03</span> / Growth
              </span>
              <span className="section-plan-badge badge-growth">GROWTH</span>
              <h2 className="h-sec">
                戦略から、<span className="accent-tx">泥臭い実行まで。</span>
              </h2>
              <p className="sub">
                採用なし、固定費リスクなし。事業開発・営業・エンジニアの3職種が揃ったプロチームが、マーケと営業の実務をまるごと引き受けます。
              </p>
            </div>

            <div className="compare-wrap reveal">
              <div className="compare-table">
                <div className="compare-head">
                  <div className="compare-item-head" />
                  <div className="compare-col-head hire">マーケ担当を採用</div>
                  <div className="compare-col-head workle">Workle Growth</div>
                </div>
                <div className="compare-row">
                  <div className="compare-item">初期コスト</div>
                  <div className="compare-val hire">採用費 50〜100万円</div>
                  <div className="compare-val workle good">0円</div>
                </div>
                <div className="compare-row">
                  <div className="compare-item">月額コスト</div>
                  <div className="compare-val hire">給与 40〜50万円＋社保・福利厚生</div>
                  <div className="compare-val workle good">¥250,000〜<br /><span style={{ fontSize: 11, color: "var(--tx-4)", fontFamily: "var(--f-mono)" }}>スコープ・業務量により最終料金を決定</span></div>
                </div>
                <div className="compare-row">
                  <div className="compare-item">スキルカバー</div>
                  <div className="compare-val hire">1名分のスキルのみ</div>
                  <div className="compare-val workle good">事業開発・営業・エンジニア 3職種</div>
                </div>
                <div className="compare-row">
                  <div className="compare-item">契約形態</div>
                  <div className="compare-val hire">雇用（解雇困難）</div>
                  <div className="compare-val workle good">月契約・いつでも解約可</div>
                </div>
                <div className="compare-row">
                  <div className="compare-item">稼働開始</div>
                  <div className="compare-val hire">入社後 3〜6ヶ月</div>
                  <div className="compare-val workle good">翌営業日から稼働</div>
                </div>
              </div>
            </div>

            <div className="reveal d1" style={{ margin: "56px 0 18px" }}>
              <h3 className="sub-heading">進め方</h3>
            </div>
            <div className="growth-steps reveal d1">
              <div className="growth-step">
                <div className="gs-num">01</div>
                <div className="gs-title">無料相談を予約（15分）</div>
                <div className="gs-desc">現状をヒアリングし、改善仮説を3つ提示。費用・契約は一切発生しません。</div>
              </div>
              <div className="gs-arrow" aria-hidden="true">→</div>
              <div className="growth-step">
                <div className="gs-num">02</div>
                <div className="gs-title">戦略設計</div>
                <div className="gs-desc">ヒアリング内容をもとに、実行プランをスコープと費用とともに提示します。</div>
              </div>
              <div className="gs-arrow" aria-hidden="true">→</div>
              <div className="growth-step">
                <div className="gs-num">03</div>
                <div className="gs-title">実務実行（非同期）</div>
                <div className="gs-desc">合意後、即日稼働開始。Notionボードで進捗をリアルタイムに確認できます。</div>
              </div>
              <div className="gs-arrow" aria-hidden="true">→</div>
              <div className="growth-step">
                <div className="gs-num">04</div>
                <div className="gs-title">週次レポート</div>
                <div className="gs-desc">毎週、実施内容・数値・翌週の改善仮説をレポート。意思決定の根拠が手元に残ります。</div>
              </div>
            </div>

            <div className="reveal d2" style={{ marginTop: 48, textAlign: "center" }}>
              <a href="https://tally.so/r/5BrZLP" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                無料相談を予約する <span className="arr">→</span>
              </a>
              <p style={{ marginTop: 14, fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--tx-4)" }}>
                15分 / オンライン / 費用・契約なし
              </p>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="section" id="team">
          <div className="wrap">
            <div className="reveal" style={{ marginBottom: 48 }}>
              <span className="eyebrow">
                <span className="dot" />
                <span className="num">04</span> / 実働チーム
              </span>
              <h2 className="h-sec">
                手を動かすのは、<br className="sp-break" /><span className="accent-tx">現場の一流。</span>
              </h2>
              <p className="sub">
                「投げるだけ」の裏側にいるのは、各領域で結果を出してきたプロフェッショナル。匿名のクラウドワーカーではありません。
              </p>
            </div>

            <div className="team-grid">
              {/* 代表 — 実名掲載 */}
              <article className="team-card reveal">
                <div className="team-avatar avatar-rep" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5"/>
                  </svg>
                </div>
                <div className="team-meta">
                  <span className="team-name">片倉詩音</span>
                  <a
                    href="https://x.com/Workle_shion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-x-link"
                    aria-label="片倉詩音のXアカウント"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.844L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    @Workle_shion
                  </a>
                </div>
                <div className="team-role-tag">Workle 代表 / growth &amp; biz-dev</div>
                <div className="team-career">大手メガベンチャー / 新規事業開発 · スキマバイトプラットフォーム大手でアウトバウンド営業組織の立ち上げを経験</div>
                <p className="team-bio">
                  事業開発・グロース設計・パートナーシップ構築を担当。<br />
                  Growthでは「何から手をつけるか」の戦略設計から実行プランの組み立てまで巻き取ります。<br />
                  課題ごと預ければ、事業の伸ばし方ごと設計。
                </p>
              </article>

              {/* B2Bセールス担当 */}
              <article className="team-card reveal d1">
                <div className="team-avatar avatar-sales" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                    <polyline points="16 7 22 7 22 13"/>
                  </svg>
                </div>
                <div className="team-meta">
                  <span className="team-name">B2Bセールス担当</span>
                </div>
                <div className="team-role-tag">b2b sales</div>
                <div className="team-career">大手人材業界で全国トップクラスの営業実績</div>
                <p className="team-bio">
                  リスト構築 → アポ → 商談 → フォローまで、BtoB営業を一気通貫で代行。<br />
                  広告からDX・ブランディングまで、幅広い商材を売ってきた現場力で、あなたのプロダクトを売り切ります。<br />
                  泥臭い営業を、そのまま肩代わり。
                </p>
              </article>

              {/* エンジニア兼マーケター */}
              <article className="team-card reveal d2">
                <div className="team-avatar avatar-eng" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                </div>
                <div className="team-meta">
                  <span className="team-name">エンジニア兼マーケター</span>
                </div>
                <div className="team-role-tag">eng &amp; marketing</div>
                <div className="team-career">外資大手IT企業でのエンジニア経験・マーケティング実務を兼ね備える</div>
                <p className="team-bio">
                  SNS運用・広報戦略・広告プランニングから撮影・編集まで、マーケの実行を丸ごと。<br />
                  さらにWebアプリ開発・UI/UX・要件定義・AI駆動開発まで対応し、技術側も自走。<br />
                  「作る」と「届ける」を分断せず、一人で最後まで。
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* LIVE DATA — 数値が確定次第、このコメントを外して公開 */}
        {/*
        <section className="section" id="data" style={{ background: "var(--bg-1)" }}>
          <div className="wrap">
            <div className="center reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 48 }}>
              <span className="eyebrow">
                <span className="dot" />
                <span className="num">05</span> / Live Data
              </span>
              <h2 className="h-sec">自社運用の<span className="accent-tx">リアル実績</span></h2>
              <p className="sub center">
                架空の数字は載せません。自社アウトリーチ運用の実数を毎月更新で公開しています。
              </p>
            </div>

            <div className="live-dashboard reveal">
              <div className="live-stat">
                <div className="live-val">XXX<span className="live-unit">通</span></div>
                <div className="live-label">送信数</div>
              </div>
              <div className="live-stat">
                <div className="live-val">XX<span className="live-unit">%</span></div>
                <div className="live-label">返信率</div>
              </div>
              <div className="live-stat">
                <div className="live-val">XX<span className="live-unit">件</span></div>
                <div className="live-label">商談化数</div>
              </div>
            </div>
            <p className="live-note reveal d1">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              数値は月次更新。最終更新: YYYY-MM
            </p>
          </div>
        </section>
        */}

        {/* FAQ */}
        <section className="section" id="faq" style={{ background: "var(--bg-1)" }}>
          <div className="wrap">
            <div className="center reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 48 }}>
              <span className="eyebrow">
                <span className="dot" />
                <span className="num">05</span> / FAQ
              </span>
              <h2 className="h-sec">よくある質問</h2>
            </div>

            <div className="faq-list reveal">
              <details className="faq-item">
                <summary className="faq-q">解約はいつでもできますか？</summary>
                <div className="faq-a">
                  <p>はい、最低契約期間はありません。月末までにご連絡いただければ翌月から解約となります。違約金・解約手数料は一切かかりません。</p>
                </div>
              </details>

              <details className="faq-item">
                <summary className="faq-q">タスクの納期の目安を教えてください。</summary>
                <div className="faq-a">
                  <p>タスク受理後、原則<strong>3営業日以内</strong>に着手・納品します。内容や量によって変動する場合は、受理時にご連絡します。</p>
                </div>
              </details>

              <details className="faq-item">
                <summary className="faq-q">対応できない業務はありますか？</summary>
                <div className="faq-a">
                  <p>法律・税務・労務・医療など専門資格が必要な業務は直接対応しておりません。必要な場合は提携する専門家をご紹介します。また、違法・不正競争・個人情報の不正取得を伴う業務もお断りしています。</p>
                </div>
              </details>

              <details className="faq-item">
                <summary className="faq-q">Starterプランのクレジットは翌月に繰り越せますか？</summary>
                <div className="faq-a">
                  <p>クレジットの繰り越しは<strong>できません</strong>。当月末に未消化のクレジットは失効します。ご利用ペースに応じてプランをご検討ください。</p>
                </div>
              </details>

              <details className="faq-item">
                <summary className="faq-q">Growthプランの「スコープにより料金変動」はどう決まりますか？</summary>
                <div className="faq-a">
                  <p>無料相談後に、実行内容・工数・期間を明示した見積もりをご提示します。追加費用が発生する場合は必ず事前にご確認いただいてから着手します。口頭合意のみで費用が変わることはありません。</p>
                </div>
              </details>

              <details className="faq-item">
                <summary className="faq-q">ツールやSNSアカウントの情報はどう管理されますか？</summary>
                <div className="faq-a">
                  <p>業務に必要な最小限の権限のみをご共有いただきます。情報は業務目的以外に使用せず、契約終了後は速やかに削除・返却します。詳細は<a href="/privacy">プライバシーポリシー</a>をご覧ください。</p>
                </div>
              </details>
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
                今日から、実務を手放す。
              </span>
              <h2>
                会議の予定で、<br />
                カレンダーを埋めるのは終わり。
              </h2>
              <p>
                タスクを投げて、プロダクトに戻ろう。実務はプロチームが完遂します。
                <span className="cursor" style={{ verticalAlign: "-3px" }} />
              </p>
              <div className="hero-cta" style={{ justifyContent: "center", marginTop: 0 }}>
                <a href="https://buy.stripe.com/4gM7sL5unbqh7TpflV3F600" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Starterを始める <span className="arr">→</span>
                </a>
                <a href="https://tally.so/r/5BrZLP" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  無料相談を予約する（Growth）
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="foot">
        <div className="wrap">
          {/* X Build in Public — 実在証明 */}
          <div className="foot-x-bar">
            <a href="https://x.com/Workle_shion" target="_blank" rel="noopener noreferrer" className="foot-x-inner">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.844L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Build in Public — @Workle_shion で運用実績・進捗をリアルタイムに発信しています
              <span className="arr">→</span>
            </a>
          </div>

          <div className="foot-in">
            <div className="foot-brand">
              <a className="brand" href="#top">
                <span className="brand-mark">
                  <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="brand-name">Workle</span>
              </a>
              <p>マーケと営業の実務を、まるごと外に出す。元メガベンチャー事業開発・大手人材業界トップセールス・外資ITエンジニアの実働チームが、あなたの代わりに手を動かします。</p>
            </div>
            <div className="foot-cols">
              <div className="foot-col">
                <h4>Product</h4>
                <a href="#starter">Starter</a>
                <a href="#growth">Growth</a>
                <a href="#team">実働チーム</a>
                <a href="#faq">FAQ</a>
              </div>
              <div className="foot-col">
                <h4>Contact</h4>
                <a href="https://tally.so/r/5BrZLP" target="_blank" rel="noopener noreferrer">お問い合わせ</a>
                <a href="https://x.com/Workle_shion" target="_blank" rel="noopener noreferrer">X (Build in Public)</a>
              </div>
              <div className="foot-col">
                <h4>Legal</h4>
                <a href="/tokushoho">特定商取引法に基づく表記</a>
                <a href="/terms">利用規約</a>
                <a href="/privacy">プライバシーポリシー</a>
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
