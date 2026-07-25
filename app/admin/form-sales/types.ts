// ダッシュボードとAPIで共有する型定義

export type CsvName =
  | 'companies'
  | 'enriched'
  | 'quarantine'
  | 'safe'
  | 'rejected'
  | 'dryrun_results'
  | 'submit_results'
  | 'send_selected';

export interface FileInfo {
  rows: number;
  updatedAt: string;
}

export interface JobInfo {
  step: string;
  pid: number;
  startedAt: string;
  logFile: string;
  exitCode: number | null;
  finishedAt: string | null;
  running: boolean;
  logTail: string;
}

export interface MessageInfo {
  length: number;
  sha256: string;
  preview: string;
  placeholders: string[];
  isTooShort: boolean;
  minLength: number;
}

export interface StatusData {
  files: Record<CsvName, FileInfo | null>;
  job: JobInfo | null;
  message: MessageInfo | null;
  profileUnfilled: string[];
  blockers: string[];
  personalizeReady: boolean;
}

export interface CsvData {
  exists: boolean;
  fields: string[];
  rows: Record<string, string>[];
  total: number;
}

// 業種・規模の選択肢。form-sales/pipeline/personalize.py の
// INDUSTRY_CATEGORIES / SIZE_CATEGORIES と同期すること。
// 「未分類」「不明」は personalize 未実行 or 判定不能の行が入るバケツ。
export const INDUSTRY_OPTIONS = [
  'IT・ソフトウェア',
  '製造',
  '医療・ヘルスケア',
  '人材・HR',
  'マーケティング・広告',
  '金融・保険',
  '不動産・建設',
  '小売・EC',
  '飲食・食品',
  '教育',
  '物流・運輸',
  'コンサルティング',
  '士業・専門サービス',
  'エネルギー・インフラ',
  'その他',
  '未分類',
] as const;

export const SIZE_OPTIONS = ['〜10人', '11〜50人', '51〜300人', '301人〜', '不明'] as const;

export type StepId =
  | 'research_industry'
  | 'research_prtimes'
  | 'research_atpress'
  | 'research_valupress'
  | 'research_meti'
  | 'research_partners'
  | 'merge'
  | 'enrich'
  | 'personalize'
  | 'audit'
  | 'dry_run'
  | 'submit_live';
