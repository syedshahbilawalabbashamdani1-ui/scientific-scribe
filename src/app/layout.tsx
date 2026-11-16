import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageFade } from "@/components/page-fade";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Research support, scoped like a protocol`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "academic research support",
    "manuscript editing",
    "journal submission",
    "systematic review",
    "meta-analysis",
    "proofreading",
    "biostatistics",
    "SPSS analysis",
    "R analysis",
    "GraphPad Prism",
    "research integrity",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Research support, scoped like a protocol`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Research support, scoped like a protocol`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  slogan: site.tagline,
  knowsAbout: [
    "Manuscript writing",
    "Systematic reviews",
    "Meta-analysis",
    "Journal submission",
    "Academic language editing",
    "Research integrity",
    "Biostatistics",
    "Data visualization",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ThemeProvider>
          <Header />
          <main id="main-content">
            <PageFade>{children}</PageFade>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
