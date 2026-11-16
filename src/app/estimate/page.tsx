import type { Metadata } from "next";
import Link from "next/link";
import {
  PiArrowUpRight,
  PiCheck,
  PiClock,
  PiCurrencyDollar,
  PiInfo,
  PiWarningCircle,
} from "react-icons/pi";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { Estimator } from "@/components/estimator";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import { formatPriceRange, pillars, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Planning estimate — transparent ranges, confirmed scope",
  description:
    "Set the service, word count or dataset size, deadline, and add-ons to see an indicative planning range. A written quote follows the scope review.",
  alternates: { canonical: "/estimate" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Scientific-Scribe planning estimator",
  url: `${site.url}/estimate`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "An indicative price-range estimator for academic research support services.",
};

const assumptions = [
  "Prices are in USD and exclude taxes, journal fees, open-access charges, and third-party licences.",
  "Word ranges assume a reasonably complete draft. Rebuilding an argument or writing from raw notes is quoted after review.",
  "Dataset ranges assume a clean codebook. Merging sources, complex missingness, or multi-level models can change the figure.",
  "One structured revision round is included. Additional rounds and new analyses are new scope.",
  "Priority and express timelines depend on specialist availability and are confirmed in writing.",
];

const notIncluded = [
  "Journal submission fees, APCs, or waiver negotiations",
  "Statistical software licences",
  "Primary data collection or ethics approval",
  "Guaranteed acceptance, significance, or similarity scores",
];

export default function EstimatePage() {
  return (
    <>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden border-b border-line">
        <div
          className="grid-paper pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Estimate" }]} />
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="meta">Planning estimator</p>
              <h1 className="display mt-4 max-w-[16ch]">
                A range before{" "}
                <span className="text-quiet">a real quote.</span>
              </h1>
              <p className="lede mt-5">
                Use the estimator to test a budget. The confirmed figure comes
                from a scope review, not from a slider.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px border border-line bg-line">
              {[
                ["Currency", "USD"],
                ["Basis", "Indicative"],
                ["Includes", "1 revision"],
                ["Binding", "No"],
              ].map(([label, value]) => (
                <div key={label} className="bg-surface p-3.5">
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet">
                    {label}
                  </p>
                  <p className="mt-1.5 text-[13px] font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell py-10 sm:py-14">
          <Estimator compact />
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid gap-10 py-14 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:py-16">
          <div>
            <div className="flex items-center gap-2">
              <PiCheck className="h-4 w-4 text-accent-text" aria-hidden="true" />
              <h2 className="text-[16px] font-medium tracking-[-0.025em]">
                What the range assumes
              </h2>
            </div>
            <ul className="mt-4 border-t border-line">
              {assumptions.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-line py-3"
                >
                  <span className="mt-[2px] font-mono text-[9px] text-accent-text">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12px] leading-relaxed text-quiet">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <PiWarningCircle
                className="h-4 w-4 text-accent-text"
                aria-hidden="true"
              />
              <h2 className="text-[16px] font-medium tracking-[-0.025em]">
                What it does not include
              </h2>
            </div>
            <ul className="mt-4 border-t border-line">
              {notIncluded.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-line py-3"
                >
                  <span className="mt-[2px] font-mono text-[9px] text-accent-text">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12px] leading-relaxed text-quiet">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-start gap-2 border border-line bg-surface p-3.5">
              <PiInfo
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-text"
                aria-hidden="true"
              />
              <p className="text-[10.5px] leading-relaxed text-quiet">
                If the estimator and a written quote disagree, the written quote
                applies. The estimator is a planning aid, not an offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-14 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="meta">Published starting points</p>
              <h2 className="display-sm mt-3">
                Every service, one reference table.
              </h2>
              <p className="mt-2 max-w-[52ch] text-[12px] leading-relaxed text-quiet">
                Ranges are indicative. The estimator above applies word or row
                counts; this table shows the base logic.
              </p>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-quiet">
              USD · updated for planning
            </span>
          </div>

          <div className="mt-7 overflow-x-auto border border-line">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <caption className="sr-only">
                Indicative pricing logic by Scientific-Scribe service.
              </caption>
              <thead>
                <tr className="border-b border-line bg-tint">
                  {["Service", "Pillar", "Pricing basis", "Indicative range"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.1em] text-quiet"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {services.map((service) => {
                  const pillar = pillars.find(
                    (item) => item.slug === service.pillar,
                  );
                  const pricing =
                    service.pricing.unit === "word"
                      ? `$${service.pricing.perWordLow.toFixed(3)}–$${service.pricing.perWordHigh.toFixed(3)} / word`
                      : service.pricing.unit === "dataset"
                        ? "Base + rows"
                        : "Fixed scope";
                  const range =
                    service.pricing.unit === "fixed"
                      ? formatPriceRange(
                          service.pricing.low,
                          service.pricing.high,
                        )
                      : `From ${formatPriceRange(
                          service.pricing.minimum,
                          service.pricing.minimum,
                        )}`;
                  return (
                    <tr
                      key={service.slug}
                      className="border-b border-line last:border-b-0"
                    >
                      <th scope="row" className="px-3 py-2.5 font-normal">
                        <Link
                          href={`/services/${service.pillar}/${service.slug}`}
                          className="text-[11.5px] hover:text-accent-text"
                        >
                          {service.shortTitle}
                        </Link>
                      </th>
                      <td className="px-3 py-2.5 text-[10.5px] text-quiet">
                        {pillar?.shortName}
                      </td>
                      <td className="px-3 py-2.5 font-mono text-[10px] text-quiet">
                        {pricing}
                      </td>
                      <td className="px-3 py-2.5 font-mono text-[10px] tabular-nums">
                        {range}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell grid gap-6 py-10 sm:py-12 lg:grid-cols-3">
          {[
            {
              icon: PiCurrencyDollar,
              title: "No hidden line items",
              text: "The written quote lists fees, revisions, and exclusions before you approve.",
            },
            {
              icon: PiClock,
              title: "Deadline is part of scope",
              text: "Priority changes availability and price; it never changes the rigour.",
            },
            {
              icon: PiArrowUpRight,
              title: "Quote, then decide",
              text: "You are not committed until you approve the written scope and timeline.",
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

      <CtaBand
        title="Turn the range into a written quote."
        text="Send the service, word count or dataset size, and deadline. We will confirm the scope and return a fixed quote and timeline."
        note="No payment is collected through this site."
      />
    </>
  );
}
