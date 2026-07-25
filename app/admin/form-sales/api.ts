// ダッシュボード用の薄いfetchラッパ。API側の {success, data, error} 封筒を剥がす。

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function unwrap<T>(res: Response): Promise<T> {
  let envelope: ApiEnvelope<T>;
  try {
    envelope = (await res.json()) as ApiEnvelope<T>;
  } catch {
    throw new Error(`APIエラー (${res.status})`);
  }
  if (!envelope.success || envelope.data === undefined) {
    throw new Error(envelope.error ?? `APIエラー (${res.status})`);
  }
  return envelope.data;
}

export async function apiGet<T>(url: string): Promise<T> {
  return unwrap<T>(await fetch(url, { cache: 'no-store' }));
}

export async function apiPost<T>(url: string, body: unknown): Promise<T> {
  return unwrap<T>(
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  );
}
