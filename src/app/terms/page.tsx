import type { Metadata } from "next";
import Link from "next/link";
import { PiArrowUpRight, PiEnvelopeSimple, PiScales } from "react-icons/pi";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms — scope, responsibility, and limits",
  description:
    "The plain-language terms that apply to Scientific-Scribe enquiries and engagements: quotes, revisions, confidentiality, authorship, and the limits of the service.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    id: "website",
    title: "This website",
    body: [
      "The site describes research support services and provides free planning tools. The tools are informational. They do not create an engagement, an offer, or a professional opinion about your research.",
      "Estimates and matcher results are indicative. A written scope prepared after review is the authoritative description of any service.",
    ],
  },
  {
    id: "engagement",
    title: "How an engagement begins",
    body: [
      "An engagement begins only when both parties accept a written scope that sets out the deliverables, assumptions, exclusions, timeline, fee, and revision allowance.",
      "No payment is collected through this website. Payment terms, currency, and invoicing are stated in the written scope or a separate agreement.",
      "Work outside the accepted scope is quoted before it starts. A material change in the research question, dataset, or target journal may require a new scope.",
    ],
  },
  {
    id: "responsibilities",
    title: "Your responsibilities",
    body: [
      "You confirm that you are authorised to share the material you provide and that you have the rights needed for us to work on it.",
      "You remain responsible for the accuracy of the research, the data, the citations, the author list, ethics approvals, consent, and any required disclosures.",
      "You approve every substantive change and the final version before submission or use. We do not submit manuscripts or communicate with journals on your behalf unless the scope explicitly authorises it.",
    ],
  },
  {
    id: "integrity",
    title: "Academic integrity",
    body: [
      "We do not fabricate or falsify data, invent citations, remove legitimate attribution to reduce a similarity score, or misrepresent authorship.",
      "We do not guarantee journal acceptance, peer-review outcomes, statistical significance, or the output of any AI or similarity detector.",
      "Where a journal, institution, or funder requires disclosure of AI-assisted editing or other support, compliance with that requirement remains your responsibility.",
      "We may decline work that asks us to breach these limits.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: [
      "We treat manuscripts, datasets, and related material as confidential and limit access to the assigned specialist team.",
      "We do not use client material for marketing, model training, or public examples. Illustrative examples on this site are constructed teaching examples, not client work.",
      "You are responsible for de-identifying patient material before transfer. A separate confidentiality agreement can be put in place where required.",
    ],
  },
  {
    id: "delivery",
    title: "Delivery and revisions",
    body: [
      "Timelines are agreed in writing and depend on receiving complete, readable files and timely answers to queries. Delays in either can move the delivery date.",
      "One structured revision round is included unless the scope says otherwise. Additional rounds, new analyses, and new sections are new scope.",
      "Files are delivered in the formats named in the scope. We are not responsible for changes made after handoff or for formatting introduced by a journal's production process.",
    ],
  },
  {
    id: "fees",
    title: "Fees, cancellation, and refunds",
    body: [
      "Fees are quoted in the currency stated in the scope. Taxes, journal fees, open-access charges, and software licences are excluded unless explicitly included.",
      "If you cancel after work has begun, fees are payable for work completed and for any non-recoverable commitments already made. The scope states the cancellation terms that apply.",
      "If we cannot complete the agreed scope, we will say so promptly and agree a fair resolution, including a refund of fees for undelivered work.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: [
      "You retain ownership of your research material and of the final work product, subject to payment of agreed fees.",
      "We retain ownership of our underlying templates, checklists, methods, and know-how, and may reuse general approaches that do not contain your confidential material.",
      "Third-party material remains subject to its own licence. You are responsible for obtaining permission to reproduce it.",
    ],
  },
  {
    id: "liability",
    title: "Limits of liability",
    body: [
      "The service is professional support, not a warranty of an academic or commercial outcome. To the extent permitted by law, our liability for any engagement is limited to the fees paid for that engagement.",
      "We are not liable for indirect or consequential loss, including lost opportunities, rejected submissions, or reputational effects.",
      "Nothing in these terms excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    id: "law",
    title: "Governing terms",
    body: [
      "The governing law, venue, and any dispute-resolution process are confirmed in the written scope or engagement agreement. Where no separate agreement applies, the parties will first attempt to resolve the matter in good faith.",
      "If any provision is found unenforceable, the remaining provisions continue to apply.",
      "These terms may be updated. The version in effect when a scope is accepted governs that engagement.",
    ],
  },
];

export default function TermsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms",
    url: `${site.url}/terms`,
    description:
      "Terms for Scientific-Scribe enquiries and research support engagements.",
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden border-b border-line">
        <div
          className="grid-paper pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative py-10 sm:py-12">
          <Breadcrumbs items={[{ label: "Terms" }]} />
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="meta">Terms</p>
              <h1 className="display mt-4 max-w-[15ch]">
                Clear scope.{" "}
                <span className="text-quiet">Honest limits.</span>
              </h1>
              <p className="lede mt-5">
                The short version: you approve a written scope, you keep
                responsibility for the research, and no one promises a journal
                outcome.
              </p>
            </div>
            <div className="border-t border-line pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <div className="flex items-start gap-2.5">
                <PiScales
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-text"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet">
                    Last updated
                  </p>
                  <p className="mt-1 text-[11.5px]">16 November 2026</p>
                  <p className="mt-2 text-[10px] leading-relaxed text-quiet">
                    This page is a plain-language summary. The accepted written
                    scope and any signed agreement take precedence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid gap-10 py-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14 lg:py-16">
          <nav aria-label="Terms contents" className="lg:sticky lg:top-24 lg:self-start">
            <p className="meta">Contents</p>
            <ol className="mt-3 border-t border-line">
              {sections.map((section, index) => (
                <li key={section.id} className="border-b border-line">
                  <a
                    href={`#${section.id}`}
                    className="flex items-baseline gap-3 py-2.5 text-[11.5px] text-quiet transition-colors hover:text-ink"
                  >
                    <span className="font-mono text-[9px] text-accent-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-[72ch]">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border-t border-line pt-5 pb-7 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[9px] text-accent-text">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[1.15rem] font-medium tracking-[-0.03em]">
                    {section.title}
                  </h2>
                </div>
                <div className="mt-3 space-y-3 pl-0 sm:pl-7">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[12.5px] leading-[1.75] text-quiet"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <div className="mt-4 border border-line bg-tint p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                Questions about the terms
              </p>
              <a
                href={mailto("Terms question")}
                className="mt-2 inline-flex items-center gap-2 text-[12px] font-medium hover:text-accent-text"
              >
                <PiEnvelopeSimple className="h-4 w-4" aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] leading-relaxed text-quiet">
            For how enquiries and files are handled, read the privacy notice.
          </p>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
          >
            Privacy notice
            <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
