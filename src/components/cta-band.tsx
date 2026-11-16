import { PiArrowUpRight, PiEnvelopeSimple } from "react-icons/pi";

import { site } from "@/lib/site";
import { MagneticButton } from "@/components/magnetic-button";

type CtaBandProps = {
  title?: string;
  text?: string;
  note?: string;
};

export function CtaBand({
  title = "Not sure which service fits?",
  text = "A short scope conversation can narrow the route before you commit to a service. Tell us the stage, the target journal, and the deadline.",
  note = "Your enquiry and files are treated as confidential.",
}: CtaBandProps) {
  return (
    <section className="border-y border-line bg-tint">
      <div className="shell relative grid gap-8 py-12 sm:py-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <div>
          <p className="meta">A second opinion</p>
          <h2 className="mt-3 max-w-[17ch] text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[0.98] tracking-[-0.05em]">
            {title}
          </h2>
          <p className="mt-3 max-w-[56ch] text-[13px] leading-relaxed text-quiet">
            {text}
          </p>
          <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.12em] text-quiet">
            {note}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <MagneticButton href="/contact" className="btn btn-primary">
            Request a scope check
            <PiArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 text-[11.5px] text-quiet transition-colors hover:text-ink"
          >
            <PiEnvelopeSimple className="h-3.5 w-3.5" aria-hidden="true" />
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
