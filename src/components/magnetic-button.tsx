"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

/**
 * Ported 1:1 from ALPHA (`src/components/Magnet.tsx`).
 *
 * The wrapper tracks the cursor and offsets the child with a spring, so the
 * button drifts toward the pointer and settles back on leave. Strength,
 * damping and stiffness are identical to ALPHA, and like ALPHA the pull runs
 * regardless of the OS reduced-motion setting — only the rendered element is
 * adapted:
 *
 * - internal `href` → `next/link`
 * - external / `mailto:` / anchor `href` → plain `<a>`
 * - `button` → `<button>` with an optional submit type
 */
const SPRING = { damping: 25, stiffness: 150 };
const ALPHA_STRENGTH = 0.5;

export interface MagneticButtonProps
  extends Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "type"> {
  children: ReactNode;
  /** 0–1 pull strength. ALPHA's Magnet uses 0.5 and that is the default here. */
  strength?: number;
  /** Classes for the motion wrapper, e.g. width and margins. */
  wrapperClassName?: string;
  /** Classes applied to the rendered link/button. */
  className?: string;
  /** Render as a `<button>`. */
  asButton?: boolean;
  /** Submit/reset when `asButton` is set; defaults to `button`. */
  buttonType?: "button" | "submit" | "reset";
  href?: string;
}

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function MagneticButton({
  children,
  strength = ALPHA_STRENGTH,
  wrapperClassName,
  className,
  asButton = false,
  buttonType = "button",
  href,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, SPRING);
  const y = useSpring(mouseY, SPRING);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - left - width / 2) * strength);
    mouseY.set((event.clientY - top - height / 2) * strength);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const content = asButton ? (
    <button
      type={buttonType}
      className={className}
      {...(rest as ComponentPropsWithoutRef<"button">)}
    >
      {children}
    </button>
  ) : href && !isInternalHref(href) ? (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={href ?? "/"} className={className} {...rest}>
      {children}
    </Link>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={wrapperClassName ?? "inline-flex"}
    >
      {content}
    </motion.div>
  );
}
