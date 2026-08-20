import Link from "next/link";
import { contactInfo } from "@/lib/contact-info";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold">
              <span className="text-accent">Scientific</span>{" "}
              <span className="text-card-foreground">Scribe</span>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Professional academic and medical writing services. From research articles to data
              analysis, we help researchers communicate their work with precision and impact.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/quote", label: "Get a Quote" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">
              Contact
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-accent transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li>{contactInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Scientific Scribe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
