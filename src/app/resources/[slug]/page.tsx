import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowLeft, PiArrowUpRight, PiClock } from "react-icons/pi";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CoverLetterTool } from "@/components/cover-letter-tool";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PrismaBuilder } from "@/components/prisma-builder";
import { ToolGuide } from "@/components/tool-guide";
import { resources, getResource } from "@/lib/resources";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};

  return {
    title: resource.title,
    description: resource.summary,
    alternates: { canonical: `/resources/${resource.slug}` },
    openGraph: {
      title: `${resource.title} | ${site.name}`,
      description: resource.summary,
      url: `${site.url}/resources/${resource.slug}`,
      type: "article",
    },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const others = resources.filter((item) => item.slug !== resource.slug);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: resource.title,
      description: resource.summary,
      dateModified: resource.updated,
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      mainEntityOfPage: `${site.url}/resources/${resource.slug}`,
      about: resource.topics,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: resource.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden border-b border-line">
        <div
          className="grid-paper pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative py-10 sm:py-12">
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: resource.shortTitle },
            ]}
          />

          <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip border-accent/40 text-accent-text">
                  {resource.type}
                </span>
                <span className="chip">
                  <PiClock className="h-3 w-3" aria-hidden="true" />
                  {resource.readTime} read
                </span>
              </div>
              <h1 className="display mt-5 max-w-[18ch]">{resource.title}</h1>
              <p className="lede mt-5 max-w-[54ch]">{resource.summary}</p>
            </div>

            <div className="border-t border-line pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="meta">Applies to</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {resource.topics.map((topic) => (
                  <li key={topic}>
                    <span className="chip">{topic}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.12em] text-quiet">
                Updated {resource.updated}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell grid gap-8 py-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-12 lg:py-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="meta">Why it matters</p>
            <div className="mt-3 space-y-3">
              {resource.description.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[12.5px] leading-[1.7] text-quiet"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-5 flex items-start gap-2 border border-line bg-surface p-3.5">
              <PiArrowUpRight
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-text"
                aria-hidden="true"
              />
              <p className="text-[10.5px] leading-relaxed text-quiet">
                This is a planning aid, not a substitute for the current
                reporting guideline or your journal&apos;s instructions.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
            >
              Ask about your case
              <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <div>
            {resource.kind === "prisma" && <PrismaBuilder />}
            {resource.kind === "cover-letter" && <CoverLetterTool />}
            {resource.kind === "tool-guide" && <ToolGuide />}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid gap-10 py-14 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
          <div>
            <p className="meta">Questions</p>
            <h2 className="display-sm mt-3 max-w-[14ch]">
              Before you use it.
            </h2>
            <p className="mt-3 max-w-[34ch] text-[12px] leading-relaxed text-quiet">
              Common points where a template is not enough on its own.
            </p>
          </div>
          <FaqList faqs={resource.faqs} />
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell py-10 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="meta">More resources</p>
              <h2 className="text-[1.45rem] font-medium tracking-[-0.035em]">
                Keep the workbench stocked.
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
            >
              <PiArrowLeft className="h-3 w-3" aria-hidden="true" />
              All resources
            </Link>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/resources/${item.slug}`}
                className="group flex items-start justify-between gap-3 border border-line bg-surface p-4 transition-colors hover:border-ink"
              >
                <div>
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-text">
                    {item.type}
                  </p>
                  <p className="mt-2 text-[12.5px] font-medium leading-snug">
                    {item.title}
                  </p>
                  <p className="mt-1 line-clamp-1 text-[10.5px] text-quiet">
                    {item.summary}
                  </p>
                </div>
                <PiArrowUpRight
                  className="h-3.5 w-3.5 shrink-0 text-quiet transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="A template gets you started. A scope gets you finished."
        text="If the document or dataset needs work beyond the template, a scope check will name the service and the likely effort."
        note="Resources remain free and ungated."
      />
    </>
  );
}

export const dynamicParams = false;
