"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";

export function HomeCta() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <SectionReveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white">
            Ready to Elevate Your Research?
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-navy-200 max-w-2xl mx-auto">
            Get a detailed quote for your project. Whether you need a full manuscript or targeted
            data analysis, we are here to help you publish with confidence.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-accent text-white font-medium text-base sm:text-lg hover:bg-accent-hover transition-colors min-h-[44px]"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-navy-600 text-white font-medium text-base sm:text-lg hover:bg-navy-800 transition-colors min-h-[44px]"
            >
              Contact Us
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
