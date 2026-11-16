export type Resource = {
  slug: string;
  kind: "prisma" | "cover-letter" | "tool-guide";
  type: string;
  title: string;
  shortTitle: string;
  summary: string;
  readTime: string;
  updated: string;
  topics: string[];
  description: string[];
  faqs: { question: string; answer: string }[];
};

export const resources: Resource[] = [
  {
    slug: "prisma-flow-diagram",
    kind: "prisma",
    type: "Template + live builder",
    title: "PRISMA flow diagram template",
    shortTitle: "PRISMA flow diagram",
    summary:
      "Build a transparent identification-to-inclusion flow without counting records twice.",
    readTime: "6 min",
    updated: "2026-09-18",
    topics: ["Systematic reviews", "Reporting", "PRISMA"],
    description: [
      "A PRISMA flow diagram is a record of decisions, not decoration. The numbers should reconcile: what was identified, what was removed, what was screened, what was assessed, and what was included.",
      "Use the builder to check the arithmetic before you draw the final figure. It is a planning aid, not a substitute for the current PRISMA statement or your review protocol.",
    ],
    faqs: [
      {
        question: "Which PRISMA version should I use?",
        answer:
          "Use the version your target journal or review registry expects. PRISMA 2020 is the current general reporting guideline, with separate extensions for different review types.",
      },
      {
        question: "Do I need a flow diagram for an update?",
        answer:
          "Yes, if the review is presented as an update. Report the original and updated records separately so a reader can see what changed.",
      },
      {
        question: "What if my numbers do not reconcile?",
        answer:
          "Do not force them. Trace the screening log and document the discrepancy. A transparent note is better than a diagram that hides a missing decision.",
      },
    ],
  },
  {
    slug: "journal-cover-letter",
    kind: "cover-letter",
    type: "Template + checklist",
    title: "Journal cover letter template and checklist",
    shortTitle: "Cover letter template",
    summary:
      "A short, specific cover letter that helps an editor route the manuscript without overclaiming.",
    readTime: "5 min",
    updated: "2026-09-18",
    topics: ["Journal submission", "Correspondence", "Compliance"],
    description: [
      "A cover letter is a routing document, not a second abstract. State what the manuscript is, why it fits the journal, what it adds, and any declarations the editor needs.",
      "Avoid claims the paper cannot support, and avoid repeating the abstract sentence for sentence. The editor already has the manuscript.",
    ],
    faqs: [
      {
        question: "How long should a cover letter be?",
        answer:
          "One page is usually enough. If the journal specifies a limit, follow it.",
      },
      {
        question: "Should I name suggested reviewers?",
        answer:
          "Only if the journal asks. Never suggest reviewers with a conflict of interest, and never list someone without checking their current affiliation.",
      },
      {
        question: "Do I need to mention prior review?",
        answer:
          "Follow the journal's policy. If the manuscript was reviewed elsewhere, disclose it where the submission system or editor asks.",
      },
    ],
  },
  {
    slug: "analysis-tools",
    kind: "tool-guide",
    type: "Comparison guide",
    title: "SPSS, R, Excel, or GraphPad Prism?",
    shortTitle: "Analysis tool guide",
    summary:
      "Choose an analysis tool based on the data, the method, and who needs to reproduce the work.",
    readTime: "8 min",
    updated: "2026-09-18",
    topics: ["Biostatistics", "Software", "Reproducibility"],
    description: [
      "The right tool is the one that fits the analysis, the team, and the journal's expectations for reproducibility. A familiar interface is useful, but it is not the only criterion.",
      "Use the comparison below as a starting point. For a specific dataset, the analysis plan should name the method and the output format before the software is chosen.",
    ],
    faqs: [
      {
        question: "Can you analyse my data in Excel?",
        answer:
          "Yes, for appropriate descriptive and basic inferential work. Excel is less suitable for complex modelling or reproducible reporting, and we will say so in the scope note.",
      },
      {
        question: "Do I need to own the software?",
        answer:
          "No. We work in the agreed environment. If you need to reproduce the analysis later, we can deliver a script or workbook where the licence allows.",
      },
      {
        question: "Which tool is best for publication figures?",
        answer:
          "R, GraphPad Prism, and dedicated figure tools are common. The right choice depends on the figure type and the journal's file requirements.",
      },
    ],
  },
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((resource) => resource.slug === slug);
}
