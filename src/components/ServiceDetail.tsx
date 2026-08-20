"use client";

import type { Service } from "@/lib/services";
import { SectionReveal } from "@/components/SectionReveal";

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold font-serif text-foreground">
              Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {service.fullDescription}
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-serif text-foreground mb-6">
              What&apos;s Included
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <svg
                    className="h-5 w-5 text-accent mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-card-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
