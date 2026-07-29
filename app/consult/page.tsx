import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { SampleReportModal } from "../test/SampleReportModal";
import ConsultBooking from "./ConsultBooking";

const PAGE_URL = "https://www.workle-kle.com/consult";

// Google カレンダー予約スケジュールの「埋め込み用」URL。ハードコードせず env で参照する。
// 注意: 共有短縮リンク（calendar.app.google/...）は X-Frame-Options で iframe 拒否される。
// 埋め込みには /calendar/appointments/schedules/{ID}?gv=true 形式を使う。
// 設定手順は docs/consult-booking-setup.md を参照。
const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2I_ACo1PeesQavtQkLU8dLfPijknOZMO3uaUp23ZEH3Fyw2K8QMwdBAO9SfGa7c1vjdSKufwqS?gv=true";

export const metadata: Metadata = {
  title: "無料相談のご予約 | Workle — 15分・オンライン（Google Meet）",
  description:
    "Workleの無料相談を15分・オンラインでご予約いただけます。費用・契約は発生しません。ご相談内容が決まっていない段階でも構いません。日程を選ぶだけで予約が完了します。",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "無料相談のご予約 | Workle",
    description:
      "15分・オンラインで、ご状況をうかがいます。費用・契約は発生しません。",
    url: PAGE_URL,
    siteName: "Workle",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "無料相談のご予約 | Workle",
    description: "15分・オンライン。費用・契約なし。日程を選ぶだけ。",
  },
  robots: { index: false, follow: true },
};

export default function ConsultPage() {
  return (
    <>
      <SiteNav cta={{ href: "/consult", label: "無料相談を予約" }} />

      <main id="top">
        <section className="sv sv-hero" id="consult">
          <div className="wrap">
            <p className="sv-en" aria-hidden="true">BOOK IT.</p>
            <span className="sv-eyebrow">無料相談 — 15分・オンライン</span>
            <h1 className="sv-h" style={{ maxWidth: 720 }}>
              無料相談のご予約
            </h1>
            <p className="sv-sub">
              15分・オンラインで、ご状況をうかがいます。費用・契約は発生しません。
              <br className="sp-break" />
              ご相談内容が決まっていない段階でも構いません。
            </p>

            <ConsultBooking bookingUrl={BOOKING_URL} />

            <ul className="consult-points">
              <li className="consult-point">
                <span className="consult-point-ic" aria-hidden="true">◷</span>
                <span>15分 / オンライン（Google Meet）</span>
              </li>
              <li className="consult-point">
                <span className="consult-point-ic" aria-hidden="true">¥</span>
                <span>費用・契約は発生しません</span>
              </li>
              <li className="consult-point">
                <span className="consult-point-ic" aria-hidden="true">↳</span>
                <span>準備は不要です。URLだけお持ちください</span>
              </li>
            </ul>

            <p className="consult-alt">
              相談ではなく、まず資料を見たい方へ —{" "}
              <button
                type="button"
                className="consult-alt-link"
                data-action="open-sample-modal"
              >
                サンプルレポートを見る →
              </button>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <SampleReportModal />
    </>
  );
}
