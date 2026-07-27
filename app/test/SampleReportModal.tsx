"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const CONSULT_URL = "/consult";
const PDF_PATH = "/samples/workle-usertest-report-sample.pdf";
// sample-cover.png — place public/samples/sample-cover.png (PNG export of PDF page 1)
// To generate from PDF: `convert -density 200 public/samples/workle-usertest-report-sample.pdf[0] public/samples/sample-cover.png`
const COVER_IMAGE = "/samples/sample-cover.png";

type ModalStep = "closed" | "form" | "success";

function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof (window as unknown as Record<string, unknown>).gtag === "function") {
    (window as unknown as Record<string, (...args: unknown[]) => void>).gtag("event", name, params ?? {});
  }
}

export function SampleReportModal() {
  const [step, setStep] = useState<ModalStep>("closed");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for data-action clicks anywhere on the page (works from Server Component elements)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const trigger = target.closest("[data-action]") as HTMLElement | null;
      if (!trigger) return;
      switch (trigger.dataset.action) {
        case "open-sample-modal":
          setStep("form");
          trackEvent("sample_modal_open");
          break;
        case "track-checkout":
          trackEvent("checkout_click", { plan: trigger.dataset.plan ?? "" });
          break;
        case "track-consult":
          trackEvent("consult_click", { location: trigger.dataset.location ?? "" });
          break;
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (step === "closed") return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [step]);

  useEffect(() => {
    document.body.style.overflow = step !== "closed" ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [step]);

  function handleClose() {
    setStep("closed");
    setEmail("");
    setAgreed(false);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      setError("案内メールの受信に同意してください。");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "sample_download" }),
      });
      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error ?? "送信に失敗しました");
      }
      trackEvent("sample_lead_submit");
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  }

  if (step === "closed") return null;

  return (
    <div
      className="sample-modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-modal-title"
    >
      <div className="sample-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="sample-modal-close" onClick={handleClose} aria-label="閉じる">×</button>

        <div className="sample-modal-inner">
          {/* Left: cover preview */}
          <div className="sample-modal-cover" aria-hidden="true">
            <div className="sample-modal-cover-wrap">
              <Image
                src={COVER_IMAGE}
                alt="サンプルレポート表紙"
                width={280}
                height={396}
                className="sample-modal-cover-img"
                priority
              />
            </div>
          </div>

          {/* Right: form or success */}
          <div className="sample-modal-content">
            {step === "form" && (
              <>
                <p className="sample-modal-en" aria-hidden="true">SAMPLE</p>
                <h2 className="sample-modal-title" id="sample-modal-title">
                  サンプルレポートをお送りします
                </h2>
                <p className="sample-modal-body">
                  実際の納品物と同じ形式のサンプル（A4・5ページ）です。架空のアプリを題材にしています。
                </p>
                <form onSubmit={handleSubmit} className="sample-modal-form">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="sample-modal-input"
                    autoComplete="email"
                  />
                  <label className="sample-modal-check">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span>Workleからの案内メールの受信に同意する</span>
                  </label>
                  {error && <p className="sample-modal-error" role="alert">{error}</p>}
                  <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                    {isLoading ? "送信中..." : "サンプルを表示する"}
                  </button>
                  <p className="sample-modal-footnote">登録は1項目のみ。営業電話は一切ありません。</p>
                </form>
              </>
            )}

            {step === "success" && (
              <>
                <p className="sample-modal-en" aria-hidden="true">READY</p>
                <h2 className="sample-modal-title" id="sample-modal-title">
                  サンプルをご覧いただけます
                </h2>
                <a
                  href={PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-block"
                  onClick={() => trackEvent("sample_pdf_open")}
                >
                  サンプルを開く <span className="arr">→</span>
                </a>
                <p className="sample-modal-sent">同じものをメールでもお送りしました</p>
                <div className="sample-modal-next">
                  <p className="sample-modal-next-label">次のステップ</p>
                  <a
                    href="#pricing"
                    className="btn btn-primary btn-block"
                    onClick={handleClose}
                  >
                    この形式で依頼する
                  </a>
                  <a
                    href={CONSULT_URL}
                    className="btn btn-ghost-cream btn-block"
                    onClick={() => trackEvent("consult_click", { location: "sample_modal_consult" })}
                  >
                    まず相談する（15分・オンライン）
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
