"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <div className="h-11 w-11" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-11 w-11 items-center justify-center rounded-none border border-border bg-transparent hover:bg-muted transition-colors"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <svg
        key={theme}
        className="nib-dip h-5 w-5 text-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isDark ? (
          <>
            <path className="nib-stroke" style={{ animationDelay: "80ms" }} pathLength={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
            <path className="nib-stroke" style={{ animationDelay: "180ms" }} pathLength={1} d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </>
        ) : (
          <>
            <path className="nib-stroke" style={{ animationDelay: "80ms" }} pathLength={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </>
        )}
      </svg>
    </button>
  );
}
