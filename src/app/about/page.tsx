import type { Metadata } from "next";
import Link from "next/link";
import {
  PiArrowUpRight,
  PiCheck,
  PiEnvelopeSimple,
  PiFileText,
  PiScales,
  PiSealCheck,
  PiShieldCheck,
  PiUsersThree,
} from "react-icons/pi";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — careful support, explicit boundaries",
  description:
    "How Scientific-Scribe works: written scopes, confidential handling, author responsibility, and an explicit ethical line on AI, similarity, and guaranteed outcomes.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    icon: PiFileText,
    title: "Scope before work",
    text: "Every engagement starts with a written brief: deliverables, assumptions, timeline, price, and what is not included.",
  },
  {
    icon: PiUsersThree,
    title: "The right specialist",
    text: "Work is assigned to a specialist with the relevant method or journal experience, not routed through a generic pool.",
  },
  {
    icon: PiShieldCheck,
    title: "Confidential by default",
    text: "Documents and datasets are limited to the assigned team. Files are not used for training, promotion, or examples.",
  },
  {
    icon: PiScales,
    title: "Authorship stays with you",
    text: "Support improves the work. Responsibility for the science, interpretation, approval, and disclosure remains with the author.",
  },
];

const integrity = [
  {
    title: "We do not fabricate or alter data",
    text: "If the evidence does not support a claim, we say so and revise the claim. We do not invent results, citations, or methods.",
  },
  {
    title: "We do not guarantee acceptance",
    text: "Journal decisions depend on the science, fit, and peer review. We can improve clarity and compliance, not control the outcome.",
  },
  {
    title: "We do not help evade integrity checks",
    text: "AI revision is a language service, not an authorship disguise. Similarity review repairs attribution; it does not target a score.",
  },
  {
    title: "We do not hide AI use",
    text: "If a journal requires disclosure of AI-assisted editing, that remains the author's responsibility. We will point to the policy, not around it.",
  },
  {
    title: "Consent and ethics stay with the team",
    text: "For case reports and human data, the treating or research team remains responsible for consent and ethics approvals.",
  },
  {
    title: "We flag uncertainty rather than guess",
    text: "Ambiguous scientific statements are queried. A clear question is better than a confident sentence the evidence cannot carry.",
  },
];

const boundaries = [
  ["We do", "Develop arguments, structure manuscripts, edit language, check compliance, analyse data, and document decisions."],
  ["We do not", "Ghostwrite as a substitute author, fabricate data, remove legitimate citations, or promise a journal outcome."],
  ["You approve", "Every substantive change, the final text, the author list, and the submission itself."],
  ["You keep", "Raw data, consent records, ethics approvals, and responsibility for disclosure."],
];

const faqs = [
  {
    question: "Who actually does the work?",
    answer:
      "A named specialist with relevant subject or methods experience is assigned to the scope. The written brief states the lead and the review route.",
  },
  {
    question: "Is my document used as an example?",
    answer:
      "No. Client documents and datasets are not used for marketing, training, or illustrative examples. The examples on this site are constructed teaching examples, not client work.",
  },
  {
    question: "Can you work to a journal's deadline?",
    answer:
      "Often, if the scope and files are ready. Deadlines are agreed in writing, and availability is confirmed before the timeline is promised.",
  },
  {
    question: "What if the project changes midway?",
    answer:
      "A material change in scope is re-quoted before the extra work begins. Minor queries inside the agreed scope are handled without a change order.",
  },
  {
    question: "Do you sign confidentiality agreements?",
    answer:
      "Yes, where an institution or funder requires one. Send the document with the first brief and it can be reviewed before files are shared.",
  },
];

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Scientific-Scribe",
    url: `${site.url}/about`,
    description:
      "How Scientific-Scribe scopes research support, handles confidentiality, and draws its ethical boundaries.",
    mainEntity: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
      slogan: site.tagline,
    },
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
          <Breadcrumbs items={[{ label: "About" }]} />
          <div className="mt-7 grid gap-9 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="meta">About</p>
              <h1 className="display mt-4 max-w-[15ch]">
                Careful support,{" "}
                <span className="text-quiet">explicit boundaries.</span>
              </h1>
              <p className="lede mt-5">
                Scientific-Scribe exists for the part of research that is hard to
                name: the argument that will not hold, the journal rules that do
                not match the draft, the analysis that needs a defensible
                method. The work is to make that part clearer, not to pretend it
                is easy.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link href="/contact" className="btn btn-primary">
                  Request a scope check
                  <PiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="#integrity" className="btn btn-outline">
                  Read the integrity line
                </Link>
              </div>
            </div>

            <div className="border border-line bg-surface">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <p className="meta">At a glance</p>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-text">
                  Practice note
                </span>
              </div>
              <dl className="divide-y divide-line">
                {[
                  ["Focus", "Academic research and publication support"],
                  ["Pillars", "Four"],
                  ["Services", "Fourteen"],
                  ["Engagement", "Written scope, then work"],
                  ["Confidentiality", "Default, not an add-on"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-4 px-4 py-2.5">
                    <dt className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-quiet">
                      {label}
                    </dt>
                    <dd className="text-right text-[11px] leading-snug">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-12">
            <div>
              <p className="meta">Position</p>
              <h2 className="display-sm mt-3 max-w-[12ch]">
                A methodologist, not a mill.
              </h2>
            </div>
            <div className="space-y-4">
              <p className="max-w-[68ch] text-[14px] leading-[1.7] text-quiet">
                The site is built around a simple premise: researchers do not need
                a longer list of services. They need to know which scope applies,
                what it produces, and where the responsibility sits. That is why
                every service page ends with a deliverables checklist, a
                service-specific FAQ, and a direct route to a written brief.
              </p>
              <p className="max-w-[68ch] text-[14px] leading-[1.7] text-quiet">
                It is also why the language is deliberately plain. A scope that
                cannot be explained without jargon is usually a scope that has not
                been thought through.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="flex h-full flex-col border border-line bg-surface p-4">
                  <item.icon
                    className="h-4 w-4 text-accent-text"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-[13px] font-medium">{item.title}</h3>
                  <p className="mt-1.5 text-[10.5px] leading-relaxed text-quiet">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="integrity" className="scroll-mt-24 border-b border-line bg-tint">
        <div className="shell py-14 lg:py-18">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="meta">Ethics &amp; integrity</p>
              <h2 className="display-sm mt-3 max-w-[18ch]">
                The line is part of the service.
              </h2>
              <p className="mt-3 max-w-[56ch] text-[12.5px] leading-relaxed text-quiet">
                Academic support is only trustworthy if its limits are stated as
                clearly as its deliverables. These are the limits.
              </p>
            </div>
            <span className="chip border-accent/40 text-accent-text">
              <PiSealCheck className="h-3 w-3" aria-hidden="true" />
              Non-negotiable
            </span>
          </div>

          <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {integrity.map((item, index) => (
              <div key={item.title} className="bg-surface p-4 sm:p-5">
                <p className="font-mono text-[9px] text-accent-text">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2.5 text-[13px] font-medium leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-quiet">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-line bg-surface">
            <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {boundaries.map(([label, text]) => (
                <div key={label} className="bg-surface p-4">
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-accent-text">
                    {label}
                  </p>
                  <p className="mt-2 text-[10.5px] leading-relaxed text-quiet">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid gap-10 py-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <div>
            <p className="meta">Working together</p>
            <h2 className="display-sm mt-3 max-w-[13ch]">
              What the first week looks like.
            </h2>
            <p className="mt-3 max-w-[38ch] text-[12px] leading-relaxed text-quiet">
              The same sequence applies whether the work is a manuscript, a
              submission package, or a dataset.
            </p>
            <div className="mt-5 border-t border-line pt-4">
              <p className="flex items-start gap-2 text-[10.5px] leading-relaxed text-quiet">
                <PiEnvelopeSimple
                  className="mt-[1px] h-3.5 w-3.5 shrink-0 text-accent-text"
                  aria-hidden="true"
                />
                Keep confidential files out of the first email. A secure route is
                agreed after the scope conversation.
              </p>
              <a
                href={mailto("General enquiry")}
                className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
              >
                {site.email}
                <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="border-t border-line">
            {[
              {
                number: "01",
                title: "Send a short brief",
                text: "Research stage, target journal, word count or dataset size, nearest deadline, and the specific problem.",
              },
              {
                number: "02",
                title: "Take a 20-minute call, if useful",
                text: "Not mandatory. It is the fastest way to resolve a cross-pillar question or an unclear dataset.",
              },
              {
                number: "03",
                title: "Receive the written scope",
                text: "Deliverables, assumptions, exclusions, timeline, and price in one document. Nothing is charged before approval.",
              },
              {
                number: "04",
                title: "Work begins, with a handoff",
                text: "Files move through an agreed channel, work is reviewed by the lead, and you receive the outputs and a summary.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="grid gap-2 border-b border-line py-4 sm:grid-cols-[48px_1fr] sm:gap-5"
              >
                <span className="font-mono text-[10px] text-accent-text">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-[14px] font-medium tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-1 max-w-[56ch] text-[11.5px] leading-relaxed text-quiet">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell grid gap-10 py-14 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
          <div>
            <p className="meta">Questions</p>
            <h2 className="display-sm mt-3 max-w-[13ch]">
              The practical ones.
            </h2>
            <p className="mt-3 max-w-[34ch] text-[12px] leading-relaxed text-quiet">
              If your question is about a specific manuscript or dataset, send a
              brief instead.
            </p>
            <Link href="/contact" className="btn btn-outline btn-sm mt-4">
              Request a scope check
              <PiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-[11px] leading-relaxed text-quiet">
            <PiCheck
              className="mt-[1px] h-3.5 w-3.5 shrink-0 text-accent-text"
              aria-hidden="true"
            />
            Read the{" "}
            <Link href="/privacy" className="link-underline">
              privacy notes
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="link-underline">
              terms
            </Link>{" "}
            for the formal version.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
          >
            Browse all services
            <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
