// パイプライン全体の状態: 各CSVの行数・ジョブ状態・設定ファイルの健全性

import { existsSync, statSync, readFileSync } from 'node:fs';
import path from 'node:path';
import {
  CSV_FILES,
  DATA_DIR,
  blockedResponse,
  currentJobWithLog,
  isBlocked,
  isPersonalizeReady,
  jsonOk,
  liveSendBlockers,
  messageStatus,
  profileUnfilledKeys,
  type CsvName,
} from '../_lib';

interface FileInfo {
  rows: number;
  updatedAt: string;
}

function fileInfo(name: CsvName): FileInfo | null {
  const filePath = path.join(DATA_DIR, CSV_FILES[name]);
  if (!existsSync(filePath)) return null;
  const text = readFileSync(filePath, 'utf-8');
  const lines = text.split('\n').filter((l) => l.trim() !== '').length;
  return {
    rows: Math.max(0, lines - 1),
    updatedAt: statSync(filePath).mtime.toISOString(),
  };
}

export async function GET() {
  if (isBlocked()) return blockedResponse();
  try {
    const files = Object.fromEntries(
      (Object.keys(CSV_FILES) as CsvName[]).map((name) => [name, fileInfo(name)])
    );
    const { job, running, logTail } = currentJobWithLog();
    return jsonOk({
      files,
      job: job ? { ...job, running, logTail } : null,
      message: messageStatus(),
      profileUnfilled: profileUnfilledKeys(),
      blockers: liveSendBlockers(),
      personalizeReady: isPersonalizeReady(),
    });
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : String(error);
    return Response.json({ success: false, error: `状態取得に失敗: ${detail}` }, { status: 500 });
  }
}
