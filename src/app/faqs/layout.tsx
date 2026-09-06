import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Quick answers to common questions about Scientific Scribe's academic writing services, process, and policies.",
};

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
