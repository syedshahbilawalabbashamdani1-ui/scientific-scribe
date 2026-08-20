import type { Metadata } from "next";
import { ServicesList } from "@/components/ServicesList";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our full range of academic and medical writing services — from research articles to data analysis.",
};

export default function ServicesPage() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground">
            Our Services
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
            Comprehensive academic and medical writing solutions tailored to your research needs.
          </p>
        </div>
        <ServicesList />
      </div>
    </section>
  );
}
