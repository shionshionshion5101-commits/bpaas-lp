import Link from "next/link";
import type { Intake } from "../../../lib/supabase";
import { PLATFORM_OPTIONS, PERIOD_OPTIONS, labelFor } from "./constants";

type Props = {
  intake: Intake;
  planName: string;
  amountStr: string;
  email: string | null;
  statusToken: string;
};

export default function IntakeReadonly({
  intake,
  planName,
  amountStr,
  email,
  statusToken,
}: Props) {
  const rows: { label: string; value: string }[] = [
    { label: "サービス名", value: intake.service_name },
    { label: "アクセス先URL", value: intake.service_url },
    { label: "プラットフォーム", value: labelFor(PLATFORM_OPTIONS, intake.platform) },
    { label: "一言でいうと", value: intake.one_liner },
    { label: "想定ユーザー像", value: intake.target_user || "—" },
    { label: "ログイン", value: intake.login_required ? "必要" : "不要" },
    { label: "テスト用アカウント", value: intake.test_account || "—" },
    { label: "課金・決済の扱い", value: intake.purchase_handling || "—" },
    { label: "一番知りたいこと", value: intake.main_question },
    {
      label: "試してもらいたい操作",
      value: intake.tasks_delegate ? "Workleに設計を依頼" : intake.tasks || "—",
    },
    { label: "競合・類似サービス", value: intake.competitors || "—" },
    { label: "わかっている課題・数値", value: intake.known_issues || "—" },
    { label: "希望する被験者の条件", value: intake.persona_conditions || "—" },
    { label: "NG事項", value: intake.ng_items || "—" },
    { label: "希望する実施時期", value: labelFor(PERIOD_OPTIONS, intake.preferred_period) },
    { label: "事例公開", value: intake.case_study_ok ? "同意済み" : "—" },
    { label: "Xアカウント", value: intake.contact_x || "—" },
    {
      label: "添付ファイル",
      value: intake.file_urls?.length ? `${intake.file_urls.length}件` : "—",
    },
  ];

  return (
    <>
      <section className="intake-hero">
        <div className="wrap">
          <p className="sv-en" aria-hidden="true">INTAKE.</p>
          <h1 className="sv-h">入稿済みの内容</h1>
          <p className="intake-lead">
            この内容で設計を進めています。修正が必要な場合は{" "}
            <a href="mailto:support@workle-kle.com">support@workle-kle.com</a>{" "}
            までご連絡ください。
          </p>
          <div className="intake-order-meta">
            <span className="intake-meta-item">{planName}</span>
            {amountStr && <span className="intake-meta-item">{amountStr}</span>}
            {email && <span className="intake-meta-item">{email}</span>}
          </div>
        </div>
      </section>

      <section className="sv tight">
        <div className="wrap intake-wrap">
          <dl className="intake-readonly">
            {rows.map((r) => (
              <div key={r.label} className="intake-readonly-row">
                <dt className="intake-readonly-label">{r.label}</dt>
                <dd className="intake-readonly-value">{r.value}</dd>
              </div>
            ))}
          </dl>
          <Link href={`/test/status/${statusToken}`} className="btn btn-primary">
            進捗ページに戻る <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
