import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

const fraunces = localFont({
  src: [
    { path: "../../public/fonts/fraunces/400.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/fraunces/400-italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/fraunces/500.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/fraunces/500-italic.ttf", weight: "500", style: "italic" },
    { path: "../../public/fonts/fraunces/600.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/fraunces/600-italic.ttf", weight: "600", style: "italic" },
    { path: "../../public/fonts/fraunces/700.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/fraunces/700-italic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const ibmPlexSans = localFont({
  src: [
    { path: "../../public/fonts/ibm-plex-sans/400.ttf", weight: "400" },
    { path: "../../public/fonts/ibm-plex-sans/500.ttf", weight: "500" },
    { path: "../../public/fonts/ibm-plex-sans/600.ttf", weight: "600" },
  ],
  variable: "--font-plex-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});

const ibmPlexMono = localFont({
  src: [
    { path: "../../public/fonts/ibm-plex-mono/400.ttf", weight: "400" },
    { path: "../../public/fonts/ibm-plex-mono/500.ttf", weight: "500" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Scientific Scribe — Academic & Medical Writing Services",
    template: "%s | Scientific Scribe",
  },
  description:
    "Professional academic and medical writing services. Research articles, meta-analyses, systematic reviews, data analysis, and more.",
  icons: {
    icon: "/brand/node/32x32.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full ${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
