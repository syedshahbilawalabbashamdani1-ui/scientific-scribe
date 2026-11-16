/**
 * Site-level configuration.
 *
 * The contact address and site URL are intentional placeholders. Replace both
 * before launch (`hello@scientific-scribe.example` uses the reserved .example
 * TLD so it cannot accidentally reach a real inbox).
 */
export const site = {
  name: "Scientific-Scribe",
  wordmark: "Scientific·Scribe",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://scientific-scribe.example",
  email: "hello@scientific-scribe.example",
  description:
    "Specialist academic research support across manuscript writing, journal submission, language and integrity, and biostatistics.",
  tagline: "Research support, scoped like a protocol.",
  responseTime: "within one business day",
} as const;

export type NavItem = {
  label: string;
  href: string;
  mega?: boolean;
};

export const navigation: readonly NavItem[] = [
  { label: "Services", href: "/services", mega: true },
  { label: "Find your path", href: "/match" },
  { label: "Estimate", href: "/estimate" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export const footerNavigation = {
  start: [
    { label: "Find your path", href: "/match" },
    { label: "Planning estimate", href: "/estimate" },
    { label: "Resources", href: "/resources" },
    { label: "Request a scope check", href: "/contact" },
  ],
  information: [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Ethics & integrity", href: "/about#integrity" },
  ],
} as const;

export function mailto(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${site.email}?${params.toString()}`;
}
