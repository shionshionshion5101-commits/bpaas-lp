export const metadata = {
  title: "利用規約 | Workle",
};

export default function Terms() {
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
          <h1 className="legal-title">利用規約</h1>
          <p className="legal-meta">最終更新日：2026年7月7日</p>

          <div className="legal-body">
            <p>
              本利用規約（以下「本規約」）は、Workle（以下「当社」）が提供するサービス「Workle」（以下「本サービス」）の利用条件を定めるものです。
              ユーザーは本サービスを利用することで本規約に同意したものとみなします。
            </p>

            <h2>第1条（定義）</h2>
            <p>
              本規約において、以下の用語は次の意味を持ちます。
            </p>
            <ul>
              <li>「ユーザー」とは、本サービスに申し込み、利用するすべての個人・法人を指します。</li>
              <li>「タスク」とは、ユーザーが本サービスを通じて当社に依頼する業務をいいます。</li>
              <li>「クレジット」とは、Starterプランにおいてタスクの実行に使用するポイントをいいます。</li>
            </ul>

            <h2>第2条（サービスの利用）</h2>
            <p>
              ユーザーは、本規約に従い、本サービスを利用するものとします。
              当社は、本サービスの内容を予告なく変更・停止・廃止する場合があります。
              その場合、当社はユーザーへ事前通知するよう努めます。
            </p>

            <h2>第3条（禁止事項）</h2>
            <p>ユーザーは以下の行為を行ってはなりません。</p>
            <ul>
              <li>法令または公序良俗に違反する行為</li>
              <li>当社または第三者の知的財産権、プライバシー、名誉その他の権利を侵害する行為</li>
              <li>不正な手段による本サービスへのアクセス</li>
              <li>本サービスを通じて取得した成果物の無断転売・再配布</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>

            <h2>第4条（料金・支払い）</h2>
            <p>
              各プランの料金は本サービスのLPに記載のとおりです。
              支払いはクレジットカードによる月次自動更新とし、申込時に初月分が決済されます。
              Growthプランの最終料金は、無料診断後に提示する見積もりに基づき双方合意の上で確定します。
            </p>

            <h2>第5条（解約・返金）</h2>
            <p>
              ユーザーは月末までに当社へ連絡することで翌月から解約できます。最低契約期間はありません。
              デジタルサービスの性質上、着手済みタスクがある期間の日割り返金は原則行いません。
              ただし、当社の重大な過失による場合は協議の上対応します。
            </p>

            <h2>第6条（免責事項）</h2>
            <p>
              当社は、本サービスの提供によりユーザーが得た成果（売上・アクセス数・コンバージョン率等）について、
              特定の結果を保証するものではありません。
              当社の責任は、当該月の支払い額を上限とします。
            </p>

            <h2>第7条（知的財産権）</h2>
            <p>
              当社が本サービスを通じてユーザーに納品した成果物の著作権は、納品完了をもってユーザーに帰属します。
              ただし、当社が独自に保有するノウハウ・テンプレート・ツールの権利は当社に留保されます。
            </p>

            <h2>第8条（秘密保持）</h2>
            <p>
              当社は、業務上知り得たユーザーの機密情報を第三者に開示しません。
              ユーザーの事例を実績として公開する場合は、事前に書面または電子メールでの同意を得るものとします。
            </p>

            <h2>第9条（準拠法・管轄）</h2>
            <p>
              本規約は日本法に準拠します。
              本サービスに関する紛争は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>

            <h2>第10条（規約の変更）</h2>
            <p>
              当社は、必要に応じて本規約を変更できるものとします。
              変更後の規約はウェブサイトへの掲載をもって効力を生じるものとし、
              変更後に本サービスを利用したユーザーは変更後の規約に同意したものとみなします。
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
