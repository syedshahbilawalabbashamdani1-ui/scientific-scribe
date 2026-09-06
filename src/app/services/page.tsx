import type { Metadata } from "next";
import { ServicesList } from "@/components/ServicesList";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our full range of academic and medical writing services — from research articles to data analysis.",
};

export default function ServicesPage() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="mb-12 max-w-2xl sm:mb-16">
            <p className="kicker">Catalogue</p>
            <h1 className="mt-3 font-display text-heading-md text-foreground sm:text-heading-lg">
              Our services
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground leading-relaxed">
              Comprehensive academic and medical writing solutions tailored to your research needs.
            </p>
          </div>
        </SectionReveal>
        <ServicesList />
      </div>
    </section>
  );
}
