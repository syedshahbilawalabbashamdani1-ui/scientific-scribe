"use client";

import Link from "next/link";
import type { Service } from "@/lib/services";
import { MarginRailLayout } from "@/components/MarginRailLayout";
import { SectionReveal } from "@/components/SectionReveal";

interface ServiceDetailProps {
  service: Service;
  related: Service[];
}

export function ServiceDetail({ service, related }: ServiceDetailProps) {
  const rail = (
    <div className="space-y-10">
      <section aria-label="Editorial notes">
        <h2 className="font-mono text-caption uppercase tracking-widest text-brass-600 dark:text-brass-500">
          Editorial notes
        </h2>
        <ol className="mt-4 space-y-4">
          <li className="flex gap-3 font-mono text-footnote leading-relaxed text-muted-foreground">
            <span className="shrink-0 text-citation-500">[1]</span>
            <span>
              Every engagement follows ICMJE recommendations for scholarly work conducted and
              reported in journals.
            </span>
          </li>
          <li className="flex gap-3 font-mono text-footnote leading-relaxed text-muted-foreground">
            <span className="shrink-0 text-citation-500">[2]</span>
            <span>Authorship credit is preserved for researchers; we edit, we never publish under our own name.</span>
          </li>
          <li className="flex gap-3 font-mono text-footnote leading-relaxed text-muted-foreground">
            <span className="shrink-0 text-citation-500">[3]</span>
            <span>Deliverables include tracked changes and a change log for full auditability.</span>
          </li>
        </ol>
      </section>

      <section aria-label="Related services" className="border-t border-border pt-8">
        <h2 className="font-mono text-caption uppercase tracking-widest text-brass-600 dark:text-brass-500">
          Related services
        </h2>
        <ul className="mt-4 space-y-3">
          {related.map((rel) => (
            <li key={rel.slug}>
              <Link
                href={`/services/${rel.slug}`}
                className="group flex items-baseline justify-between gap-3 border-b border-border pb-3"
              >
                <span className="font-display text-body-lg text-card-foreground transition-colors group-hover:text-brass-600 dark:group-hover:text-brass-500">
                  {rel.title}
                </span>
                <span
                  className="font-mono text-caption text-citation-500 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border pt-8">
        <Link href="/quote" className="btn btn-outline w-full">
          Request a quote
        </Link>
      </section>
    </div>
  );

  return (
    <MarginRailLayout
      title={
        <SectionReveal>
          <h2 className="font-display text-heading-md text-foreground sm:text-heading-lg">Overview</h2>
        </SectionReveal>
      }
      rail={rail}
    >
      <SectionReveal>
        <p>
          {service.fullDescription}
        </p>
      </SectionReveal>

      <SectionReveal>
        <h3 className="mt-12 font-display text-heading-sm text-foreground">What&rsquo;s included</h3>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-4 py-4">
              <span className="shrink-0 pt-0.5 font-mono text-caption text-citation-500">
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <span className="text-body text-card-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </SectionReveal>
    </MarginRailLayout>
  );
}
