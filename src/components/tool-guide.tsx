"use client";

import { useState } from "react";
import { PiCheck, PiMinus, PiX } from "react-icons/pi";

type Fit = "good" | "partial" | "poor";

const tools = [
  {
    id: "excel",
    name: "Excel",
    tagline: "Familiar, transparent, shared.",
    body: "Good for cleaning, descriptives, and simple comparisons. Limited for modelling, reproducibility, and complex figures.",
  },
  {
    id: "spss",
    name: "SPSS",
    tagline: "Point-and-click breadth.",
    body: "A broad method menu for standard group comparisons, regression, and survey work. Output and syntax can be reused with care.",
  },
  {
    id: "r",
    name: "R",
    tagline: "Scriptable and reproducible.",
    body: "Strong for complex models, repeatable pipelines, and publication figures. Steeper learning curve, but the analysis record is explicit.",
  },
  {
    id: "prism",
    name: "GraphPad Prism",
    tagline: "Curves and clean figures.",
    body: "Fast for dose-response and curve fitting, with polished scientific figures. Less suited to large data management or general modelling.",
  },
] as const;

const tasks: Array<{
  id: string;
  label: string;
  fits: Record<(typeof tools)[number]["id"], Fit>;
}> = [
  {
    id: "clean",
    label: "Clean and describe",
    fits: { excel: "good", spss: "partial", r: "good", prism: "poor" },
  },
  {
    id: "compare",
    label: "Compare groups",
    fits: { excel: "partial", spss: "good", r: "good", prism: "poor" },
  },
  {
    id: "model",
    label: "Model or adjust",
    fits: { excel: "poor", spss: "good", r: "good", prism: "poor" },
  },
  {
    id: "curves",
    label: "Curve fitting",
    fits: { excel: "poor", spss: "partial", r: "good", prism: "good" },
  },
  {
    id: "reproduce",
    label: "Reproduce the analysis",
    fits: { excel: "poor", spss: "partial", r: "good", prism: "partial" },
  },
  {
    id: "figures",
    label: "Publication figures",
    fits: { excel: "partial", spss: "partial", r: "good", prism: "good" },
  },
];

const fitLabel: Record<Fit, string> = {
  good: "Strong fit",
  partial: "Workable",
  poor: "Not first choice",
};

function FitIcon({ fit }: { fit: Fit }) {
  if (fit === "good") {
    return <PiCheck className="h-3.5 w-3.5 text-accent-text" aria-hidden="true" />;
  }
  if (fit === "partial") {
    return <PiMinus className="h-3.5 w-3.5 text-quiet" aria-hidden="true" />;
  }
  return <PiX className="h-3.5 w-3.5 text-quiet opacity-60" aria-hidden="true" />;
}

export function ToolGuide() {
  const [taskId, setTaskId] = useState("compare");
  const task = tasks.find((item) => item.id === taskId) ?? tasks[0];

  return (
    <div>
      <div className="border border-line">
        <div className="border-b border-line px-4 py-3">
          <p className="field-label mb-0">Start with the task</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tasks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTaskId(item.id)}
                aria-pressed={taskId === item.id}
                className={`rounded-full border px-3 py-1.5 text-[10.5px] transition-colors ${
                  taskId === item.id
                    ? "border-ink bg-ink text-page"
                    : "border-line text-quiet hover:border-ink hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2">
          {tools.map((tool) => {
            const fit = task.fits[tool.id];
            return (
              <div
                key={tool.id}
                className={`border-b border-line p-4 transition-colors sm:odd:border-r ${
                  fit === "good" ? "bg-tint" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[15px] font-medium">{tool.name}</h3>
                  <span
                    className={`inline-flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-[0.1em] ${
                      fit === "good" ? "text-accent-text" : "text-quiet"
                    }`}
                  >
                    <FitIcon fit={fit} />
                    {fit === "good" ? "Suggested" : fitLabel[fit]}
                  </span>
                </div>
                <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.1em] text-quiet">
                  {tool.tagline}
                </p>
                <p className="mt-2 text-[11.5px] leading-relaxed text-quiet">
                  {tool.body}
                </p>
              </div>
            );
          })}
        </div>
        <p className="px-4 py-2.5 text-[10px] leading-relaxed text-quiet">
          Fit depends on the design, the method, and the team that will
          reproduce the work. These ratings are a starting point, not a rule.
        </p>
      </div>

      <div className="mt-6 overflow-x-auto border border-line">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <caption className="sr-only">
            Comparison of Excel, SPSS, R, and GraphPad Prism by analysis task.
          </caption>
          <thead>
            <tr className="border-b border-line bg-tint">
              <th scope="col" className="px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.1em] text-quiet">
                Task
              </th>
              {tools.map((tool) => (
                <th
                  key={tool.id}
                  scope="col"
                  className="px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.1em] text-quiet"
                >
                  {tool.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((item) => (
              <tr key={item.id} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-3 py-2.5 text-[11.5px] font-normal">
                  {item.label}
                </th>
                {tools.map((tool) => {
                  const fit = item.fits[tool.id];
                  return (
                    <td key={tool.id} className="px-3 py-2.5">
                      <span className="flex items-center gap-1.5 text-[10.5px] text-quiet">
                        <FitIcon fit={fit} />
                        {fitLabel[fit]}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
