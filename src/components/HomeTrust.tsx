"use client";

import { SectionReveal } from "@/components/SectionReveal";

const credentials = [
  {
    title: "Publication Expertise",
    description:
      "Deep understanding of journal requirements across medical, biological, and health science disciplines.",
    icon: "🎓",
  },
  {
    title: "Methodological Rigor",
    description:
      "Expertise in systematic review methodology, meta-analytic techniques, and advanced statistical frameworks.",
    icon: "📐",
  },
  {
    title: "Statistical Proficiency",
    description:
      "Hands-on proficiency with SPSS, R, GraphPad Prism, and Excel for complex data analysis and visualization.",
    icon: "📊",
  },
  {
    title: "Journal Compliance",
    description:
      "Thorough knowledge of ICMJE, CONSORT, PRISMA, STROBE, and CARE reporting guidelines.",
    icon: "📋",
  },
];

export function HomeTrust() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-card-foreground">
              Why Researchers Trust Scientific Scribe
            </h2>
            <p className="mt-3 sm:mt-4 text-muted-foreground text-base sm:text-lg">
              Built on deep domain expertise and an unwavering commitment to scientific accuracy.
            </p>
          </div>
        </SectionReveal>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {credentials.map((cred, i) => (
            <SectionReveal key={cred.title} delay={i * 0.1}>
              <div className="flex gap-4 rounded-xl border border-border bg-background p-6 h-full">
                <div className="text-3xl flex-shrink-0">{cred.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground font-serif">
                    {cred.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {cred.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
