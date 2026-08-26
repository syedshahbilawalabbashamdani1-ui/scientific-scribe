"use client";

import { services } from "@/lib/services";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionReveal } from "@/components/SectionReveal";

export function ServicesList() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <SectionReveal key={service.slug} delay={i * 0.04}>
          <ServiceCard service={service} index={i} />
        </SectionReveal>
      ))}
    </div>
  );
}
