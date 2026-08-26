"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";

export function HomeCta() {
  return (
    <section className="bg-ink-900 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="kicker">Begin a manuscript</p>
          <h2 className="mt-4 font-display text-heading-sm text-paper-50 sm:text-heading-lg">
            Ready to elevate your research?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg leading-relaxed text-graphite-500">
            Get a detailed quote for your project. Whether you need a full manuscript or targeted
            data analysis, we are here to help you publish with confidence.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/quote" className="btn btn-solid-inverse px-8">
              Request a quote
            </Link>
            <Link href="/contact" className="btn btn-outline-inverse px-8">
              Contact us
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
