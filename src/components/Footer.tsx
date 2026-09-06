import Link from "next/link";
import { contactInfo } from "@/lib/contact-info";
import { LogoMark } from "./brand/LogoMark";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-800 bg-ink-900 text-paper-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h3 className="flex items-center gap-2 font-display text-heading-xs tracking-tight">
              <LogoMark variant="node" size={24} />
              <span className="text-brass-500">Scientific</span>{" "}
              <span className="text-paper-50">Scribe</span>
            </h3>
            <p className="mt-4 max-w-xs text-footnote leading-relaxed text-graphite-500">
              Professional academic and medical writing services. From research articles to data
              analysis, we help researchers communicate their work with precision and impact.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-caption uppercase tracking-widest text-brass-500">
              Quick Links
            </h4>
            <ul className="mt-2 space-y-1">
              {[
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/quote", label: "Get a Quote" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-footnote text-paper-100 transition-colors hover:text-brass-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-caption uppercase tracking-widest text-brass-500">
              Legal & Help
            </h4>
            <ul className="mt-2 space-y-1">
              {[
                { href: "/faqs", label: "FAQs" },
                { href: "/terms", label: "              Terms and Conditions" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-footnote text-paper-100 transition-colors hover:text-brass-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-caption uppercase tracking-widest text-brass-500">
              Contact
            </h4>
            <ul className="mt-2 font-mono text-footnote text-paper-100">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-brass-500"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-brass-500"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center min-h-[44px]">{contactInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-800 pt-6">
          <p className="text-center font-mono text-caption uppercase tracking-widest text-graphite-500">
            &copy; {new Date().getFullYear()} Scientific Scribe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
