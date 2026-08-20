import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/ServiceDetail";
import Link from "next/link";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{service.icon}</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white">
            {service.title}
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-navy-200 max-w-2xl mx-auto">
            {service.shortDescription}
          </p>
        </div>
      </section>
      <ServiceDetail service={service} />
      <section className="py-12 sm:py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground mb-4 sm:mb-6">
            Ready to get started with {service.title}?
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-colors min-h-[44px]"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
