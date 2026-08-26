"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface RedlinePart {
  text: string;
  mark?: "del" | "ins";
}

interface Stage {
  num: string;
  title: string;
  description: string;
  source: string;
  parts: RedlinePart[];
}

const STAGES: Stage[] = [
  {
    num: "[01]",
    title: "Submission",
    description:
      "You send us your manuscript, data, and target journal. We assess scope, fit, and the reporting guidelines that govern your field before a single word is touched.",
    source: "As-received draft",
    parts: [
      { text: "Our results " },
      { text: "prove the hypothesis beyond any doubt", mark: "del" },
      { text: " provide strong evidence in support of the hypothesis", mark: "ins" },
      { text: "." },
    ],
  },
  {
    num: "[02]",
    title: "Peer Review",
    description:
      "Editors and reviewers return structured critiques. We translate every comment into a concrete editorial action and flag claims the evidence cannot carry.",
    source: "Reviewer 1, comment 3",
    parts: [
      { text: "The sample size was " },
      { text: "small", mark: "del" },
      { text: " modest (n = 42), which limits statistical power for subgroup comparisons", mark: "ins" },
      { text: "." },
    ],
  },
  {
    num: "[03]",
    title: "Revision",
    description:
      "We execute the revision pass — tightening arguments, correcting statistical language, and documenting every change in a tracked redline you can audit.",
    source: "Revised manuscript, §3.2",
    parts: [
      { text: "" },
      { text: "Significant results were found", mark: "del" },
      { text: " Clinically meaningful differences were observed between groups (p = 0.03)", mark: "ins" },
      { text: "." },
    ],
  },
  {
    num: "[04]",
    title: "Acceptance",
    description:
      "The final version meets the journal's reporting checklist verbatim. You receive clean copy, tracked changes, and a response letter addressed point by point.",
    source: "Accepted proof",
    parts: [
      { text: "The manuscript has been " },
      { text: "fixed as asked", mark: "del" },
      { text: " revised in full accordance with the journal's reporting standards", mark: "ins" },
      { text: "." },
    ],
  },
];

function RedlineExample({ stage }: { stage: Stage }) {
  return (
    <figure className="border-l-2 border-citation-500 bg-card p-6">
      <figcaption className="font-mono text-caption uppercase tracking-widest text-graphite-500">
        {stage.source}
      </figcaption>
      <blockquote className="mt-3 font-display text-body-lg leading-relaxed text-foreground">
        &ldquo;
        {stage.parts.map((part, i) => {
          if (part.mark === "del") {
            return (
              <del key={i} className="text-redline-500 line-through decoration-redline-500 decoration-2">
                {part.text}
              </del>
            );
          }
          if (part.mark === "ins") {
            return (
              <ins key={i} className="text-citation-500 no-underline">
                {part.text}
              </ins>
            );
          }
          return <span key={i}>{part.text}</span>;
        })}
        &rdquo;
      </blockquote>
    </figure>
  );
}

function StagePanel({ stage }: { stage: Stage }) {
  return (
    <div className="w-screen max-w-[68ch] shrink-0 px-6 py-12 sm:px-10">
      <p className="font-mono text-heading-sm text-brass-600 dark:text-brass-500">{stage.num}</p>
      <h3 className="mt-4 font-display text-heading-sm text-foreground sm:text-heading-md">
        {stage.title}
      </h3>
      <p className="mt-4 text-body text-muted-foreground leading-relaxed">{stage.description}</p>
      <div className="mt-8">
        <RedlineExample stage={stage} />
      </div>
    </div>
  );
}

export function PeerReviewStepper() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const motionOk = !reduced;

  useEffect(() => {
    if (!motionOk) return;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!track || !bar) return;

    const ctx = gsap.context(() => {
      const totalPanels = STAGES.length * 2;

      const tl = gsap.timeline({ repeat: -1 });

      tl.fromTo(
        track,
        { x: 0 },
        {
          x: () => -(track.scrollWidth / totalPanels) * STAGES.length,
          duration: 20,
          ease: "none",
        }
      );

      tl.fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, duration: 20, ease: "none" },
        0
      );

      const section = sectionRef.current;
      if (section) {
        section.addEventListener("mouseenter", () => tl.pause());
        section.addEventListener("mouseleave", () => tl.play());
      }
    });

    return () => ctx.revert();
  }, [motionOk]);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-muted"
      aria-label="Editorial process"
    >
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <p className="kicker">The editorial pipeline</p>
        <h2 className="mt-3 max-w-2xl font-display text-heading-sm text-foreground sm:text-heading-md">
          Four stages between your draft and acceptance
        </h2>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-[2px] w-full bg-border">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-brass-500"
            style={{ transform: motionOk ? "scaleX(0)" : "scaleX(1)" }}
          />
        </div>
      </div>
      <div
        ref={trackRef}
        className={
          motionOk
            ? "flex w-max items-stretch"
            : "flex flex-col divide-y divide-border"
        }
      >
        {motionOk
          ? [...STAGES, ...STAGES].map((stage, i) => (
              <StagePanel key={`${stage.num}-${i}`} stage={stage} />
            ))
          : STAGES.map((stage) => (
              <StagePanel key={stage.num} stage={stage} />
            ))}
      </div>
    </section>
  );
}
