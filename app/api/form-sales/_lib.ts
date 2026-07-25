// フォーム営業ダッシュボードAPI共通処理。
// ローカル開発時（next dev）のみ動作し、本番ビルドでは全ルートが404を返す。
// CSVパースとLIVE送信ブロッカー判定は form-sales/lib/{csv,config}.mjs のロジックを
// TypeScriptに移植したもの。仕様を変えるときは両方を更新すること。

import { spawn } from 'node:child_process';
import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  readSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

export const FORM_SALES_DIR = path.join(process.cwd(), 'form-sales');
export const DATA_DIR = path.join(FORM_SALES_DIR, 'data');
const WEB_LOG_DIR = path.join(FORM_SALES_DIR, 'logs', 'web');
const JOB_FILE = path.join(WEB_LOG_DIR, 'job.json');
const MIN_MESSAGE_LENGTH = 200;
const LOG_TAIL_BYTES = 16_384;

export const CSV_FILES = {
  companies: 'companies.csv',
  enriched: 'enriched.csv',
  quarantine: 'quarantine.csv',
  safe: 'safe.csv',
  rejected: 'rejected.csv',
  dryrun_results: 'dryrun_results.csv',
  submit_results: 'submit_results.csv',
  send_selected: 'send_selected.csv',
} as const;

export type CsvName = keyof typeof CSV_FILES;

export interface Job {
  step: string;
  pid: number;
  startedAt: string;
  logFile: string;
  exitCode: number | null;
  finishedAt: string | null;
}

// ---- ガード ----

export function isBlocked(): boolean {
  return process.env.NODE_ENV !== 'development' || !existsSync(FORM_SALES_DIR);
}

export function blockedResponse(): Response {
  return Response.json(
    { success: false, error: 'このAPIはローカル開発時（next dev）のみ利用できます' },
    { status: 404 }
  );
}

export function jsonOk<T>(data: T): Response {
  return Response.json({ success: true, data });
}

export function jsonError(error: string, status = 400): Response {
  return Response.json({ success: false, error }, { status });
}

// ---- CSV（form-sales/lib/csv.mjs のTS移植） ----

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let field = '';
  let record: string[] = [];
  let inQuotes = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      record.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      record.push(field);
      rows.push(record);
      field = '';
      record = [];
    } else {
      field += ch;
    }
  }
  if (field !== '' || record.length > 0) {
    record.push(field);
    rows.push(record);
  }
  return rows.filter((r) => !(r.length === 1 && r[0] === ''));
}

export function parseCsvObjects(text: string): Record<string, string>[] {
  const rows = parseCsv(text);
  if (rows.length === 0) return [];
  const [header, ...body] = rows;
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

function escapeField(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function toCsv(objects: Record<string, string>[], fieldnames: string[]): string {
  const header = fieldnames.map(escapeField).join(',');
  const lines = objects.map((o) => fieldnames.map((f) => escapeField(o[f] ?? '')).join(','));
  return [header, ...lines].join('\n') + '\n';
}

export function readCsvFile(name: CsvName): Record<string, string>[] | null {
  const filePath = path.join(DATA_DIR, CSV_FILES[name]);
  if (!existsSync(filePath)) return null;
  return parseCsvObjects(readFileSync(filePath, 'utf-8'));
}

// ---- 設定ファイルの状態（form-sales/lib/config.mjs と同一ルール） ----

const PLACEHOLDER_RE = /\{\{[^}]*\}\}/g;
// .test() には /g 付き正規表現を使わない（lastIndex が持ち越されて1つおきに誤判定する）
const hasPlaceholder = (text: string): boolean => /\{\{[^}]*\}\}/.test(text);

export interface MessageStatus {
  length: number;
  sha256: string;
  preview: string;
  placeholders: string[];
  isTooShort: boolean;
  minLength: number;
}

export function messageStatus(): MessageStatus | null {
  const filePath = path.join(FORM_SALES_DIR, 'config/message.txt');
  if (!existsSync(filePath)) return null;
  const raw = readFileSync(filePath, 'utf-8').trim();
  return {
    length: raw.length,
    sha256: createHash('sha256').update(raw).digest('hex').slice(0, 12),
    preview: raw.slice(0, 140),
    placeholders: [...raw.matchAll(PLACEHOLDER_RE)].map((m) => m[0]),
    isTooShort: raw.length < MIN_MESSAGE_LENGTH,
    minLength: MIN_MESSAGE_LENGTH,
  };
}

export function profileUnfilledKeys(): string[] {
  const filePath = path.join(FORM_SALES_DIR, 'config/sender_profile.json');
  if (!existsSync(filePath)) return ['(sender_profile.json がありません)'];
  const profile = JSON.parse(readFileSync(filePath, 'utf-8')) as Record<string, unknown>;
  return Object.entries(profile)
    .filter(
      ([k, v]) => !k.startsWith('_') && typeof v === 'string' && hasPlaceholder(v)
    )
    .map(([k]) => k);
}

// ②'パーソナライズが使うAPIキーの有無（環境変数 or form-sales/.env）。
// キー自体は返さない — 有無のブール値のみ
export function isPersonalizeReady(): boolean {
  if (process.env.ANTHROPIC_API_KEY) return true;
  const envPath = path.join(FORM_SALES_DIR, '.env');
  if (!existsSync(envPath)) return false;
  return /^\s*ANTHROPIC_API_KEY\s*=\s*\S/m.test(readFileSync(envPath, 'utf-8'));
}

export function liveSendBlockers(): string[] {
  const blockers: string[] = [];
  const unfilled = profileUnfilledKeys();
  if (unfilled.length > 0) {
    blockers.push(`sender_profile.json に未記入項目: ${unfilled.join(', ')}`);
  }
  const message = messageStatus();
  if (!message) {
    blockers.push('config/message.txt がありません');
  } else {
    if (message.placeholders.length > 0) {
      blockers.push(`message.txt にプレースホルダが残っています（${message.placeholders.length}箇所）`);
    }
    if (message.isTooShort) {
      blockers.push(
        `message.txt が ${message.length} 文字（最低 ${message.minLength} 文字）。本文省略事故の防止ガード`
      );
    }
  }
  return blockers;
}

// ---- ジョブ実行（同時実行は1つまで） ----

function readJob(): Job | null {
  if (!existsSync(JOB_FILE)) return null;
  try {
    return JSON.parse(readFileSync(JOB_FILE, 'utf-8')) as Job;
  } catch {
    return null;
  }
}

function isPidAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export function isJobRunning(job: Job | null): boolean {
  if (!job) return false;
  return job.exitCode === null && job.finishedAt === null && isPidAlive(job.pid);
}

export function currentJobWithLog(): { job: Job | null; running: boolean; logTail: string } {
  const job = readJob();
  const running = isJobRunning(job);
  let logTail = '';
  if (job) {
    const logPath = path.join(WEB_LOG_DIR, job.logFile);
    if (existsSync(logPath)) {
      const size = statSync(logPath).size;
      const fd = openSync(logPath, 'r');
      try {
        const start = Math.max(0, size - LOG_TAIL_BYTES);
        const buf = Buffer.alloc(size - start);
        readSync(fd, buf, 0, buf.length, start);
        logTail = buf.toString('utf-8');
      } finally {
        closeSync(fd);
      }
    }
  }
  return { job, running, logTail };
}

export function startJob(step: string, cmd: string, args: string[]): Job {
  const existing = readJob();
  if (isJobRunning(existing)) {
    throw new Error(`別のジョブ (${existing?.step}) が実行中です`);
  }
  mkdirSync(WEB_LOG_DIR, { recursive: true });
  const logFile = `${Date.now()}-${step}.log`;
  const logPath = path.join(WEB_LOG_DIR, logFile);
  const out = openSync(logPath, 'w');
  const child = spawn(cmd, args, {
    cwd: FORM_SALES_DIR,
    stdio: ['ignore', out, out],
    env: process.env,
  });
  closeSync(out);
  if (!child.pid) {
    throw new Error(`ジョブの起動に失敗しました: ${cmd}`);
  }
  const job: Job = {
    step,
    pid: child.pid,
    startedAt: new Date().toISOString(),
    logFile,
    exitCode: null,
    finishedAt: null,
  };
  writeFileSync(JOB_FILE, JSON.stringify(job, null, 2));
  child.on('exit', (code) => {
    const finished: Job = { ...job, exitCode: code ?? -1, finishedAt: new Date().toISOString() };
    writeFileSync(JOB_FILE, JSON.stringify(finished, null, 2));
  });
  return job;
}
