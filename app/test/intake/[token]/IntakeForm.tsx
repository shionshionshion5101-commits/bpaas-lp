"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  PLATFORM_OPTIONS,
  PERIOD_OPTIONS,
  PURCHASE_OPTIONS,
  PURCHASE_OTHER,
} from "./constants";

type Props = {
  token: string;
  planName: string;
  amountStr: string;
  email: string | null;
  requireCaseStudy: boolean;
};

type FormState = {
  service_name: string;
  service_url: string;
  platform: string;
  one_liner: string;
  target_user: string;
  login_required: "" | "no" | "yes";
  test_account: string;
  purchase_choice: string;
  purchase_other: string;
  main_question: string;
  tasks: string;
  tasks_delegate: boolean;
  competitors: string;
  known_issues: string;
  persona_conditions: string;
  ng_items: string;
  case_study_ok: boolean;
  preferred_period: string;
  contact_x: string;
};

const DEFAULTS: FormState = {
  service_name: "",
  service_url: "",
  platform: "",
  one_liner: "",
  target_user: "",
  login_required: "",
  test_account: "",
  purchase_choice: "",
  purchase_other: "",
  main_question: "",
  tasks: "",
  tasks_delegate: false,
  competitors: "",
  known_issues: "",
  persona_conditions: "",
  ng_items: "",
  case_study_ok: false,
  preferred_period: "",
  contact_x: "",
};

export default function IntakeForm({
  token,
  planName,
  amountStr,
  email,
  requireCaseStudy,
}: Props) {
  const storageKey = `workle-intake-${token}`;
  const [values, setValues] = useState<FormState>(DEFAULTS);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const loadedRef = useRef(false);

  // Restore draft from localStorage after mount (never during SSR).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setValues((v) => ({ ...v, ...JSON.parse(raw) }));
    } catch {
      /* ignore malformed draft */
    }
    loadedRef.current = true;
  }, [storageKey]);

  // Persist draft on every change (files are intentionally excluded).
  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(values));
    } catch {
      /* storage full / disabled — non-fatal */
    }
  }, [values, storageKey]);

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function validate(): string | null {
    if (!values.service_name.trim()) return "サービス名をご記入ください。";
    if (!values.service_url.trim()) return "アクセス先URLをご記入ください。";
    if (!values.platform) return "プラットフォームをお選びください。";
    if (!values.one_liner.trim()) return "「一言でいうと」をご記入ください。";
    if (!values.login_required) return "ログインの要否をお選びください。";
    if (!values.purchase_choice) return "課金・決済の扱いをお選びください。";
    if (values.purchase_choice === PURCHASE_OTHER && !values.purchase_other.trim())
      return "課金・決済の扱い（その他）の内容をご記入ください。";
    if (!values.main_question.trim())
      return "今回、一番知りたいことをご記入ください。";
    if (!values.preferred_period) return "希望する実施時期をお選びください。";
    if (requireCaseStudy && !values.case_study_ok)
      return "個人開発者価格の適用には、事例公開へのご同意が必要です。";
    return null;
  }

  async function uploadFiles(): Promise<string[]> {
    if (files.length === 0) return [];
    const fd = new FormData();
    fd.append("token", token);
    for (const f of files) fd.append("files", f);
    const res = await fetch("/api/intake/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error ?? "ファイルのアップロードに失敗しました。");
    return data.paths ?? [];
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    try {
      const fileUrls = await uploadFiles();
      const purchaseHandling =
        values.purchase_choice === PURCHASE_OTHER
          ? values.purchase_other.trim()
          : values.purchase_choice;

      const payload = {
        token,
        service_name: values.service_name.trim(),
        service_url: values.service_url.trim(),
        platform: values.platform,
        one_liner: values.one_liner.trim(),
        target_user: values.target_user.trim(),
        login_required: values.login_required === "yes",
        test_account:
          values.login_required === "yes" ? values.test_account.trim() : "",
        purchase_handling: purchaseHandling,
        main_question: values.main_question.trim(),
        tasks: values.tasks_delegate ? "" : values.tasks.trim(),
        tasks_delegate: values.tasks_delegate,
        competitors: values.competitors.trim(),
        known_issues: values.known_issues.trim(),
        persona_conditions: values.persona_conditions.trim(),
        ng_items: values.ng_items.trim(),
        case_study_ok: values.case_study_ok,
        preferred_period: values.preferred_period,
        contact_x: values.contact_x.trim(),
        file_urls: fileUrls,
      };

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "送信に失敗しました。");

      try {
        localStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "送信に失敗しました。");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return <IntakeSuccess token={token} />;
  }

  return (
    <>
      {/* HERO */}
      <section className="intake-hero">
        <div className="wrap">
          <p className="sv-en" aria-hidden="true">INTAKE.</p>
          <h1 className="sv-h">検証したい内容をお送りください</h1>
          <p className="intake-lead">
            5分ほどで完了します。わからない項目は空欄でも構いません。設計はWorkleが引き取ります。
          </p>
          <div className="intake-order-meta">
            <span className="intake-meta-item">{planName}</span>
            {amountStr && <span className="intake-meta-item">{amountStr}</span>}
            {email && <span className="intake-meta-item">{email}</span>}
          </div>
        </div>
      </section>

      <section className="sv tight">
        <div className="wrap intake-wrap">
          {error && (
            <div className="intake-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* SECTION 1 */}
            <Section n={1} title="サービスについて">
              <Field label="サービス名" required htmlFor="service_name">
                <input
                  id="service_name"
                  className="intake-input"
                  type="text"
                  value={values.service_name}
                  onChange={(e) => set("service_name", e.target.value)}
                  required
                />
              </Field>

              <Field
                label="アクセス先URL"
                required
                htmlFor="service_url"
                note="Web / App Store / Google Play / TestFlight / APK配布 いずれでも構いません"
              >
                <input
                  id="service_url"
                  className="intake-input"
                  type="text"
                  inputMode="url"
                  value={values.service_url}
                  onChange={(e) => set("service_url", e.target.value)}
                  required
                />
              </Field>

              <Field label="プラットフォーム" required>
                <RadioGroup
                  name="platform"
                  options={PLATFORM_OPTIONS}
                  value={values.platform}
                  onChange={(v) => set("platform", v)}
                />
              </Field>

              <Field
                label="一言でいうと、どんなサービスですか"
                required
                htmlFor="one_liner"
                note="※この文章は被験者には見せません。『3秒テスト』で、被験者が同じ理解にたどり着けるかを測ります"
              >
                <input
                  id="one_liner"
                  className="intake-input"
                  type="text"
                  maxLength={80}
                  value={values.one_liner}
                  onChange={(e) => set("one_liner", e.target.value)}
                  required
                />
              </Field>

              <Field label="想定しているユーザー像" htmlFor="target_user">
                <textarea
                  id="target_user"
                  className="intake-input intake-textarea"
                  rows={2}
                  placeholder="例：一人暮らしを始めたばかりで、家計管理をしたいが続かない20〜30代"
                  value={values.target_user}
                  onChange={(e) => set("target_user", e.target.value)}
                />
              </Field>
            </Section>

            {/* SECTION 2 */}
            <Section n={2} title="テスト環境">
              <Field label="ログインは必要ですか" required>
                <RadioGroup
                  name="login_required"
                  options={[
                    { value: "no", label: "不要" },
                    { value: "yes", label: "必要" },
                  ]}
                  value={values.login_required}
                  onChange={(v) => set("login_required", v as FormState["login_required"])}
                />
              </Field>

              {values.login_required === "yes" && (
                <Field
                  label="テスト用アカウント"
                  htmlFor="test_account"
                  note="10人分のアカウントが必要か、共有アカウントで問題ないかもご記載ください"
                >
                  <textarea
                    id="test_account"
                    className="intake-input intake-textarea"
                    rows={3}
                    value={values.test_account}
                    onChange={(e) => set("test_account", e.target.value)}
                  />
                </Field>
              )}

              <Field label="課金・決済の扱い" required>
                <RadioGroup
                  name="purchase_choice"
                  options={PURCHASE_OPTIONS.map((o) => ({ value: o, label: o }))}
                  value={values.purchase_choice}
                  onChange={(v) => set("purchase_choice", v)}
                />
                {values.purchase_choice === PURCHASE_OTHER && (
                  <input
                    className="intake-input"
                    style={{ marginTop: 10 }}
                    type="text"
                    placeholder="内容をご記入ください"
                    value={values.purchase_other}
                    onChange={(e) => set("purchase_other", e.target.value)}
                  />
                )}
              </Field>

              <Field
                label="参考資料"
                htmlFor="files"
                note="デザインカンプ、既存の分析データ、ペルソナ資料などがあれば。なくても問題ありません（1ファイル10MBまで・最大10件）"
              >
                <FileInput files={files} onChange={setFiles} />
              </Field>
            </Section>

            {/* SECTION 3 */}
            <Section n={3} title="検証したいこと">
              <Field
                label="今回、一番知りたいことは何ですか"
                required
                htmlFor="main_question"
                note="1つに絞ってご記入ください。ここを軸にテストを設計します"
              >
                <textarea
                  id="main_question"
                  className="intake-input intake-textarea"
                  rows={3}
                  placeholder="例：リリースしたがDL後の継続率が低い。どこで離脱しているのかを知りたい"
                  value={values.main_question}
                  onChange={(e) => set("main_question", e.target.value)}
                  required
                />
              </Field>

              <Field label="被験者に試してもらいたい操作（最大5つ）" htmlFor="tasks">
                <textarea
                  id="tasks"
                  className="intake-input intake-textarea"
                  rows={4}
                  placeholder={"例：\n1. 新規登録する\n2. 最初の記録を1件作成する\n3. 先月の支出を確認する"}
                  value={values.tasks}
                  onChange={(e) => set("tasks", e.target.value)}
                  disabled={values.tasks_delegate}
                />
                <label className="intake-check">
                  <input
                    type="checkbox"
                    checked={values.tasks_delegate}
                    onChange={(e) => set("tasks_delegate", e.target.checked)}
                  />
                  <span>わからないので、Workleに設計してもらう</span>
                </label>
              </Field>

              <Field
                label="競合・類似サービス"
                htmlFor="competitors"
                note="被験者が『他に何を使っているか』を聞く際の参考にします。※比較テストをご希望の場合は、ここに比較対象を3つまでご記入ください"
              >
                <input
                  id="competitors"
                  className="intake-input"
                  type="text"
                  value={values.competitors}
                  onChange={(e) => set("competitors", e.target.value)}
                />
              </Field>

              <Field label="すでにわかっている課題や数値" htmlFor="known_issues">
                <textarea
                  id="known_issues"
                  className="intake-input intake-textarea"
                  rows={2}
                  placeholder="例：GA4では登録画面で60%が離脱。原因は不明"
                  value={values.known_issues}
                  onChange={(e) => set("known_issues", e.target.value)}
                />
              </Field>
            </Section>

            {/* SECTION 4 */}
            <Section n={4} title="被験者について">
              <Field
                label="希望する被験者の条件（2つまで）"
                htmlFor="persona_conditions"
                note="例：20〜30代 / 家計簿アプリ未使用者。※応募状況により調整をお願いする場合があります。指定がなければ幅広い属性で募集します"
              >
                <input
                  id="persona_conditions"
                  className="intake-input"
                  type="text"
                  value={values.persona_conditions}
                  onChange={(e) => set("persona_conditions", e.target.value)}
                />
              </Field>

              <Field label="触れてほしくない機能・NG事項" htmlFor="ng_items">
                <textarea
                  id="ng_items"
                  className="intake-input intake-textarea"
                  rows={2}
                  placeholder="例：管理画面には入らないでほしい / 実際の投稿は行わないでほしい"
                  value={values.ng_items}
                  onChange={(e) => set("ng_items", e.target.value)}
                />
              </Field>
            </Section>

            {/* SECTION 5 */}
            <Section n={5} title="その他">
              <Field label="希望する実施時期" required>
                <RadioGroup
                  name="preferred_period"
                  options={PERIOD_OPTIONS}
                  value={values.preferred_period}
                  onChange={(v) => set("preferred_period", v)}
                />
              </Field>

              {requireCaseStudy && (
                <Field label="事例公開について" required>
                  <label className="intake-check">
                    <input
                      type="checkbox"
                      checked={values.case_study_ok}
                      onChange={(e) => set("case_study_ok", e.target.checked)}
                    />
                    <span>
                      サービス名と結果数値の公開に同意します（個人開発者価格の適用条件です）
                    </span>
                  </label>
                </Field>
              )}

              <Field
                label="X（旧Twitter）アカウント"
                htmlFor="contact_x"
                note="進行のご連絡をDMで行う場合があります"
              >
                <input
                  id="contact_x"
                  className="intake-input"
                  type="text"
                  placeholder="@your_account"
                  value={values.contact_x}
                  onChange={(e) => set("contact_x", e.target.value)}
                />
              </Field>
            </Section>

            <div className="intake-submit">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? "送信中…" : "この内容で送信する"}{" "}
                {!submitting && <span className="arr">→</span>}
              </button>
              <p className="intake-submit-note">
                送信後、Workleが設計シート（スプレッドシート）を作成し、メールでお送りします。48時間以内にご確認がなければ、その内容で確定として進行します。
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="intake-section">
      <legend className="intake-section-legend">
        <span className="intake-section-n">0{n}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  required,
  note,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  note?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="intake-field">
      <label className="intake-label" htmlFor={htmlFor}>
        {label}
        {required && <span className="intake-req">必須</span>}
      </label>
      {note && <p className="intake-fieldnote">{note}</p>}
      {children}
    </div>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="intake-radios">
      {options.map((o) => (
        <label
          key={o.value}
          className={`intake-radio ${value === o.value ? "selected" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
          />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  );
}

function FileInput({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  function handleAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;
    // Merge, dedupe by name+size, cap at 10.
    const merged = [...files];
    for (const f of picked) {
      if (!merged.some((m) => m.name === f.name && m.size === f.size)) {
        merged.push(f);
      }
    }
    onChange(merged.slice(0, 10));
    e.target.value = "";
  }

  function remove(idx: number) {
    onChange(files.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <label className="intake-file-btn">
        <input type="file" multiple onChange={handleAdd} hidden />
        ファイルを選択
      </label>
      {files.length > 0 && (
        <ul className="intake-file-list">
          {files.map((f, i) => (
            <li key={`${f.name}-${f.size}`} className="intake-file-item">
              <span className="intake-file-name">{f.name}</span>
              <button
                type="button"
                className="intake-file-remove"
                onClick={() => remove(i)}
                aria-label={`${f.name} を削除`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function IntakeSuccess({ token }: { token: string }) {
  return (
    <>
      <section className="intake-hero">
        <div className="wrap">
          <p className="sv-en" aria-hidden="true">THANK<br />YOU.</p>
          <h1 className="sv-h">ありがとうございます。設計に入ります。</h1>
        </div>
      </section>
      <section className="sv tight">
        <div className="wrap intake-wrap">
          <ol className="intake-success-steps">
            <li>Workleが設計シートを作成します（2営業日以内）。</li>
            <li>メールでお送りしますので、コメントでご確認ください。</li>
            <li>確定後、被験者を募集し実施します（申込から10営業日目安）。</li>
          </ol>
          <Link href={`/test/status/${token}`} className="btn btn-primary">
            進捗ページに戻る <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
