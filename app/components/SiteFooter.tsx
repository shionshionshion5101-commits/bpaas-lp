import Link from "next/link";

const X_URL = "https://x.com/Workle_shion";

/**
 * Shared site footer (design V2). Dark base that sits under the final CTA.
 * Product column always points to the three spoke pages.
 */
export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-x-bar">
          <a href={X_URL} target="_blank" rel="noopener noreferrer" className="foot-x-inner">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.844L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Build in Public — @Workle_shion で運用実績・進捗をリアルタイムに発信しています
            <span className="arr">→</span>
          </a>
        </div>

        <div className="foot-in">
          <div className="foot-brand">
            <Link className="brand" href="/">
              <span className="brand-mark">
                <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="brand-name">Workle</span>
            </Link>
            <p>
              届ける実務を、単品から代行する。実在ユーザーによる検証・フォーム営業・SNS運用まで、実働チームがあなたの代わりに手を動かします。
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>Service</h4>
              <Link href="/test">リサーチ・ユーザーテスト</Link>
              <Link href="/sales">営業代行</Link>
              <Link href="/sns">SNS運用代行</Link>
            </div>
            <div className="foot-col">
              <h4>Contact</h4>
              <a href="https://tally.so/r/5BrZLP" target="_blank" rel="noopener noreferrer">お問い合わせ</a>
              <a href={X_URL} target="_blank" rel="noopener noreferrer">X (Build in Public)</a>
            </div>
            <div className="foot-col">
              <h4>Legal</h4>
              <Link href="/tokushoho">特定商取引法に基づく表記</Link>
              <Link href="/terms">利用規約</Link>
              <Link href="/privacy">プライバシーポリシー</Link>
            </div>
          </div>
        </div>

        <div className="foot-base">
          <span>© 2026 Workle</span>
          <span style={{ fontFamily: "var(--f-mono)" }}>made async · no meetings were held</span>
        </div>
      </div>
    </footer>
  );
}
