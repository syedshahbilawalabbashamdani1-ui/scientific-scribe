"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { MagneticButton } from "@/components/magnetic-button";
import {
  PiArrowLeft,
  PiArrowRight,
  PiArrowUpRight,
  PiCheck,
} from "react-icons/pi";

import {
  getRecommendation,
  researchNeeds,
  researchStages,
  type NeedId,
  type StageId,
} from "@/lib/services";

type ServiceMatcherProps = {
  compact?: boolean;
  className?: string;
};

export function ServiceMatcher({ compact = false, className }: ServiceMatcherProps) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<StageId | null>(null);
  const [need, setNeed] = useState<NeedId | null>(null);
  const [resultVisible, setResultVisible] = useState(false);
  const resultRef = useRef<HTMLHeadingElement>(null);

  const recommendation =
    stage && (need || compact) ? getRecommendation(stage, need ?? "unsure") : null;
  const step = resultVisible ? 3 : stage ? 2 : 1;

  useEffect(() => {
    if (resultVisible) resultRef.current?.focus();
  }, [resultVisible]);

  function chooseStage(value: StageId) {
    setStage(value);
    setNeed(null);
    setResultVisible(compact);
  }

  function chooseNeed(value: NeedId) {
    setNeed(value);
    setResultVisible(true);
  }

  function reset() {
    setStage(null);
    setNeed(null);
    setResultVisible(false);
  }

  return (
    <div className={`card overflow-hidden ${className ?? ""}`}>
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-6">
        <p className="meta">Service matcher</p>
        <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-quiet">
          {resultVisible ? "Result" : `0${step} / 0${compact ? 1 : 2}`}
        </p>
      </div>
      <div className="h-[3px] bg-tint">
        <motion.div
          className="h-full bg-accent"
          initial={false}
          animate={{ width: resultVisible ? "100%" : stage ? "60%" : "28%" }}
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="p-5 sm:p-7">
        <AnimatePresence mode="wait" initial={false}>
          {!stage && (
            <motion.div
              key="stage"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0 : 0.22 }}
            >
              <h3 className="text-[1.35rem] font-medium leading-[1.12] tracking-[-0.04em] sm:text-[1.6rem]">
                Where are you in your research?
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-quiet">
                Choose the stage that is asking for attention right now.
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {researchStages.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => chooseStage(item.id)}
                    className="group flex min-h-[62px] items-center gap-3 border border-line bg-transparent px-3.5 py-3 text-left transition-colors hover:border-ink hover:bg-tint"
                  >
                    <span className="font-mono text-[9px] text-accent-text">
                      0{index + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[13px] font-medium leading-tight">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[10.5px] text-quiet">
                        {item.hint}
                      </span>
                    </span>
                    <PiArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-quiet transition-transform group-hover:translate-x-0.5 group-hover:text-accent-text"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {stage && !need && !compact && (
            <motion.div
              key="need"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0 : 0.22 }}
            >
              <button
                type="button"
                onClick={reset}
                className="mb-4 inline-flex items-center gap-1.5 text-[11px] text-quiet transition-colors hover:text-ink"
              >
                <PiArrowLeft className="h-3 w-3" aria-hidden="true" />
                Change stage
              </button>
              <h3 className="text-[1.35rem] font-medium leading-[1.12] tracking-[-0.04em] sm:text-[1.6rem]">
                What would help most next?
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-quiet">
                Pick the closest need. A scope conversation can refine it later.
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {researchNeeds.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => chooseNeed(item.id)}
                    className="group flex min-h-[62px] items-center gap-3 border border-line bg-transparent px-3.5 py-3 text-left transition-colors hover:border-ink hover:bg-tint"
                  >
                    <span className="font-mono text-[9px] text-accent-text">
                      0{index + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[13px] font-medium leading-tight">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[10.5px] text-quiet">
                        {item.hint}
                      </span>
                    </span>
                    <PiArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-quiet transition-transform group-hover:translate-x-0.5 group-hover:text-accent-text"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {resultVisible && recommendation && (
            <motion.div
              key="result"
              aria-live="polite"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="meta-strong">
                  {recommendation.unsure ? "Start with scope" : "A place to start"}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="text-[11px] text-quiet transition-colors hover:text-ink"
                >
                  Start again
                </button>
              </div>

              <h3
                ref={resultRef}
                tabIndex={-1}
                className="mt-3 max-w-[26ch] text-[1.5rem] font-medium leading-[1.06] tracking-[-0.045em] outline-none sm:text-[1.9rem]"
              >
                {recommendation.primary.title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-quiet">
                {recommendation.primary.summary}
              </p>

              <div className="mt-4 border-y border-line py-3">
                <p className="meta">What you receive</p>
                <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                  {recommendation.primary.deliverables.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[11.5px] leading-snug text-quiet"
                    >
                      <PiCheck
                        className="mt-[2px] h-3 w-3 shrink-0 text-accent-text"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-3 text-[11px] leading-relaxed text-quiet">
                {recommendation.note}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <MagneticButton
                  href={`/services/${recommendation.primary.pillar}/${recommendation.primary.slug}`}
                  className="btn btn-primary btn-sm"
                >
                  Explore this service
                  <PiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
                >
                  Request a scope check
                  <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
                {recommendation.secondary && (
                  <Link
                    href={`/services/${recommendation.secondary.pillar}/${recommendation.secondary.slug}`}
                    className="text-[11.5px] text-quiet hover:text-ink"
                  >
                    Also consider {recommendation.secondary.shortTitle}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
