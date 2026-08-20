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
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white">
            Request a Quote
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-navy-200 max-w-2xl mx-auto">
            Tell us about your project and we will provide a detailed, no-obligation quote within 24 hours.
          </p>
        </div>
      </section>
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
