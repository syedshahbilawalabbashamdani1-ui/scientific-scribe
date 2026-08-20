"use client";

import { services } from "@/lib/services";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionReveal } from "@/components/SectionReveal";

export function HomeServices() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-foreground">
              Comprehensive Academic Services
            </h2>
            <p className="mt-3 sm:mt-4 text-muted-foreground text-base sm:text-lg">
              Every stage of the research publication lifecycle, handled with expertise and precision.
            </p>
          </div>
        </SectionReveal>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <SectionReveal key={service.slug} delay={i * 0.05}>
              <ServiceCard service={service} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
