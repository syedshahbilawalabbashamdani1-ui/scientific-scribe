"use client";

import Link from "next/link";
import type { Service } from "@/lib/services";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const numeral = String(index + 1).padStart(2, "0");
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block rounded-none border border-border bg-card p-6 transition-colors duration-200 hover:border-brass-500"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-caption tracking-widest text-brass-600 dark:text-brass-500">
          [{numeral}]
        </span>
        <span
          className="inline-block text-citation-500 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
          aria-hidden="true"
        >
          →
        </span>
      </div>
      <h3 className="mt-4 font-display text-heading-xs text-card-foreground transition-colors group-hover:text-brass-600 dark:group-hover:text-brass-500">
        {service.title}
      </h3>
      <p className="mt-2 text-footnote leading-relaxed text-muted-foreground">
        {service.shortDescription}
      </p>
    </Link>
  );
}
