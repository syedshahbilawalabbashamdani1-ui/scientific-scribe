"use client";

import { useState } from "react";
import { PiCheck, PiCopy } from "react-icons/pi";

import { MagneticButton } from "@/components/magnetic-button";

const template = `Dear Editor,

Please consider the enclosed manuscript, "[Manuscript title]", for publication as a [article type] in [Journal name].

The study asks [research question] and reports [one-sentence finding]. We believe it fits the journal's scope because [specific reason linked to the journal's aims and readership].

This work has not been published elsewhere and is not under consideration by another journal. All authors have approved the submission and declare no competing interests. [Add ethics approval, consent, funding, and data-availability statements as required.]

[If the journal permits suggestions:] We suggest the following reviewers: [name, affiliation, email, expertise]. We request that [name] is not invited because [specific, non-defamatory reason]. [Remove this paragraph if not applicable.]

Thank you for considering the manuscript.

Sincerely,
[Corresponding author], on behalf of all authors
[Affiliation] · [Email] · [ORCID]`;

const checklist = [
  "The journal's current author guidelines have been checked",
  "The article type matches the manuscript and the journal's scope",
  "Title, running title, and word count are within the stated limits",
  "The contribution is stated in one sentence without overclaiming",
  "The fit to the journal's aims is specific, not generic",
  "Prior review, preprint, or related submissions are disclosed where required",
  "All authors have approved the submission and author order",
  "Competing interests, funding, ethics, consent, and data availability are included as required",
  "Suggested and excluded reviewers have been checked for conflicts",
  "File format, figures, and supplementary files meet the submission rules",
  "Corresponding author details, affiliation, and ORCID are current",
  "No patient identifiers or undisclosed third-party material are included",
];

export function CoverLetterTool() {
  const [checked, setChecked] = useState<string[]>([]);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(template);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  function toggle(item: string) {
    setChecked((current) =>
      current.includes(item)
        ? current.filter((entry) => entry !== item)
        : [...current, item],
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div>
            <p className="meta">Template</p>
            <p className="mt-0.5 text-[10.5px] text-quiet">
              Replace every bracketed field before use.
            </p>
          </div>
          <MagneticButton asButton onClick={copyTemplate} className="btn btn-outline btn-sm">
            <PiCopy className="h-3 w-3" aria-hidden="true" />
            {copyState === "copied" ? "Copied" : "Copy"}
          </MagneticButton>
        </div>
        <div className="max-h-[520px] overflow-auto bg-tint p-4">
          <pre className="whitespace-pre-wrap font-mono text-[11px] leading-[1.8] text-ink">
            {template}
          </pre>
        </div>
        {copyState === "failed" && (
          <p className="border-t border-line px-4 py-2 text-[10px] text-accent-text">
            Copying was blocked. Select the text and copy it manually.
          </p>
        )}
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="meta">Pre-send checklist</p>
          <p className="font-mono text-[10px] tabular-nums text-quiet">
            {checked.length}/{checklist.length}
          </p>
        </div>
        <ul className="divide-y divide-line">
          {checklist.map((item) => {
            const isChecked = checked.includes(item);
            return (
              <li key={item}>
                <label className="flex cursor-pointer items-start gap-3 px-4 py-2.5 transition-colors hover:bg-tint">
                  <span
                    className={`mt-[1px] grid h-4 w-4 shrink-0 place-items-center border transition-colors ${
                      isChecked
                        ? "border-accent bg-accent text-[#0b0b0b]"
                        : "border-line text-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    <PiCheck className="h-3 w-3" />
                  </span>
                  <span className={`text-[11.5px] leading-snug ${isChecked ? "text-quiet" : ""}`}>
                    {item}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => toggle(item)}
                  />
                </label>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-line px-4 py-3">
          <div className="h-[3px] bg-tint">
            <div
              className="h-full bg-accent transition-[width] duration-300"
              style={{ width: `${(checked.length / checklist.length) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-[10px] text-quiet" aria-live="polite">
            {checked.length === checklist.length
              ? "Checklist complete. Confirm every statement against the current journal guidelines."
              : `${checklist.length - checked.length} items left.`}
          </p>
        </div>
      </div>
    </div>
  );
}
