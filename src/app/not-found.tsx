import Link from "next/link";
import { PiArrowLeft, PiArrowUpRight } from "react-icons/pi";

import { MagneticButton } from "@/components/magnetic-button";
import { pillars } from "@/lib/services";

export const metadata = {
  title: "Page not found",
  description:
    "The page you requested is not in the record. Browse the service index or use the matcher to find the right scope.",
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="grid-paper pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="shell relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="meta">Error 404</p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-text">
            Reference not found
          </p>
          <h1 className="display mt-3 max-w-[13ch]">
            This page is not in the record.
          </h1>
          <p className="lede mt-4">
            The link may be old, mistyped, or the page may have moved. Start from
            the service index, or use the matcher to find the right scope.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <MagneticButton href="/" className="btn btn-primary">
              <PiArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </MagneticButton>
            <MagneticButton href="/services" className="btn btn-outline">
              Service index
              <PiArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
          </div>
        </div>

        <div className="border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="meta">Try a pillar</p>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-quiet">
              04 routes
            </span>
          </div>
          <ul className="divide-y divide-line">
            {pillars.map((pillar) => (
              <li key={pillar.slug}>
                <Link
                  href={`/services/${pillar.slug}`}
                  className="group flex items-start justify-between gap-3 px-4 py-3 transition-colors hover:bg-tint"
                >
                  <span className="flex items-start gap-3">
                    <span className="mt-[1px] font-mono text-[9px] text-accent-text">
                      {pillar.number}
                    </span>
                    <span>
                      <span className="block text-[12px] font-medium leading-snug">
                        {pillar.name}
                      </span>
                      <span className="mt-0.5 block text-[10px] text-quiet">
                        {pillar.services.length}{" "}
                        {pillar.services.length === 1 ? "service" : "services"}
                      </span>
                    </span>
                  </span>
                  <PiArrowUpRight
                    className="mt-0.5 h-3 w-3 shrink-0 text-quiet transition-colors group-hover:text-accent-text"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-line bg-tint px-4 py-3">
            <Link
              href="/match"
              className="inline-flex items-center gap-1.5 text-[10.5px] font-medium hover:text-accent-text"
            >
              Find your path
              <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
