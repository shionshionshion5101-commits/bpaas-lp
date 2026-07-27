import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin, type Intake } from "../../lib/supabase";
import { planLabel } from "../../lib/stripe";

// Trim + treat empty strings as null for optional free-text fields.
const optionalText = z
  .string()
  .trim()
  .max(4000)
  .optional()
  .transform((v) => (v && v.length > 0 ? v : null));

const requiredText = (max = 2000) => z.string().trim().min(1).max(max);

const intakeSchema = z.object({
  token: z.string().trim().min(1),
  service_name: requiredText(200),
  service_url: requiredText(500),
  platform: z.enum(["ios", "android", "web", "other"]),
  one_liner: requiredText(300),
  target_user: optionalText,
  login_required: z.boolean(),
  test_account: optionalText,
  purchase_handling: optionalText,
  main_question: requiredText(2000),
  tasks: optionalText,
  tasks_delegate: z.boolean(),
  competitors: optionalText,
  known_issues: optionalText,
  persona_conditions: optionalText,
  ng_items: optionalText,
  case_study_ok: z.boolean(),
  preferred_period: z.enum(["asap", "within_2w", "within_1m", "flexible"]),
  contact_x: optionalText,
  file_urls: z.array(z.string().max(1000)).max(10).optional(),
});

export async function POST(req: NextRequest) {
  const db = getSupabaseAdmin();
  if (!db) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = intakeSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { token, file_urls, ...fields } = parsed.data;

  // Look up the order by access token — this is the auth check.
  const { data: order, error: orderErr } = await db
    .from("orders")
    .select("session_id, plan, customer_email, status")
    .eq("access_token", token)
    .maybeSingle();

  if (orderErr || !order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (order.status !== "pending_intake") {
    return NextResponse.json(
      { error: "Already submitted" },
      { status: 409 }
    );
  }

  const intake: Intake = {
    session_id: order.session_id,
    ...fields,
    file_urls: file_urls && file_urls.length > 0 ? file_urls : null,
  };

  const { error: insertErr } = await db.from("intakes").insert(intake);
  if (insertErr) {
    console.error("[intake] insert error:", insertErr.message);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }

  const { error: updateErr } = await db
    .from("orders")
    .update({ status: "design_review" })
    .eq("access_token", token);
  if (updateErr) {
    console.error("[intake] status update error:", updateErr.message);
    // The intake is saved; surface success but log the status drift.
  }

  await notifySlack({
    plan: order.plan,
    email: order.customer_email,
    serviceName: fields.service_name,
    mainQuestion: fields.main_question,
  });

  return NextResponse.json({ ok: true });
}

async function notifySlack(opts: {
  plan: string | null;
  email: string | null;
  serviceName: string;
  mainQuestion: string;
}): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;
  const { name: planName } = planLabel(opts.plan);
  const text = [
    `📝 入稿完了: ${opts.serviceName}`,
    `プラン: ${planName} / ${opts.email ?? "不明"}`,
    `一番知りたいこと: ${opts.mainQuestion}`,
  ].join("\n");
  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  }).catch((err) => console.error("[intake] Slack error:", err));
}
