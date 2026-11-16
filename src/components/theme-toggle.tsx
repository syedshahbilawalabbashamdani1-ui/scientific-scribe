"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { PiMoon, PiSun } from "react-icons/pi";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // False during SSR/hydration, true once React has mounted on the client.
  // This avoids both a hydration mismatch and a setState-in-effect.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const reduce = useReducedMotion();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-tint"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Switch theme"
      }
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Switch theme"}
    >
      <span className="relative block h-4 w-4" aria-hidden="true">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={isDark ? "moon" : "sun"}
            className="absolute inset-0 grid place-items-center"
            initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 35, scale: 0.7 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {isDark ? <PiSun className="h-4 w-4" /> : <PiMoon className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
