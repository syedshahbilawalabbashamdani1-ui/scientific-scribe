"use client";

import { useMemo, useState } from "react";
import { PiArrowUpRight, PiCheckCircle } from "react-icons/pi";

import { MagneticButton } from "@/components/magnetic-button";

import { formatPriceRange, pillars, services } from "@/lib/services";
import { mailto } from "@/lib/site";

const deadlineOptions = [
  { id: "standard", label: "Standard", multiplier: 1, hint: "Agreed timeline" },
  { id: "priority", label: "Priority", multiplier: 1.25, hint: "Earlier slot" },
  { id: "express", label: "Express", multiplier: 1.5, hint: "Availability permitting" },
] as const;

const addOnOptions = [
  { id: "cover-letter", label: "Cover letter", low: 150, high: 300 },
  { id: "figures", label: "Publication figures", low: 180, high: 420 },
  { id: "response", label: "Reviewer response", low: 220, high: 520 },
] as const;

type DeadlineId = (typeof deadlineOptions)[number]["id"];

export function Estimator({ compact = false }: { compact?: boolean }) {
  const [serviceSlug, setServiceSlug] = useState("research-article");
  const [words, setWords] = useState(5000);
  const [rows, setRows] = useState(5000);
  const [deadline, setDeadline] = useState<DeadlineId>("standard");
  const [addOns, setAddOns] = useState<string[]>([]);

  const service = services.find((item) => item.slug === serviceSlug) ?? services[0];
  const deadlineOption =
    deadlineOptions.find((item) => item.id === deadline) ?? deadlineOptions[0];

  const estimate = useMemo(() => {
    let low = 0;
    let high = 0;

    if (service.pricing.unit === "word") {
      low = Math.max(service.pricing.minimum, words * service.pricing.perWordLow);
      high = Math.max(service.pricing.minimum, words * service.pricing.perWordHigh);
    } else if (service.pricing.unit === "dataset") {
      const thousands = rows / 1000;
      low = Math.max(
        service.pricing.minimum,
        service.pricing.baseLow +
          thousands * service.pricing.perThousandRowsLow,
      );
      high = Math.max(
        service.pricing.minimum,
        service.pricing.baseHigh +
          thousands * service.pricing.perThousandRowsHigh,
      );
    } else {
      low = service.pricing.low;
      high = service.pricing.high;
    }

    low *= deadlineOption.multiplier;
    high *= deadlineOption.multiplier;

    for (const id of addOns) {
      const addOn = addOnOptions.find((item) => item.id === id);
      if (addOn) {
        low += addOn.low;
        high += addOn.high;
      }
    }

    return {
      low: Math.round(low / 10) * 10,
      high: Math.round(high / 10) * 10,
    };
  }, [service, words, rows, deadlineOption, addOns]);

  const wordPercent = ((words - 500) / (30000 - 500)) * 100;
  const rowPercent = ((rows - 100) / (50000 - 100)) * 100;

  const summary = [
    `Service: ${service.title}`,
    service.pricing.unit === "word" ? `Word count: ${words.toLocaleString()}` : null,
    service.pricing.unit === "dataset" ? `Dataset rows: ${rows.toLocaleString()}` : null,
    `Deadline: ${deadlineOption.label}`,
    addOns.length
      ? `Add-ons: ${addOns
          .map((id) => addOnOptions.find((item) => item.id === id)?.label)
          .filter(Boolean)
          .join(", ")}`
      : "Add-ons: none",
    `Indicative range: ${formatPriceRange(estimate.low, estimate.high)} USD`,
  ]
    .filter(Boolean)
    .join("\n");

  function toggleAddOn(id: string) {
    setAddOns((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <div className="overflow-hidden border border-line">
      <div
        className={`grid ${compact ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[1.2fr_0.8fr]"}`}
      >
        <div className="bg-surface p-5 sm:p-7">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <p className="meta">Project inputs</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-quiet">
              USD / planning only
            </p>
          </div>

          <div className="mt-5">
            <label htmlFor="estimate-service" className="field-label">
              Service
            </label>
            <select
              id="estimate-service"
              className="field"
              value={serviceSlug}
              onChange={(event) => setServiceSlug(event.target.value)}
            >
              {pillars.map((pillar) => (
                <optgroup key={pillar.slug} label={pillar.name}>
                  {pillar.services.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {service.pricing.unit === "word" && (
            <div className="mt-5">
              <div className="flex items-end justify-between gap-3">
                <label htmlFor="estimate-words" className="field-label mb-0">
                  Word count
                </label>
                <output
                  htmlFor="estimate-words"
                  className="font-mono text-[12px] tabular-nums"
                >
                  {words.toLocaleString()}
                </output>
              </div>
              <input
                id="estimate-words"
                type="range"
                className="range mt-2"
                min={500}
                max={30000}
                step={250}
                value={words}
                style={{ "--fill": `${Math.min(100, Math.max(0, wordPercent))}%` } as React.CSSProperties}
                onChange={(event) => setWords(Number(event.target.value))}
                aria-valuetext={`${words.toLocaleString()} words`}
              />
              <div className="flex justify-between text-[9px] font-mono text-quiet">
                <span>500</span>
                <span>30,000</span>
              </div>
              <p className="mt-1.5 text-[10.5px] text-quiet">
                Longer documents can be quoted separately.
              </p>
            </div>
          )}

          {service.pricing.unit === "dataset" && (
            <div className="mt-5">
              <div className="flex items-end justify-between gap-3">
                <label htmlFor="estimate-rows" className="field-label mb-0">
                  Dataset rows
                </label>
                <output
                  htmlFor="estimate-rows"
                  className="font-mono text-[12px] tabular-nums"
                >
                  {rows.toLocaleString()}
                </output>
              </div>
              <input
                id="estimate-rows"
                type="range"
                className="range mt-2"
                min={100}
                max={50000}
                step={100}
                value={rows}
                style={{ "--fill": `${Math.min(100, Math.max(0, rowPercent))}%` } as React.CSSProperties}
                onChange={(event) => setRows(Number(event.target.value))}
                aria-valuetext={`${rows.toLocaleString()} rows`}
              />
              <div className="flex justify-between text-[9px] font-mono text-quiet">
                <span>100</span>
                <span>50,000</span>
              </div>
              <p className="mt-1.5 text-[10.5px] text-quiet">
                Variables, missingness, and model complexity also affect scope.
              </p>
            </div>
          )}

          <fieldset className="mt-6">
            <legend className="field-label">Deadline</legend>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {deadlineOptions.map((option) => {
                const selected = deadline === option.id;
                return (
                  <label
                    key={option.id}
                    className={`cursor-pointer border p-2 text-center transition-colors sm:p-2.5 sm:text-left ${
                      selected
                        ? "border-ink bg-ink text-page"
                        : "border-line hover:bg-tint"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deadline"
                      value={option.id}
                      checked={selected}
                      onChange={() => setDeadline(option.id)}
                      className="sr-only"
                    />
                    <span className="block text-[11px] font-medium sm:text-[11.5px]">
                      {option.label}
                    </span>
                    <span
                      className={`mt-0.5 block break-words text-[8.5px] leading-tight sm:text-[9px] ${
                        selected ? "text-page/70" : "text-quiet"
                      }`}
                    >
                      {option.hint}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="field-label">Optional additions</legend>
            <div className="space-y-2">
              {addOnOptions.map((option) => {
                const checked = addOns.includes(option.id);
                return (
                  <label
                    key={option.id}
                    className="flex cursor-pointer items-center justify-between gap-3 border border-line px-3 py-2.5 transition-colors hover:bg-tint"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`grid h-4 w-4 place-items-center border ${
                          checked
                            ? "border-accent bg-accent text-[#0b0b0b]"
                            : "border-line text-transparent"
                        }`}
                        aria-hidden="true"
                      >
                        <PiCheckCircle className="h-3 w-3" />
                      </span>
                      <span className="text-[12px]">{option.label}</span>
                    </span>
                    <span className="font-mono text-[9.5px] text-quiet">
                      {formatPriceRange(option.low, option.high)}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleAddOn(option.id)}
                    />
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="flex flex-col justify-between bg-[#0b0b0b] p-5 text-white sm:p-7">
          <div>
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                Indicative range
              </p>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
                Not a quote
              </span>
            </div>

            <p
              aria-live="polite"
              className="mt-6 text-[clamp(2.1rem,4.6vw,3.5rem)] font-medium leading-none tracking-[-0.055em] tabular-nums"
            >
              {formatPriceRange(estimate.low, estimate.high)}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/60">
              USD · {deadlineOption.label.toLowerCase()} timeline
            </p>

            <div className="mt-6 border-t border-white/15 pt-4">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/60">
                Includes
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-[11.5px] leading-snug text-white/80">
                  <PiCheckCircle className="mt-[2px] h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  Scope note and written confirmation
                </li>
                <li className="flex items-start gap-2 text-[11.5px] leading-snug text-white/80">
                  <PiCheckCircle className="mt-[2px] h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  {service.deliverables[0]}
                </li>
                <li className="flex items-start gap-2 text-[11.5px] leading-snug text-white/80">
                  <PiCheckCircle className="mt-[2px] h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  One structured revision round
                </li>
              </ul>
            </div>

            <p className="mt-5 text-[10.5px] leading-relaxed text-white/60">
              Planning estimate only. File readiness, figure count, revision
              rounds, and specialist availability can change the confirmed
              quote. Journal fees and taxes are excluded.
            </p>
          </div>

          <div className="mt-7">
            <MagneticButton
              href={mailto(`Quote request: ${service.shortTitle}`, summary)}
              className="btn btn-primary w-full"
              wrapperClassName="flex w-full"
            >
              Request this quote
              <PiArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
            <p className="mt-2 text-center text-[9.5px] text-white/55">
              Opens your email app with these details.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-4">
              <div>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/55">
                  Unit
                </p>
                <p className="mt-1 text-[10.5px] text-white/75">
                  {service.pricing.unit === "word"
                    ? "Per word"
                    : service.pricing.unit === "dataset"
                      ? "Dataset"
                      : "Fixed"}
                </p>
              </div>
              <div>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/55">
                  Base
                </p>
                <p className="mt-1 text-[10.5px] text-white/75">
                  {service.pricing.unit === "fixed"
                    ? formatPriceRange(service.pricing.low, service.pricing.high)
                    : `From ${formatPriceRange(
                        service.pricing.minimum,
                        service.pricing.minimum,
                      )}`}
                </p>
              </div>
              <div>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/55">
                  Currency
                </p>
                <p className="mt-1 text-[10.5px] text-white/75">USD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
