import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "../../../lib/supabase";
import { getStripe, planLabel } from "../../../lib/stripe";
import { sendOrderConfirmationEmail } from "../../../lib/email";
import { BASE_URL, intakeUrl } from "../../../lib/links";

// Stripe requires the raw body for signature verification — do not parse as JSON.
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = getStripe();

  if (!stripe || !webhookSecret) {
    console.error("[webhook] Stripe not configured");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    await handleSessionCompleted(event.data.object as Stripe.Checkout.Session);
  }

  return NextResponse.json({ received: true });
}

async function handleSessionCompleted(session: Stripe.Checkout.Session) {
  const sessionId = session.id;
  const email = session.customer_details?.email ?? session.customer_email ?? null;
  const plan = session.metadata?.plan ?? null;
  const amount = session.amount_total; // cents

  const db = getSupabaseAdmin();
  let accessToken: string | null = null;

  if (db) {
    const { data, error } = await db
      .from("orders")
      .upsert(
        {
          session_id: sessionId,
          customer_email: email,
          plan,
          amount,
          status: "pending_intake",
        },
        { onConflict: "session_id", ignoreDuplicates: false }
      )
      .select("access_token")
      .single();

    if (error) {
      console.error("[webhook] Supabase upsert error:", error.message);
    } else {
      accessToken = data?.access_token ?? null;
    }
  }

  // Notify Workle via Slack
  await notifySlack({ plan, email, sessionId });

  // Send customer confirmation email
  if (email) {
    const { name: planName, amount: amountStr } = planLabel(plan);
    // Both links require the access token. Without it (Supabase down / delayed),
    // fall back to the session-scoped thanks page which self-heals once ready.
    const fallbackUrl = `${BASE_URL}/test/thanks?session_id=${sessionId}`;
    const intake = accessToken ? intakeUrl(accessToken) : fallbackUrl;
    const statusUrl = accessToken
      ? `${BASE_URL}/test/status/${accessToken}`
      : fallbackUrl;

    await sendOrderConfirmationEmail({
      to: email,
      planName,
      amount: amountStr,
      intakeUrl: intake,
      statusUrl,
    }).catch((err) => console.error("[webhook] Confirmation email error:", err));
  }
}

async function notifySlack(opts: {
  plan: string | null;
  email: string | null;
  sessionId: string;
}): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;
  const text = `🎉 新規申込: ${opts.plan ?? "不明"} / ${opts.email ?? "不明"} / session: ${opts.sessionId}`;
  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  }).catch((err) => console.error("[webhook] Slack error:", err));
}
