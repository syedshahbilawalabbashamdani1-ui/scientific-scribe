"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Light opacity fade on route change.
 *
 * Opacity only — no transform — so sticky positioning and fixed elements
 * inside page content keep working. The pathname key restarts the fade on
 * every navigation, and reduced-motion users get an instant swap.
 */
export function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduce ? 0 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
