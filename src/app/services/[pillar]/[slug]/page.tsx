import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PiArrowRight,
  PiArrowUpRight,
  PiCheck,
  PiClock,
  PiEnvelopeSimple,
  PiListChecks,
  PiScales,
  PiShieldCheck,
} from "react-icons/pi";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { mailto, site } from "@/lib/site";
import {
  formatPriceRange,
  getPillar,
  getRelatedServices,
  getService,
  pillars,
  services,
} from "@/lib/services";

type Params = { pillar: string; slug: string };

export function generateStaticParams() {
  return services.map((service) => ({
    pillar: service.pillar,
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pillar, slug } = await params;
  const service = getService(slug);
  const pillarData = getPillar(pillar);

  if (!service || !pillarData || service.pillar !== pillarData.slug) return {};

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${pillar}/${slug}` },
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description: service.summary,
      url: `${site.url}/services/${pillar}/${slug}`,
    },
  };
}

function priceLine(service: ReturnType<typeof getService>) {
  if (!service) return "";
  const { pricing } = service;
  if (pricing.unit === "fixed") {
    return `${formatPriceRange(pricing.low, pricing.high)} · fixed scope`;
  }
  if (pricing.unit === "word") {
    return `$${pricing.perWordLow.toFixed(3)}–$${pricing.perWordHigh.toFixed(
      3,
    )} per word · minimum ${formatPriceRange(pricing.minimum, pricing.minimum)}`;
  }
  return `${formatPriceRange(pricing.baseLow, pricing.baseHigh)} base + dataset size · minimum ${formatPriceRange(
    pricing.minimum,
    pricing.minimum,
  )}`;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { pillar: pillarSlug, slug } = await params;
  const service = getService(slug);
  const pillar = getPillar(pillarSlug);

  if (!service || !pillar || service.pillar !== pillar.slug) notFound();

  const related = getRelatedServices(service, 3);
  const pillarServices = pillars.find((item) => item.slug === pillar.slug)?.services ?? [];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.summary,
      serviceType: pillar.name,
      url: `${site.url}/services/${pillar.slug}/${service.slug}`,
      provider: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
        email: site.email,
      },
      areaServed: "Worldwide",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${site.url}/contact`,
      },
      termsOfService: `${site.url}/terms`,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        description: `Indicative pricing: ${priceLine(service)}`,
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${site.url}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: pillar.name,
          item: `${site.url}/services/${pillar.slug}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: service.title,
          item: `${site.url}/services/${pillar.slug}/${service.slug}`,
        },
      ],
    },
  ];

  const briefBody = [
    `Service: ${service.title}`,
    `Pillar: ${pillar.name}`,
    "",
    "What I am working on:",
    "",
    "Target journal / audience:",
    "Word count or dataset size:",
    "Current draft stage:",
    "Nearest deadline:",
  ].join("\n");

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
              { label: pillar.shortName, href: `/services/${pillar.slug}` },
              { label: service.shortTitle },
            ]}
          />

          <div className="mt-7 grid gap-9 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip border-accent/40 text-accent-text">
                  Pillar {pillar.number} · {pillar.shortName}
                </span>
                <span className="chip">
                  <PiClock className="h-3 w-3" aria-hidden="true" />
                  {service.turnaround}
                </span>
                {service.tools?.slice(0, 1).map((tool) => (
                  <span key={tool} className="chip">
                    {tool}
                  </span>
                ))}
              </div>

              <h1 className="display mt-5 max-w-[17ch]">{service.title}</h1>
              <p className="lede mt-5">{service.summary}</p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <Link href="/contact" className="btn btn-primary">
                  Request a scope check
                  <PiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/estimate" className="btn btn-outline">
                  Plan a budget range
                  <PiArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                {[
                  ["Turnaround", service.turnaround.split(",")[0]],
                  ["Pricing", priceLine(service).split(" · ")[0]],
                  ["Revisions", "1 structured round"],
                  [
                    "Deliverables",
                    `${service.deliverables.length} items`,
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="bg-surface p-3.5">
                    <dt className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-[11.5px] leading-snug">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="border border-line bg-surface">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <p className="meta">Best fit when</p>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-text">
                  Scope signal
                </span>
              </div>
              <ul className="divide-y divide-line">
                {service.bestFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 px-4 py-3 text-[11.5px] leading-snug"
                  >
                    <PiCheck
                      className="mt-[2px] h-3 w-3 shrink-0 text-accent-text"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-line bg-tint px-4 py-3">
                <p className="text-[10.5px] leading-relaxed text-quiet">
                  If none of these fit, the matcher will point to a closer
                  scope.
                </p>
                <Link
                  href="/match"
                  className="mt-2 inline-flex items-center gap-1 text-[10.5px] font-medium hover:text-accent-text"
                >
                  Open the matcher
                  <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid gap-10 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 lg:py-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="meta">The scope</p>
            <h2 className="mt-3 text-[1.7rem] font-medium leading-[1.05] tracking-[-0.04em]">
              What this service actually covers.
            </h2>
            <p className="mt-3 max-w-[36ch] text-[12px] leading-relaxed text-quiet">
              The boundary matters more than the promise. If something is out of
              scope, it appears in the written brief before work starts.
            </p>
            <div className="mt-5 border-t border-line pt-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                Pricing logic
              </p>
              <p className="mt-2 text-[11.5px] leading-relaxed text-quiet">
                {priceLine(service)}
              </p>
              <p className="mt-1.5 text-[10px] leading-relaxed text-quiet">
                An estimate, not a quote. Complexity, file readiness, and
                deadline determine the confirmed figure.
              </p>
            </div>
          </div>

          <div>
            <div className="space-y-4">
              {service.description.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[66ch] text-[14px] leading-[1.7] text-quiet"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-9">
              <div className="flex items-center gap-2">
                <PiListChecks
                  className="h-4 w-4 text-accent-text"
                  aria-hidden="true"
                />
                <h3 className="text-[15px] font-medium tracking-[-0.02em]">
                  Deliverables checklist
                </h3>
              </div>
              <ul className="mt-3 grid gap-px border border-line bg-line sm:grid-cols-2">
                {service.deliverables.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 bg-surface p-3.5"
                  >
                    <span className="mt-[1px] font-mono text-[9px] text-accent-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11.5px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.tools && (
              <div className="mt-6">
                <p className="meta">Software</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {service.tools.map((tool) => (
                    <span key={tool} className="chip">
                      {tool}
                    </span>
                  ))}
                  <span className="chip">Other tools by agreement</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell py-14 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="meta">Workflow</p>
              <h2 className="display-sm mt-3">Four steps, one handoff.</h2>
            </div>
            <p className="max-w-[34ch] text-[11.5px] leading-relaxed text-quiet">
              Nothing moves forward without a written scope. You approve every
              substantive change.
            </p>
          </div>

          <div className="mt-8 border-t border-line">
            {service.process.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.04}>
                <div className="grid gap-3 border-b border-line py-5 sm:grid-cols-[56px_1fr] sm:gap-6">
                  <span className="font-mono text-[10px] text-accent-text">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="grid gap-2 sm:grid-cols-[0.7fr_1.3fr] sm:gap-6">
                    <h3 className="text-[15px] font-medium tracking-[-0.025em]">
                      {step.title}
                    </h3>
                    <p className="max-w-[58ch] text-[12px] leading-relaxed text-quiet">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid gap-10 py-14 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14 lg:py-16">
          <div>
            <p className="meta">Questions</p>
            <h2 className="display-sm mt-3 max-w-[13ch]">
              Asked before the first file.
            </h2>
            <p className="mt-3 max-w-[34ch] text-[12px] leading-relaxed text-quiet">
              Straight answers about authorship, guarantees, data, and what is
              out of scope.
            </p>
            <Link href="/contact" className="btn btn-outline btn-sm mt-4">
              Ask a different question
              <PiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <FaqList faqs={service.faqs} />
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell grid gap-6 py-10 sm:py-12 lg:grid-cols-3">
          {[
            {
              icon: PiShieldCheck,
              title: "Confidential by default",
              text: "Documents and datasets are limited to the assigned specialist team.",
            },
            {
              icon: PiScales,
              title: "Authorship stays with you",
              text: "Support does not transfer responsibility for the science or final approval.",
            },
            {
              icon: PiEnvelopeSimple,
              title: "A written brief first",
              text: "Deliverables, assumptions, timeline, and price are confirmed before work.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-line pt-4">
              <item.icon className="h-4 w-4 text-accent-text" aria-hidden="true" />
              <h3 className="mt-3 text-[12.5px] font-medium">{item.title}</h3>
              <p className="mt-1.5 text-[10.5px] leading-relaxed text-quiet">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="meta">Related scopes</p>
              <h2 className="display-sm mt-3">Often paired with this service.</h2>
            </div>
            <Link
              href={`/services/${pillar.slug}`}
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
            >
              All of {pillar.shortName}
              <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.pillar}/${item.slug}`}
                className="group flex flex-col justify-between border border-line bg-surface p-4 transition-colors hover:border-ink hover:bg-tint"
              >
                <div>
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-text">
                    {pillarServices.findIndex((entry) => entry.slug === item.slug) +
                      1}
                    {" / "}
                    {pillarServices.length}
                  </p>
                  <h3 className="mt-2.5 text-[13.5px] font-medium leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-quiet">
                    {item.summary}
                  </p>
                </div>
                <span className="mt-4 flex items-center gap-1.5 border-t border-line pt-2.5 text-[10px] font-medium">
                  View scope
                  <PiArrowRight
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11.5px] leading-relaxed text-quiet">
              Prefer to send the brief directly? This link opens your email app
              with the service already named.
            </p>
            <a
              href={mailto(`Scope check: ${service.title}`, briefBody)}
              className="btn btn-dark btn-sm shrink-0"
            >
              Email about this scope
              <PiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        title={`Start with a scope check for ${service.shortTitle.toLowerCase()}.`}
        text="Tell us the question, the target journal, the files you have, and the deadline. We will confirm fit, deliverables, and a range before anything begins."
        note={`Replies ${site.responseTime}. Confidential by default.`}
      />
    </>
  );
}

export const dynamicParams = false;
