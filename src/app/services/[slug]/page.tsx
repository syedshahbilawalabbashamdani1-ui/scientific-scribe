import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/ServiceDetail";
import { ManuscriptStackSlot } from "@/components/ManuscriptStackSlot";
import { SectionReveal } from "@/components/SectionReveal";

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

  const related = services.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <>
      <section className="bg-ink-900 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <SectionReveal>
              <div className="max-w-3xl">
                <p className="kicker">Service</p>
                <h1 className="mt-4 font-display text-heading-md text-paper-50 sm:text-heading-lg">
                  {service.title}
                </h1>
                <p className="mt-4 max-w-xl text-body-lg leading-relaxed text-graphite-500">
                  {service.shortDescription}
                </p>
                <Link href="/quote" className="btn btn-solid-inverse mt-8">
                  Request a quote
                </Link>
              </div>
            </SectionReveal>
            <div className="w-full max-w-[280px] shrink-0 lg:w-[280px]">
              <ManuscriptStackSlot />
            </div>
          </div>
        </div>
      </section>
      <ServiceDetail service={service} related={related} />
    </>
  );
}
