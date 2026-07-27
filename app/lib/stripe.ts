import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  _stripe = new Stripe(key);
  return _stripe;
}

export const PLAN_LABELS: Record<string, { name: string; amount: string }> = {
  light: { name: "ライトプラン（5人テスト）", amount: "¥19,800" },
  standard: { name: "スタンダードプラン（10人テスト）", amount: "¥49,800" },
};

export function planLabel(plan: string | null) {
  if (!plan) return { name: "テストプラン", amount: "" };
  return PLAN_LABELS[plan] ?? { name: plan, amount: "" };
}

/**
 * Individual-developer plans (light / standard) require case-study consent.
 * Company plans do not.
 */
export function isIndividualPlan(plan: string | null): boolean {
  return plan === "light" || plan === "standard";
}
