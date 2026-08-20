import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Scientific Scribe — our mission, expertise, and commitment to academic excellence.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white">
            About Scientific Scribe
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-navy-200 max-w-2xl mx-auto">
            Dedicated to advancing scientific communication through precision, expertise, and integrity.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          <SectionReveal>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-foreground mb-4 sm:mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Scientific Scribe was founded with a singular mission: to bridge the gap between
                rigorous research and compelling scientific communication. We believe that every
                researcher deserves access to professional writing support that honors the depth
                and complexity of their work.
              </p>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Too often, groundbreaking research fails to reach its audience due to language
                barriers, formatting challenges, or simply the overwhelming demands of the
                publication process. We exist to solve that problem.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-foreground mb-4 sm:mb-6">
                Expertise & Credentials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
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
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                    <h3 className="text-lg font-semibold text-card-foreground font-serif">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-foreground mb-4 sm:mb-6">
                Our Approach
              </h2>
              <div className="space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
                <p>
                  Every project begins with a thorough understanding of your research objectives,
                  target journal, and specific requirements. We do not believe in one-size-fits-all
                  solutions — each manuscript receives individualized attention from conception
                  through final submission.
                </p>
                <p>
                  Our process is transparent and collaborative. You maintain full ownership and
                  control of your work at every stage, with clear communication and revision
                  opportunities built into every engagement.
                </p>
                <p>
                  We are committed to ethical practice. We do not fabricate data, generate false
                  reviews, or engage in any form of academic misconduct. Our role is to amplify
                  your research voice — not replace it.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
