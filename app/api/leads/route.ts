import { type NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../lib/supabase";
import { sendSampleEmail } from "../../lib/email";

interface LeadBody {
  email: string;
  source?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: LeadBody;
  try {
    body = await req.json() as LeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, source = "sample_download" } = body;

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json({ error: "有効なメールアドレスを入力してください" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  if (db) {
    const { error } = await db.from("leads").upsert(
      { email: email.toLowerCase().trim(), source, created_at: new Date().toISOString() },
      { onConflict: "email" }
    );
    if (error) {
      console.error("[leads] Supabase error:", error.message);
    }
  }

  // Non-blocking — email failure must not block the modal success state
  sendSampleEmail(email).catch((err) =>
    console.error("[leads] Email error:", err)
  );

  return NextResponse.json({ ok: true });
}
