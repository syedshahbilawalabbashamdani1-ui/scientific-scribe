"use client";

import { services } from "@/lib/services";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionReveal } from "@/components/SectionReveal";

export function HomeServices() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="max-w-2xl">
            <p className="kicker">Services</p>
            <h2 className="mt-3 font-display text-heading-sm text-foreground sm:text-heading-md">
              Comprehensive academic services
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground leading-relaxed">
              Every stage of the research publication lifecycle, handled with expertise and
              precision.
            </p>
          </div>
        </SectionReveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <SectionReveal key={service.slug} delay={i * 0.05}>
              <ServiceCard service={service} index={i} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
