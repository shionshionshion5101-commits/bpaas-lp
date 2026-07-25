import Link from "next/link";

export type NavLink = { href: string; label: string };

type Props = {
  /** In-page anchor / route links shown in the center of the nav. */
  links?: NavLink[];
  /** Primary CTA button on the right. */
  cta?: { href: string; label: string; external?: boolean };
  /** Secondary ghost link left of the CTA. */
  ghost?: { href: string; label: string; external?: boolean };
};

/**
 * Shared cream-theme navigation (design V2).
 * Brand always returns to the hub (/). Links & CTA are configurable per page.
 */
export default function SiteNav({ links = [], cta, ghost }: Props) {
  return (
    <header className="nav nav-cream" id="nav">
      <div className="wrap nav-in">
        <Link className="brand" href="/" aria-label="Workle トップへ">
          <span className="brand-mark">
            <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M5 9.5 L9.5 20 L14 12 L18.5 20 L23 9.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="brand-name">Workle</span>
        </Link>

        {links.length > 0 && (
          <nav className="nav-links">
            {links.map((l) =>
              l.href.startsWith("/") && !l.href.includes("#") ? (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ) : (
                <a key={l.href} href={l.href}>{l.label}</a>
              )
            )}
          </nav>
        )}

        <div className="nav-cta">
          {ghost &&
            (ghost.external ? (
              <a
                href={ghost.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost nav-ghost-btn"
              >
                {ghost.label}
              </a>
            ) : (
              <Link href={ghost.href} className="btn btn-ghost nav-ghost-btn">
                {ghost.label}
              </Link>
            ))}
          {cta &&
            (cta.external ? (
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: "9px 16px", fontSize: 13 }}
              >
                {cta.label}
              </a>
            ) : (
              <Link
                href={cta.href}
                className="btn btn-primary"
                style={{ padding: "9px 16px", fontSize: 13 }}
              >
                {cta.label}
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
}
