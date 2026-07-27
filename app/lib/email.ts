// TODO: Set RESEND_API_KEY environment variable to enable email sending.
// When unset, sendEmail() is a no-op and returns silently.
// Install: npm install resend (already done)
// Docs: https://resend.com/docs/send-with-nextjs

import { Resend } from "resend";

const FROM_ADDRESS = "Workle <support@workle-kle.com>";
const PAGE_URL = "https://www.workle-kle.com";
const CONSULT_URL = `${PAGE_URL}/consult`;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const resend = getResend();
  if (!resend) return; // TODO: connect Resend when RESEND_API_KEY is set
  await resend.emails.send({ from: FROM_ADDRESS, ...opts });
}

export async function sendSampleEmail(to: string): Promise<void> {
  const html = `
<p>Workle のサンプルレポートをご請求いただき、ありがとうございます。</p>
<p>
  <a href="${PAGE_URL}/samples/workle-usertest-report-sample.pdf"
     style="display:inline-block;background:#FF5A1F;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">
    サンプルレポートを開く
  </a>
</p>
<p><strong>料金について</strong></p>
<ul>
  <li>個人開発者向け ライトプラン（5人テスト） ¥19,800</li>
  <li>個人開発者向け スタンダードプラン（10人テスト） ¥49,800</li>
  <li>企業向け 10人検証 ¥98,000 / 競合比較 ¥148,000〜</li>
</ul>
<p>
  <a href="${PAGE_URL}/test#pricing">申し込みページを見る</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="${CONSULT_URL}">まず相談する（15分）</a>
</p>
<p style="color:#888;font-size:12px;">
  このメールは Workle（workle-kle.com）よりお送りしています。<br>
  配信停止は <a href="mailto:support@workle-kle.com">support@workle-kle.com</a> までご連絡ください。
</p>
`;
  await sendEmail({
    to,
    subject: "【Workle】ユーザーテスト レポートサンプル",
    html,
  });
}

export async function sendOrderConfirmationEmail(opts: {
  to: string;
  planName: string;
  amount: string;
  intakeUrl: string;
  statusUrl: string;
}): Promise<void> {
  const { to, planName, amount, intakeUrl, statusUrl } = opts;
  const html = `
<p>この度はWorkleにお申し込みいただき、誠にありがとうございます。</p>
<p><strong>申込内容</strong><br>
プラン: ${planName}<br>
金額: ${amount}</p>

<p><strong>次のステップ: 検証内容をお送りください（所要5分）</strong></p>
<p>
  <a href="${intakeUrl}"
     style="display:inline-block;background:#FF5A1F;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">
    入稿フォームを開く
  </a>
</p>
<p>今すぐでなくても構いません。ご都合のよいタイミングでお送りください。</p>

<p><strong>納品までの流れ</strong></p>
<ol>
  <li>入稿フォーム送信</li>
  <li>Workleが設計シートを作成・共有（48時間以内。ご連絡がなければ確定として進行します）</li>
  <li>被験者実施</li>
  <li>レポート納品（申込から10営業日が目安）</li>
</ol>

<p>
  <a href="${statusUrl}">進捗ページを確認する</a>
</p>

<p style="color:#888;font-size:12px;">
  ご質問は <a href="mailto:support@workle-kle.com">support@workle-kle.com</a> までお気軽にどうぞ。<br>
  領収書はStripeより自動送信されます。
</p>
`;
  await sendEmail({
    to,
    subject: "【Workle】お申し込みありがとうございます（次のステップのご案内）",
    html,
  });
}
