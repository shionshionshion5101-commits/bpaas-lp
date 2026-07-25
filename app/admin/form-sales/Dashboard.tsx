'use client';

// フォーム営業パイプラインのローカル管理画面。
// ①リサーチ → ②リッチ化 → ③audit+dry-run → ④送信 をボタン実行し、
// 結果CSV・ログ・dry-runスクショを確認して送信対象を選択する。

import { useCallback, useEffect, useRef, useState } from 'react';
import { apiGet, apiPost } from './api';
import type { CsvData, CsvName, StatusData, StepId } from './types';
import { INDUSTRY_OPTIONS, SIZE_OPTIONS } from './types';
import { CsvExplorer, DryrunGallery, FilterGroup, LiveModal, LogTerminal, Toast } from './parts';

const POLL_RUNNING_MS = 2000;
const POLL_IDLE_MS = 8000;

export default function Dashboard() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [dryrun, setDryrun] = useState<CsvData | null>(null);
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [csvVersion, setCsvVersion] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [industry, setIndustry] = useState('SaaS・クラウド');
  const [pdf, setPdf] = useState('');
  const [enrichLimit, setEnrichLimit] = useState('');
  const [personalizeLimit, setPersonalizeLimit] = useState('');
  const [dryrunLimit, setDryrunLimit] = useState('');
  const [industryFilter, setIndustryFilter] = useState<ReadonlySet<string>>(
    new Set(INDUSTRY_OPTIONS)
  );
  const [sizeFilter, setSizeFilter] = useState<ReadonlySet<string>>(new Set(SIZE_OPTIONS));
  const prevRunning = useRef(false);

  const running = status?.job?.running ?? false;

  const refreshStatus = useCallback(async () => {
    try {
      setStatus(await apiGet<StatusData>('/api/form-sales/status'));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '状態取得に失敗しました');
    }
  }, []);

  const refreshDryrun = useCallback(async () => {
    try {
      setDryrun(await apiGet<CsvData>('/api/form-sales/csv?name=dryrun_results'));
    } catch {
      setDryrun(null);
    }
  }, []);

  useEffect(() => {
    refreshStatus();
    refreshDryrun();
  }, [refreshStatus, refreshDryrun]);

  useEffect(() => {
    const id = setInterval(refreshStatus, running ? POLL_RUNNING_MS : POLL_IDLE_MS);
    return () => clearInterval(id);
  }, [running, refreshStatus]);

  // ジョブ完了を検知したらテーブル・ギャラリーを再読込
  useEffect(() => {
    if (prevRunning.current && !running) {
      refreshDryrun();
      setCsvVersion((v) => v + 1);
    }
    prevRunning.current = running;
  }, [running, refreshDryrun]);

  const runStep = useCallback(
    async (step: StepId, params: Record<string, unknown> = {}) => {
      setError('');
      try {
        await apiPost('/api/form-sales/run', { step, params });
        await refreshStatus();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'ジョブ起動に失敗しました');
      }
    },
    [refreshStatus]
  );

  const confirmSelection = useCallback(async () => {
    setError('');
    try {
      await apiPost('/api/form-sales/selection', { contactUrls: [...selected] });
      await refreshStatus();
      setCsvVersion((v) => v + 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '送信対象の確定に失敗しました');
    }
  }, [selected, refreshStatus]);

  const toggleSelected = useCallback((url: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  }, []);

  const selectAllOk = useCallback(() => {
    const okUrls = (dryrun?.rows ?? [])
      .filter((r) => r.status === 'ok')
      .map((r) => r.contact_url);
    setSelected(new Set(okUrls));
  }, [dryrun]);

  const rowsOf = (name: CsvName): number | null => status?.files[name]?.rows ?? null;
  const dryrunOkCount = (dryrun?.rows ?? []).filter((r) => r.status === 'ok').length;
  const sendSelectedCount = rowsOf('send_selected');
  const blockers = status?.blockers ?? [];
  const liveReady = !running && blockers.length === 0 && (sendSelectedCount ?? 0) > 0;

  return (
    <div className="fsc">
      <header className="fsc-header">
        <h1 className="fsc-title">
          FORM SALES <em>CONSOLE</em>
        </h1>
        <span className="fsc-badge">Local Only</span>
        <div className="fsc-chips">
          <span className={`fsc-chip ${running ? 'fsc-chip--warn' : ''}`}>
            <span className={`fsc-led ${running ? 'fsc-led--run' : ''}`} />{' '}
            {running ? `実行中: ${status?.job?.step}` : '待機中'}
          </span>
          {status?.message && (
            <span
              className={`fsc-chip ${
                status.message.isTooShort || status.message.placeholders.length > 0
                  ? 'fsc-chip--warn'
                  : 'fsc-chip--ok'
              }`}
            >
              本文 {status.message.length}字
              {status.message.placeholders.length > 0 && ' / 未記入あり'}
            </span>
          )}
          <span className={`fsc-chip ${blockers.length === 0 ? 'fsc-chip--ok' : 'fsc-chip--danger'}`}>
            {blockers.length === 0 ? 'LIVE送信 可' : `送信ブロック ${blockers.length}件`}
          </span>
        </div>
      </header>

      <div className="fsc-grid">
        <section className="fsc-card" data-step="01 RESEARCH">
          <h3>リサーチ</h3>
          <p className="fsc-desc">
            複数ソース確認済み = <b>source_count↑ 高信頼</b>。業界バッチは5キーワード×3サイト×10p ≒ 最大<b>1500社</b>
          </p>
          <div className="fsc-row">
            <select
              className="fsc-input"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option>SaaS・クラウド</option>
              <option>HR・採用</option>
              <option>マーケティング・広告</option>
              <option>フィンテック・決済</option>
              <option>EC・D2C</option>
            </select>
            <button
              className="fsc-btn fsc-btn--primary"
              disabled={running}
              onClick={() => runStep('research_industry', { industry })}
              title="選択業界のキーワードで3PRサイトを一括クロール"
            >
              業界バッチ実行
            </button>
          </div>
          <div className="fsc-row">
            <input
              className="fsc-input"
              placeholder="個別キーワード（任意）"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              className="fsc-btn"
              disabled={running || !keyword.trim()}
              onClick={() => runStep('research_prtimes', { keyword: keyword.trim(), maxPages: 3 })}
            >
              PR TIMES
            </button>
            <button
              className="fsc-btn"
              disabled={running || !keyword.trim()}
              onClick={() => runStep('research_atpress', { keyword: keyword.trim(), maxPages: 3 })}
            >
              @Press
            </button>
            <button
              className="fsc-btn"
              disabled={running || !keyword.trim()}
              onClick={() => runStep('research_valupress', { keyword: keyword.trim(), maxPages: 3 })}
            >
              ValuePress
            </button>
          </div>
          <div className="fsc-row">
            <input
              className="fsc-input"
              placeholder="経産省PDF URL（任意）"
              value={pdf}
              onChange={(e) => setPdf(e.target.value)}
            />
            <button
              className="fsc-btn"
              disabled={running || !pdf.trim()}
              onClick={() => runStep('research_meti', { pdf: pdf.trim() })}
            >
              経産省PDF
            </button>
            <button className="fsc-btn" disabled={running} onClick={() => runStep('research_partners')}>
              パートナー
            </button>
          </div>
          <div className="fsc-row">
            <button
              className="fsc-btn fsc-btn--primary"
              disabled={running}
              onClick={() => runStep('merge')}
            >
              全ソース統合 →companies
            </button>
          </div>
          <div className="fsc-counts">
            <Count label="companies.csv" value={rowsOf('companies')} />
          </div>
        </section>

        <section className="fsc-card" data-step="02 ENRICH">
          <h3>リッチ化</h3>
          <p className="fsc-desc">問い合わせフォーム発見 + 別会社/重複の隔離</p>
          <div className="fsc-row">
            <input
              className="fsc-input fsc-input--num"
              placeholder="件数"
              value={enrichLimit}
              onChange={(e) => setEnrichLimit(e.target.value.replace(/\D/g, ''))}
            />
            <button
              className="fsc-btn fsc-btn--primary"
              disabled={running || rowsOf('companies') === null}
              onClick={() => runStep('enrich', { limit: Number(enrichLimit || 0) })}
            >
              実行（空欄=全件）
            </button>
          </div>
          <div className="fsc-counts">
            <Count label="enriched.csv" value={rowsOf('enriched')} />
            <Count label="quarantine.csv（隔離）" value={rowsOf('quarantine')} />
          </div>
        </section>

        <section className="fsc-card" data-step="03 PERSONALIZE">
          <h3>パーソナライズ+分類</h3>
          <p className="fsc-desc">
            各社サイトをClaude Haikuで解析し、導入文の自動生成と業種・規模の判定を行う
          </p>
          {status !== null && !status.personalizeReady && (
            <p className="fsc-desc" style={{ color: 'var(--fsc-warn)' }}>
              ⚠ APIキー未設定 — form-sales/.env に ANTHROPIC_API_KEY=… を記入
              （.env.example をコピー）
            </p>
          )}
          <div className="fsc-row">
            <input
              className="fsc-input fsc-input--num"
              placeholder="件数"
              value={personalizeLimit}
              onChange={(e) => setPersonalizeLimit(e.target.value.replace(/\D/g, ''))}
            />
            <button
              className="fsc-btn fsc-btn--primary"
              disabled={running || rowsOf('enriched') === null || status?.personalizeReady !== true}
              title={
                status?.personalizeReady === false
                  ? 'form-sales/.env に ANTHROPIC_API_KEY を設定してください'
                  : undefined
              }
              onClick={() => runStep('personalize', { limit: Number(personalizeLimit || 0) })}
            >
              実行（空欄=全件）
            </button>
          </div>
          <div className="fsc-counts">
            <Count label="enriched.csv" value={rowsOf('enriched')} />
          </div>
        </section>

        <section className="fsc-card" data-step="04 DRY-RUN">
          <h3>audit + 試運転</h3>
          <p className="fsc-desc">safe判定 → 自動入力して送信ボタン手前で停止</p>
          <details className="fsc-filter-details">
            <summary>
              業種・規模で絞り込み
              {(industryFilter.size < INDUSTRY_OPTIONS.length ||
                sizeFilter.size < SIZE_OPTIONS.length) && (
                <span className="fsc-chip fsc-chip--warn">フィルタ有効</span>
              )}
            </summary>
            <p className="fsc-desc">
              ③パーソナライズ実行時にAIが各社を分類。未実行の会社は「未分類」「不明」に入る
            </p>
            <FilterGroup
              label="業種"
              options={INDUSTRY_OPTIONS}
              selected={industryFilter}
              onChange={setIndustryFilter}
            />
            <FilterGroup
              label="規模（従業員数）"
              options={SIZE_OPTIONS}
              selected={sizeFilter}
              onChange={setSizeFilter}
            />
          </details>
          <div className="fsc-row">
            <button
              className="fsc-btn"
              disabled={
                running ||
                rowsOf('enriched') === null ||
                industryFilter.size === 0 ||
                sizeFilter.size === 0
              }
              title={
                industryFilter.size === 0 || sizeFilter.size === 0
                  ? '業種・規模を1つ以上選択してください'
                  : undefined
              }
              onClick={() =>
                runStep('audit', {
                  ...(industryFilter.size < INDUSTRY_OPTIONS.length
                    ? { industries: [...industryFilter] }
                    : {}),
                  ...(sizeFilter.size < SIZE_OPTIONS.length ? { sizes: [...sizeFilter] } : {}),
                })
              }
            >
              audit →safe
            </button>
          </div>
          <div className="fsc-row">
            <input
              className="fsc-input fsc-input--num"
              placeholder="件数"
              value={dryrunLimit}
              onChange={(e) => setDryrunLimit(e.target.value.replace(/\D/g, ''))}
            />
            <button
              className="fsc-btn fsc-btn--primary"
              disabled={running || rowsOf('safe') === null}
              onClick={() => runStep('dry_run', { limit: Number(dryrunLimit || 0) })}
            >
              dry-run
            </button>
          </div>
          <div className="fsc-counts">
            <Count label="safe.csv" value={rowsOf('safe')} />
            <Count label="rejected.csv" value={rowsOf('rejected')} />
            <Count label="dry-run OK" value={dryrun?.exists ? dryrunOkCount : null} />
          </div>
        </section>

        <section className="fsc-card" data-step="05 LIVE SEND">
          <h3>送信実行</h3>
          <p className="fsc-desc">選択済みの会社にだけ本番送信（20秒間隔）</p>
          {blockers.length > 0 && (
            <p className="fsc-desc" style={{ color: 'var(--fsc-danger)' }}>
              {blockers.map((b) => `⛔ ${b}`).join(' / ')}
            </p>
          )}
          <div className="fsc-row">
            <button
              className="fsc-btn fsc-btn--danger"
              disabled={!liveReady}
              onClick={() => setModalOpen(true)}
            >
              LIVE送信…
            </button>
          </div>
          <div className="fsc-counts">
            <Count label="送信対象（確定済み）" value={sendSelectedCount} />
            <Count label="submit_results.csv" value={rowsOf('submit_results')} />
          </div>
        </section>
      </div>

      <section className="fsc-section">
        <h2>Job Log</h2>
        <LogTerminal job={status?.job ?? null} />
      </section>

      <section className="fsc-section">
        <h2>Dry-run Review — スクショを目視確認して送信対象を選ぶ</h2>
        <div className="fsc-gallery-actions">
          <button className="fsc-btn" onClick={selectAllOk} disabled={dryrunOkCount === 0}>
            OK全選択（{dryrunOkCount}）
          </button>
          <button
            className="fsc-btn fsc-btn--primary"
            disabled={selected.size === 0 || running}
            onClick={confirmSelection}
          >
            選択 {selected.size} 社を送信対象に確定
          </button>
          {sendSelectedCount !== null && (
            <span className="fsc-chip fsc-chip--ok">確定済み {sendSelectedCount} 社</span>
          )}
        </div>
        <DryrunGallery dryrun={dryrun} selected={selected} onToggle={toggleSelected} />
      </section>

      <section className="fsc-section">
        <h2>Data</h2>
        <CsvExplorer files={status?.files ?? null} version={csvVersion} />
      </section>

      <LiveModal
        open={modalOpen}
        targetCount={sendSelectedCount ?? 0}
        message={status?.message ?? null}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          runStep('submit_live');
        }}
      />
      {error && <Toast message={error} onClose={() => setError('')} />}
    </div>
  );
}

function Count({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="fsc-count">
      <span>{label}</span>
      <b className={value === null || value === 0 ? 'fsc-zero' : ''}>{value ?? '—'}</b>
    </div>
  );
}
