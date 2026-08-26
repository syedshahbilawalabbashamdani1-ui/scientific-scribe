import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Get a detailed quote for your academic writing or data analysis project. Fast turnaround, transparent pricing.",
};

export default function QuotePage() {
  return (
    <>
      <section className="bg-ink-900 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="kicker">Quote</p>
          <h1 className="mt-4 font-display text-heading-md text-paper-50 sm:text-heading-lg">
            Request a quote
          </h1>
          <p className="mt-4 max-w-xl text-body-lg leading-relaxed text-graphite-500">
            Tell us about your project and we will provide a detailed, no-obligation quote within
            24 hours.
          </p>
        </div>
      </section>
      <section className="bg-background py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
