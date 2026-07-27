// Centralized internal links. Tally has been fully removed — the free-consultation
// CTA now points to the self-hosted /consult page (which embeds NEXT_PUBLIC_BOOKING_URL),
// and the intake form is self-hosted per order access token.

export const BASE_URL = "https://www.workle-kle.com";

/** Free-consultation booking page (self-hosted, embeds the booking URL). */
export const CONSULT_PATH = "/consult";

/** Self-hosted intake form URL for a given order access token. */
export function intakeUrl(accessToken: string): string {
  return `${BASE_URL}/test/intake/${accessToken}`;
}
