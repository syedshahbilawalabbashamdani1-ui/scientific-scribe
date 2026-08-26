import type { Metadata } from "next";
import Link from "next/link";
import { MarginRailLayout } from "@/components/MarginRailLayout";
import { RedlineReveal } from "@/components/animations/RedlineReveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Scientific Scribe — our mission, expertise, and commitment to academic excellence.",
};

const expertise = [
  {
    title: "Medical & Health Sciences",
    description:
      "Deep domain knowledge across clinical research, public health, pharmacology, nursing, and allied health disciplines.",
  },
  {
    title: "Biological Sciences",
    description:
      "Expertise in molecular biology, genetics, microbiology, biochemistry, and environmental biology manuscript preparation.",
  },
  {
    title: "Statistical Analysis",
    description:
      "Proficiency in quantitative and qualitative analysis using SPSS, R, GraphPad Prism, and advanced statistical modeling.",
  },
  {
    title: "Publication Standards",
    description:
      "Thorough knowledge of ICMJE, CONSORT, PRISMA, STROBE, CARE, and ARRIVE guidelines for transparent reporting.",
  },
];

export default function AboutPage() {
  const rail = (
    <div className="space-y-10">
      <section aria-label="Notes">
        <h2 className="font-mono text-caption uppercase tracking-widest text-brass-600 dark:text-brass-500">
          Notes
        </h2>
        <ol className="mt-4 space-y-4">
          <li className="flex gap-3 font-mono text-footnote leading-relaxed text-muted-foreground">
            <span className="shrink-0 text-citation-500">[1]</span>
            <span>Reporting-guideline fluency: ICMJE, CONSORT, PRISMA, STROBE, CARE, ARRIVE.</span>
          </li>
          <li className="flex gap-3 font-mono text-footnote leading-relaxed text-muted-foreground">
            <span className="shrink-0 text-citation-500">[2]</span>
            <span>Statistical toolchain: SPSS, R, GraphPad Prism, Excel.</span>
          </li>
          <li className="flex gap-3 font-mono text-footnote leading-relaxed text-muted-foreground">
            <span className="shrink-0 text-citation-500">[3]</span>
            <span>Every engagement is covered by a strict confidentiality agreement.</span>
          </li>
        </ol>
      </section>

      <section aria-label="Related" className="border-t border-border pt-8">
        <h2 className="font-mono text-caption uppercase tracking-widest text-brass-600 dark:text-brass-500">
          Where we help
        </h2>
        <ul className="mt-4 space-y-3">
          {[
            { href: "/services/research-article", label: "Research Article Writing" },
            { href: "/services/systematic-review", label: "Systematic Review" },
            { href: "/services/data-analysis", label: "Data Analysis & Interpretation" },
            { href: "/services/submission-to-journal", label: "Journal Submission" },
          ].map((rel) => (
            <li key={rel.href}>
              <Link
                href={rel.href}
                className="group flex items-baseline justify-between gap-3 border-b border-border pb-3"
              >
                <span className="font-display text-body-lg text-card-foreground transition-colors group-hover:text-brass-600 dark:group-hover:text-brass-500">
                  {rel.label}
                </span>
                <span
                  className="font-mono text-caption text-citation-500 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border pt-8">
        <Link href="/contact" className="btn btn-outline w-full">
          Talk to us
        </Link>
      </section>
    </div>
  );

  return (
    <>
      <section className="bg-ink-900 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="kicker">About</p>
          <h1 className="mt-4 max-w-3xl font-display text-heading-md text-paper-50 sm:text-heading-lg">
            The scribes behind the citations
          </h1>
          <p className="mt-4 max-w-xl text-body-lg leading-relaxed text-graphite-500">
            Dedicated to advancing scientific communication through precision, expertise, and
            integrity.
          </p>
        </div>
      </section>

      <MarginRailLayout
        title={
          <h2 className="font-display text-heading-sm text-foreground sm:text-heading-md">
            Our mission
          </h2>
        }
        rail={rail}
      >
        <p>
          Scientific Scribe was founded with a singular mission: to bridge the gap between rigorous
          research and compelling scientific communication. We believe that{" "}
          <RedlineReveal>every researcher deserves access</RedlineReveal> to professional writing
          support that honors the depth and complexity of their work.
        </p>
        <p className="mt-6">
          Too often, groundbreaking research fails to reach its audience due to language barriers,
          formatting challenges, or simply the overwhelming demands of the publication process. We
          exist to solve that problem.
        </p>

        <h3 className="mt-14 font-display text-heading-sm text-foreground">
          Expertise &amp; credentials
        </h3>
        <dl className="mt-6 divide-y divide-border border-y border-border">
          {expertise.map((item) => (
            <div key={item.title} className="py-5">
              <dt className="font-display text-body-lg text-card-foreground">{item.title}</dt>
              <dd className="mt-1 text-footnote leading-relaxed text-muted-foreground">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-14 font-display text-heading-sm text-foreground">Our approach</h3>
        <p className="mt-6">
          Every project begins with a thorough understanding of your research objectives, target
          journal, and specific requirements. We do not believe in one-size-fits-all solutions —
          each manuscript receives{" "}
          <RedlineReveal>individualized attention</RedlineReveal> from conception through final
          submission.
        </p>
        <p className="mt-6">
          Our process is transparent and collaborative. You maintain full ownership and control of
          your work at every stage, with clear communication and revision opportunities built into
          every engagement.
        </p>
        <p className="mt-6">
          We are committed to ethical practice. We do not fabricate data, generate false reviews,
          or engage in any form of academic misconduct. Our role is to amplify your research voice
          — <RedlineReveal>not replace it.</RedlineReveal>
        </p>
      </MarginRailLayout>
    </>
  );
}
