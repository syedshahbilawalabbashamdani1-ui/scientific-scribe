"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import {
  PiArrowUpRight,
  PiMagnifyingGlass,
  PiX,
} from "react-icons/pi";

import type { Pillar } from "@/lib/services";

type ServiceFilterProps = {
  pillars: Pillar[];
};

export function ServiceFilter({ pillars }: ServiceFilterProps) {
  const [query, setQuery] = useState("");
  const [activePillar, setActivePillar] = useState<string>("all");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const visiblePillars = pillars
    .filter((pillar) => activePillar === "all" || pillar.slug === activePillar)
    .map((pillar) => ({
      ...pillar,
      services: pillar.services.filter((service) => {
        if (!deferredQuery) return true;
        const haystack = [
          service.title,
          service.shortTitle,
          service.summary,
          ...service.deliverables,
          ...service.bestFor,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(deferredQuery);
      }),
    }))
    .filter((pillar) => pillar.services.length > 0);

  const total = visiblePillars.reduce(
    (count, pillar) => count + pillar.services.length,
    0,
  );

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto" role="group" aria-label="Filter by pillar">
          <button
            type="button"
            onClick={() => setActivePillar("all")}
            aria-pressed={activePillar === "all"}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-medium transition-colors ${
              activePillar === "all"
                ? "border-ink bg-ink text-page"
                : "border-line text-quiet hover:border-ink hover:text-ink"
            }`}
          >
            All services
            <span className="ml-1.5 font-mono text-[9px] opacity-60">
              {pillars.reduce((count, pillar) => count + pillar.services.length, 0)}
            </span>
          </button>
          {pillars.map((pillar) => (
            <button
              key={pillar.slug}
              type="button"
              onClick={() => setActivePillar(pillar.slug)}
              aria-pressed={activePillar === pillar.slug}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-medium transition-colors ${
                activePillar === pillar.slug
                  ? "border-ink bg-ink text-page"
                  : "border-line text-quiet hover:border-ink hover:text-ink"
              }`}
            >
              {pillar.shortName}
              <span className="ml-1.5 font-mono text-[9px] opacity-60">
                {pillar.services.length}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-[300px]">
          <label htmlFor="service-search" className="sr-only">
            Search services
          </label>
          <PiMagnifyingGlass
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-quiet"
            aria-hidden="true"
          />
          <input
            id="service-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search 14 services"
            className="field min-h-[40px] rounded-full pl-9 pr-9 text-[12px]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full text-quiet hover:bg-tint hover:text-ink"
            >
              <PiX className="h-3 w-3" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.12em] text-quiet" aria-live="polite">
        {total} {total === 1 ? "service" : "services"} shown
        {deferredQuery ? ` for “${query.trim()}”` : ""}
      </p>

      {visiblePillars.length === 0 ? (
        <div className="mt-6 border border-line bg-tint p-8 text-center">
          <p className="text-[16px] font-medium">No service matches that search.</p>
          <p className="mx-auto mt-2 max-w-[42ch] text-[12px] leading-relaxed text-quiet">
            Try a broader term, or start with a scope conversation and we will
            point you to the right service.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActivePillar("all");
              }}
              className="btn btn-outline btn-sm"
            >
              Clear filters
            </button>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Request a scope check
              <PiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-10">
          {visiblePillars.map((pillar) => (
            <section key={pillar.slug} aria-labelledby={`pillar-${pillar.slug}`}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="meta">
                    Pillar {pillar.number} · {pillar.services.length}{" "}
                    {pillar.services.length === 1 ? "service" : "services"}
                  </p>
                  <h2
                    id={`pillar-${pillar.slug}`}
                    className="mt-1.5 text-[1.4rem] font-medium tracking-[-0.04em]"
                  >
                    {pillar.name}
                  </h2>
                </div>
                <Link
                  href={`/services/${pillar.slug}`}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium hover:text-accent-text"
                >
                  Open pillar
                  <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {pillar.services.map((service, index) => (
                  <Link
                    key={service.slug}
                    href={`/services/${pillar.slug}/${service.slug}`}
                    className="group relative flex min-h-[190px] flex-col border border-line bg-surface p-4 transition-colors hover:border-ink hover:bg-tint sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                        {String(index + 1).padStart(2, "0")} / {pillar.shortName}
                      </p>
                      <PiArrowUpRight
                        className="h-3.5 w-3.5 text-quiet transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-5 text-[16px] font-medium leading-[1.15] tracking-[-0.025em]">
                      {service.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[11.5px] leading-relaxed text-quiet">
                      {service.summary}
                    </p>
                    <div className="mt-auto flex items-center gap-2 pt-4">
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-quiet">
                        {service.deliverables.length} deliverables
                      </span>
                      <span className="h-px flex-1 bg-line" aria-hidden="true" />
                      <span className="text-[10px] text-quiet transition-colors group-hover:text-accent-text">
                        View scope
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
