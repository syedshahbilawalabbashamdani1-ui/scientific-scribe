import Link from "next/link";

import { footerNavigation, site } from "@/lib/site";
import { pillars } from "@/lib/services";
import { PiArrowUpRight, PiEnvelopeSimple } from "react-icons/pi";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_0.8fr_0.8fr] lg:gap-10 lg:py-16">
        <div>
          <Link
            href="/"
            className="inline-flex items-baseline text-[19px] font-semibold tracking-[-0.045em]"
          >
            <span className="sr-only">{site.name} home</span>
            <span aria-hidden="true" className="flex items-baseline gap-1">
              Scientific
              <span className="inline-block h-[7px] w-[7px] rounded-full bg-accent" aria-hidden="true" />
              Scribe
            </span>
          </Link>
          <p className="mt-4 max-w-[30ch] text-[13px] leading-relaxed text-quiet">
            Thoughtful support for the work behind every paper, from the first
            question to the final submission file.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-flex items-center gap-2 py-1 text-[13px] font-medium transition-colors hover:text-accent-text"
          >
            <PiEnvelopeSimple className="h-4 w-4" aria-hidden="true" />
            {site.email}
          </a>
          <p className="mt-2 text-[11px] text-quiet">
            Replies {site.responseTime}. Documents are confidential by default.
          </p>
        </div>

        <div>
          <p className="meta">Services</p>
          <ul className="mt-3 space-y-1">
            {pillars.map((pillar) => (
              <li key={pillar.slug}>
                <Link
                  href={`/services/${pillar.slug}`}
                  className="group flex items-start gap-2 py-1 text-[12.5px] leading-snug text-quiet transition-colors hover:text-ink"
                >
                  <span className="mt-[2px] font-mono text-[9px] text-accent-text">
                    {pillar.number}
                  </span>
                  {pillar.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="meta">Start</p>
          <ul className="mt-3 space-y-1">
            {footerNavigation.start.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1 text-[12.5px] text-quiet transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="meta">Information</p>
          <ul className="mt-3 space-y-1">
            {footerNavigation.information.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1 text-[12.5px] text-quiet transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 py-1 text-[12.5px] font-medium text-ink transition-colors hover:text-accent-text"
              >
                Contact
                <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-3 py-6 text-[10.5px] leading-relaxed text-quiet md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p className="max-w-[62ch] md:text-center">
            Research support with care and clarity. We do not fabricate data,
            guarantee publication, or help evade integrity checks.
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em]">
            Confidential by default
          </p>
        </div>
      </div>
    </footer>
  );
}
