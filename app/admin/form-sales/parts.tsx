'use client';

// Dashboard のサブコンポーネント群

import { useCallback, useEffect, useRef, useState } from 'react';
import { apiGet } from './api';
import type { CsvData, CsvName, FileInfo, JobInfo, MessageInfo } from './types';

// ---- ジョブログターミナル ----

export function LogTerminal({ job }: { job: JobInfo | null }) {
  const terminalRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = terminalRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [job?.logTail]);

  const ledClass = !job
    ? ''
    : job.running
      ? 'fsc-led--run'
      : job.exitCode === 0
        ? 'fsc-led--ok'
        : 'fsc-led--err';

  return (
    <div>
      <div className="fsc-terminal-head">
        <span className={`fsc-led ${ledClass}`} />
        {job ? (
          <>
            <b>{job.step}</b>
            <span>開始 {new Date(job.startedAt).toLocaleTimeString('ja-JP')}</span>
            {job.running ? (
              <span>実行中…</span>
            ) : (
              <span className={job.exitCode === 0 ? 'fsc-status-ok' : 'fsc-status-ng'}>
                終了 exit={job.exitCode}
              </span>
            )}
          </>
        ) : (
          <span>まだジョブは実行されていません</span>
        )}
      </div>
      <pre className="fsc-terminal" ref={terminalRef}>
        {job?.logTail || '── no output ──'}
      </pre>
    </div>
  );
}

// ---- CSVタブ + テーブル ----

const TABS: { name: CsvName; label: string }[] = [
  { name: 'companies', label: '①companies' },
  { name: 'enriched', label: '②enriched' },
  { name: 'quarantine', label: '②隔離' },
  { name: 'safe', label: '③safe' },
  { name: 'rejected', label: '③除外' },
  { name: 'dryrun_results', label: '③dry-run' },
  { name: 'send_selected', label: '④送信対象' },
  { name: 'submit_results', label: '④送信結果' },
];

export function CsvExplorer({
  files,
  version,
}: {
  files: Record<CsvName, FileInfo | null> | null;
  version: number;
}) {
  const [active, setActive] = useState<CsvName>('companies');
  const [data, setData] = useState<CsvData | null>(null);
  const [loadError, setLoadError] = useState('');

  const load = useCallback(async (name: CsvName) => {
    setLoadError('');
    try {
      setData(await apiGet<CsvData>(`/api/form-sales/csv?name=${name}`));
    } catch (err: unknown) {
      setData(null);
      setLoadError(err instanceof Error ? err.message : 'CSV読込に失敗しました');
    }
  }, []);

  useEffect(() => {
    load(active);
  }, [active, version, load]);

  return (
    <div>
      <div className="fsc-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.name}
            className={`fsc-tab ${active === tab.name ? 'fsc-tab--active' : ''}`}
            onClick={() => setActive(tab.name)}
          >
            {tab.label}
            <small>{files?.[tab.name]?.rows ?? '—'}</small>
          </button>
        ))}
      </div>
      <div className="fsc-tablewrap">
        {loadError !== '' ? (
          <p className="fsc-empty">{loadError}</p>
        ) : !data || !data.exists ? (
          <p className="fsc-empty">まだ生成されていません</p>
        ) : data.rows.length === 0 ? (
          <p className="fsc-empty">0 件</p>
        ) : (
          <DataTable data={data} />
        )}
      </div>
    </div>
  );
}

const TABLE_MAX_ROWS = 300;

function DataTable({ data }: { data: CsvData }) {
  const rows = data.rows.slice(0, TABLE_MAX_ROWS);
  return (
    <>
      {data.rows.length > TABLE_MAX_ROWS && (
        <p className="fsc-empty">
          {data.rows.length} 件中 先頭 {TABLE_MAX_ROWS} 件のみ表示（全件はCSVファイルを直接開く）
        </p>
      )}
      <table className="fsc-table">
        <thead>
          <tr>
            {data.fields.map((f) => (
              <th key={f}>{f}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {data.fields.map((f) => (
                <td key={f} title={row[f]}>
                  {row[f]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// ---- dry-run スクショギャラリー（送信対象の選択UI） ----

function screenshotUrl(screenshotPath: string): string | null {
  const match = /^logs\/(dryrun|submit|submit-dryrun)\/([A-Za-z0-9._-]+\.png)$/.exec(
    screenshotPath
  );
  if (!match) return null;
  return `/api/form-sales/screenshot?dir=${match[1]}&file=${encodeURIComponent(match[2])}`;
}

const GALLERY_PAGE_SIZE = 60;

type GalleryFilter = 'all' | 'ok' | 'ng';

export function DryrunGallery({
  dryrun,
  selected,
  onToggle,
}: {
  dryrun: CsvData | null;
  selected: ReadonlySet<string>;
  onToggle: (contactUrl: string) => void;
}) {
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [visibleCount, setVisibleCount] = useState(GALLERY_PAGE_SIZE);

  if (!dryrun || !dryrun.exists || dryrun.rows.length === 0) {
    return <p className="fsc-empty">dry-run 未実行。③を実行するとここにスクショが並びます。</p>;
  }

  const filtered = dryrun.rows.filter((row) => {
    if (filter === 'ok') return row.status === 'ok';
    if (filter === 'ng') return row.status !== 'ok';
    return true;
  });
  const visible = filtered.slice(0, visibleCount);
  const okTotal = dryrun.rows.filter((r) => r.status === 'ok').length;

  return (
    <>
      <div className="fsc-tabs">
        {(
          [
            ['all', `全部 (${dryrun.rows.length})`],
            ['ok', `OK (${okTotal})`],
            ['ng', `NG (${dryrun.rows.length - okTotal})`],
          ] as [GalleryFilter, string][]
        ).map(([value, label]) => (
          <button
            key={value}
            className={`fsc-tab ${filter === value ? 'fsc-tab--active' : ''}`}
            onClick={() => {
              setFilter(value);
              setVisibleCount(GALLERY_PAGE_SIZE);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="fsc-gallery">
        {visible.map((row) => {
        const isOk = row.status === 'ok';
        const isSelected = selected.has(row.contact_url);
        const shotUrl = screenshotUrl(row.screenshot ?? '');
        return (
          <div key={row.contact_url} className={`fsc-shot ${isSelected ? 'fsc-shot--selected' : ''}`}>
            {shotUrl !== null ? (
              <a href={shotUrl} target="_blank" rel="noopener noreferrer">
                {/* ローカルAPIの動的PNGなので next/image は使わない */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shotUrl} alt={`${row.company_name} のdry-runスクリーンショット`} loading="lazy" />
              </a>
            ) : (
              <p className="fsc-empty">スクショなし</p>
            )}
            <label className="fsc-shot-meta">
              <input
                type="checkbox"
                checked={isSelected}
                disabled={!isOk}
                onChange={() => onToggle(row.contact_url)}
              />
              <span className="fsc-shot-name">{row.company_name}</span>
              <span className={isOk ? 'fsc-status-ok' : 'fsc-status-ng'}>
                {isOk ? 'OK' : 'NG'}
              </span>
              {row.template && row.template !== 'default' && (
                <span className="fsc-shot-tmpl" title="使用テンプレート">{row.template}</span>
              )}
            </label>
            <p className="fsc-shot-detail">{isOk ? row.contact_url : row.detail}</p>
            {row.message_preview && (
              <details className="fsc-shot-msg">
                <summary>送信文を見る</summary>
                <pre>{row.message_preview}{(row.message_preview?.length ?? 0) >= 400 ? '…' : ''}</pre>
              </details>
            )}
          </div>
        );
      })}
      </div>
      {filtered.length > visibleCount && (
        <div className="fsc-gallery-actions">
          <button
            className="fsc-btn"
            onClick={() => setVisibleCount((c) => c + GALLERY_PAGE_SIZE)}
          >
            もっと見る（残り {filtered.length - visibleCount} 件）
          </button>
        </div>
      )}
    </>
  );
}

// ---- 業種・規模フィルタ（audit用チェックボックス群） ----

export function FilterGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: readonly string[];
  selected: ReadonlySet<string>;
  onChange: (next: ReadonlySet<string>) => void;
}) {
  const isAllSelected = selected.size === options.length;

  const toggle = (option: string) => {
    const next = new Set(selected);
    if (next.has(option)) next.delete(option);
    else next.add(option);
    onChange(next);
  };

  return (
    <fieldset className="fsc-filter">
      <legend>
        {label}
        <button
          type="button"
          className="fsc-filter-all"
          onClick={() => onChange(new Set(isAllSelected ? [] : options))}
        >
          {isAllSelected ? '全解除' : '全選択'}
        </button>
      </legend>
      <div className="fsc-filter-opts">
        {options.map((option) => (
          <label
            key={option}
            className={`fsc-filter-opt ${selected.has(option) ? 'fsc-filter-opt--on' : ''}`}
          >
            <input
              type="checkbox"
              checked={selected.has(option)}
              onChange={() => toggle(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// ---- LIVE送信確認モーダル ----

const CONFIRM_WORD = 'yes';

export function LiveModal({
  open,
  targetCount,
  message,
  onClose,
  onConfirm,
}: {
  open: boolean;
  targetCount: number;
  message: MessageInfo | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (open) setTyped('');
  }, [open]);

  if (!open) return null;
  return (
    <div className="fsc-backdrop" onClick={onClose}>
      <div className="fsc-modal" onClick={(e) => e.stopPropagation()}>
        <h3>⚠ LIVE送信 — 取り消せません</h3>
        <ul>
          <li>
            送信対象: <b>{targetCount} 社</b>（dry-run OK かつ選択済みのみ）
          </li>
          {message !== null ? (
            <li>
              本文: {message.length} 文字 (sha256:{message.sha256})
            </li>
          ) : null}
          <li>1社ごとに20秒間隔で送信。途中で止めるにはターミナルでジョブを kill</li>
        </ul>
        {message !== null ? <div className="fsc-modal-preview">{message.preview}…</div> : null}
        <div className="fsc-row">
          <input
            className="fsc-input"
            placeholder={`実行するには「${CONFIRM_WORD}」と入力`}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            autoFocus
          />
          <button className="fsc-btn" onClick={onClose}>
            中止
          </button>
          <button
            className="fsc-btn fsc-btn--danger"
            disabled={typed.trim() !== CONFIRM_WORD}
            onClick={onConfirm}
          >
            送信実行
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- エラートースト ----

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fsc-toast" role="alert">
      {message}
      <button onClick={onClose}>閉じる</button>
    </div>
  );
}
