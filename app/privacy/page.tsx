export const metadata = {
  title: "プライバシーポリシー | Workle",
};

export default function Privacy() {
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
          <h1 className="legal-title">プライバシーポリシー</h1>
          <p className="legal-meta">最終更新日：2026年7月7日</p>

          <div className="legal-body">
            <p>
              Workle（以下「当社」）は、Workle（以下「本サービス」）を通じて取得する個人情報の取り扱いについて、
              以下のとおりプライバシーポリシーを定めます。
            </p>

            <h2>第1条（取得する情報）</h2>
            <p>当社は、以下の情報を取得する場合があります。</p>
            <ul>
              <li>氏名・会社名・メールアドレス等のお問い合わせ・申込フォームへの入力情報</li>
              <li>お支払い情報（決済代行事業者を通じて処理するため、カード番号等は当社に保存されません）</li>
              <li>本サービス利用に際してご共有いただくツールのアクセス権限・アカウント情報</li>
              <li>ウェブサイト閲覧時のアクセスログ・Cookie情報</li>
            </ul>

            <h2>第2条（利用目的）</h2>
            <p>取得した個人情報は、以下の目的に限り使用します。</p>
            <ul>
              <li>本サービスの提供・運営</li>
              <li>お問い合わせ・ご依頼への対応</li>
              <li>料金の請求・決済処理</li>
              <li>サービス改善のための統計分析（個人を特定しない形式）</li>
              <li>法令に基づく開示が必要な場合</li>
            </ul>

            <h2>第3条（第三者提供）</h2>
            <p>
              当社は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。
            </p>
            <ul>
              <li>ユーザーの事前同意がある場合</li>
              <li>法令に基づく開示が必要な場合</li>
              <li>本サービスの提供に必要な範囲で委託先（決済代行、クラウドサービス等）に提供する場合</li>
            </ul>

            <h2>第4条（業務上共有される情報の管理）</h2>
            <p>
              ユーザーが業務上共有するSNSアカウント・ツールのアクセス権限・機密情報は、
              タスク実行に必要な最小限の範囲でのみ使用します。
              契約終了後は速やかに当社保有のアクセス権限を削除・返却します。
              業務上知り得た情報を第三者に漏洩・開示することはありません。
            </p>

            <h2>第5条（Cookie・アクセス解析）</h2>
            <p>
              本サービスのウェブサイトでは、利便性向上およびアクセス解析のためCookieを使用する場合があります。
              ブラウザの設定でCookieを無効にすることができますが、一部機能が制限される場合があります。
            </p>

            <h2>第6条（個人情報の開示・訂正・削除）</h2>
            <p>
              ユーザーは当社に対し、保有する個人情報の開示・訂正・削除を請求できます。
              請求は下記お問い合わせ先までご連絡ください。合理的な期間内に対応します。
            </p>

            <h2>第7条（安全管理措置）</h2>
            <p>
              当社は、個人情報への不正アクセス・漏洩・紛失・破壊を防止するため、
              適切な安全管理措置を講じます。
            </p>

            <h2>第8条（お問い合わせ）</h2>
            <p>
              本ポリシーに関するお問い合わせは、以下までご連絡ください。
              <br />
              メールアドレス：support@workle-kle.com
            </p>

            <h2>第9条（改定）</h2>
            <p>
              当社は、必要に応じて本ポリシーを改定できるものとします。
              改定後はウェブサイトへの掲載をもって効力を生じます。
            </p>
          </div>
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
