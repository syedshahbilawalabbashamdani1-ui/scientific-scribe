import type { Metadata } from "next";
import Link from "next/link";
import {
  PiArrowRight,
  PiArrowUpRight,
  PiClock,
  PiFileText,
  PiScales,
  PiSealCheck,
  PiShieldCheck,
} from "react-icons/pi";

import { AnalysisFigure } from "@/components/analysis-figure";
import { BeforeAfter } from "@/components/before-after";
import { CtaBand } from "@/components/cta-band";
import { Estimator } from "@/components/estimator";
import { PillarConsole } from "@/components/pillar-console";
import { Reveal } from "@/components/reveal";
import { ServiceMatcher } from "@/components/service-matcher";
import { resources } from "@/lib/resources";
import { pillars, researchStages, services } from "@/lib/services";

export const metadata: Metadata = {
  title: {
    absolute: "Scientific-Scribe | Research support, scoped like a protocol",
  },
  description:
    "Specialist support for manuscript writing, journal submission, language and integrity, and biostatistics. Four pillars, fourteen services, a written scope before work begins.",
  alternates: { canonical: "/" },
};

const marqueeItems = [
  ...services.map((service) => service.shortTitle),
  "SPSS · R · Excel · GraphPad Prism",
  "Confidential by default",
];

const processSteps = [
  {
    number: "01",
    title: "Share the brief",
    text: "Tell us the research stage, target journal, deadline, and the files you have. Keep confidential attachments out of the first email.",
    output: "A short scope note",
  },
  {
    number: "02",
    title: "Agree the scope",
    text: "A specialist confirms the deliverables, assumptions, timeline, and estimate in writing before any work begins.",
    output: "Written scope + estimate",
  },
  {
    number: "03",
    title: "Work and review",
    text: "You receive a draft with tracked changes or commented analysis. One structured revision round is included.",
    output: "Draft + revision round",
  },
  {
    number: "04",
    title: "Final handoff",
    text: "You receive the agreed files, a plain-language summary, and a clear record of what was and was not covered.",
    output: "Final files + summary",
  },
];

export default function HomePage() {
  const featuredResource = resources[0];
  const sideResources = resources.slice(1);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-paper pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative grid gap-10 pb-10 pt-10 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:pb-16 lg:pt-16">
          <div>
            <p className="meta">Academic research support</p>
            <h1 className="display mt-4 max-w-[14ch]">
              Research support,{" "}
              <span className="text-quiet">scoped like a protocol.</span>
            </h1>
            <p className="lede mt-5 max-w-[48ch]">
              Specialist help with writing, journal compliance, language, and
              biostatistics, agreed before work begins.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link href="/match" className="btn btn-primary">
                Find your path
                <PiArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Request a scope check
                <PiArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <Reveal delay={0.08} y={16}>
            <PillarConsole />
          </Reveal>
        </div>
      </section>

      <div className="ss-marquee-wrap overflow-hidden border-b border-line bg-tint py-3">
        <p className="sr-only">
          Service areas include manuscript writing, review articles,
          meta-analysis, systematic reviews, case reports, report writing,
          journal submission, journal-specific editing, letters to the editor,
          short communications, proofreading, responsible AI revision,
          similarity review, and data analysis in SPSS, R, Excel, and GraphPad
          Prism.
        </p>
        <div className="ss-marquee flex w-max items-center" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.14em] text-quiet"
                >
                  <span className="px-4">{item}</span>
                  <span className="h-1 w-1 rounded-full bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="border-b border-line bg-tint">
        <div className="shell grid gap-8 py-14 lg:grid-cols-[0.58fr_1.42fr] lg:gap-12 lg:py-20">
          <div>
            <p className="meta">Start where you are</p>
            <h2 className="mt-3 max-w-[13ch] text-[clamp(2rem,3.8vw,3.1rem)] font-medium leading-[0.99] tracking-[-0.05em]">
              Two questions. A route you can defend.
            </h2>
            <p className="mt-3 max-w-[36ch] text-[13px] leading-relaxed text-quiet">
              The matcher is a starting point, not a diagnosis. It narrows the
              pillar, then points to the service scope and deliverables.
            </p>
            <div className="mt-6 hidden border-t border-line lg:block">
              {researchStages.map((stage, index) => (
                <div
                  key={stage.id}
                  className="flex items-baseline gap-3 border-b border-line py-2.5"
                >
                  <span className="font-mono text-[9px] text-accent-text">
                    0{index + 1}
                  </span>
                  <span className="text-[12px]">{stage.label}</span>
                  <span className="ml-auto text-right text-[9.5px] text-quiet">
                    {stage.hint}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/match"
              className="mt-5 inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
            >
              Open the full matcher
              <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <Reveal>
            <ServiceMatcher compact />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-16 lg:py-24">
          <div className="max-w-[62ch]">
            <h2 className="display-sm">Four pillars. Fourteen focused services.</h2>
            <p className="mt-3 max-w-[56ch] text-[13px] leading-relaxed text-quiet">
              Each pillar groups the support a researcher actually asks for.
              Open a pillar for the full scope, or go straight to a service.
            </p>
          </div>

          <div className="mt-9 grid gap-2 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.slug} delay={index * 0.05}>
                <div
                  className={`group relative flex h-full min-h-[300px] flex-col overflow-hidden border border-line p-5 transition-colors hover:border-ink sm:p-6 ${
                    pillar.slug === "data-analysis" ? "bg-tint" : "bg-surface"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent-text">
                      Pillar {pillar.number} / {pillar.services.length}{" "}
                      {pillar.services.length === 1 ? "service" : "services"}
                    </p>
                    <Link
                      href={`/services/${pillar.slug}`}
                      aria-label={`Open ${pillar.name}`}
                      className="text-quiet transition-colors hover:text-accent-text"
                    >
                      <PiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <h3 className="mt-5 max-w-[24ch] text-[1.4rem] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[1.6rem]">
                    <Link href={`/services/${pillar.slug}`}>{pillar.name}</Link>
                  </h3>
                  <p className="mt-2 max-w-[42ch] text-[12px] leading-relaxed text-quiet">
                    {pillar.tagline}
                  </p>

                  <ul className="mt-5 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                    {pillar.services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${pillar.slug}/${service.slug}`}
                          className="group/link flex items-center gap-2 text-[11.5px] text-quiet transition-colors hover:text-accent-text"
                        >
                          <span
                            className="h-1 w-1 shrink-0 rounded-full bg-line transition-colors group-hover/link:bg-accent"
                            aria-hidden="true"
                          />
                          {service.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {pillar.slug === "data-analysis" && (
                    <svg
                      viewBox="0 0 180 54"
                      className="pointer-events-none absolute bottom-13 right-4 h-12 w-44 opacity-80"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 48 C28 44 36 32 56 36 S86 18 108 22 S144 8 178 4"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M2 50 C30 49 42 42 62 44 S96 34 120 36 S156 26 178 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        opacity="0.4"
                      />
                    </svg>
                  )}

                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
                    <p className="max-w-[34ch] text-[10.5px] leading-relaxed text-quiet">
                      {pillar.outcome}
                    </p>
                    <Link
                      href={`/services/${pillar.slug}`}
                      className="inline-flex shrink-0 items-center gap-1 text-[10.5px] font-medium hover:text-accent-text"
                    >
                      Open pillar
                      <PiArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:py-24">
          <Reveal className="order-2 lg:order-1">
            <AnalysisFigure />
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={0.08}>
            <h2 className="display-sm max-w-[16ch]">
              From raw dataset to a result you can defend.
            </h2>
            <p className="mt-3 max-w-[48ch] text-[13px] leading-relaxed text-quiet">
              Analysis is more than a p-value. We check assumptions, document
              decisions, and explain what the results do and do not support.
            </p>
            <ul className="mt-6 border-t border-line">
              {[
                "Analysis plan mapped to the question",
                "Cleaning, assumption checks, and diagnostics",
                "Publication tables and figures that match",
              ].map((item, index) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-line py-3"
                >
                  <span className="font-mono text-[9px] text-accent-text">
                    0{index + 1}
                  </span>
                  <span className="text-[12.5px]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["SPSS", "R", "Excel", "GraphPad Prism"].map((tool) => (
                <span key={tool} className="chip">
                  {tool}
                </span>
              ))}
            </div>
            <Link
              href="/services/data-analysis"
              className="mt-5 inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
            >
              Explore biostatistics
              <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-[52ch]">
              <h2 className="display-sm">See the difference scope makes.</h2>
              <p className="mt-3 max-w-[54ch] text-[13px] leading-relaxed text-quiet">
                The same evidence, read more clearly. Compare a language edit
                and a data figure rebuild.
              </p>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-quiet">
              Illustrative examples / not client work
            </p>
          </div>
          <div className="mt-7">
            <Reveal>
              <BeforeAfter />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid gap-10 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14 lg:py-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="display-sm max-w-[12ch]">
              A clear handoff, at every step.
            </h2>
            <p className="mt-3 max-w-[38ch] text-[13px] leading-relaxed text-quiet">
              Know what happens next, what you will receive, and who is
              accountable before any files change hands.
            </p>
            <div className="mt-6 border-t border-line pt-4">
              <p className="flex items-start gap-2 text-[10.5px] leading-relaxed text-quiet">
                <PiShieldCheck
                  className="mt-[1px] h-3.5 w-3.5 shrink-0 text-accent-text"
                  aria-hidden="true"
                />
                Documents and datasets are confidential by default. Access is
                limited to the assigned specialist team.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
            >
              How we work
              <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="border-t border-line">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="grid gap-3 border-b border-line py-5 sm:grid-cols-[52px_1fr_140px] sm:items-start sm:gap-5"
              >
                <span className="font-mono text-[10px] text-accent-text">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-[16px] font-medium tracking-[-0.025em]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-[52ch] text-[12px] leading-relaxed text-quiet">
                    {step.text}
                  </p>
                </div>
                <div className="sm:text-right">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-quiet">
                    Output
                  </span>
                  <p className="mt-1 text-[10.5px] text-ink sm:text-right">
                    {step.output}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-[52ch]">
              <h2 className="display-sm">A range before a quote.</h2>
              <p className="mt-3 max-w-[54ch] text-[13px] leading-relaxed text-quiet">
                Set the service, length or dataset size, and deadline. The range
                is useful for planning; a specialist confirms the real scope in
                writing.
              </p>
            </div>
            <Link
              href="/estimate"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
            >
              How estimates work
              <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7">
            <Reveal>
              <Estimator />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-[52ch]">
              <h2 className="display-sm">Useful before you enquire.</h2>
              <p className="mt-3 max-w-[54ch] text-[13px] leading-relaxed text-quiet">
                Practical templates and explainers, written to be used rather
                than downloaded and forgotten.
              </p>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
            >
              Visit the resource hub
              <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-7 grid gap-2 lg:grid-cols-[1.16fr_0.84fr]">
            <Link
              href={`/resources/${featuredResource.slug}`}
              className="group flex flex-col justify-between border border-line bg-surface p-5 transition-colors hover:border-ink sm:p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="chip border-accent/30 text-accent-text">
                    <PiFileText className="h-3 w-3" aria-hidden="true" />
                    {featuredResource.type}
                  </span>
                  <PiArrowUpRight
                    className="h-4 w-4 text-quiet transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 max-w-[18ch] text-[1.5rem] font-medium leading-[1.05] tracking-[-0.04em]">
                  {featuredResource.title}
                </h3>
                <p className="mt-2 max-w-[46ch] text-[12px] leading-relaxed text-quiet">
                  {featuredResource.summary}
                </p>
              </div>

              <div className="mt-7">
                <div className="grid grid-cols-4 gap-1.5" aria-hidden="true">
                  {["Identified", "Screened", "Assessed", "Included"].map(
                    (label, index) => (
                      <div
                        key={label}
                        className={`border border-line p-2 ${
                          index === 3 ? "border-ink bg-ink text-page" : "bg-tint"
                        }`}
                      >
                        <p className="font-mono text-[7px] uppercase tracking-[0.08em] opacity-60">
                          {label}
                        </p>
                        <p className="mt-1 font-mono text-[13px] tabular-nums">
                          {["1,240", "1,054", "138", "42"][index]}
                        </p>
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-quiet">
                    <PiClock className="h-3 w-3" aria-hidden="true" />
                    {featuredResource.readTime} read
                  </span>
                  <span className="text-[10px] font-medium">Open resource</span>
                </div>
              </div>
            </Link>

            <div className="grid gap-2">
              {sideResources.map((resource) => (
                <Link
                  key={resource.slug}
                  href={`/resources/${resource.slug}`}
                  className="group flex flex-col justify-between border border-line bg-surface p-5 transition-colors hover:border-ink"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-text">
                        {resource.type}
                      </span>
                      <PiArrowUpRight
                        className="h-3.5 w-3.5 text-quiet transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-[-0.025em]">
                      {resource.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-quiet">
                      {resource.summary}
                    </p>
                  </div>
                  <span className="mt-3 flex items-center gap-1.5 border-t border-line pt-2.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-quiet">
                    <PiClock className="h-3 w-3" aria-hidden="true" />
                    {resource.readTime} read
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 className="display-sm max-w-[13ch]">
                Support with a clear ethical line.
              </h2>
              <p className="mt-3 max-w-[40ch] text-[13px] leading-relaxed text-quiet">
                Good support makes the work clearer. It does not invent the work,
                hide its limits, or claim an outcome the journal controls.
              </p>
              <Link
                href="/about#integrity"
                className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
              >
                Read our approach
                <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: PiShieldCheck,
                  title: "Confidential",
                  text: "Documents and datasets are not shared outside the assigned specialist team.",
                },
                {
                  icon: PiScales,
                  title: "Authorship stays yours",
                  text: "We support the work. Authors remain responsible for the science, approval, and disclosure.",
                },
                {
                  icon: PiSealCheck,
                  title: "No guarantees",
                  text: "We do not guarantee acceptance, significance, or a detector score.",
                },
              ].map((item) => (
                <div key={item.title} className="border-t border-line pt-4">
                  <item.icon className="h-4 w-4 text-accent-text" aria-hidden="true" />
                  <h3 className="mt-3 text-[13px] font-medium">{item.title}</h3>
                  <p className="mt-1.5 text-[10.5px] leading-relaxed text-quiet">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
