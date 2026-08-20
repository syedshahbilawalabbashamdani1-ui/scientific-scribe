import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { contactInfo } from "@/lib/contact-info";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Scientific Scribe for general inquiries, collaboration opportunities, or questions about our services.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white">Contact Us</h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-navy-200 max-w-2xl mx-auto">
            Have a question or want to discuss a potential project? We would love to hear from you.
          </p>
        </div>
      </section>
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-foreground mb-6">
                Get in Touch
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-card-foreground">Email</p>
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-accent transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-medium text-card-foreground">Phone</p>
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-card-foreground">Address</p>
                    <p>{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
