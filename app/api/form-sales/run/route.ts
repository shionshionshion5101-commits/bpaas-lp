// パイプラインの各ステップを起動する。同時実行は1ジョブまで。
// コマンドはホワイトリスト方式で、shell を経由しない spawn のみ。

import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  DATA_DIR,
  FORM_SALES_DIR,
  blockedResponse,
  isBlocked,
  jsonError,
  jsonOk,
  liveSendBlockers,
  startJob,
} from '../_lib';

interface StepCommand {
  cmd: string;
  args: string[];
}

const MAX_KEYWORD_LENGTH = 80;
const MAX_LIMIT = 5000;
const MAX_WORKERS = 16;

function limitArgs(params: Record<string, unknown>): string[] {
  const limit = Number(params.limit ?? 0);
  if (!Number.isInteger(limit) || limit < 0 || limit > MAX_LIMIT) {
    throw new Error(`limit は 0〜${MAX_LIMIT} の整数で指定してください`);
  }
  return limit > 0 ? ['--limit', String(limit)] : [];
}

function workersArgs(params: Record<string, unknown>): string[] {
  const workers = Number(params.workers ?? 0);
  if (!Number.isInteger(workers) || workers < 0 || workers > MAX_WORKERS) {
    throw new Error(`workers は 0〜${MAX_WORKERS} の整数で指定してください`);
  }
  return workers > 0 ? ['--workers', String(workers)] : [];
}

// 業種・規模フィルタ（文字列配列）。カンマ・制御文字は不可（--industries=a,b 形式で渡すため）
function filterListArg(value: unknown, name: string): string[] {
  if (value === undefined) return [];
  const isValid =
    Array.isArray(value) &&
    value.every(
      (v) => typeof v === 'string' && v.length > 0 && v.length <= 30 && !/[,\p{Cc}]/u.test(v)
    );
  if (!isValid) {
    throw new Error(`${name} は 30文字以内の文字列配列で指定してください`);
  }
  return value as string[];
}

function buildStepCommand(step: string, params: Record<string, unknown>): StepCommand {
  switch (step) {
    case 'research_industry': {
      const industry = String(params.industry ?? '').trim();
      if (!industry || industry.length > 80 || /[\p{Cc}]/u.test(industry)) {
        throw new Error('industry は 1〜80 文字で指定してください');
      }
      return {
        cmd: 'python3',
        args: ['pipeline/research_industry.py', '--industry', industry],
      };
    }
    case 'research_atpress': {
      const keyword = String(params.keyword ?? '').trim();
      if (!keyword || keyword.length > MAX_KEYWORD_LENGTH || /[\p{Cc}]/u.test(keyword)) {
        throw new Error(`keyword は 1〜${MAX_KEYWORD_LENGTH} 文字で指定してください`);
      }
      const maxPages = Number(params.maxPages ?? 3);
      if (!Number.isInteger(maxPages) || maxPages < 1 || maxPages > 10) {
        throw new Error('maxPages は 1〜10 で指定してください');
      }
      return {
        cmd: 'python3',
        args: ['pipeline/research_atpress.py', '--keyword', keyword, '--max-pages', String(maxPages)],
      };
    }
    case 'research_valupress': {
      const keyword = String(params.keyword ?? '').trim();
      if (!keyword || keyword.length > MAX_KEYWORD_LENGTH || /[\p{Cc}]/u.test(keyword)) {
        throw new Error(`keyword は 1〜${MAX_KEYWORD_LENGTH} 文字で指定してください`);
      }
      const maxPages = Number(params.maxPages ?? 3);
      if (!Number.isInteger(maxPages) || maxPages < 1 || maxPages > 10) {
        throw new Error('maxPages は 1〜10 で指定してください');
      }
      return {
        cmd: 'python3',
        args: ['pipeline/research_valupress.py', '--keyword', keyword, '--max-pages', String(maxPages)],
      };
    }
    case 'research_prtimes': {
      const keyword = String(params.keyword ?? '').trim();
      if (!keyword || keyword.length > MAX_KEYWORD_LENGTH || /[\p{Cc}]/u.test(keyword)) {
        throw new Error(`keyword は 1〜${MAX_KEYWORD_LENGTH} 文字で指定してください`);
      }
      const maxPages = Number(params.maxPages ?? 2);
      if (!Number.isInteger(maxPages) || maxPages < 1 || maxPages > 5) {
        throw new Error('maxPages は 1〜5 で指定してください');
      }
      return {
        cmd: 'python3',
        args: ['pipeline/research_prtimes.py', '--keyword', keyword, '--max-pages', String(maxPages)],
      };
    }
    case 'research_meti': {
      const pdf = String(params.pdf ?? '').trim();
      const isUrl = /^https?:\/\//.test(pdf);
      const isLocalPdf =
        pdf.endsWith('.pdf') &&
        !pdf.includes('..') &&
        existsSync(path.join(FORM_SALES_DIR, pdf));
      if (!isUrl && !isLocalPdf) {
        throw new Error('pdf には https のURLか form-sales/ 配下の既存PDFパスを指定してください');
      }
      return { cmd: 'python3', args: ['pipeline/research_meti_pdf.py', '--pdf', pdf] };
    }
    case 'research_partners':
      return { cmd: 'python3', args: ['pipeline/research_partners.py'] };
    case 'merge':
      return { cmd: 'python3', args: ['pipeline/merge_research.py'] };
    case 'enrich':
      return {
        cmd: 'python3',
        args: ['pipeline/enrich.py', ...limitArgs(params), ...workersArgs(params)],
      };
    case 'personalize':
      return {
        cmd: 'python3',
        args: ['pipeline/personalize.py', ...limitArgs(params), ...workersArgs(params)],
      };
    case 'audit': {
      const industries = filterListArg(params.industries, 'industries');
      const sizes = filterListArg(params.sizes, 'sizes');
      return {
        cmd: 'node',
        args: [
          'audit.mjs',
          ...(industries.length > 0 ? [`--industries=${industries.join(',')}`] : []),
          ...(sizes.length > 0 ? [`--sizes=${sizes.join(',')}`] : []),
        ],
      };
    }
    case 'dry_run':
      return {
        cmd: 'node',
        args: ['dry_run.mjs', ...limitArgs(params), ...workersArgs(params)],
      };
    case 'submit_live': {
      if (!existsSync(path.join(DATA_DIR, 'send_selected.csv'))) {
        throw new Error('送信対象が未確定です。dry-run結果から会社を選択して確定してください');
      }
      const blockers = liveSendBlockers();
      if (blockers.length > 0) {
        throw new Error(`LIVE送信ブロック: ${blockers.join(' / ')}`);
      }
      return {
        cmd: 'node',
        args: [
          'submit_batch.mjs',
          '--dry-run=false',
          '--input=data/send_selected.csv',
          '--yes=true',
          ...workersArgs(params),
        ],
      };
    }
    default:
      throw new Error(`不明なステップ: ${step}`);
  }
}

export async function POST(request: Request) {
  if (isBlocked()) return blockedResponse();
  try {
    const body = (await request.json()) as { step?: string; params?: Record<string, unknown> };
    if (!body.step || typeof body.step !== 'string') {
      return jsonError('step を指定してください');
    }
    const { cmd, args } = buildStepCommand(body.step, body.params ?? {});
    const job = startJob(body.step, cmd, args);
    return jsonOk({ job });
  } catch (error: unknown) {
    return jsonError(error instanceof Error ? error.message : '不明なエラー');
  }
}
