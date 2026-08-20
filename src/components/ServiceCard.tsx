"use client";

import Link from "next/link";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
    >
      <div className="text-3xl mb-4">{service.icon}</div>
      <h3 className="text-lg font-semibold text-card-foreground group-hover:text-accent transition-colors font-serif">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {service.shortDescription}
      </p>
      <div className="mt-4 inline-flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more
        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
