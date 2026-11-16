import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PiArrowRight,
  PiArrowUpRight,
  PiCheck,
  PiClock,
} from "react-icons/pi";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { getPillar, pillars } from "@/lib/services";

type Params = { pillar: string };

export function generateStaticParams() {
  return pillars.map((pillar) => ({ pillar: pillar.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pillar: pillarSlug } = await params;
  const pillar = getPillar(pillarSlug);
  if (!pillar) return {};

  return {
    title: `${pillar.name} — ${pillar.services.length} ${
      pillar.services.length === 1 ? "service" : "services"
    }`,
    description: pillar.description,
    alternates: { canonical: `/services/${pillar.slug}` },
    openGraph: {
      title: `${pillar.name} | ${site.name}`,
      description: pillar.description,
      url: `${site.url}/services/${pillar.slug}`,
    },
  };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { pillar: pillarSlug } = await params;
  const pillar = getPillar(pillarSlug);
  if (!pillar) notFound();

  const otherPillars = pillars.filter((item) => item.slug !== pillar.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pillar.name,
    description: pillar.description,
    url: `${site.url}/services/${pillar.slug}`,
    hasPart: pillar.services.map((service) => ({
      "@type": "Service",
      name: service.title,
      description: service.summary,
      url: `${site.url}/services/${pillar.slug}/${service.slug}`,
      serviceType: pillar.name,
      provider: { "@type": "Organization", name: site.name },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden border-b border-line">
        <div
          className="grid-paper pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative py-10 sm:py-14">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: pillar.shortName },
            ]}
          />

          <div className="mt-7 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="meta">Pillar {pillar.number}</p>
              <h1 className="display mt-4 max-w-[15ch]">{pillar.name}</h1>
              <p className="lede mt-5 max-w-[54ch]">{pillar.description}</p>
              <p className="mt-5 flex items-start gap-2 border-l-2 border-accent pl-3 text-[12px] leading-relaxed text-quiet">
                <PiCheck
                  className="mt-[2px] h-3.5 w-3.5 shrink-0 text-accent-text"
                  aria-hidden="true"
                />
                <span>
                  <span className="font-medium text-ink">Outcome: </span>
                  {pillar.outcome}
                </span>
              </p>
            </div>

            <div className="border-t border-line pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="meta">Pillar contents</p>
              <ol className="mt-3 border-t border-line">
                {pillar.services.map((service, index) => (
                  <li key={service.slug} className="border-b border-line">
                    <Link
                      href={`/services/${pillar.slug}/${service.slug}`}
                      className="group flex items-start justify-between gap-3 py-2.5"
                    >
                      <span className="flex items-start gap-2.5">
                        <span className="mt-0.5 font-mono text-[9px] text-accent-text">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[12px] leading-snug transition-colors group-hover:text-accent-text">
                          {service.shortTitle}
                        </span>
                      </span>
                      <PiArrowUpRight
                        className="mt-0.5 h-3 w-3 shrink-0 text-quiet transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-14 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="meta">Services in this pillar</p>
              <h2 className="display-sm mt-3">
                {pillar.services.length}{" "}
                {pillar.services.length === 1 ? "scope" : "routes"}, each with a
                written brief.
              </h2>
            </div>
            <Link
              href="/match"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
            >
              Compare by research stage
              <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-2 lg:grid-cols-2">
            {pillar.services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.04}>
                <Link
                  href={`/services/${pillar.slug}/${service.slug}`}
                  className="group flex h-full flex-col border border-line bg-surface p-5 transition-colors hover:border-ink hover:bg-tint sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {pillar.shortName}
                    </p>
                    <PiArrowUpRight
                      className="h-4 w-4 text-quiet transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-4 max-w-[28ch] text-[1.25rem] font-medium leading-[1.1] tracking-[-0.035em]">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-[12px] leading-relaxed text-quiet">
                    {service.summary}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-line pt-3">
                    {service.deliverables.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[11px] leading-snug text-quiet"
                      >
                        <PiCheck
                          className="mt-[2px] h-3 w-3 shrink-0 text-accent-text"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-4">
                    <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-quiet">
                      <PiClock className="h-3 w-3" aria-hidden="true" />
                      {service.turnaround}
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-medium">
                      View scope
                      <PiArrowRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell py-12 sm:py-14">
          <p className="meta">Common questions in this pillar</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.6fr_1.4fr]">
            <div>
              <h2 className="text-[1.6rem] font-medium leading-[1.05] tracking-[-0.04em]">
                What researchers ask first.
              </h2>
              <p className="mt-2 max-w-[34ch] text-[12px] leading-relaxed text-quiet">
                If your question is not here, the pillar lead can answer it before
                you share any files.
              </p>
              <MagneticButton
                href="/contact"
                className="btn btn-outline btn-sm"
                wrapperClassName="mt-4 inline-flex"
              >
                Ask about this pillar
                <PiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </MagneticButton>
            </div>
            <FaqList
              faqs={pillar.services.slice(0, 3).flatMap((service) =>
                service.faqs.slice(0, 1).map((faq) => ({
                  question: faq.question,
                  answer: faq.answer,
                })),
              )}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-10 sm:py-12">
          <p className="meta">Other pillars</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {otherPillars.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group flex items-start justify-between gap-3 border border-line p-4 transition-colors hover:border-ink hover:bg-tint"
              >
                <div>
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-quiet">
                    Pillar {item.number}
                  </p>
                  <p className="mt-1.5 text-[12.5px] font-medium leading-snug">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[10px] text-quiet">
                    {item.services.length}{" "}
                    {item.services.length === 1 ? "service" : "services"}
                  </p>
                </div>
                <PiArrowUpRight
                  className="h-3.5 w-3.5 shrink-0 text-quiet transition-colors group-hover:text-accent-text"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="A pillar is a direction, not a quote."
        text="Tell us the stage, the target journal, and the nearest deadline. We will confirm which service in this pillar actually applies."
        note={`Replies ${site.responseTime}. Confidential by default.`}
      />
    </>
  );
}

export const dynamicParams = false;
