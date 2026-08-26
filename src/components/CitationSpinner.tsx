"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STEPS = ["[1]", "[12]", "[47]"];

export function CitationSpinner() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length);
    }, 400);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <span aria-hidden="true" className="mr-2 inline-block font-mono">
      {reduced ? STEPS[STEPS.length - 1] : STEPS[step]}
    </span>
  );
}
