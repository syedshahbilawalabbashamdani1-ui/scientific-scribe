import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Scientific Scribe collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly to us, including your name, email address, phone number, and any project details you share when requesting a quote, submitting a contact form, or engaging our services. We also collect standard web analytics data such as pages visited, time spent on pages, and referral sources.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use the information we collect to respond to your inquiries, provide requested services, communicate about your projects, send service-related updates, improve our website and services, and comply with legal obligations. We do not sell, rent, or trade your personal information to third parties for marketing purposes.",
  },
  {
    title: "3. Data Sharing and Disclosure",
    body: "We may share your information only in the following circumstances: with your explicit consent, to service providers who assist in our operations (under strict confidentiality obligations), when required by law or legal process, or to protect the rights, property, or safety of Scientific Scribe, our clients, or others.",
  },
  {
    title: "4. Data Security",
    body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encrypted data transmission, secure storage systems, and restricted access to client information on a need-to-know basis.",
  },
  {
    title: "5. Data Retention",
    body: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. Project-related materials are retained for the duration of the engagement and for a reasonable period afterward to support any follow-up inquiries or revisions.",
  },
  {
    title: "6. Your Rights",
    body: "You have the right to access the personal information we hold about you, request correction of inaccurate data, request deletion of your personal data (subject to legal retention requirements), and opt out of non-essential communications. To exercise any of these rights, please contact us using the information provided on our Contact page.",
  },
  {
    title: "7. Cookies and Tracking",
    body: "Our website may use essential cookies to ensure proper site functionality. We do not use advertising cookies or share cookie data with third-party advertisers. Any analytics tools we use collect anonymized, aggregate data about site usage patterns rather than individual user behavior.",
  },
  {
    title: "8. Third-Party Links",
    body: "Our website may contain links to third-party websites, such as journal submission portals. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.",
  },
  {
    title: "9. Children's Privacy",
    body: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information promptly.",
  },
  {
    title: "10. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated policy on this page with a revised \"Last updated\" date. We encourage you to review this policy periodically.",
  },
  {
    title: "11. Contact Us",
    body: "If you have any questions about this Privacy Policy or our data practices, please contact us through the Contact page on our website or by emailing hello@scientificscribe.com.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-ink-900 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="kicker">Legal</p>
          <h1 className="mt-4 font-display text-heading-md text-paper-50 sm:text-heading-lg">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-xl text-body-lg leading-relaxed text-graphite-500">
            How we collect, use, and protect your personal information.
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
