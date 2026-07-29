import Link from "next/link";
import NavHamburger from "./NavHamburger";

export type NavLink = { href: string; label: string };
export type ServiceKey = "research" | "sales" | "sns";

/** Global cross-service links — shown on every page's top tier. */
export const SERVICES: { href: string; label: string; key: ServiceKey }[] = [
  { href: "/test", label: "リサーチ", key: "research" },
  { href: "/sales", label: "営業代行", key: "sales" },
  { href: "/sns", label: "SNS運用", key: "sns" },
];

type Props = {
  /** Highlights the current service in the global tier. */
  active?: ServiceKey;
  /** In-page anchors shown in the sticky bottom tier. */
  links?: NavLink[];
  /** Primary CTA button. */
  cta?: { href: string; label: string; external?: boolean };
};

/**
 * Two-tier shared navigation (design V2).
 * Top tier: global service links (always present, enables cross-service travel).
 * Bottom tier: page anchors (sticky). Mobile collapses the top tier into a
 * hamburger and turns the anchor bar into a horizontal scroller.
 */
export default function SiteNav({ active, links = [], cta }: Props) {
  const hasAnchors = links.length > 0;

  return (
    <>
      <header className="nav nav-cream" id="nav">
        {/* Top tier — global */}
        <div className="nav-global">
          <div className="wrap nav-in">
            <Link className="brand" href="/" aria-label="Workle トップへ">
              <span className="brand-mark">
                <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="brand-name">Workle</span>
            </Link>

            <nav className="nav-services" aria-label="サービス">
              {SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={`nav-service${active === s.key ? " is-active" : ""}`}
                  aria-current={active === s.key ? "page" : undefined}
                >
                  {s.label}
                </Link>
              ))}
            </nav>

            <div className="nav-cta">
              {cta &&
                (cta.external ? (
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary nav-cta-btn"
                  >
                    {cta.label}
                  </a>
                ) : (
                  <Link href={cta.href} className="btn btn-primary nav-cta-btn">
                    {cta.label}
                  </Link>
                ))}
              <NavHamburger links={links} ctaHref={cta?.href} ctaLabel={cta?.label} />
            </div>
          </div>
        </div>

        {/* Bottom tier — page anchors (sticky) */}
        {hasAnchors && (
          <div className="nav-anchor">
            <div className="wrap nav-anchor-in">
              <nav className="nav-anchor-links" aria-label="このページの目次">
                {links.map((l) =>
                  l.href.startsWith("/") && !l.href.includes("#") ? (
                    <Link key={l.href} href={l.href}>{l.label}</Link>
                  ) : (
                    <a key={l.href} href={l.href}>{l.label}</a>
                  )
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Mobile-only fixed bottom CTA */}
      {cta &&
        (cta.external ? (
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-mobile-cta"
          >
            {cta.label}
          </a>
        ) : (
          <Link href={cta.href} className="nav-mobile-cta">
            {cta.label}
          </Link>
        ))}
    </>
  );
}
