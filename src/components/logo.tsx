import type { SVGProps } from "react";

interface LogoProps {
  /** Wrapper classes. Set the font size here — the mark scales with `em`. */
  className?: string;
  /** Extra classes for the SVG mark. */
  markClassName?: string;
}

/**
 * Scientific-Scribe identity: an interlocked-pair "SS" monogram with the
 * ocean-teal accent dot, set beside the Neue Montreal wordmark.
 *
 * The monogram is two matching geometric S strokes with a single accent dot
 * in the counter, echoing the full stop used across the editorial layout.
 * Strokes use `currentColor`, so it inverts correctly with the theme.
 */
export function LogoMark({
  className,
  ...props
}: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      viewBox="0 0 74 40"
      width={74}
      height={40}
      fill="none"
      stroke="currentColor"
      strokeWidth={6.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`h-[1.15em] w-auto shrink-0 origin-center transition-transform duration-300 group-hover:scale-105 ${className ?? ""}`}
      {...props}
    >
      <path d="M26 8 H15 a5.5 5.5 0 0 0 0 11 h11 a5.5 5.5 0 0 1 0 11 H11" />
      <path d="M60 8 H49 a5.5 5.5 0 0 0 0 11 h11 a5.5 5.5 0 0 1 0 11 H45" />
      <circle cx="36" cy="19" r="2.7" fill="currentColor" stroke="none" className="fill-accent" />
    </svg>
  );
}

export function Logo({ className, markClassName }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-[0.45em] whitespace-nowrap ${className ?? ""}`}
    >
      <LogoMark className={markClassName} />
      <span>Scientific Scribe</span>
    </span>
  );
}
