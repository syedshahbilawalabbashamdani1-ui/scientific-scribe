"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { PiArrowUpRight, PiCheck } from "react-icons/pi";

const originalText =
  "The results was analysed and it was found that the treatment group showed a significant improvement in the primary endpoint (p=0.03), which proves the drug works. A total of 120 patients was enrolled and 12 was lost to follow up.";

const revisedText =
  "We analysed the primary endpoint and found a significant improvement in the treatment group (p = 0.03). These results support further evaluation of the treatment; they do not, on their own, establish clinical efficacy. Of 120 enrolled patients, 12 were lost to follow-up.";

const changes = [
  {
    before: "The results was analysed and it was found that the treatment group showed",
    after: "We analysed the primary endpoint and found",
  },
  {
    before: "which proves the drug works.",
    after:
      "These results support further evaluation of the treatment; they do not, on their own, establish clinical efficacy.",
  },
  {
    before: "A total of 120 patients was enrolled and 12 was lost to follow up.",
    after: "Of 120 enrolled patients, 12 were lost to follow-up.",
  },
];

const chartData = [
  { label: "Baseline", a: 46, b: 42 },
  { label: "Week 2", a: 54, b: 47 },
  { label: "Week 4", a: 63, b: 51 },
  { label: "Week 6", a: 72, b: 55 },
  { label: "Week 8", a: 78, b: 58 },
];

function DraftFigure() {
  const colors = ["#0077b6", "#1f8a70", "#2f6fed", "#d18b00", "#8a3ffc"];
  return (
    <svg
      viewBox="0 0 520 250"
      className="w-full"
      role="img"
      aria-label="Draft chart with rotated labels, heavy gridlines, inconsistent colours, and a cluttered legend."
    >
      <rect width="520" height="250" fill="#f4f4f4" />
      <text x="16" y="20" fontSize="12" fontWeight="700" fill="#222">
        Figure1 final FINAL
      </text>
      {[45, 80, 115, 150, 185].map((y) => (
        <line key={y} x1="42" x2="500" y1={y} y2={y} stroke="#bcbcbc" strokeWidth="1.4" />
      ))}
      <line x1="42" x2="42" y1="38" y2="205" stroke="#333" />
      <line x1="42" x2="500" y1="205" y2="205" stroke="#333" />
      {chartData.map((item, index) => {
        const x = 70 + index * 74;
        return (
          <g key={item.label}>
            <rect x={x + 3} y={205 - item.a + 3} width="18" height={item.a} fill="#999" opacity="0.5" />
            <rect x={x} y={205 - item.a} width="18" height={item.a} fill={colors[index]} />
            <rect x={x + 23} y={205 - item.b + 3} width="18" height={item.b} fill="#999" opacity="0.5" />
            <rect x={x + 20} y={205 - item.b} width="18" height={item.b} fill={colors[(index + 2) % colors.length]} />
            <text
              x={x + 18}
              y="222"
              fontSize="8"
              fill="#333"
              transform={`rotate(32 ${x + 18} 222)`}
            >
              {item.label} (n=24)
            </text>
          </g>
        );
      })}
      <text x="60" y="240" fontSize="7" fill="#555">
        Series 1 · Series 2 · p=0.03 · error bars omitted for clarity · Data: study.xlsx
      </text>
      <rect x="360" y="36" width="128" height="44" fill="#fff" stroke="#ddd" />
      <rect x="368" y="44" width="8" height="8" fill="#0077b6" />
      <text x="382" y="51" fontSize="7" fill="#333">Treatment group A</text>
      <rect x="368" y="60" width="8" height="8" fill="#2f6fed" />
      <text x="382" y="67" fontSize="7" fill="#333">Treatment group B</text>
    </svg>
  );
}

function FinalFigure() {
  return (
    <svg
      viewBox="0 0 520 250"
      className="w-full"
      role="img"
      aria-label="Publication-ready grouped bar chart with only two colours, horizontal labels, a clear axis, and direct group labels."
    >
      <rect width="520" height="250" fill="transparent" />
      {[48, 88, 128, 168, 208].map((y) => (
        <line key={y} x1="48" x2="496" y1={y} y2={y} stroke="currentColor" strokeWidth="0.7" opacity="0.14" />
      ))}
      <line x1="48" x2="48" y1="38" y2="208" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
      <line x1="48" x2="496" y1="208" y2="208" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
      <text x="14" y="124" fontSize="8" fill="currentColor" opacity="0.55" transform="rotate(-90 14 124)" textAnchor="middle">
        Adjusted mean score
      </text>
      {chartData.map((item, index) => {
        const x = 74 + index * 82;
        return (
          <g key={item.label}>
            <rect x={x} y={208 - item.a} width="20" height={item.a} fill="var(--color-primary)" />
            <rect x={x + 24} y={208 - item.b} width="20" height={item.b} fill="currentColor" opacity="0.22" />
            <line x1={x + 10} y1={208 - item.a - 6} x2={x + 10} y2={208 - item.a + 6} stroke="var(--color-primary)" strokeWidth="1.2" />
            <line x1={x + 34} y1={208 - item.b - 5} x2={x + 34} y2={208 - item.b + 5} stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
            <text x={x + 22} y="224" textAnchor="middle" fontSize="8.5" fill="currentColor" opacity="0.62">
              {item.label}
            </text>
          </g>
        );
      })}
      <text x="14" y="28" fontSize="9" fill="currentColor" opacity="0.72" fontWeight="600">
        Response by study week
      </text>
      <g transform="translate(360, 22)">
        <rect x="0" y="0" width="8" height="8" fill="var(--color-primary)" />
        <text x="13" y="7.5" fontSize="8" fill="currentColor" opacity="0.62">Treatment A</text>
        <rect x="76" y="0" width="8" height="8" fill="currentColor" opacity="0.22" />
        <text x="89" y="7.5" fontSize="8" fill="currentColor" opacity="0.62">Treatment B</text>
      </g>
      <text x="496" y="240" textAnchor="end" fontSize="7.5" fill="currentColor" opacity="0.45">
        n = 120 · adjusted mean (95% CI) · illustrative data
      </text>
    </svg>
  );
}

export function BeforeAfter() {
  const [mode, setMode] = useState<"language" | "figure">("language");
  const [languageView, setLanguageView] = useState<"original" | "changes" | "revised">(
    "changes",
  );
  const [figureView, setFigureView] = useState<"draft" | "final">("final");
  const reduce = useReducedMotion();

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="meta">Before / after</span>
          <span className="h-3 w-px bg-line" aria-hidden="true" />
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-quiet">
            Illustrative examples
          </span>
        </div>
        <div className="flex rounded-full border border-line p-0.5" role="group" aria-label="Example type">
          <button
            type="button"
            onClick={() => setMode("language")}
            aria-pressed={mode === "language"}
            className={`rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors ${
              mode === "language" ? "bg-ink text-page" : "text-quiet hover:text-ink"
            }`}
          >
            Language
          </button>
          <button
            type="button"
            onClick={() => setMode("figure")}
            aria-pressed={mode === "figure"}
            className={`rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors ${
              mode === "figure" ? "bg-ink text-page" : "text-quiet hover:text-ink"
            }`}
          >
            Figure
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          {mode === "language" ? (
            <motion.div
              key="language"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-1 rounded-full border border-line p-0.5" role="group" aria-label="Language comparison view">
                  {(
                    [
                      ["original", "Original"],
                      ["changes", "Changes"],
                      ["revised", "Revised"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setLanguageView(id)}
                      aria-pressed={languageView === id}
                      className={`rounded-full px-3 py-1.5 text-[10px] transition-colors ${
                        languageView === id
                          ? "bg-ink text-page"
                          : "text-quiet hover:text-ink"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-quiet">
                  Author approves every change
                </p>
              </div>

              <div className="mt-4 min-h-[210px] border border-line bg-surface p-4 sm:p-5">
                <AnimatePresence mode="wait" initial={false}>
                  {languageView === "original" && (
                    <motion.div
                      key="original"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.16 }}
                    >
                      <p className="meta">Original</p>
                      <p className="mt-3 text-[13.5px] leading-[1.75] text-quiet">
                        {originalText}
                      </p>
                    </motion.div>
                  )}
                  {languageView === "revised" && (
                    <motion.div
                      key="revised"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.16 }}
                    >
                      <p className="meta">Revised</p>
                      <p className="mt-3 text-[13.5px] leading-[1.75]">
                        {revisedText}
                      </p>
                    </motion.div>
                  )}
                  {languageView === "changes" && (
                    <motion.div
                      key="changes"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.16 }}
                    >
                      <div className="flex flex-wrap items-center gap-4">
                        <p className="meta">Tracked changes</p>
                        <span className="flex items-center gap-1.5 text-[9px] text-quiet">
                          <del className="bg-accent-soft px-1 text-accent-text">removed</del>
                        </span>
                        <span className="flex items-center gap-1.5 text-[9px] text-quiet">
                          <ins className="bg-accent-soft px-1 text-accent-text no-underline">
                            added / clarified
                          </ins>
                        </span>
                      </div>
                      <ul className="mt-3 divide-y divide-line">
                        {changes.map((item, index) => (
                          <li key={item.after} className="py-2.5 first:pt-0 last:pb-0">
                            <div className="flex gap-2">
                              <span className="mt-0.5 font-mono text-[8.5px] text-quiet">
                                0{index + 1}
                              </span>
                              <div>
                                <p className="text-[12px] leading-relaxed text-quiet">
                                  <del className="decoration-accent-text/60">
                                    {item.before}
                                  </del>
                                </p>
                                <p className="mt-1 text-[12px] leading-relaxed">
                                  <ins className="bg-accent-soft text-ink no-underline">
                                    {item.after}
                                  </ins>
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="max-w-[52ch] text-[10.5px] leading-relaxed text-quiet">
                  The revised version removes an overclaim and corrects agreement.
                  It does not add evidence the study did not collect.
                </p>
                <Link
                  href="/services/language-integrity/proofreading"
                  className="inline-flex items-center gap-1 text-[10.5px] font-medium hover:text-accent-text"
                >
                  Proofreading scope
                  <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="figure"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-1 rounded-full border border-line p-0.5" role="group" aria-label="Figure comparison view">
                  <button
                    type="button"
                    onClick={() => setFigureView("draft")}
                    aria-pressed={figureView === "draft"}
                    className={`rounded-full px-3 py-1.5 text-[10px] transition-colors ${
                      figureView === "draft"
                        ? "bg-ink text-page"
                        : "text-quiet hover:text-ink"
                    }`}
                  >
                    Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => setFigureView("final")}
                    aria-pressed={figureView === "final"}
                    className={`rounded-full px-3 py-1.5 text-[10px] transition-colors ${
                      figureView === "final"
                        ? "bg-ink text-page"
                        : "text-quiet hover:text-ink"
                    }`}
                  >
                    Publication-ready
                  </button>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-quiet">
                  Same data, different decisions
                </p>
              </div>

              <div className="mt-4 min-h-[280px] border border-line bg-surface p-3 sm:p-4">
                <AnimatePresence mode="wait" initial={false}>
                  {figureView === "draft" ? (
                    <motion.div
                      key="draft"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.16 }}
                    >
                      <DraftFigure />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="final"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.16 }}
                    >
                      <FinalFigure />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="max-w-[52ch] text-[10.5px] leading-relaxed text-quiet">
                  {figureView === "draft"
                    ? "Too many colours, rotated labels, redundant data, and no axis title. The reader has to work to find the result."
                    : "Two series, direct comparison, readable labels, and one accent for the primary group. The figure matches the table."}
                </p>
                <Link
                  href="/services/data-analysis/data-analysis"
                  className="inline-flex items-center gap-1 text-[10.5px] font-medium hover:text-accent-text"
                >
                  Data analysis scope
                  <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-start gap-2 border-t border-line px-4 py-3 text-[10.5px] leading-relaxed text-quiet sm:px-5">
        <PiCheck className="mt-[2px] h-3.5 w-3.5 shrink-0 text-accent-text" aria-hidden="true" />
        These are illustrative teaching examples, not client work. Every edit and
        figure is reviewed and approved by the author.
      </div>
    </div>
  );
}
