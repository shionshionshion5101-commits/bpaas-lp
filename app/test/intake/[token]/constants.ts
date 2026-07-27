// Shared option definitions for the intake form + read-only view.
// Coded values (platform / period) are validated as enums server-side;
// login_required is a boolean; purchase_handling stores the resolved label text.

export type Option = { value: string; label: string };

export const PLATFORM_OPTIONS: Option[] = [
  { value: "ios", label: "iOSアプリ" },
  { value: "android", label: "Androidアプリ" },
  { value: "web", label: "Webサービス" },
  { value: "other", label: "その他" },
];

export const PERIOD_OPTIONS: Option[] = [
  { value: "asap", label: "できるだけ早く" },
  { value: "within_2w", label: "2週間以内" },
  { value: "within_1m", label: "1ヶ月以内" },
  { value: "flexible", label: "時期は相談したい" },
];

// Radio choices for 課金・決済の扱い. The last one reveals a free-text input;
// the resolved text is stored in intakes.purchase_handling.
export const PURCHASE_OPTIONS = [
  "課金画面は表示するが、決済は完了させない（推奨）",
  "サンドボックス／テスト環境を用意している",
  "課金機能はまだない",
  "その他",
] as const;

export const PURCHASE_OTHER = "その他";

export function labelFor(options: Option[], value: string | null): string {
  if (!value) return "—";
  return options.find((o) => o.value === value)?.label ?? value;
}
