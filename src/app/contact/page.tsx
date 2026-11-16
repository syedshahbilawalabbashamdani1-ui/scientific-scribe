import type { Metadata } from "next";
import Link from "next/link";
import {
  PiArrowUpRight,
  PiCheck,
  PiClock,
  PiEnvelopeSimple,
  PiFileText,
  PiShieldCheck,
} from "react-icons/pi";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — request a scope check",
  description:
    "Send a short brief and receive a written scope, timeline, and quote. Confidential by default, with no files required in the first email.",
  alternates: { canonical: "/contact" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Scientific-Scribe",
  url: `${site.url}/contact`,
  description:
    "Request a written scope check for academic research and publication support.",
  mainEntity: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      availableLanguage: ["English"],
    },
  },
};

const include = [
  "The research stage you are at",
  "The target journal or audience, if known",
  "Word count or dataset size",
  "The nearest real deadline",
  "The specific problem you want solved",
];

const notYet = [
  "Patient-identifiable material",
  "Unredacted clinical records",
  "Full datasets before a secure route is agreed",
  "Documents you are not authorised to share",
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden border-b border-line">
        <div
          className="grid-paper pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="meta">Scope check</p>
              <h1 className="display mt-4 max-w-[14ch]">
                Tell us what the work{" "}
                <span className="text-quiet">actually needs.</span>
              </h1>
              <p className="lede mt-5">
                A short brief is enough to start. You will get a written scope,
                timeline, and quote before any work begins.
              </p>
            </div>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-1">
              {[
                {
                  icon: PiClock,
                  label: "Reply time",
                  value: site.responseTime,
                },
                {
                  icon: PiShieldCheck,
                  label: "Handling",
                  value: "Confidential by default",
                },
                {
                  icon: PiFileText,
                  label: "First step",
                  value: "Written scope, no charge",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5 bg-surface p-3.5">
                  <item.icon
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-text"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[11.5px] leading-snug">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell grid gap-8 py-10 sm:py-14 lg:grid-cols-[1.32fr_0.68fr] lg:gap-12">
          <ContactForm />

          <aside className="space-y-5">
            <div className="border border-line bg-surface p-4">
              <div className="flex items-center gap-2">
                <PiFileText
                  className="h-3.5 w-3.5 text-accent-text"
                  aria-hidden="true"
                />
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                  What to include
                </p>
              </div>
              <ul className="mt-3 space-y-2">
                {include.map((item) => (
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
            </div>

            <div className="border border-line bg-surface p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                Not in the first email
              </p>
              <ul className="mt-3 space-y-2">
                {notYet.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[11px] leading-snug text-quiet"
                  >
                    <span
                      className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-quiet"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-line pt-3 text-[10px] leading-relaxed text-quiet">
                If the file is confidential, say so and we will agree a secure
                route first.
              </p>
            </div>

            <div className="border border-line bg-surface p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                Prefer email?
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 flex items-center gap-2 text-[12px] font-medium hover:text-accent-text"
              >
                <PiEnvelopeSimple className="h-4 w-4" aria-hidden="true" />
                {site.email}
              </a>
              <p className="mt-2 text-[10px] leading-relaxed text-quiet">
                Use this address if the form does not open your email app. Do not
                attach confidential files until a secure route is agreed.
              </p>
            </div>

            <div className="border border-line bg-surface p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-text">
                Faster route
              </p>
              <p className="mt-2 text-[10.5px] leading-relaxed text-quiet">
                If you already know the service, open its page. The scope,
                deliverables, and FAQ are there, and the quote link names the
                service for you.
              </p>
              <Link
                href="/services"
                className="mt-3 inline-flex items-center gap-1.5 text-[10.5px] font-medium hover:text-accent-text"
              >
                Browse services
                <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell grid gap-6 py-10 sm:py-12 lg:grid-cols-3">
          {[
            {
              title: "No obligation",
              text: "The scope check is free and does not commit you to booking. You approve the quote before work starts.",
            },
            {
              title: "No files required",
              text: "A description is enough for a first view. Files are requested only after the scope is agreed.",
            },
            {
              title: "No guarantees",
              text: "We will tell you what support can improve and what depends on the journal, the data, or peer review.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-line pt-4">
              <h2 className="text-[12.5px] font-medium">{item.title}</h2>
              <p className="mt-1.5 text-[10.5px] leading-relaxed text-quiet">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line bg-tint">
        <div className="shell flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] leading-relaxed text-quiet">
            Prefer to start with a range?{" "}
            <Link href="/estimate" className="link-underline">
              Use the planning estimator
            </Link>
            .
          </p>
          <a
            href={mailto("General enquiry")}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium hover:text-accent-text"
          >
            Email directly
            <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
