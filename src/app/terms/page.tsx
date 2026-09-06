import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions governing the use of Scientific Scribe's academic and medical writing services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the services provided by Scientific Scribe (\"we,\" \"us,\" or \"our\"), you agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, you must not use our services. These terms apply to all clients, visitors, and users of our website and services.",
  },
  {
    title: "2. Services Provided",
    body: "Scientific Scribe provides professional academic and medical writing services, including but not limited to research article writing, review article writing, meta-analysis, systematic reviews, proofreading, journal submission assistance, editing, report writing, case reports, letters to editors, commissioned pieces, AI content removal, plagiarism removal, and data analysis. The scope of each engagement is defined in the project agreement or quote provided to the client.",
  },
  {
    title: "3. Client Responsibilities",
    body: "Clients are responsible for providing accurate, complete, and timely information required for the successful completion of their projects. This includes but is not limited to research data, manuscript drafts, target journal requirements, deadlines, and any specific instructions. Delays caused by incomplete or inaccurate client-provided materials may affect delivery timelines.",
  },
  {
    title: "4. Authorship and Intellectual Property",
    body: "Scientific Scribe acts as a writing and editing service provider. All authorship credit and intellectual property rights remain with the client researcher(s). We do not claim co-authorship or ownership over any manuscripts, data, or research outputs. Our role is to assist in the preparation, editing, and formatting of materials for publication.",
  },
  {
    title: "5. Confidentiality",
    body: "We treat all client materials, research data, and project details as strictly confidential. We do not disclose, share, or publish any client information or work product without explicit written consent. All team members are bound by confidentiality agreements covering client work.",
  },
  {
    title: "6. Payment Terms",
    body: "Payment terms are specified in the project quote or agreement provided to the client. Unless otherwise agreed in writing, payment is due within the timeframe stated on the invoice. Late payments may incur additional charges as outlined in the project agreement. We reserve the right to suspend work on projects with overdue payments.",
  },
  {
    title: "7. Revisions and Amendments",
    body: "The number of revision rounds included in each project is specified in the project quote. Additional revision rounds beyond the agreed scope may incur additional charges. Revision requests must be provided in writing and within the timeframe specified in the project agreement.",
  },
  {
    title: "8. Limitation of Liability",
    body: "Scientific Scribe shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability for any claim arising from a project shall not exceed the total fee paid for that specific project. We are not responsible for journal acceptance decisions, peer review outcomes, or any decisions made by third-party publishers.",
  },
  {
    title: "9. Disclaimer of Guarantees",
    body: "While we strive to meet the highest standards of academic writing and formatting, we do not guarantee publication, acceptance by any journal, or specific outcomes from the use of our services. Journal acceptance depends on numerous factors outside our control, including peer review, editorial decisions, and journal capacity.",
  },
  {
    title: "10. Termination",
    body: "Either party may terminate a project engagement with written notice. In the event of termination, the client is responsible for payment of all work completed up to the date of termination. Work products completed prior to termination will be delivered to the client upon receipt of payment for completed work.",
  },
  {
    title: "11. Governing Law",
    body: "These Terms and Conditions shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or the use of our services shall be resolved through good-faith negotiation before pursuing any formal legal proceedings.",
  },
  {
    title: "12. Changes to Terms",
    body: "Scientific Scribe reserves the right to update or modify these Terms and Conditions at any time. Changes will be effective upon posting to this page. Continued use of our services after any modifications constitutes acceptance of the updated terms. Clients will be notified of material changes to these terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-ink-900 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="kicker">Legal</p>
          <h1 className="mt-4 font-display text-heading-md text-paper-50 sm:text-heading-lg">
            Terms and Conditions
          </h1>
          <p className="mt-4 max-w-xl text-body-lg leading-relaxed text-graphite-500">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>
      <section className="bg-background py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-body text-muted-foreground leading-relaxed">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </SectionReveal>
          {sections.map((section, i) => (
            <SectionReveal key={section.title} delay={Math.min((i + 1) * 0.03, 0.3)}>
              <h2 className="mt-10 font-display text-heading-xs text-foreground">
                {section.title}
              </h2>
              <p className="mt-3 text-body leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </SectionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
