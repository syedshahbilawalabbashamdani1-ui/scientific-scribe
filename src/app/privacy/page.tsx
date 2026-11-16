import type { Metadata } from "next";
import Link from "next/link";
import { PiArrowUpRight, PiEnvelopeSimple } from "react-icons/pi";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy — what this site does and does not collect",
  description:
    "How Scientific-Scribe handles enquiries, documents, and the small amount of data stored in your browser. No analytics, no accounts, no tracking cookies.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    id: "summary",
    title: "The short version",
    body: [
      "This website does not have accounts, analytics scripts, advertising pixels, or tracking cookies. The contact form does not submit to a server; it composes a message in your own email application.",
      "The only information we receive is what you choose to send us by email. The only information stored in your browser is your theme preference.",
    ],
  },
  {
    id: "website",
    title: "When you use the website",
    body: [
      "Theme preference: the light or dark setting is stored in your browser's local storage under the key `theme`. It stays on your device and is not sent to us.",
      "Clipboard: some tools offer a copy button. The clipboard is written only when you activate that button, and only with the text shown on screen.",
      "Estimator and matcher: calculations run in your browser. Inputs are not transmitted or saved.",
      "Server logs: the hosting provider may process standard technical logs such as IP address, user agent, and requested URL for security and reliability. These are not used to build a profile of you.",
    ],
  },
  {
    id: "enquiries",
    title: "When you contact us",
    body: [
      "We receive the name, email address, institution or role, research stage, service, deadline, and project description you include in your message, plus anything in the email itself.",
      "We use this information to reply, assess fit, prepare a scope and quote, and keep a record of the engagement. We do not sell it, rent it, or add you to a marketing list without a separate, explicit opt-in.",
      "Enquiry correspondence is kept for as long as needed to respond and, if an engagement follows, for the period required by the applicable contract and record-keeping obligations. Enquiries that do not proceed are deleted on a reasonable schedule.",
    ],
  },
  {
    id: "documents",
    title: "Manuscripts, datasets, and confidential material",
    body: [
      "Do not send confidential files in the first email. A secure transfer route is agreed after the scope conversation.",
      "Documents and datasets provided for an engagement are treated as confidential and are available only to the assigned specialist team. They are not used for marketing, model training, or public examples.",
      "Where an institution or funder requires a confidentiality agreement, it can be reviewed before files are shared.",
      "You are responsible for removing patient identifiers and for having the authority to share the material you send.",
    ],
  },
  {
    id: "processors",
    title: "Service providers",
    body: [
      "We rely on an email provider and a website host to operate. Those providers process data on our instructions and under their own security and privacy terms.",
      "If an engagement requires a specific transfer or collaboration platform, it is named in the written scope so you know where files will be held.",
      "We do not use third-party advertising or behavioural analytics services on this site.",
    ],
  },
  {
    id: "rights",
    title: "Your choices and rights",
    body: [
      "Where data protection law applies to you, you may ask for access to the personal data we hold about you, correction of inaccurate data, deletion where there is no overriding obligation to retain it, or restriction of processing.",
      "You may also object to processing based on legitimate interests, and you may withdraw consent where processing relies on consent.",
      "To make a request, email us with enough detail for us to identify the relevant correspondence. We may need to verify your identity before acting.",
      "If you are not satisfied with our response, you may complain to the data protection authority in your jurisdiction.",
    ],
  },
  {
    id: "security",
    title: "Security and retention",
    body: [
      "Access to engagement material is limited to the assigned team. We use access controls, agreed transfer routes, and routine deletion rather than keeping everything indefinitely.",
      "No system is perfectly secure. If a breach affects your information, we will notify affected parties and the relevant authority where the law requires it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this notice",
    body: [
      "If the way this site handles data changes, this page will be updated and the revision date below will change. Material changes affecting an active engagement will also be communicated directly.",
      "This site is intended for professional and academic audiences and is not directed at children.",
    ],
  },
];

export default function PrivacyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy notice",
    url: `${site.url}/privacy`,
    description:
      "Privacy notice for the Scientific-Scribe website and enquiry process.",
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
          <Breadcrumbs items={[{ label: "Privacy" }]} />
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="meta">Privacy notice</p>
              <h1 className="display mt-4 max-w-[16ch]">
                Fewer collectors.{" "}
                <span className="text-quiet">Clearer handling.</span>
              </h1>
              <p className="lede mt-5">
                This notice explains what the website stores, what an email
                enquiry contains, and how engagement material is handled.
              </p>
            </div>
            <div className="border-t border-line pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <dl className="space-y-2.5">
                {[
                  ["Last updated", "16 November 2026"],
                  ["Analytics", "None"],
                  ["Tracking cookies", "None"],
                  ["Stored locally", "Theme preference"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet">
                      {label}
                    </dt>
                    <dd className="text-right text-[11px]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid gap-10 py-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14 lg:py-16">
          <nav aria-label="Privacy notice contents" className="lg:sticky lg:top-24 lg:self-start">
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
                Contact for privacy requests
              </p>
              <a
                href={mailto("Privacy request")}
                className="mt-2 inline-flex items-center gap-2 text-[12px] font-medium hover:text-accent-text"
              >
                <PiEnvelopeSimple className="h-4 w-4" aria-hidden="true" />
                {site.email}
              </a>
              <p className="mt-2 text-[10.5px] leading-relaxed text-quiet">
                Include “Privacy request” in the subject line and the address you
                used to contact us, if different.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] leading-relaxed text-quiet">
            The formal engagement terms are separate from this notice.
          </p>
          <Link
            href="/terms"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
          >
            Read the terms
            <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
