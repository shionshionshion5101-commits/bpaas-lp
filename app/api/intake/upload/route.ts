import { type NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase";

const BUCKET = "intake-files";
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB per file
const MAX_FILES = 10;

// Sanitize a filename to a safe storage-key segment.
function safeName(name: string): string {
  const cleaned = name.replace(/[^\w.\-]+/g, "_").slice(-100);
  return cleaned.length > 0 ? cleaned : "file";
}

export async function POST(req: NextRequest) {
  const db = getSupabaseAdmin();
  if (!db) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const token = form.get("token");
  if (typeof token !== "string" || token.length === 0) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  // Validate the token maps to a pending order before accepting uploads.
  const { data: order, error: orderErr } = await db
    .from("orders")
    .select("session_id, status")
    .eq("access_token", token)
    .maybeSingle();
  if (orderErr || !order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (order.status !== "pending_intake") {
    return NextResponse.json({ error: "Already submitted" }, { status: 409 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ paths: [] });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `ファイルは最大${MAX_FILES}件までです。` },
      { status: 400 }
    );
  }

  const paths: string[] = [];
  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: `「${file.name}」が10MBを超えています。` },
        { status: 400 }
      );
    }
    const key = `${order.session_id}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName(file.name)}`;
    const buffer = await file.arrayBuffer();
    const { error: uploadErr } = await db.storage
      .from(BUCKET)
      .upload(key, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });
    if (uploadErr) {
      console.error("[intake/upload] upload error:", uploadErr.message);
      return NextResponse.json(
        { error: "アップロードに失敗しました。" },
        { status: 500 }
      );
    }
    paths.push(key);
  }

  return NextResponse.json({ paths });
}
