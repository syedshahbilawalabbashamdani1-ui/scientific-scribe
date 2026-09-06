import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { contactInfo } from "@/lib/contact-info";
import { SectionReveal } from "@/components/SectionReveal";
import { ParallaxPhoto } from "@/components/ParallaxPhoto";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Scientific Scribe for general inquiries, collaboration opportunities, or questions about our services.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink-900 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <p className="kicker">Contact</p>
              <h1 className="mt-4 font-display text-heading-md text-paper-50 sm:text-heading-lg">
                Correspondence
              </h1>
              <p className="mt-4 max-w-xl text-body-lg leading-relaxed text-graphite-500">
                Have a question or want to discuss a potential project? We would love to hear from you.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full">
              <ParallaxPhoto className="absolute inset-0">
                <Image
                  src="/images/contact-notebook.jpg"
                  alt="An open notebook with pens on a wooden desk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover duotone-paper"
                  priority={false}
                />
              </ParallaxPhoto>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionReveal>
              <div>
                <h2 className="font-display text-heading-sm text-foreground">Get in touch</h2>
                <dl className="mt-8 space-y-8">
                  <div className="border-t border-border pt-4">
                    <dt className="font-mono text-caption uppercase tracking-widest text-brass-600 dark:text-brass-500">
                      Email
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="font-mono text-body text-card-foreground transition-colors hover:text-citation-500"
                      >
                        {contactInfo.email}
                      </a>
                    </dd>
                  </div>
                  <div className="border-t border-border pt-4">
                    <dt className="font-mono text-caption uppercase tracking-widest text-brass-600 dark:text-brass-500">
                      Phone
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                        className="font-mono text-body text-card-foreground transition-colors hover:text-citation-500"
                      >
                        {contactInfo.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="border-t border-border pt-4">
                    <dt className="font-mono text-caption uppercase tracking-widest text-brass-600 dark:text-brass-500">
                      Address
                    </dt>
                    <dd className="mt-2 font-mono text-body text-muted-foreground">
                      {contactInfo.address}
                    </dd>
                  </div>
                </dl>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div>
                <ContactForm />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
