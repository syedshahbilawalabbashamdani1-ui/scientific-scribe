"use client";

import Link from "next/link";
import { HeroDna } from "@/components/HeroDna";
import { SectionReveal } from "@/components/SectionReveal";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950 opacity-95" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <SectionReveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif">
              Precision Writing for{" "}
              <span className="text-teal-400">Scientific</span>{" "}
              Excellence
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-navy-200 leading-relaxed max-w-xl">
              From research manuscripts to complex data analysis, Scientific Scribe delivers
              publication-ready academic content with the rigor your work demands.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-colors min-h-[44px]"
              >
                Request a Quote
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-navy-600 text-white font-medium hover:bg-navy-800 transition-colors min-h-[44px]"
              >
                View Services
              </Link>
            </div>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 text-sm text-navy-300">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                14 Specialized Services
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Journal-Ready Output
              </div>
            </div>
          </SectionReveal>
          <div className="flex justify-center lg:justify-end">
            <HeroDna />
          </div>
        </div>
      </div>
    </section>
  );
}
