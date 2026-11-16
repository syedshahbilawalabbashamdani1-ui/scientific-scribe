import type { Metadata } from "next";
import Link from "next/link";
import { PiArrowUpRight, PiInfo, PiShieldCheck } from "react-icons/pi";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { MagneticButton } from "@/components/magnetic-button";
import { ServiceMatcher } from "@/components/service-matcher";
import { site } from "@/lib/site";
import { pillars, researchNeeds, researchStages } from "@/lib/services";

export const metadata: Metadata = {
  title: "Find your path — service matcher",
  description:
    "Two questions, one route. Match your research stage and need to the Scientific-Scribe service most likely to help, then read the scope before you enquire.",
  alternates: { canonical: "/match" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Scientific-Scribe service matcher",
  url: `${site.url}/match`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "A two-step matcher that maps research stage and need to a relevant research support service.",
};

export default function MatchPage() {
  return (
    <>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden border-b border-line">
        <div
          className="grid-paper pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Find your path" }]} />
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="meta">Service matcher</p>
              <h1 className="display mt-4 max-w-[15ch]">
                Two questions.{" "}
                <span className="text-quiet">A defensible next step.</span>
              </h1>
              <p className="lede mt-5">
                Choose where you are and what is asking for attention. The
                matcher narrows the route; a scope conversation confirms it.
              </p>
            </div>
            <div className="border-t border-line pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="meta">How it decides</p>
              <ul className="mt-3 space-y-2.5">
                {[
                  "Stage sets the context and the likely timing.",
                  "Need sets the type of work: writing, data, compliance, or language.",
                  "The result names a primary service and a nearby alternative.",
                ].map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[11.5px] leading-snug text-quiet"
                  >
                    <span className="mt-[1px] font-mono text-[9px] text-accent-text">
                      0{index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:gap-12">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="meta">Reference</p>
              <h2 className="mt-3 text-[1.65rem] font-medium leading-[1.05] tracking-[-0.04em]">
                The two axes behind the result.
              </h2>

              <div className="mt-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                  Stage
                </p>
                <ol className="mt-2 border-t border-line">
                  {researchStages.map((stage, index) => (
                    <li
                      key={stage.id}
                      className="flex items-baseline gap-3 border-b border-line py-2"
                    >
                      <span className="font-mono text-[9px] text-quiet">
                        0{index + 1}
                      </span>
                      <span className="text-[11.5px]">{stage.label}</span>
                      <span className="ml-auto hidden text-right text-[9.5px] text-quiet sm:block">
                        {stage.hint}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                  Need
                </p>
                <ol className="mt-2 border-t border-line">
                  {researchNeeds.map((need, index) => (
                    <li
                      key={need.id}
                      className="flex items-baseline gap-3 border-b border-line py-2"
                    >
                      <span className="font-mono text-[9px] text-quiet">
                        0{index + 1}
                      </span>
                      <span className="text-[11.5px]">{need.label}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 flex items-start gap-2 border border-line bg-surface p-3.5">
                <PiInfo
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-text"
                  aria-hidden="true"
                />
                <p className="text-[10.5px] leading-relaxed text-quiet">
                  The matcher is a heuristic, not an assessment of your
                  research. It never asks for files or personal data.
                </p>
              </div>
            </div>

            <ServiceMatcher />
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-12 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
            <div>
              <p className="meta">If the result is unclear</p>
              <h2 className="display-sm mt-3 max-w-[14ch]">
                Skip the matcher and ask.
              </h2>
              <p className="mt-3 max-w-[36ch] text-[12px] leading-relaxed text-quiet">
                A methodologist can read a short brief and name the route. That
                is the right option when the project crosses pillars.
              </p>
              <MagneticButton
                href="/contact"
                className="btn btn-primary btn-sm"
                wrapperClassName="mt-4 inline-flex"
              >
                Request a scope check
                <PiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </MagneticButton>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <Link
                  key={pillar.slug}
                  href={`/services/${pillar.slug}`}
                  className="group flex flex-col justify-between border border-line bg-surface p-4 transition-colors hover:border-ink hover:bg-tint"
                >
                  <div>
                    <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-text">
                      Pillar {pillar.number}
                    </p>
                    <h3 className="mt-2 text-[13px] font-medium leading-snug">
                      {pillar.name}
                    </h3>
                    <p className="mt-1.5 text-[10.5px] leading-relaxed text-quiet">
                      {pillar.tagline}
                    </p>
                  </div>
                  <span className="mt-4 flex items-center gap-1 border-t border-line pt-2.5 text-[10px] font-medium">
                    {pillar.services.length} services
                    <PiArrowUpRight
                      className="ml-auto h-3 w-3 text-quiet transition-colors group-hover:text-accent-text"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-[11px] leading-relaxed text-quiet">
            <PiShieldCheck
              className="mt-[1px] h-3.5 w-3.5 shrink-0 text-accent-text"
              aria-hidden="true"
            />
            The matcher runs in your browser. Nothing is submitted or stored.
          </p>
          <Link
            href="/estimate"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
          >
            Next: plan a budget range
            <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
