// 送信対象の確定: safe.csv から選択された会社だけを data/send_selected.csv に書き出す。
// ④submit_live はこのファイルのみを入力に取る。

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import {
  DATA_DIR,
  blockedResponse,
  isBlocked,
  jsonError,
  jsonOk,
  readCsvFile,
  toCsv,
} from '../_lib';

const MAX_SELECTION = 500;

export async function POST(request: Request) {
  if (isBlocked()) return blockedResponse();
  try {
    const body = (await request.json()) as { contactUrls?: unknown };
    const urls = body.contactUrls;
    if (
      !Array.isArray(urls) ||
      urls.length === 0 ||
      urls.length > MAX_SELECTION ||
      !urls.every((u) => typeof u === 'string' && u.startsWith('http'))
    ) {
      return jsonError(`contactUrls は http で始まるURLの配列（1〜${MAX_SELECTION}件）で指定してください`);
    }
    const safeRows = readCsvFile('safe');
    if (!safeRows || safeRows.length === 0) {
      return jsonError('data/safe.csv がありません。先に audit を実行してください');
    }
    const selectedSet = new Set(urls as string[]);
    const selected = safeRows.filter((r) => selectedSet.has(r.contact_url));
    if (selected.length === 0) {
      return jsonError('選択されたURLが safe.csv に見つかりません');
    }
    const fields = Object.keys(safeRows[0]);
    writeFileSync(path.join(DATA_DIR, 'send_selected.csv'), toCsv(selected, fields));
    return jsonOk({ selected: selected.length });
  } catch (error: unknown) {
    return jsonError(error instanceof Error ? error.message : '不明なエラー');
  }
}
