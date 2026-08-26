"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { services } from "@/lib/services";
import { SectionReveal } from "@/components/SectionReveal";
import { CitationGraphFallback } from "@/components/3d/CitationGraphFallback";

const CitationGraph = dynamic(() => import("@/components/3d/CitationGraph"), {
  ssr: false,
  loading: () => <CitationGraphFallback />,
});

const HUB_SERVICES = [
  "Research Article Writing",
  "Review Article Writing",
  "Meta-Analysis",
  "Systematic Review",
  "Proofreading",
];

export function HomeHero() {
  const serviceNames = HUB_SERVICES.flatMap((title) => {
    const found = services.find((s) => s.title === title);
    return found ? [found.title] : [];
  });

  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div className="relative mx-auto max-w-7xl px-4 pt-[60px] pb-12 sm:px-6 sm:pt-[60px] sm:pb-16 lg:px-8 lg:pt-[60px] lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionReveal>
            <p className="kicker">Academic &amp; medical writing</p>
            <h1 className="mt-4 font-display text-heading-md text-paper-50 sm:text-heading-lg">
              Precision writing for{" "}
              <em className="italic text-brass-500">scientific</em> excellence
            </h1>
            <p className="mt-6 max-w-xl text-body-lg text-graphite-500 leading-relaxed">
              From research manuscripts to complex data analysis, Scientific Scribe delivers
              publication-ready academic content with the rigor your work demands.
            </p>
            <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
              <Link href="/quote" className="btn btn-solid-inverse">
                Request a quote
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/services" className="btn btn-outline-inverse">
                View services
              </Link>
            </div>
            <div className="mt-10 flex flex-col gap-3 font-mono text-caption uppercase tracking-widest text-brass-500 sm:flex-row sm:gap-8">
              <span>[14] specialized services</span>
              <span>[✓] journal-ready output</span>
            </div>
          </SectionReveal>
          <div className="relative h-[480px] w-full sm:h-[560px]">
            <CitationGraph serviceNames={serviceNames} />
          </div>
        </div>
      </div>
    </section>
  );
}
