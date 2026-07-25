// data/ 配下のCSVをJSONで返す（ホワイトリストのファイル名のみ）

import {
  CSV_FILES,
  blockedResponse,
  isBlocked,
  jsonError,
  jsonOk,
  readCsvFile,
  type CsvName,
} from '../_lib';

const MAX_ROWS = 1000;

export async function GET(request: Request) {
  if (isBlocked()) return blockedResponse();
  const name = new URL(request.url).searchParams.get('name') ?? '';
  if (!(name in CSV_FILES)) {
    return jsonError(`不明なCSV名: ${name}`);
  }
  try {
    const rows = readCsvFile(name as CsvName);
    if (rows === null) return jsonOk({ exists: false, fields: [], rows: [], total: 0 });
    const fields = rows.length > 0 ? Object.keys(rows[0]) : [];
    return jsonOk({
      exists: true,
      fields,
      rows: rows.slice(0, MAX_ROWS),
      total: rows.length,
    });
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : String(error);
    return Response.json({ success: false, error: `CSV読込に失敗: ${detail}` }, { status: 500 });
  }
}
