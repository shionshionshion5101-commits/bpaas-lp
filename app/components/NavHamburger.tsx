"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import type { NavLink } from "./SiteNav";

type Props = {
  links: NavLink[];
  ctaHref: string;
  ctaLabel: string;
};

export default function NavHamburger({ links, ctaHref, ctaLabel }: Props) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Close on route change / escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        className={`nav-hamburger${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        aria-controls="nav-mobile-menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div
        id="nav-mobile-menu"
        className={`nav-mobile-menu${open ? " open" : ""}`}
        role="dialog"
        aria-label="ナビゲーションメニュー"
        aria-modal={open}
      >
        {links.map((l) =>
          l.href.startsWith("/") && !l.href.includes("#") ? (
            <Link key={l.href} href={l.href} className="nav-menu-link" onClick={close}>
              {l.label}
            </Link>
          ) : (
            <a key={l.href} href={l.href} className="nav-menu-link" onClick={close}>
              {l.label}
            </a>
          )
        )}
        <Link
          href={ctaHref}
          className="btn btn-primary"
          onClick={close}
          style={{ marginTop: 8, padding: "14px 32px", fontSize: 15 }}
        >
          {ctaLabel}
        </Link>
      </div>
    </>
  );
}
