import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _admin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (_admin) return _admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  _admin = createClient(url, key, { auth: { persistSession: false } });
  return _admin;
}

export interface Lead {
  email: string;
  source: string;
  created_at?: string;
}

export interface Order {
  session_id: string;
  access_token?: string;
  customer_email: string | null;
  plan: string | null;
  amount: number | null;
  status: "pending_intake" | "design_review" | "scheduled" | "delivered";
  scheduled_date: string | null;
  report_url: string | null;
  sheet_url: string | null;
  created_at?: string;
}

export interface Intake {
  id?: string;
  session_id: string;
  service_name: string;
  service_url: string;
  platform: string; // ios / android / web / other
  one_liner: string;
  target_user: string | null;
  login_required: boolean;
  test_account: string | null;
  purchase_handling: string | null;
  main_question: string;
  tasks: string | null;
  tasks_delegate: boolean;
  competitors: string | null;
  known_issues: string | null;
  persona_conditions: string | null;
  ng_items: string | null;
  case_study_ok: boolean;
  preferred_period: string | null;
  contact_x: string | null;
  file_urls: string[] | null;
  created_at?: string;
}
