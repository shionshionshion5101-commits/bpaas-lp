import type { ReactNode } from "react";

export type IconName =
  | "eye" | "search" | "clipboard" | "refresh" | "compare" | "doc"
  | "flag" | "sliders" | "speaker" | "target" | "yen" | "question"
  | "phone" | "shield" | "info" | "spark" | "star" | "users" | "check";

const PATHS: Record<IconName, ReactNode> = {
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4h6v3H9z" />
      <path d="M8 12h8M8 16h6" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 12a9 9 0 1 1-2.6-6.4" />
      <path d="M21 4v5h-5" />
    </>
  ),
  compare: (
    <>
      <rect x="4" y="5" width="6" height="14" rx="1" />
      <rect x="14" y="9" width="6" height="10" rx="1" />
    </>
  ),
  doc: (
    <>
      <path d="M7 2h7l4 4v16H7z" />
      <path d="M14 2v4h4" />
      <path d="M10 12h5M10 16h5" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 3 2 3H5" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 8h9M17 8h3" />
      <circle cx="15" cy="8" r="2" />
      <path d="M4 16h3M11 16h9" />
      <circle cx="9" cy="16" r="2" />
    </>
  ),
  speaker: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M16 9a4 4 0 0 1 0 6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  yen: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8l3 4 3-4M12 12v5M9.5 13h5M9.5 15.5h5" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.2a2.4 2.4 0 1 1 3.3 2.2c-.8.4-1.4 1-1.4 2" />
      <circle cx="11.5" cy="16.5" r=".7" fill="currentColor" stroke="none" />
    </>
  ),
  phone: (
    <path d="M5 4h3l2 5-2 1a12 12 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.8" r=".7" fill="currentColor" stroke="none" />
    </>
  ),
  spark: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
  ),
  star: (
    <path d="M12 3.5l2.5 5.3 5.5.7-4 3.9 1 5.6L12 16.3 6.9 19l1-5.6-4-3.9 5.5-.7Z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 6M20.5 20a5.5 5.5 0 0 0-3.5-5.1" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
};

type Props = {
  name: IconName;
  className?: string;
};

/** Inline stroke icon. Sizes to the current font-size (1em) and inherits color. */
export default function Icon({ name, className }: Props) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
