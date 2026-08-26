export const metadata = {
  title: "特定商取引法に基づく表記 | Workle",
};

export default function Tokushoho() {
  return (
    <>
      <header className="nav scrolled" style={{ position: "sticky" }}>
        <div className="wrap nav-in">
          <a className="brand" href="/" aria-label="Workle トップへ戻る">
            <span className="brand-mark">
              <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="brand-name">Workle</span>
          </a>
          <a href="/" className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }}>
            ← トップへ戻る
          </a>
        </div>
      </header>

      <main>
        <div className="legal-page wrap">
          <h1 className="legal-title">特定商取引法に基づく表記</h1>
          <p className="legal-meta">最終更新日：2026年8月25日</p>

          <table className="legal-table">
            <tbody>
              <tr>
                <th>販売業者</th>
                <td>Workle</td>
              </tr>
              <tr>
                <th>運営責任者</th>
                <td>片倉詩音</td>
              </tr>
              <tr>
                <th>所在地</th>
                <td>
                  請求があった場合、遅滞なく開示します。
                </td>
              </tr>
              <tr>
                <th>電話番号</th>
                <td>
                  請求があった場合、遅滞なく開示します。
                  <br />
                  <span className="legal-note">※ メールでのお問い合わせを優先しています。</span>
                </td>
              </tr>
              <tr>
                <th>メールアドレス</th>
                <td>
                  <a href="mailto:support@workle-kle.com" style={{ color: "var(--accent)" }}>
                    support@workle-kle.com
                  </a>
                </td>
              </tr>
              <tr>
                <th>サービス名</th>
                <td>Workle（ワークル）</td>
              </tr>
              <tr>
                <th>販売価格</th>
                <td>
                  各プランページに記載の金額（税別）
                  <br />
                  ① 設計を渡す（コンサル）：350,000円（2〜4週間・単発）
                  <br />
                  ② 一緒に立ち上げる（伴走）：350,000円〜（内容に応じて実行分を加算）
                  <br />
                  ③ まるごと引き受ける（全面委託）：月50,000円 + 成果報酬 20,000円/商談。固定分は月3人日・架電450件目安。4人日目以降の追加は30,000円/人日
                  <br />
                  単発のスポット架電：40,000円/人日、最低3人日
                  <br />
                  初期費用は0円。すべて税別
                </td>
              </tr>
              <tr>
                <th>支払方法</th>
                <td>クレジットカード決済（Visa / Mastercard / American Express / JCB）</td>
              </tr>
              <tr>
                <th>支払時期</th>
                <td>サービス申込時に初月分を決済。以降は毎月同日に自動更新。</td>
              </tr>
              <tr>
                <th>サービス提供時期</th>
                <td>契約成立後、翌営業日以降の指定日。</td>
              </tr>
              <tr>
                <th>解約・返金について</th>
                <td>
                  月末までにご連絡いただければ翌月から解約となります。最低契約期間はありません。
                  <br />
                  デジタルサービスの性質上、着手済みタスクがある場合の日割り返金は原則行いません。
                  詳細はご契約時の利用規約をご確認ください。
                </td>
              </tr>
              <tr>
                <th>動作環境</th>
                <td>インターネットに接続できる環境。Notionアカウントが必要です（無料プランで利用可）。</td>
              </tr>
              <tr>
                <th>その他</th>
                <td>本表記は特定商取引法（通信販売）に基づくものです。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-base" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
            <span>© 2026 Workle</span>
            <span>
              <a href="/tokushoho" style={{ color: "var(--tx-4)", marginRight: 16 }}>特定商取引法</a>
              <a href="/terms" style={{ color: "var(--tx-4)", marginRight: 16 }}>利用規約</a>
              <a href="/privacy" style={{ color: "var(--tx-4)" }}>プライバシーポリシー</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
