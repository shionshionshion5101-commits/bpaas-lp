// dry-run / submit のスクリーンショットPNGを返す。
// dir はホワイトリスト、file はスラッシュを含まないファイル名のみ（パストラバーサル防止）。

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { FORM_SALES_DIR, blockedResponse, isBlocked, jsonError } from '../_lib';

const ALLOWED_DIRS = new Set(['dryrun', 'submit', 'submit-dryrun']);
const FILE_NAME_RE = /^[A-Za-z0-9._-]+\.png$/;

export async function GET(request: Request) {
  if (isBlocked()) return blockedResponse();
  const params = new URL(request.url).searchParams;
  const dir = params.get('dir') ?? '';
  const file = params.get('file') ?? '';
  if (!ALLOWED_DIRS.has(dir) || !FILE_NAME_RE.test(file)) {
    return jsonError('不正なスクリーンショット指定です');
  }
  const filePath = path.join(FORM_SALES_DIR, 'logs', dir, file);
  if (!existsSync(filePath)) {
    return jsonError('スクリーンショットが見つかりません', 404);
  }
  return new Response(new Uint8Array(readFileSync(filePath)), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' },
  });
}
