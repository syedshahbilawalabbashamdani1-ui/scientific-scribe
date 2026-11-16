import type { Metadata } from "next";
import Link from "next/link";
import {
  PiArrowUpRight,
  PiBookOpenText,
  PiClock,
  PiFileText,
} from "react-icons/pi";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { resources } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources — templates and explainers you can use",
  description:
    "A PRISMA flow builder, a journal cover-letter template with a pre-send checklist, and a software comparison guide for SPSS, R, Excel, and GraphPad Prism.",
  alternates: { canonical: "/resources" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Scientific-Scribe resources",
  url: `${site.url}/resources`,
  description:
    "Practical templates and explainers for academic writing, journal submission, and data analysis.",
  hasPart: resources.map((resource) => ({
    "@type": "Article",
    headline: resource.title,
    description: resource.summary,
    url: `${site.url}/resources/${resource.slug}`,
    dateModified: resource.updated,
  })),
};

const comingSoon = [
  {
    title: "Response-to-reviewers matrix",
    type: "Template",
    text: "A table structure that keeps every reviewer comment, action, and location in one place.",
  },
  {
    title: "Reporting-guideline selector",
    type: "Explainer",
    text: "Match your study design to CONSORT, STROBE, PRISMA, CARE, and other checklists.",
  },
  {
    title: "Figure specification checklist",
    type: "Checklist",
    text: "Resolution, labelling, colour, and file-format checks before the submission portal.",
  },
];

export default function ResourcesPage() {
  const [featured, ...rest] = resources;

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden border-b border-line">
        <div
          className="grid-paper pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Resources" }]} />
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="meta">Resource hub</p>
              <h1 className="display mt-4 max-w-[15ch]">
                Useful before{" "}
                <span className="text-quiet">you enquire.</span>
              </h1>
              <p className="lede mt-5">
                Working tools and plain explainers. No email gate, no download
                funnel. Use them whether or not you work with us.
              </p>
            </div>
            <div className="border-t border-line pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="meta">In this hub</p>
              <dl className="mt-3 space-y-2.5">
                {[
                  ["03", "Working tools"],
                  ["02", "Templates"],
                  ["01", "Comparison guide"],
                ].map(([key, value]) => (
                  <div key={key} className="flex items-baseline gap-3">
                    <dt className="w-8 shrink-0 font-mono text-[11px] text-accent-text">
                      {key}
                    </dt>
                    <dd className="text-[11.5px] text-quiet">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex items-start gap-1.5 text-[10px] leading-relaxed text-quiet">
                <PiBookOpenText
                  className="mt-[1px] h-3 w-3 shrink-0 text-accent-text"
                  aria-hidden="true"
                />
                Written to be used, not skimmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-16">
          <Link
            href={`/resources/${featured.slug}`}
            className="group grid gap-6 border border-line bg-surface p-5 transition-colors hover:border-ink sm:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip border-accent/40 text-accent-text">
                  <PiFileText className="h-3 w-3" aria-hidden="true" />
                  {featured.type}
                </span>
                <span className="chip">
                  <PiClock className="h-3 w-3" aria-hidden="true" />
                  {featured.readTime} read
                </span>
              </div>
              <h2 className="mt-5 max-w-[20ch] text-[clamp(1.7rem,3.2vw,2.5rem)] font-medium leading-[1.02] tracking-[-0.045em]">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-[52ch] text-[12.5px] leading-relaxed text-quiet">
                {featured.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {featured.topics.map((topic) => (
                  <span key={topic} className="chip">
                    {topic}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[11.5px] font-medium">
                Open the builder
                <PiArrowUpRight
                  className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>

            <div className="border border-line bg-tint p-4">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet">
                Identification → inclusion
              </p>
              <div className="mt-3 space-y-1.5" aria-hidden="true">
                {[
                  ["Records identified", "1,240", "bg-surface"],
                  ["Removed before screening", "−186", "bg-surface"],
                  ["Records screened", "1,054", "bg-surface"],
                  ["Assessed for eligibility", "138", "bg-surface"],
                  ["Studies included", "42", "bg-[#0b0b0b] text-white border-[#0b0b0b]"],
                ].map(([label, value, style]) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between border border-line px-3 py-2 ${style}`}
                  >
                    <span className="text-[10.5px]">{label}</span>
                    <span
                      className={`font-mono text-[12px] tabular-nums ${
                        style.includes("text-white") ? "text-accent" : ""
                      }`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Link>

          <div className="mt-2 grid gap-2 md:grid-cols-2">
            {rest.map((resource, index) => (
              <Reveal key={resource.slug} delay={index * 0.05}>
                <Link
                  href={`/resources/${resource.slug}`}
                  className="group flex h-full flex-col justify-between border border-line bg-surface p-5 transition-colors hover:border-ink hover:bg-tint sm:p-6"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-text">
                        {resource.type}
                      </span>
                      <PiArrowUpRight
                        className="h-4 w-4 text-quiet transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                        aria-hidden="true"
                      />
                    </div>
                    <h2 className="mt-4 max-w-[24ch] text-[1.3rem] font-medium leading-[1.1] tracking-[-0.035em]">
                      {resource.title}
                    </h2>
                    <p className="mt-2 max-w-[46ch] text-[11.5px] leading-relaxed text-quiet">
                      {resource.summary}
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-line pt-3">
                    <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-quiet">
                      <PiClock className="h-3 w-3" aria-hidden="true" />
                      {resource.readTime}
                    </span>
                    <span className="text-[9px] text-quiet">
                      {resource.topics.join(" · ")}
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
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="meta">On the workbench</p>
              <h2 className="display-sm mt-3">In progress.</h2>
              <p className="mt-2 max-w-[48ch] text-[12px] leading-relaxed text-quiet">
                Resources are added when they are genuinely useful, not to fill
                a grid.
              </p>
            </div>
            <span className="chip">Not yet published</span>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {comingSoon.map((item) => (
              <div
                key={item.title}
                className="border border-dashed border-line bg-surface p-4"
              >
                <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-quiet">
                  {item.type}
                </p>
                <h3 className="mt-2.5 text-[13px] font-medium leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[10.5px] leading-relaxed text-quiet">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need the thinking, not just the template?"
        text="A scope check can tell you whether the problem is framing, evidence, language, or analysis — and which service follows."
        note="Resources stay free. No account required."
      />
    </>
  );
}
