import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import { getSupabaseAdmin, type Intake } from "../../../lib/supabase";
import { planLabel, isIndividualPlan } from "../../../lib/stripe";
import { CONSULT_PATH } from "../../../lib/links";
import IntakeForm from "./IntakeForm";
import IntakeReadonly from "./IntakeReadonly";

export const metadata: Metadata = {
  title: "検証内容の入稿 | Workle",
  robots: { index: false },
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function IntakePage({ params }: PageProps) {
  const { token } = await params;

  const db = getSupabaseAdmin();
  if (!db) notFound();

  const { data: order, error } = await db
    .from("orders")
    .select("*")
    .eq("access_token", token)
    .maybeSingle();

  if (error || !order) notFound();

  const { name: planName, amount: amountStr } = planLabel(order.plan);
  const requireCaseStudy = isIndividualPlan(order.plan);

  // Already submitted → show the saved answers read-only.
  const isSubmitted = order.status !== "pending_intake";
  let existingIntake: Intake | null = null;
  if (isSubmitted) {
    const { data } = await db
      .from("intakes")
      .select("*")
      .eq("session_id", order.session_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    existingIntake = (data as Intake | null) ?? null;
  }

  return (
    <>
      <SiteNav active="research" cta={{ href: CONSULT_PATH, label: "無料相談を予約" }} />
      <main>
        {isSubmitted && existingIntake ? (
          <IntakeReadonly
            intake={existingIntake}
            planName={planName}
            amountStr={amountStr}
            email={order.customer_email}
            statusToken={token}
          />
        ) : (
          <IntakeForm
            token={token}
            planName={planName}
            amountStr={amountStr}
            email={order.customer_email}
            requireCaseStudy={requireCaseStudy}
          />
        )}
      </main>
      <SiteFooter />
    </>
  );
}
