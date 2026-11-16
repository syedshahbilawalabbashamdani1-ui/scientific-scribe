"use client";

import { useMemo, useState } from "react";
import {
  PiArrowDown,
  PiCheckCircle,
  PiCopy,
  PiInfo,
  PiWarningCircle,
} from "react-icons/pi";

import { MagneticButton } from "@/components/magnetic-button";

const initial = {
  identified: 1240,
  removed: 186,
  screeningExcluded: 902,
  notRetrieved: 14,
  eligibilityExcluded: 96,
};

type Counts = typeof initial;

export function PrismaBuilder() {
  const [counts, setCounts] = useState<Counts>(initial);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const flow = useMemo(() => {
    const rawScreened = counts.identified - counts.removed;
    const rawSought = rawScreened - counts.screeningExcluded;
    const rawAssessed = rawSought - counts.notRetrieved;
    const rawIncluded = rawAssessed - counts.eligibilityExcluded;
    const issues = [
      counts.removed > counts.identified
        ? "Records removed exceed records identified."
        : null,
      counts.screeningExcluded > rawScreened
        ? "Screening exclusions exceed the records screened."
        : null,
      counts.notRetrieved > rawSought
        ? "Reports not retrieved exceed reports sought."
        : null,
      counts.eligibilityExcluded > rawAssessed
        ? "Eligibility exclusions exceed reports assessed."
        : null,
      counts.identified <= 0 ? "Records identified must be greater than zero." : null,
    ].filter(Boolean) as string[];

    // The preview never shows a negative count; the issues panel explains any
    // arithmetic that does not reconcile.
    return {
      screened: Math.max(0, rawScreened),
      sought: Math.max(0, rawSought),
      assessed: Math.max(0, rawAssessed),
      included: Math.max(0, rawIncluded),
      issues,
    };
  }, [counts]);

  function update(key: keyof Counts, value: string) {
    const parsed = Math.max(0, Math.floor(Number(value) || 0));
    setCounts((current) => ({ ...current, [key]: parsed }));
    setCopyState("idle");
  }

  const summary = [
    "PRISMA flow counts (planning draft)",
    `Records identified: ${counts.identified}`,
    `Records removed before screening: ${counts.removed}`,
    `Records screened: ${flow.screened}`,
    `Records excluded at screening: ${counts.screeningExcluded}`,
    `Reports sought for retrieval: ${flow.sought}`,
    `Reports not retrieved: ${counts.notRetrieved}`,
    `Reports assessed for eligibility: ${flow.assessed}`,
    `Reports excluded at eligibility: ${counts.eligibilityExcluded}`,
    `Studies included: ${flow.included}`,
    flow.issues.length
      ? `Check before use: ${flow.issues.join(" ")}`
      : "Counts reconcile.",
  ].join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  const fields: Array<{
    key: keyof Counts;
    label: string;
    hint: string;
  }> = [
    {
      key: "identified",
      label: "Records identified",
      hint: "All databases and registers",
    },
    {
      key: "removed",
      label: "Removed before screening",
      hint: "Duplicates, automation, other",
    },
    {
      key: "screeningExcluded",
      label: "Excluded at screening",
      hint: "Title and abstract stage",
    },
    {
      key: "notRetrieved",
      label: "Reports not retrieved",
      hint: "Could not obtain full text",
    },
    {
      key: "eligibilityExcluded",
      label: "Excluded at eligibility",
      hint: "Full-text stage, with reasons",
    },
  ];

  return (
    <div className="overflow-hidden border border-line">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <p className="meta">PRISMA flow builder</p>
          <span className="h-3 w-px bg-line" aria-hidden="true" />
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-quiet">
            Planning aid
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setCounts(initial);
              setCopyState("idle");
            }}
            className="text-[10.5px] text-quiet underline decoration-line underline-offset-4 hover:text-ink"
          >
            Reset example
          </button>
          <MagneticButton asButton onClick={copy} className="btn btn-outline btn-sm">
            <PiCopy className="h-3 w-3" aria-hidden="true" />
            {copyState === "copied" ? "Copied" : "Copy counts"}
          </MagneticButton>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.05fr]">
        <div className="bg-surface p-4 sm:p-6">
          <p className="field-label">Your counts</p>
          <div className="mt-2 space-y-3">
            {fields.map((field) => (
              <div key={field.key}>
                <label htmlFor={`prisma-${field.key}`} className="flex items-baseline justify-between gap-2">
                  <span className="text-[12px] font-medium">{field.label}</span>
                  <span className="text-right text-[9px] text-quiet">{field.hint}</span>
                </label>
                <input
                  id={`prisma-${field.key}`}
                  type="number"
                  min={0}
                  inputMode="numeric"
                  className="field mt-1.5 font-mono text-[13px] tabular-nums"
                  value={counts[field.key]}
                  onChange={(event) => update(field.key, event.target.value)}
                />
              </div>
            ))}
          </div>

          <div
            className={`mt-4 border p-3 ${
              flow.issues.length
                ? "border-accent-text/40 bg-accent-soft"
                : "border-line bg-tint"
            }`}
          >
            <p className="flex items-center gap-1.5 text-[10.5px] font-medium">
              {flow.issues.length ? (
                <PiWarningCircle className="h-3.5 w-3.5 text-accent-text" aria-hidden="true" />
              ) : (
                <PiCheckCircle className="h-3.5 w-3.5 text-accent-text" aria-hidden="true" />
              )}
              {flow.issues.length ? "Counts need attention" : "Counts reconcile"}
            </p>
            {flow.issues.length > 0 ? (
              <ul className="mt-2 space-y-1 text-[10.5px] leading-relaxed text-quiet">
                {flow.issues.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1.5 text-[10.5px] leading-relaxed text-quiet">
                The flow balances. Record the exclusion reasons alongside the
                final figure.
              </p>
            )}
          </div>

          <p className="mt-4 flex items-start gap-1.5 text-[10px] leading-relaxed text-quiet">
            <PiInfo className="mt-[1px] h-3 w-3 shrink-0" aria-hidden="true" />
            This checks the arithmetic only. Follow the current PRISMA statement
            and your review protocol for the final diagram.
          </p>
          {copyState === "failed" && (
            <p className="mt-2 text-[10px] text-accent-text">
              Copying was blocked by the browser.
            </p>
          )}
        </div>

        <div className="border-t border-line bg-tint p-4 sm:p-6 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between">
            <p className="field-label mb-0">Flow preview</p>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-quiet">
              Illustrative draft
            </span>
          </div>

          <div className="mt-4" aria-live="polite">
            <p className="sr-only">
              {flow.issues.length
                ? "Counts need attention. "
                : "Counts reconcile. "}
              {flow.screened} records screened, {flow.sought} reports sought,{" "}
              {flow.assessed} assessed for eligibility, and {flow.included}{" "}
              studies included.
            </p>

            <div className="border border-line bg-surface p-3">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet">
                Identification
              </p>
              <div className="mt-2 flex items-baseline justify-between gap-2">
                <p className="text-[12px]">Records identified</p>
                <p className="font-mono text-[18px] tabular-nums">
                  {counts.identified.toLocaleString()}
                </p>
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-line pt-2">
                <p className="text-[10.5px] text-quiet">Removed before screening</p>
                <p className="font-mono text-[12px] tabular-nums text-accent-text">
                  −{counts.removed.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex justify-center py-1.5 text-quiet">
              <PiArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </div>

            <div className="border border-line bg-surface p-3">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet">
                Screening
              </p>
              <div className="mt-2 flex items-baseline justify-between gap-2">
                <p className="text-[12px]">Records screened</p>
                <p className="font-mono text-[18px] tabular-nums">
                  {flow.screened.toLocaleString()}
                </p>
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-line pt-2">
                <p className="text-[10.5px] text-quiet">Excluded at screening</p>
                <p className="font-mono text-[12px] tabular-nums text-accent-text">
                  −{counts.screeningExcluded.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex justify-center py-1.5 text-quiet">
              <PiArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </div>

            <div className="border border-line bg-surface p-3">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet">
                Retrieval
              </p>
              <div className="mt-2 flex items-baseline justify-between gap-2">
                <p className="text-[12px]">Reports sought</p>
                <p className="font-mono text-[18px] tabular-nums">
                  {flow.sought.toLocaleString()}
                </p>
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-line pt-2">
                <p className="text-[10.5px] text-quiet">Not retrieved</p>
                <p className="font-mono text-[12px] tabular-nums text-accent-text">
                  −{counts.notRetrieved.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex justify-center py-1.5 text-quiet">
              <PiArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </div>

            <div className="border border-line bg-surface p-3">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet">
                Eligibility
              </p>
              <div className="mt-2 flex items-baseline justify-between gap-2">
                <p className="text-[12px]">Reports assessed</p>
                <p className="font-mono text-[18px] tabular-nums">
                  {flow.assessed.toLocaleString()}
                </p>
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-line pt-2">
                <p className="text-[10.5px] text-quiet">Excluded at eligibility</p>
                <p className="font-mono text-[12px] tabular-nums text-accent-text">
                  −{counts.eligibilityExcluded.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex justify-center py-1.5 text-quiet">
              <PiArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </div>

            <div className="border border-ink bg-ink p-3 text-page">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-page/60">
                  Included
                </p>
                <p className="font-mono text-[24px] tabular-nums text-accent">
                  {flow.included.toLocaleString()}
                </p>
              </div>
              <p className="mt-1 text-[10.5px] text-page/70">
                Studies included in the synthesis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
