"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Google Calendar appointment-schedule embed URL. */
  bookingUrl: string;
};

function trackEvent(name: string) {
  if (
    typeof window !== "undefined" &&
    typeof (window as unknown as Record<string, unknown>).gtag === "function"
  ) {
    (window as unknown as Record<string, (...args: unknown[]) => void>).gtag(
      "event",
      name,
      {}
    );
  }
}

/**
 * Google カレンダー予約スケジュールの埋め込み。
 * ページ遷移させず自社ドメイン内で完結させる。読み込み中はスケルトンを表示し、
 * iframe が使えない環境向けに直リンクのフォールバックを添える。
 */
export default function ConsultBooking({ bookingUrl }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    trackEvent("consult_page_view");
  }, []);

  function handleLoad() {
    setIsLoaded(true);
    trackEvent("consult_iframe_loaded");
  }

  return (
    <div className="consult-embed">
      <div className="consult-embed-card">
        {!isLoaded && <div className="consult-skeleton" aria-hidden="true" />}
        <iframe
          src={bookingUrl}
          title="Workle 無料相談の予約カレンダー"
          className="consult-iframe"
          style={{ border: 0 }}
          onLoad={handleLoad}
          loading="eager"
        />
      </div>
      <p className="consult-fallback">
        カレンダーが表示されない場合は
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
          こちら
        </a>
        から予約できます。
      </p>
    </div>
  );
}
