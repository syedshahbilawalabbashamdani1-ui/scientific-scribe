"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { PiChartLineUp, PiCheck } from "react-icons/pi";

const seriesA = "M38 196 C92 182 112 150 150 154 S206 112 246 124 S312 82 350 96 S430 54 482 60";
const seriesB = "M38 206 C92 198 120 168 150 176 S216 150 246 158 S318 128 350 140 S432 112 482 104";

const bars = [
  { label: "Baseline", a: 46, b: 42, ai: 6, bi: 5 },
  { label: "Week 2", a: 54, b: 47, ai: 7, bi: 6 },
  { label: "Week 4", a: 63, b: 51, ai: 8, bi: 7 },
  { label: "Week 6", a: 72, b: 55, ai: 9, bi: 8 },
  { label: "Week 8", a: 78, b: 58, ai: 10, bi: 9 },
];

export function AnalysisFigure() {
  const [view, setView] = useState<"trend" | "distribution">("trend");
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const chartId = `analysis-chart-${id}`;

  return (
    <figure className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="meta">Figure 01</span>
          <span className="h-3 w-px bg-line" aria-hidden="true" />
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-quiet">
            Illustrative analysis
          </span>
        </div>
        <div className="flex rounded-full border border-line p-0.5" role="group" aria-label="Figure view">
          {(["trend", "distribution"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setView(item)}
              aria-pressed={view === item}
              className={`rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors ${
                view === item
                  ? "bg-ink text-page"
                  : "text-quiet hover:text-ink"
              }`}
            >
              {item === "trend" ? "Trend" : "Distribution"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-tint p-4 sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium leading-tight">
              {view === "trend"
                ? "Treatment response over time"
                : "Response by study week"}
            </p>
            <p className="mt-0.5 text-[10.5px] text-quiet">
              Adjusted mean score, 95% confidence interval
            </p>
          </div>
          <PiChartLineUp className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.18 }}
              role="img"
              aria-label={
                view === "trend"
                  ? "Line chart showing two treatment groups improving from baseline to week 8. Treatment A rises more than treatment B."
                  : "Bar chart comparing two treatment groups at five study weeks, with confidence intervals."
              }
            >
              <svg
                id={chartId}
                viewBox="0 0 520 248"
                className="w-full"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <pattern
                    id={`hatch-${id}`}
                    width="5"
                    height="5"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="5"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.28"
                    />
                  </pattern>
                </defs>

                {[36, 80, 124, 168, 212].map((y) => (
                  <line
                    key={y}
                    x1="38"
                    x2="482"
                    y1={y}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="0.7"
                    opacity="0.16"
                  />
                ))}
                <line
                  x1="38"
                  x2="38"
                  y1="28"
                  y2="216"
                  stroke="currentColor"
                  strokeWidth="0.9"
                  opacity="0.4"
                />
                <line
                  x1="38"
                  x2="482"
                  y1="216"
                  y2="216"
                  stroke="currentColor"
                  strokeWidth="0.9"
                  opacity="0.4"
                />

                {view === "trend" ? (
                  <>
                    <motion.path
                      d={seriesB}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="5 4"
                      opacity="0.55"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: reduce ? 0 : 1.15, ease: "easeOut" }}
                    />
                    <motion.path
                      d={seriesA}
                      fill="none"
                      stroke="var(--color-primary)"
                      strokeWidth="2.6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: reduce ? 0 : 1.2, ease: "easeOut", delay: reduce ? 0 : 0.08 }}
                    />
                    <circle cx="350" cy="96" r="4.5" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="2.4" />
                    <line x1="350" y1="96" x2="350" y2="216" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="3 4" opacity="0.45" />
                    <text x="362" y="92" fontSize="9" fill="currentColor" opacity="0.62" fontFamily="ui-monospace, monospace">
                      Week 6
                    </text>
                  </>
                ) : (
                  <>
                    {bars.map((bar, index) => {
                      const x = 62 + index * 86;
                      return (
                        <g key={bar.label}>
                          <motion.rect
                            x={x}
                            y={216 - bar.a}
                            width="20"
                            height={bar.a}
                            fill="var(--color-primary)"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{
                              duration: reduce ? 0 : 0.55,
                              delay: reduce ? 0 : index * 0.05,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ transformOrigin: `50% 216px` }}
                          />
                          <motion.rect
                            x={x + 24}
                            y={216 - bar.b}
                            width="20"
                            height={bar.b}
                            fill={`url(#hatch-${id})`}
                            stroke="currentColor"
                            strokeWidth="1"
                            opacity="0.7"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{
                              duration: reduce ? 0 : 0.55,
                              delay: reduce ? 0 : index * 0.05 + 0.04,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ transformOrigin: `50% 216px` }}
                          />
                          <line x1={x + 10} y1={216 - bar.a - bar.ai} x2={x + 10} y2={216 - bar.a + bar.ai} stroke="var(--color-primary)" strokeWidth="1.2" />
                          <line x1={x + 4} y1={216 - bar.a - bar.ai} x2={x + 16} y2={216 - bar.a - bar.ai} stroke="var(--color-primary)" strokeWidth="1.2" />
                          <line x1={x + 4} y1={216 - bar.a + bar.ai} x2={x + 16} y2={216 - bar.a + bar.ai} stroke="var(--color-primary)" strokeWidth="1.2" />
                          <line x1={x + 34} y1={216 - bar.b - bar.bi} x2={x + 34} y2={216 - bar.b + bar.bi} stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
                          <line x1={x + 28} y1={216 - bar.b - bar.bi} x2={x + 40} y2={216 - bar.b - bar.bi} stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
                          <line x1={x + 28} y1={216 - bar.b + bar.bi} x2={x + 40} y2={216 - bar.b + bar.bi} stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
                          <text x={x + 21} y="232" textAnchor="middle" fontSize="8.5" fill="currentColor" opacity="0.6">
                            {bar.label}
                          </text>
                        </g>
                      );
                    })}
                  </>
                )}

                {[0, 25, 50, 75, 100].map((value, index) => (
                  <text
                    key={value}
                    x="28"
                    y={216 - index * 44 + 3}
                    textAnchor="end"
                    fontSize="8.5"
                    fill="currentColor"
                    opacity="0.55"
                  >
                    {value}
                  </text>
                ))}
              </svg>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-3">
          <span className="flex items-center gap-1.5 text-[9.5px] text-quiet">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            Treatment A
          </span>
          <span className="flex items-center gap-1.5 text-[9.5px] text-quiet">
            <span className="h-2 w-2 rounded-full border border-current" aria-hidden="true" />
            Treatment B
          </span>
          <span className="ml-auto font-mono text-[8.5px] uppercase tracking-[0.1em] text-quiet">
            Illustrative data · not client work
          </span>
        </div>
      </div>

      <figcaption className="flex items-start gap-2 border-t border-line px-4 py-3 text-[11px] leading-relaxed text-quiet">
        <PiCheck className="mt-[2px] h-3.5 w-3.5 shrink-0 text-accent-text" aria-hidden="true" />
        A clean figure starts with a documented analysis. Every visual is tied
        back to the table and the method.
      </figcaption>
    </figure>
  );
}
