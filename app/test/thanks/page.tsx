import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { getStripe, planLabel } from "../../lib/stripe";
import { getSupabaseAdmin } from "../../lib/supabase";
import { BASE_URL, intakeUrl } from "../../lib/links";

export const metadata: Metadata = {
  title: "お申し込みありがとうございます | Workle",
  robots: { index: false },
};

const STEPS = [
  { label: "入稿", desc: "フォームで検証内容を送信" },
  { label: "設計確認", desc: "非同期・48時間以内" },
  { label: "実施", desc: "被験者テスト実施" },
  { label: "納品", desc: "申込から10営業日目安" },
] as const;

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function ThanksPage({ searchParams }: PageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) notFound();

  // Source 1: Stripe (fresh email/plan right after checkout). This throws when the
  // deployed STRIPE_SECRET_KEY mode (test/live) doesn't match the session id.
  const stripe = getStripe();
  let email: string | null = null;
  let plan: string | null = null;
  let stripeOk = false;
  if (stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      email = session.customer_details?.email ?? session.customer_email ?? null;
      plan = session.metadata?.plan ?? null;
      stripeOk = true;
    } catch {
      stripeOk = false;
    }
  }

  // Source 2: the order row written by the webhook (also carries the access token).
  let accessToken: string | null = null;
  const db = getSupabaseAdmin();
  if (db) {
    const { data } = await db
      .from("orders")
      .select("access_token, plan, customer_email")
      .eq("session_id", sessionId)
      .maybeSingle();
    if (data) {
      accessToken = data.access_token ?? null;
      plan = plan ?? data.plan ?? null;
      email = email ?? data.customer_email ?? null;
    }
  }

  // Neither Stripe nor the webhook order is available — almost always a Stripe
  // test/live mode mismatch or a webhook not yet delivered.
  if (!stripeOk && !accessToken) {
    return <PaymentPending />;
  }

  const { name: planName, amount: amountStr } = planLabel(plan);

  // The self-hosted intake form is keyed by access token; it only exists once the
  // webhook has written the order. Until then, guide the user to check back.
  const intakeHref = accessToken ? intakeUrl(accessToken) : null;
  const statusUrl = accessToken ? `${BASE_URL}/test/status/${accessToken}` : null;

  return (
    <>
      <SiteNav
        links={[]}
        ghost={{ href: "/test", label: "サービスページへ" }}
        cta={
          intakeHref
            ? { href: intakeHref, label: "入稿フォームを開く" }
            : { href: "/test", label: "サービスページへ" }
        }
      />
      <main>
        {/* HERO */}
        <section className="thanks-hero">
          <div className="wrap">
            <p className="thanks-en" aria-hidden="true">THANK<br />YOU.</p>
            <h1 className="thanks-h1">お申し込みを受け付けました。</h1>
            <div className="thanks-meta">
              <span className="thanks-meta-item">{planName}</span>
              {amountStr && <span className="thanks-meta-item">{amountStr}</span>}
              {email && <span className="thanks-meta-item">{email}</span>}
            </div>
          </div>
        </section>

        {/* NEXT ACTION */}
        <section className="sv tight">
          <div className="wrap">
            <div className="thanks-intake-card">
              <p className="thanks-intake-label">NEXT STEP</p>
              <h2 className="thanks-intake-title">
                次に、検証したい内容をお送りください<span className="thanks-intake-time">所要5分</span>
              </h2>
              {intakeHref ? (
                <Link
                  href={intakeHref}
                  className="btn btn-primary"
                  style={{ fontSize: "clamp(15px, 1.8vw, 17px)", padding: "16px 32px" }}
                >
                  入稿フォームを開く <span className="arr">→</span>
                </Link>
              ) : (
                <p className="thanks-intake-note">
                  入稿フォームのリンクは申込処理完了後（通常数分以内）に発行されます。メールでもお送りします。
                </p>
              )}
              <p className="thanks-intake-note">
                同じリンクをメールでもお送りしています。今すぐでなくても構いません。
              </p>
            </div>
          </div>
        </section>

        {/* FLOW */}
        <section className="sv tight">
          <div className="wrap">
            <span className="sv-eyebrow">納品までの流れ</span>
            <div className="thanks-steps">
              {STEPS.map((step, i) => (
                <div key={step.label} className="thanks-step">
                  <p className="thanks-step-n">0{i + 1}</p>
                  <h3 className="thanks-step-label">{step.label}</h3>
                  <p className="thanks-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER LINKS */}
        <section className="sv tight">
          <div className="wrap thanks-footer-links">
            {statusUrl ? (
              <a href={statusUrl} className="thanks-text-link">
                進捗ページを確認する →
              </a>
            ) : (
              <p className="thanks-text-note">
                進捗ページは申込処理完了後に発行されます（通常数分以内）。メールでお知らせします。
              </p>
            )}
            <p className="thanks-text-note">
              領収書はStripeより自動送信されます。
            </p>
            <p className="thanks-text-note">
              ご質問は{" "}
              <a href="mailto:support@workle-kle.com" className="thanks-text-link">
                support@workle-kle.com
              </a>{" "}
              までお気軽にどうぞ。
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function PaymentPending() {
  return (
    <>
      <SiteNav
        links={[]}
        ghost={{ href: "/test", label: "サービスページへ" }}
        cta={{ href: "/test", label: "サービスページへ" }}
      />
      <main>
        <section className="thanks-hero">
          <div className="wrap">
            <p className="thanks-en" aria-hidden="true">THANK<br />YOU.</p>
            <h1 className="thanks-h1">お申し込みを受け付けました。</h1>
          </div>
        </section>
        <section className="sv tight">
          <div className="wrap thanks-footer-links">
            <p className="thanks-text-note">
              決済は正常に完了しています。お申し込み内容の反映まで数分ほどかかる場合があります。
              入稿フォームと進捗ページのリンクは、確認メールでお送りします。
            </p>
            <p className="thanks-text-note">
              領収書はStripeより自動送信されます。
            </p>
            <p className="thanks-text-note">
              しばらくたってもメールが届かない場合は{" "}
              <a href="mailto:support@workle-kle.com" className="thanks-text-link">
                support@workle-kle.com
              </a>{" "}
              までご連絡ください。
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

