import type { Metadata } from "next";
import Link from "next/link";
import { PiArrowUpRight, PiCompass } from "react-icons/pi";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { ServiceFilter } from "@/components/service-filter";
import { site } from "@/lib/site";
import { pillars } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — fourteen scopes across four pillars",
  description:
    "Manuscript writing, journal submission, language and integrity, and biostatistics. Compare all fourteen Scientific-Scribe services, their deliverables, and their scope.",
  alternates: { canonical: "/services" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Scientific-Scribe services",
  description:
    "Fourteen academic research support services grouped into four pillars.",
  itemListElement: pillars.flatMap((pillar) =>
    pillar.services.map((service) => ({
      "@type": "Service",
      name: service.title,
      description: service.summary,
      url: `${site.url}/services/${pillar.slug}/${service.slug}`,
      provider: { "@type": "Organization", name: site.name },
      serviceType: pillar.name,
    })),
  ),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />

      <section className="relative overflow-hidden border-b border-line">
        <div
          className="grid-paper pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Services" }]} />
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="meta">Service index</p>
              <h1 className="display mt-4 max-w-[16ch]">
                Four pillars.{" "}
                <span className="text-quiet">Fourteen focused scopes.</span>
              </h1>
              <p className="lede mt-5">
                Every service has its own page, deliverables, and questions.
                Start with the pillar that matches your stage, or search by the
                problem you are trying to solve.
              </p>
            </div>
            <div className="border-t border-line pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent-text">
                How to read this index
              </p>
              <dl className="mt-3 space-y-2.5">
                {[
                  ["01–04", "Pillars group related work"],
                  ["A–N", "Services are individually scoped"],
                  ["→", "Each page ends in a quote route"],
                ].map(([key, value]) => (
                  <div key={key} className="flex items-baseline gap-3">
                    <dt className="w-12 shrink-0 font-mono text-[10px] text-accent-text">
                      {key}
                    </dt>
                    <dd className="text-[11.5px] leading-snug text-quiet">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell py-10 sm:py-12">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <Link
                key={pillar.slug}
                href={`/services/${pillar.slug}`}
                className="group flex flex-col justify-between border border-line bg-surface p-4 transition-colors hover:border-ink"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                      Pillar {pillar.number}
                    </span>
                    <PiArrowUpRight
                      className="h-3.5 w-3.5 text-quiet transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="mt-4 text-[14px] font-medium leading-tight tracking-[-0.02em]">
                    {pillar.name}
                  </h2>
                  <p className="mt-1.5 text-[10.5px] leading-relaxed text-quiet">
                    {pillar.tagline}
                  </p>
                </div>
                <p className="mt-5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-quiet">
                  {pillar.services.length}{" "}
                  {pillar.services.length === 1 ? "service" : "services"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <ServiceFilter pillars={pillars} />
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell grid gap-6 py-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex items-start gap-3">
            <PiCompass
              className="mt-0.5 h-5 w-5 shrink-0 text-accent-text"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-[17px] font-medium tracking-[-0.03em]">
                Still not sure which scope fits?
              </h2>
              <p className="mt-1.5 max-w-[58ch] text-[12px] leading-relaxed text-quiet">
                Answer two questions in the matcher, or send a short brief. A
                methodologist will point to the right route before you commit to
                anything.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/match" className="btn btn-primary btn-sm">
              Find your path
              <PiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="btn btn-outline btn-sm">
              Ask a methodologist
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
