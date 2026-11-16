"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { PiArrowUpRight, PiCheck } from "react-icons/pi";

import { pillars } from "@/lib/services";

export function PillarConsole() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pillar = pillars[active];

  function moveTab(nextIndex: number) {
    const clamped = (nextIndex + pillars.length) % pillars.length;
    setActive(clamped);
    tabRefs.current[clamped]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveTab(active + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveTab(active - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      moveTab(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      moveTab(pillars.length - 1);
    }
  }

  return (
    <div className="card relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="ss-blink h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          <span className="meta">Service console</span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-quiet">
          14 services / 4 pillars
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Service pillars"
        className="grid grid-cols-4 border-b border-line"
        onKeyDown={onKeyDown}
      >
        {pillars.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.slug}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`console-tab-${item.slug}`}
              aria-selected={selected}
              aria-controls={`console-panel-${item.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={`relative flex flex-col items-start gap-1 border-r border-line px-2 py-2 text-left transition-colors last:border-r-0 sm:px-3 sm:py-2.5 ${
                selected
                  ? "bg-ink text-page"
                  : "text-quiet hover:bg-tint hover:text-ink"
              }`}
            >
              <span
                className={`font-mono text-[8.5px] tracking-[0.1em] ${
                  selected ? "text-page/70" : "text-accent-text"
                }`}
              >
                {item.number}
              </span>
              <span className="w-full truncate text-[10px] font-medium leading-tight sm:text-[11.5px]">
                {item.shortName}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[330px] px-5 py-5 sm:px-6 sm:py-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pillar.slug}
            role="tabpanel"
            id={`console-panel-${pillar.slug}`}
            aria-labelledby={`console-tab-${pillar.slug}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="meta">Pillar {pillar.number}</p>
              <p className="font-mono text-[9px] text-quiet">
                {pillar.services.length}{" "}
                {pillar.services.length === 1 ? "service" : "services"}
              </p>
            </div>
            <h2 className="mt-3 max-w-[24ch] text-[1.32rem] font-medium leading-[1.12] tracking-[-0.04em]">
              {pillar.name}
            </h2>
            <p className="mt-2 max-w-[42ch] text-[12px] leading-relaxed text-quiet">
              {pillar.tagline}
            </p>

            <ul className="mt-4 divide-y divide-line border-y border-line">
              {pillar.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${pillar.slug}/${service.slug}`}
                    className="group flex items-center justify-between gap-3 py-2.5 text-[12px] transition-colors hover:text-accent-text"
                  >
                    <span className="flex items-center gap-2">
                      <PiCheck
                        className="h-3 w-3 shrink-0 text-accent-text opacity-70"
                        aria-hidden="true"
                      />
                      {service.shortTitle}
                    </span>
                    <PiArrowUpRight
                      className="h-3 w-3 shrink-0 text-quiet transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between gap-3">
              <Link
                href={`/services/${pillar.slug}`}
                className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
              >
                Open pillar
                <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </Link>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-quiet">
                {pillar.shortName === "Data"
                  ? "SPSS · R · Excel · Prism"
                  : pillar.outcome.split(".")[0]}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
