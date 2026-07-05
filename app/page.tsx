import WorkleInteractions from "./components/WorkleInteractions";

export default function Home() {
  return (
    <>
      {/* ====================================================
          NAV
          ==================================================== */}
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
            <a
              href="https://tally.so/r/5BrZLP"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost nav-ghost-btn"
            >
              無料相談を予約
            </a>
            <a
              href="https://buy.stripe.com/4gM7sL5unbqh7TpflV3F600"
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

        {/* ====================================================
            §1 HERO (dark)
            ==================================================== */}
        <section className="hero" id="hero">
          <div className="wrap hero-in">
            <h1 className="reveal">
              <span className="ln">いいプロダクトは、ある。</span>
              <span className="ln">届ける手が、足りない。</span>
            </h1>

            <p className="hero-sub reveal d1">
              マーケと営業の実務を、まるごと外に出す。<br className="sp-break" />
              <span className="nowrap">元メガベンチャー事業開発</span>・<span className="nowrap">大手人材業界トップセールス</span>・<span className="nowrap">外資ITエンジニアの実働チームが、</span><br />
              あなたの代わりに手を動かします。
            </p>

            {/* 振り分けカード */}
            <div className="lane-split reveal d2">
              <a href="#starter" className="lane-card">
                <div className="lane-label">個人開発者の方へ</div>
                <div className="lane-name">Starter</div>
                <div className="lane-desc">会議ゼロ。Notionにタスクを投げるだけの完全非同期。</div>
                <div className="lane-price">¥50,000<span className="lane-per">/月</span></div>
                <div className="lane-go">詳細を見る <span className="arr">→</span></div>
              </a>
              <a
                href="https://tally.so/r/5BrZLP"
                target="_blank"
                rel="noopener noreferrer"
                className="lane-card lane-feat"
              >
                <div className="lane-label">法人・事業責任者の方へ</div>
                <div className="lane-name">Growth</div>
                <div className="lane-desc">営業代行 × SNSマーケティング代行。3職種チームが実行部隊に。</div>
                <div className="lane-price">¥300,000<span className="lane-per">/月(固定)</span></div>
                <div className="lane-go">無料相談を予約 <span className="arr">→</span></div>
              </a>
            </div>
          </div>
        </section>

        {/* ====================================================
            MARQUEE
            ==================================================== */}
        <section className="marquee" aria-label="投げられるタスクの例">
          <div className="marquee-label">投げられる実務 — ほんの一例</div>
          <div className="marquee-track" id="marquee" />
        </section>

        {/* ====================================================
            §2 STARTER (dark)
            ==================================================== */}
        <section className="section-dark" id="starter">
          <div className="wrap">

            <div className="reveal" style={{ marginBottom: 48 }}>
              <span className="eyebrow">Starter — 個人開発者へ</span>
              <h2 className="h-sec">投げてから、<br />寝て待つだけ。</h2>
              <p className="sub">
                タスクをNotionの専用ボードに置くだけ。裏側のプロチームが非同期で受け取り、稼働し、完了を積み上げていきます。
              </p>
              <p className="strike-note">
                <s>Zoom</s> ・ <s>定例会議</s> ・ <s>日程調整</s> — すべて不要。テキストで完結。
              </p>
            </div>

            {/* Steps */}
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

            {/* Starter-only menu (no Growth column) */}
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
                    '  <span style="color:#c792ea">"volume"</span>: <span style="color:#6fb6ff">50</span>',
                    "}",
                    '<span style="color:#8B8F98">→ 202 Accepted · status: "queued" · 非同期で順次完遂</span>',
                  ].join("\n"),
                }}
              />
            </div>

            {/* Kanban board */}
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
              <a
                href="https://app.notion.com/p/Workle-Board-Demo-37d8c4486f5281ca8a70fe5ac1572dab"
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

            <div className="starter-cta reveal d2">
              <a
                href="https://buy.stripe.com/4gM7sL5unbqh7TpflV3F600"
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

        {/* ====================================================
            §3 GROWTH (light)
            ==================================================== */}
        <section className="section-light" id="growth">
          <div className="wrap">

            <div className="reveal" style={{ marginBottom: 12 }}>
              <span className="eyebrow">Growth — 法人・事業責任者へ</span>
              <h2 className="h-sec">営業も、マーケも、<br />まるごと外に。</h2>
              <p className="sub">
                事業開発・営業・エンジニアの3職種チームが、月額固定で貴社の実行部隊になります。
              </p>
            </div>

            {/* Price */}
            <div className="growth-lead reveal d1">
              <div className="growth-price-label">月額</div>
              <div>
                <span className="mono-num">¥300,000</span>
                <span className="mono-num-unit">/月(固定)</span>
              </div>
              <div className="growth-price-note">初期費用 0円 / 翌営業日稼働 / 月契約・いつでも解約可</div>
            </div>

            {/* Dual axis cards */}
            <div className="growth-axes reveal d1">
              <div className="axis-card">
                <div className="axis-card-tag">① 営業代行</div>
                <h3>営業代行</h3>
                <p className="axis-card-tagline">「商談が足りない」</p>
                <ul className="axis-list">
                  <li><span className="n">月500件</span>リスト構築</li>
                  <li><span className="n">月300社</span>B2Bフォーム営業</li>
                  <li><span className="n">月500コール</span>アウトバウンド架電</li>
                  <li><span className="n">設計まで</span>トークスクリプト・営業KPI設計</li>
                  <li><span className="n">支援</span>アウトバウンド営業組織の立ち上げ</li>
                </ul>
                <p className="axis-card-desc">
                  アポ獲得はチームが量産。商談・クロージングは代表とトップセールスが直接対応します。
                </p>
              </div>

              <div className="axis-card">
                <div className="axis-card-tag">② SNSマーケティング代行</div>
                <h3>SNSマーケ代行</h3>
                <p className="axis-card-tagline">「発信が続かない」</p>
                <ul className="axis-list">
                  <li><span className="n">月20本</span>アカウント設計・運用・投稿制作</li>
                  <li><span className="n">月2本</span>記事制作</li>
                  <li><span className="n">実装まで</span>LP改善</li>
                  <li><span className="n">構築</span>GA4計測・KPIダッシュボード</li>
                </ul>
                <p className="axis-card-desc">
                  作れるチームだから、提案で終わらずその場で実装まで完了します。
                </p>
              </div>
            </div>

            {/* Differentiator */}
            <div className="differentiator reveal d2">
              どちらか一方でも、両方でも、月額は変わりません。課題に合わせて配分します。
            </div>

            {/* Comparison table */}
            <div className="reveal d1">
              <div className="compare-scroll-hint">← 横スクロールで全列を確認</div>
              <div className="compare-wrap">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>営業代行を単体外注</th>
                      <th>SNS代行を単体外注</th>
                      <th>マーケ人材を採用</th>
                      <th className="col-workle">Workle Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>月額</th>
                      <td>50〜70万円</td>
                      <td>20〜50万円<br />+初期費用10〜30万円</td>
                      <td>給与40〜50万円+社保</td>
                      <td className="col-workle">¥300,000 固定</td>
                    </tr>
                    <tr>
                      <th>初期費用</th>
                      <td>5〜25万円</td>
                      <td>10〜30万円</td>
                      <td>採用費50〜100万円</td>
                      <td className="col-workle">0円</td>
                    </tr>
                    <tr>
                      <th>範囲</th>
                      <td>営業のみ</td>
                      <td>SNSのみ</td>
                      <td>1名分のスキル</td>
                      <td className="col-workle">営業+マーケ+技術</td>
                    </tr>
                    <tr>
                      <th>契約</th>
                      <td>半年縛りが多い</td>
                      <td>半年縛りが多い</td>
                      <td>雇用（解雇困難）</td>
                      <td className="col-workle">月契約・いつでも解約可</td>
                    </tr>
                    <tr>
                      <th>稼働開始</th>
                      <td>—</td>
                      <td>—</td>
                      <td>入社後3〜6ヶ月</td>
                      <td className="col-workle">翌営業日</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 進め方 */}
            <div className="reveal d1">
              <h3 className="growth-steps-head">進め方</h3>
              <div className="growth-steps">
                <div className="growth-step">
                  <div className="gs-num">01</div>
                  <div className="gs-title">無料相談を予約（15分）</div>
                  <div className="gs-desc">現状をヒアリングし、改善仮説を3つ提示。費用・契約は一切発生しません。</div>
                </div>
                <div className="gs-arrow" aria-hidden="true">→</div>
                <div className="growth-step">
                  <div className="gs-num">02</div>
                  <div className="gs-title">実行プラン提示</div>
                  <div className="gs-desc">ヒアリング内容をもとに、二軸の配分と初月の実行プランを提示します。</div>
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

              <div className="growth-cta reveal d2">
                <a
                  href="https://tally.so/r/5BrZLP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  無料相談を予約する <span className="arr">→</span>
                </a>
                <p className="growth-cta-note">15分 / オンライン / 費用・契約なし</p>
              </div>
            </div>

          </div>
        </section>

        {/* ====================================================
            §4 TEAM (light)
            ==================================================== */}
        <section className="section-light" id="team" style={{ paddingTop: 0 }}>
          <div className="wrap">

            <div className="reveal" style={{ marginBottom: 48 }}>
              <span className="eyebrow">実働チーム</span>
              <h2 className="h-sec">手を動かすのは、<br />現場の一流。</h2>
              <p className="sub">匿名のクラウドワーカーではありません。</p>
            </div>

            <div className="team-grid">

              {/* B2Bセールス担当 — 営業代行の顔 */}
              <article className="team-card reveal">
                <div className="team-avatar avatar-sales" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                    <polyline points="16 7 22 7 22 13"/>
                  </svg>
                </div>
                <div className="team-role-label">① 営業代行の顔</div>
                <div className="team-name">B2Bセールス担当</div>
                <div className="team-role-tag">b2b sales</div>
                <div className="team-career">大手人材業界で全国トップクラスの営業実績</div>
                <p className="team-bio">
                  リスト構築 → アポ → 商談 → フォローまで、BtoB営業を一気通貫で代行。<br />
                  広告からDX・ブランディングまで、幅広い商材を売ってきた現場力で、あなたのプロダクトを売り切ります。
                </p>
              </article>

              {/* エンジニア兼マーケター — SNSマーケ代行の顔 */}
              <article className="team-card reveal d1">
                <div className="team-avatar avatar-eng" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                </div>
                <div className="team-role-label">② SNSマーケ代行の顔</div>
                <div className="team-name">エンジニア兼マーケター</div>
                <div className="team-role-tag">eng &amp; marketing</div>
                <div className="team-career">外資大手IT企業でのエンジニア経験・マーケティング実務を兼ね備える</div>
                <p className="team-bio">
                  SNS運用・広報戦略・広告プランニングから撮影・編集まで、マーケの実行を丸ごと。<br />
                  Webアプリ開発・UI/UX・AI駆動開発まで対応し、「作る」と「届ける」を分断せず一人で最後まで。
                </p>
              </article>

              {/* 片倉詩音 — 統括・戦略設計・クロージング */}
              <article className="team-card reveal d2">
                <div className="team-avatar avatar-rep" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5"/>
                  </svg>
                </div>
                <div className="team-role-label">統括・戦略設計・クロージング</div>
                <div className="team-meta">
                  <span className="team-name">片倉詩音</span>
                  <a
                    href="https://x.com/Workle_shion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-x-link"
                    aria-label="片倉詩音のXアカウント"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.844L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    @Workle_shion
                  </a>
                </div>
                <div className="team-role-tag">Workle 代表 / growth &amp; biz-dev</div>
                <div className="team-career">大手メガベンチャー / 新規事業開発 · スキマバイトプラットフォーム大手でアウトバウンド営業組織の立ち上げを経験</div>
                <p className="team-bio">
                  事業開発・グロース設計・パートナーシップ構築を担当。<br />
                  Growthでは「何から手をつけるか」の戦略設計から実行プランの組み立てまで巻き取ります。課題ごと預ければ、事業の伸ばし方ごと設計。
                </p>
              </article>

            </div>
          </div>
        </section>

        {/* ====================================================
            §5 FAQ (light)
            ==================================================== */}
        <section className="section-light" id="faq" style={{ paddingTop: 0 }}>
          <div className="wrap">

            <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 40 }}>
              <span className="eyebrow">FAQ</span>
              <h2 className="h-sec" style={{ textAlign: "center" }}>よくある質問</h2>
            </div>

            <div className="faq-list reveal">

              {/* 追加: Growth追加費用 (最上部) */}
              <details className="faq-item">
                <summary className="faq-q">Growthは本当に追加費用がかかりませんか？</summary>
                <div className="faq-a">
                  <p>標準スコープ（各メニューの月間目安量）の範囲では一切かかりません。月300社を超えるフォーム送信、月500コールを超える架電、新規プロダクトの本格的な受託開発など、標準を大きく超えるご要望のみ、事前にお見積もりのうえ別途ご相談します。着手前に必ず合意を取り、事後請求は行いません。</p>
                </div>
              </details>

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
                <summary className="faq-q">ツールやSNSアカウントの情報はどう管理されますか？</summary>
                <div className="faq-a">
                  <p>業務に必要な最小限の権限のみをご共有いただきます。情報は業務目的以外に使用せず、契約終了後は速やかに削除・返却します。詳細は<a href="/privacy">プライバシーポリシー</a>をご覧ください。</p>
                </div>
              </details>

            </div>
          </div>
        </section>

        {/* ====================================================
            §6 FINAL CTA (dark)
            ==================================================== */}
        <section className="final-section">
          <div className="wrap">
            <div className="final-card reveal">
              <h2>
                会議の予定で、<br />
                カレンダーを埋めるのは終わり。
              </h2>
              <p>
                タスクを投げて、プロダクトに戻ろう。<span className="cursor" style={{ verticalAlign: "-3px" }} />
              </p>
              <div className="final-cta-row">
                <a
                  href="https://buy.stripe.com/4gM7sL5unbqh7TpflV3F600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Starterを始める <span className="arr">→</span>
                </a>
                <a
                  href="https://tally.so/r/5BrZLP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  無料相談を予約する（Growth）
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ====================================================
          FOOTER
          ==================================================== */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-x-bar">
            <a
              href="https://x.com/Workle_shion"
              target="_blank"
              rel="noopener noreferrer"
              className="foot-x-inner"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
