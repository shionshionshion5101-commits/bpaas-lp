import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import { getSupabaseAdmin, type Order } from "../../../lib/supabase";
import { planLabel } from "../../../lib/stripe";
import { CONSULT_PATH } from "../../../lib/links";

export const metadata: Metadata = {
  title: "進捗確認 | Workle",
  robots: { index: false },
};

type Status = Order["status"];

const STATUS_STEPS: { key: Status; label: string }[] = [
  { key: "pending_intake", label: "入稿待ち" },
  { key: "design_review", label: "設計のご確認" },
  { key: "scheduled", label: "実施予定" },
  { key: "delivered", label: "納品完了" },
];

function statusIndex(status: Status): number {
  return STATUS_STEPS.findIndex((s) => s.key === status);
}

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function StatusPage({ params }: PageProps) {
  const { token } = await params;

  const db = getSupabaseAdmin();
  if (!db) notFound();

  const { data: order, error } = await db
    .from("orders")
    .select("*")
    .eq("access_token", token)
    .maybeSingle();

  if (error || !order) notFound();

  const currentIndex = statusIndex(order.status);
  const { name: planName, amount: amountStr } = planLabel(order.plan);
  const intakeHref = `/test/intake/${token}`;

  return (
    <>
      <SiteNav active="research" cta={{ href: CONSULT_PATH, label: "無料相談を予約" }} />
      <main>
        {/* HEADER */}
        <section className="status-hero">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">STATUS.</p>
            <h1 className="sv-h">進捗状況</h1>
            <div className="status-meta">
              <span className="status-meta-item">{planName}</span>
              {amountStr && <span className="status-meta-item">{amountStr}</span>}
              {order.customer_email && (
                <span className="status-meta-item">{order.customer_email}</span>
              )}
            </div>
          </div>
        </section>

        {/* PROGRESS INDICATOR */}
        <section className="sv tight">
          <div className="wrap">
            <div className="status-progress">
              {STATUS_STEPS.map((step, i) => {
                const isDone = i < currentIndex;
                const isCurrent = i === currentIndex;
                return (
                  <div
                    key={step.key}
                    className={`status-step ${isDone ? "done" : ""} ${isCurrent ? "current" : ""}`}
                  >
                    <div className="status-step-dot" aria-hidden="true">
                      {isDone ? "✓" : i + 1}
                    </div>
                    <p className="status-step-label">{step.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA BY STATUS */}
        <section className="sv tight">
          <div className="wrap">
            <StatusCTA order={order} intakeHref={intakeHref} />
          </div>
        </section>

        {/* FOOTER NOTES */}
        <section className="sv tight">
          <div className="wrap status-footer">
            <p className="status-footer-note">
              ご質問は{" "}
              <a href="mailto:support@workle-kle.com">support@workle-kle.com</a>{" "}
              までお気軽にどうぞ。
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function StatusCTA({
  order,
  intakeHref,
}: {
  order: Order;
  intakeHref: string;
}) {
  switch (order.status) {
    case "pending_intake":
      return (
        <div className="status-cta-card">
          <h2 className="status-cta-title">検証したい内容をお送りください</h2>
          <p className="status-cta-body">入稿フォームからサービスURLと検証内容をご記入いただくと進行が始まります。所要5分です。</p>
          <Link href={intakeHref} className="btn btn-primary">
            入稿フォームを開く <span className="arr">→</span>
          </Link>
        </div>
      );

    case "design_review":
      return (
        <div className="status-cta-card">
          <h2 className="status-cta-title">設計シートをご確認ください</h2>
          <p className="status-cta-body">
            Workleが設計シートを共有しました。コメントでご確認いただけます。
            <strong>48時間以内にご連絡がなければ確定として進行します。</strong>
          </p>
          {order.sheet_url && (
            <a
              href={order.sheet_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              設計シートを確認する <span className="arr">→</span>
            </a>
          )}
          <Link href={intakeHref} className="status-retest-link">
            入稿内容を確認する →
          </Link>
        </div>
      );

    case "scheduled":
      return (
        <div className="status-cta-card">
          <h2 className="status-cta-title">実施予定</h2>
          {order.scheduled_date && (
            <p className="status-cta-body">
              実施予定日:{" "}
              <strong>
                {new Date(order.scheduled_date).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
            </p>
          )}
          <p className="status-cta-body">被験者の実施が完了次第、レポートを納品します。</p>
          <Link href={intakeHref} className="status-retest-link">
            入稿内容を確認する →
          </Link>
        </div>
      );

    case "delivered":
      return (
        <div className="status-cta-card">
          <h2 className="status-cta-title">納品が完了しました</h2>
          <p className="status-cta-body">レポートと実施記録シートをご確認ください。</p>
          <div className="status-cta-actions">
            {order.report_url && (
              <a
                href={order.report_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                レポートを開く <span className="arr">→</span>
              </a>
            )}
            {order.sheet_url && (
              <a
                href={order.sheet_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-cream"
              >
                実施記録シートを開く
              </a>
            )}
          </div>
          <div className="status-cta-actions" style={{ marginTop: 4 }}>
            <Link href={intakeHref} className="status-retest-link">
              入稿内容を確認する →
            </Link>
            <a href="/test#pricing" className="status-retest-link">
              再テストを依頼する →
            </a>
          </div>
        </div>
      );
  }
}
