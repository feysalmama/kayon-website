import type { ReactNode } from "react";

export function Eyebrow({
  children,
  light = false,
  small = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  small?: boolean;
  className?: string;
}) {
  const classes = [
    "eyebrow",
    small && "mini-eyebrow",
    light && "eyebrow-light",
    className,
  ].filter(Boolean).join(" ");

  return (
    <p className={classes}>
      {children}
      <svg
        className="eyebrow-underline"
        width="72"
        height="10"
        viewBox="0 0 72 10"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M2 6C20 2 44 2 70 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </p>
  );
}
