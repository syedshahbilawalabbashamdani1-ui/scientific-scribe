"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { SectionReveal } from "@/components/SectionReveal";

const faqs = [
  {
    question: "What types of academic writing services do you offer?",
    answer:
      "We offer a comprehensive range of academic and medical writing services including research article writing, review articles, meta-analyses, systematic reviews, proofreading, journal submission management, editing per journal requirements, report writing, case reports, letters to editors, short commissioned pieces, AI content removal, plagiarism removal, and data analysis and interpretation.",
  },
  {
    question: "How does the quote process work?",
    answer:
      "Submit a quote request through our online form with your project details, service requirements, preferred deadline, and budget range. We will review your request and respond with a detailed quote within 24 hours. The quote will outline the scope of work, deliverables, timeline, and pricing.",
  },
  {
    question: "What is your turnaround time?",
    answer:
      "Turnaround times vary depending on the service type, project scope, and word count. Typical timelines range from 3–5 business days for proofreading to 2–4 weeks for full research article drafting. Rush delivery may be available upon request for an additional fee. Specific deadlines are confirmed in your project quote.",
  },
  {
    question: "Do you guarantee journal acceptance?",
    answer:
      "We do not guarantee publication or journal acceptance, as peer review outcomes depend on factors outside our control. However, we ensure that all deliverables meet the highest standards of academic writing, follow journal-specific guidelines, and comply with relevant reporting standards (ICMJE, PRISMA, CONSORT, etc.) to maximize your chances of acceptance.",
  },
  {
    question: "Who retains ownership of the work?",
    answer:
      "You retain full ownership and intellectual property rights over all work products. We act as a writing and editing service provider — we do not claim co-authorship or ownership over any manuscripts, data, or research outputs. All authorship credit remains with the researcher(s).",
  },
  {
    question: "How do you ensure confidentiality?",
    answer:
      "All client materials, research data, and project details are treated as strictly confidential. We do not disclose, share, or publish any client information without explicit written consent. All team members are bound by confidentiality agreements covering client work.",
  },
  {
    question: "What file formats do you work with?",
    answer:
      "We work with all standard academic file formats including Microsoft Word (.docx), LaTeX, PDF, and plain text. We deliver final manuscripts in the format required by your target journal, with tracked changes and a clean version as standard.",
  },
  {
    question: "Do you handle revisions after the initial delivery?",
    answer:
      "Yes. Each project includes a defined number of revision rounds as specified in your project quote. Additional revision rounds beyond the agreed scope may incur additional charges. Revision requests should be provided in writing within the timeframe specified in your project agreement.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept payment via bank transfer and other methods as outlined in your project invoice. Payment terms are specified in the project quote or agreement. Please refer to our Terms and Conditions for detailed payment policies.",
  },
  {
    question: "Can I request a sample of your work?",
    answer:
      "We can provide general examples of our writing quality and style upon request. However, due to our strict confidentiality policy, we cannot share specific client work products. Contact us to discuss your requirements and we will arrange an appropriate demonstration.",
  },
  {
    question: "How do you handle AI-generated content concerns?",
    answer:
      "As journals increasingly screen for AI-generated content, we offer a dedicated AI content removal service. We identify and replace any AI-generated sections in your manuscript with authentic, human-written academic prose that maintains your original research voice and intent.",
  },
  {
    question: "What statistical software do you use for data analysis?",
    answer:
      "Our data analysis team is proficient in SPSS, R, GraphPad Prism, Excel, and other industry-standard statistical tools. We handle descriptive and inferential statistics, regression modeling, survival analysis, ANOVA, and publication-quality data visualization.",
  },
];

export default function FaqsPage() {
  return (
    <>
      <section className="bg-ink-900 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="kicker">Support</p>
          <h1 className="mt-4 font-display text-heading-md text-paper-50 sm:text-heading-lg">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-xl text-body-lg leading-relaxed text-graphite-500">
            Quick answers to common questions about our services and process.
          </p>
        </div>
      </section>
      <section className="bg-background py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <Accordion.Root type="multiple" className="divide-y divide-border border-y border-border">
              {faqs.map((faq, i) => (
                <Accordion.Item
                  key={i}
                  value={`faq-${i}`}
                  className="group"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between py-5 text-left font-display text-body-lg text-foreground transition-colors hover:text-brass-500 [&[data-state=open]]:text-brass-500">
                      {faq.question}
                      <svg
                        className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="pb-5 text-body leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
