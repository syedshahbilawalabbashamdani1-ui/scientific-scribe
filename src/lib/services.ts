export type PillarSlug =
  | "manuscript-writing"
  | "journal-submission"
  | "language-integrity"
  | "data-analysis";

export type ServicePricing =
  | {
      unit: "word";
      perWordLow: number;
      perWordHigh: number;
      minimum: number;
    }
  | {
      unit: "dataset";
      baseLow: number;
      baseHigh: number;
      perThousandRowsLow: number;
      perThousandRowsHigh: number;
      minimum: number;
    }
  | { unit: "fixed"; low: number; high: number; minimum: number };

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  pillar: PillarSlug;
  title: string;
  shortTitle: string;
  summary: string;
  description: string[];
  bestFor: string[];
  deliverables: string[];
  process: { title: string; text: string }[];
  faqs: Faq[];
  turnaround: string;
  pricing: ServicePricing;
  tools?: string[];
};

export type Pillar = {
  slug: PillarSlug;
  number: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  outcome: string;
  services: Service[];
};

type PillarMeta = Omit<Pillar, "services">;

export const pillarMeta: PillarMeta[] = [
  {
    slug: "manuscript-writing",
    number: "01",
    name: "Manuscript Writing & Synthesis",
    shortName: "Manuscript",
    tagline: "Shape the question, the evidence, and the argument.",
    description:
      "From first draft to formal synthesis, support for the intellectual work of a manuscript: framing the question, structuring the argument, and presenting evidence with care.",
    outcome: "A submission-ready draft, a defensible synthesis, or a clear report.",
  },
  {
    slug: "journal-submission",
    number: "02",
    name: "Journal Submission & Compliance",
    shortName: "Journal",
    tagline: "Meet the journal's actual requirements.",
    description:
      "Journal-specific formatting, submission files, correspondence, and compliance checks, so the manuscript meets the brief before it reaches an editor.",
    outcome: "A complete submission package and a record of what was checked.",
  },
  {
    slug: "language-integrity",
    number: "03",
    name: "Language & Integrity Polish",
    shortName: "Language",
    tagline: "Improve clarity without compromising authorship.",
    description:
      "Careful language revision, similarity review, and responsible editing that strengthens expression while keeping the science and the author's voice intact.",
    outcome: "Cleaner prose, consistent terminology, and transparent revision notes.",
  },
  {
    slug: "data-analysis",
    number: "04",
    name: "Biostatistics & Data Analytics",
    shortName: "Data",
    tagline: "Turn a dataset into an analysis you can defend.",
    description:
      "Analysis planning, assumption checks, statistical work, interpretation, and publication-ready tables and figures in the tools your field already uses.",
    outcome: "Documented analysis, interpreted results, and figures that survive review.",
  },
];

export const services: Service[] = [
  {
    slug: "research-article",
    pillar: "manuscript-writing",
    title: "Research Article Writing & Development",
    shortTitle: "Research Article",
    summary:
      "Structured support for original research articles, from argument and outline to a submission-ready draft.",
    description: [
      "Bring your protocol, results, and target journal. We help shape the article around the question the evidence can actually answer, then build the sections in a sequence a reviewer can follow.",
      "Support can be developmental (structure, argument, section drafts) or editorial (revision of a near-complete draft). The scope note states which, so there is no ambiguity about contribution or authorship.",
    ],
    bestFor: [
      "Original clinical, laboratory, or social-science research",
      "A draft that needs structure, argument, or section-level development",
      "Teams preparing a first submission or a resubmission",
    ],
    deliverables: [
      "Agreed section drafts or a full revised manuscript",
      "Outline linked to the research question and evidence",
      "Reference and reporting-guideline check",
      "Tracked changes and a revision summary",
      "A short list of unresolved evidence gaps",
    ],
    process: [
      {
        title: "Read the evidence",
        text: "We review the protocol, results, target journal, and any existing draft, then identify the claim the study can support.",
      },
      {
        title: "Agree the shape",
        text: "An outline maps the argument, section order, tables, and figures before sentence-level work begins.",
      },
      {
        title: "Draft or revise",
        text: "The specialist develops the agreed sections or revises the draft, with queries where the evidence is ambiguous.",
      },
      {
        title: "Review and hand off",
        text: "You receive tracked changes, a clean file, and a plain summary of what changed and what still needs author input.",
      },
    ],
    faqs: [
      {
        question: "Will you write the paper for me?",
        answer:
          "We provide developmental and editorial support. The author remains responsible for the research, interpretation, and final approval. The written scope sets out the contribution and any disclosure requirements.",
      },
      {
        question: "Do you guarantee acceptance?",
        answer:
          "No. Journal decisions depend on the science, fit, and peer review. We can improve clarity and compliance, not promise an outcome.",
      },
      {
        question: "Can you work from a protocol and results tables?",
        answer:
          "Yes. A protocol, analysis output, and target-journal notes are enough to start a scoping conversation.",
      },
    ],
    turnaround: "2–6 weeks, depending on draft stage",
    pricing: { unit: "word", perWordLow: 0.075, perWordHigh: 0.14, minimum: 900 },
  },
  {
    slug: "review-article",
    pillar: "manuscript-writing",
    title: "Review Article Writing",
    shortTitle: "Review Article",
    summary:
      "A narrative or integrative review built around a clear question, a defensible search, and a readable synthesis.",
    description: [
      "Reviews fail when they read as a tour of the literature rather than an argument. We help define the review's question and boundary, organise the evidence into themes, and write a synthesis that makes the contribution explicit.",
      "Appropriate for narrative, integrative, and state-of-the-art reviews. If you need a reproducible search and formal appraisal, the systematic analysis service is the better fit.",
    ],
    bestFor: [
      "Narrative, integrative, or state-of-the-art reviews",
      "A literature base that needs organising into an argument",
      "Reviewers asking for a clearer contribution or tighter scope",
    ],
    deliverables: [
      "Review question and boundary note",
      "Evidence map and thematic outline",
      "Full draft or restructured manuscript",
      "Citation and reference consistency check",
      "Revision summary and open questions",
    ],
    process: [
      {
        title: "Define the boundary",
        text: "We agree the question, audience, time frame, and what the review will not attempt to cover.",
      },
      {
        title: "Map the evidence",
        text: "Sources are grouped into themes, tensions, and gaps rather than listed one after another.",
      },
      {
        title: "Write the synthesis",
        text: "The draft builds an argument, states its limits, and makes the contribution legible.",
      },
      {
        title: "Check and hand off",
        text: "References, terminology, and claims are checked; you receive the draft and revision notes.",
      },
    ],
    faqs: [
      {
        question: "Is this the same as a systematic review?",
        answer:
          "No. A systematic review follows a protocol with reproducible searches and formal appraisal. A narrative review can still be rigorous, but its method and purpose are different. We will recommend the right route.",
      },
      {
        question: "Do you choose the literature?",
        answer:
          "We can suggest key sources and check coverage, but the author sets the scope and remains responsible for the final evidence base.",
      },
      {
        question: "Can you rescue a review that was rejected?",
        answer:
          "Often, if the issue is framing, structure, or clarity. We read the decision letter first and tell you whether the problem is fixable within the existing evidence.",
      },
    ],
    turnaround: "3–8 weeks, depending on scope",
    pricing: { unit: "word", perWordLow: 0.08, perWordHigh: 0.15, minimum: 1000 },
  },
  {
    slug: "meta-analysis",
    pillar: "manuscript-writing",
    title: "Meta-Analysis Support",
    shortTitle: "Meta-Analysis",
    summary:
      "Statistical synthesis, heterogeneity assessment, and publication-ready reporting for meta-analyses.",
    description: [
      "We support the quantitative core: effect-size extraction, model choice, heterogeneity, sensitivity analysis, and the tables and figures reviewers expect. The search and screening record can be built alongside the analysis or supplied by your team.",
      "The aim is a synthesis that is transparent about its choices. Every model decision is documented, and every figure can be traced back to the extraction sheet.",
    ],
    bestFor: [
      "Effect-size synthesis across comparable studies",
      "Subgroup, sensitivity, or publication-bias analysis",
      "Teams that need a defensible methods and results section",
    ],
    deliverables: [
      "Effect-size extraction and coding sheet",
      "Random- or fixed-effects analysis with model rationale",
      "Heterogeneity, subgroup, and sensitivity checks",
      "Forest and funnel figures",
      "Methods and results write-up",
    ],
    process: [
      {
        title: "Check the question",
        text: "We confirm that the included studies measure a comparable effect and that a pooled estimate is meaningful.",
      },
      {
        title: "Extract and code",
        text: "Effect sizes, sample sizes, and moderators are coded into a documented sheet.",
      },
      {
        title: "Analyse and test",
        text: "The model, heterogeneity estimate, and sensitivity checks are run and interpreted together.",
      },
      {
        title: "Report and hand off",
        text: "You receive figures, tables, and a methods-ready write-up with the analysis record.",
      },
    ],
    faqs: [
      {
        question: "Do you run the systematic search?",
        answer:
          "We can, or we can work from your screening record. If the search is not reproducible, we will flag that before the analysis starts.",
      },
      {
        question: "What if the studies are too heterogeneous?",
        answer:
          "We say so and explore subgroup or narrative synthesis instead. Forcing a pooled estimate is not a service we offer.",
      },
      {
        question: "Which software do you use?",
        answer:
          "R (metafor), Stata, or RevMan are common. The agreed output format determines the choice.",
      },
    ],
    turnaround: "3–7 weeks",
    pricing: { unit: "fixed", low: 1800, high: 4200, minimum: 1800 },
  },
  {
    slug: "systematic-analysis",
    pillar: "manuscript-writing",
    title: "Systematic Analysis & Review",
    shortTitle: "Systematic Review",
    summary:
      "A transparent, reproducible systematic review process from protocol to PRISMA reporting.",
    description: [
      "We work from a registered or registerable protocol: search strategy, screening records, risk-of-bias assessment, synthesis, and PRISMA reporting. The emphasis is on an audit trail a reader can follow.",
      "The service can cover the full review or a defined component, such as the search strategy, screening, appraisal, or PRISMA documentation.",
    ],
    bestFor: [
      "A systematic review that needs a reproducible method",
      "Teams updating or extending an existing review",
      "A protocol that needs operational detail before screening",
    ],
    deliverables: [
      "Protocol and eligibility criteria",
      "Search strategy by database",
      "Screening and exclusion log",
      "Risk-of-bias assessment",
      "PRISMA flow diagram and checklist",
      "Synthesis and manuscript support",
    ],
    process: [
      {
        title: "Protocol first",
        text: "The question, eligibility criteria, databases, and outcomes are fixed before screening begins.",
      },
      {
        title: "Search and screen",
        text: "Searches are run and recorded; screening decisions are logged with reasons.",
      },
      {
        title: "Appraise and synthesise",
        text: "Risk of bias is assessed and results are synthesised according to the protocol.",
      },
      {
        title: "Report transparently",
        text: "PRISMA documents, tables, and the manuscript record what was done and what was found.",
      },
    ],
    faqs: [
      {
        question: "Can you update an existing review?",
        answer:
          "Yes. We start by checking the original protocol and search date, then document the update rather than blending old and new decisions.",
      },
      {
        question: "Do you register the protocol?",
        answer:
          "We prepare the registration materials. The author or team submits them to the relevant registry.",
      },
      {
        question: "How long does a full review take?",
        answer:
          "Typically 6–12 weeks, depending on the number of records, the appraisal workload, and how quickly screening decisions can be confirmed.",
      },
    ],
    turnaround: "6–12 weeks, depending on record volume",
    pricing: { unit: "fixed", low: 1600, high: 3800, minimum: 1600 },
  },
  {
    slug: "case-studies-reports",
    pillar: "manuscript-writing",
    title: "Case Studies & Case Reports",
    shortTitle: "Case Reports",
    summary:
      "Clear, ethically framed case reports and case series with consent and reporting details in order.",
    description: [
      "A case report is an argument about what a single case can teach. We help structure the history, findings, differential, outcome, and discussion, with CARE-style reporting and explicit attention to consent and identifying details.",
      "We do not obtain consent or make ethics determinations on behalf of the treating team. We help make those steps visible and complete before submission.",
    ],
    bestFor: [
      "Clinical case reports and small case series",
      "Unusual presentations, adverse events, or teaching cases",
      "Authors who need CARE-informed structure and de-identification review",
    ],
    deliverables: [
      "CARE-informed structure",
      "De-identification review",
      "Consent and ethics documentation checklist",
      "Draft and revision summary",
      "Timeline and figure suggestions",
    ],
    process: [
      {
        title: "Confirm the lesson",
        text: "We identify the one thing the case adds and check that the report can support it.",
      },
      {
        title: "Protect the patient",
        text: "Identifying details, images, and consent status are reviewed before drafting.",
      },
      {
        title: "Write the report",
        text: "The case is structured around history, findings, differential, management, outcome, and discussion.",
      },
      {
        title: "Prepare for submission",
        text: "Reporting checklist, consent statement, and journal requirements are assembled.",
      },
    ],
    faqs: [
      {
        question: "Do you obtain patient consent?",
        answer:
          "No. The treating team remains responsible for consent and for confirming that identifying details are removed. We can provide a checklist and review the draft for obvious identifiers.",
      },
      {
        question: "Can you write from clinical notes?",
        answer:
          "Yes, with appropriate de-identification and author confirmation of the clinical facts.",
      },
      {
        question: "Which journals publish case reports?",
        answer:
          "We can shortlist journals that accept the format and fit the case, but acceptance is never guaranteed.",
      },
    ],
    turnaround: "1–4 weeks",
    pricing: { unit: "word", perWordLow: 0.08, perWordHigh: 0.15, minimum: 600 },
  },
  {
    slug: "report-writing",
    pillar: "manuscript-writing",
    title: "Report Writing",
    shortTitle: "Report Writing",
    summary:
      "Policy, clinical, grant, and project reports written for the decision the reader needs to make.",
    description: [
      "Reports are judged by whether a reader can act on them. We structure the question, methods, findings, limitations, and recommendations around the intended audience, then edit for plain, precise language.",
      "Suitable for internal research reports, grant reporting, clinical service reviews, and policy briefs.",
    ],
    bestFor: [
      "Research and project reports for non-specialist readers",
      "Grant reporting and funder updates",
      "Clinical service or policy reviews",
    ],
    deliverables: [
      "Report outline and audience note",
      "Draft or restructured report",
      "Executive summary",
      "Tables and figures",
      "Revision summary",
    ],
    process: [
      {
        title: "Name the decision",
        text: "We identify what the reader needs to decide or do after reading.",
      },
      {
        title: "Structure the evidence",
        text: "Findings are ordered around that decision, with limitations kept visible.",
      },
      {
        title: "Write for the reader",
        text: "The draft removes jargon where it is not needed and keeps technical detail where it matters.",
      },
      {
        title: "Review and deliver",
        text: "You receive the report, an executive summary, and a list of open questions.",
      },
    ],
    faqs: [
      {
        question: "Can you write from meeting notes and slides?",
        answer:
          "Yes, if the underlying evidence is available. We will flag where the record is too thin to support a claim.",
      },
      {
        question: "Do you design the layout?",
        answer:
          "We prepare a clean, readable document. Full brand design and typesetting can be scoped separately.",
      },
      {
        question: "Is the report confidential?",
        answer:
          "Yes. Documents and datasets are treated as confidential and are not shared outside the assigned specialist team.",
      },
    ],
    turnaround: "1–4 weeks",
    pricing: { unit: "word", perWordLow: 0.06, perWordHigh: 0.11, minimum: 500 },
  },
  {
    slug: "journal-submission",
    pillar: "journal-submission",
    title: "Journal Submission Support",
    shortTitle: "Submission Support",
    summary:
      "A complete submission package assembled against the target journal's requirements.",
    description: [
      "We turn the journal's author guidelines into a working checklist: files, declarations, permissions, formatting, and portal fields. You approve every submission; we make sure nothing obvious is missing.",
      "The service is designed for authors who want to keep control of the portal while removing the administrative risk around it.",
    ],
    bestFor: [
      "First submissions and resubmissions",
      "Multi-file submissions with declarations and permissions",
      "Authors who want a pre-submission QA pass",
    ],
    deliverables: [
      "Journal requirement checklist",
      "Formatted manuscript and title page",
      "Cover letter draft",
      "Declarations and permissions checklist",
      "Portal field map",
      "Pre-submission QA pass",
    ],
    process: [
      {
        title: "Read the guidelines",
        text: "Current author instructions are converted into a requirement checklist.",
      },
      {
        title: "Assemble the package",
        text: "Manuscript, title page, figures, declarations, and supporting files are checked against the list.",
      },
      {
        title: "Prepare the portal",
        text: "A field map lists what goes where, including author order and metadata.",
      },
      {
        title: "Author submits",
        text: "You review and submit. We stay available for the final portal queries.",
      },
    ],
    faqs: [
      {
        question: "Will you submit the manuscript for me?",
        answer:
          "Only with explicit authorisation and access. Most authors keep control of the portal; we prepare the package and remain available while they submit.",
      },
      {
        question: "What if the journal changes its guidelines?",
        answer:
          "We check the live guidelines at the time of the QA pass. Screenshots and a checklist record what was used.",
      },
      {
        question: "Do you handle APCs or payments?",
        answer:
          "No. Fees, waivers, and payment decisions remain with the author or institution.",
      },
    ],
    turnaround: "3–10 business days",
    pricing: { unit: "fixed", low: 180, high: 450, minimum: 180 },
  },
  {
    slug: "journal-specific-editing",
    pillar: "journal-submission",
    title: "Editing to Journal Requirements",
    shortTitle: "Journal Editing",
    summary:
      "Journal-specific formatting, structure, and style editing against the actual author guidelines.",
    description: [
      "Reference style, section order, word limits, figure specifications, reporting checklists, and house style. We work from the current guidelines and return a marked-up manuscript plus a compliance list.",
      "This is not a generic language edit. The work is driven by the target journal's requirements, so the manuscript arrives in the form the editor expects.",
    ],
    bestFor: [
      "Manuscripts moving between journals",
      "Strict reference or formatting requirements",
      "A final compliance pass before submission",
    ],
    deliverables: [
      "Guideline-to-manuscript compliance matrix",
      "Reformatted references and headings",
      "Figure and table specification check",
      "Tracked changes",
      "Outstanding requirements list",
    ],
    process: [
      {
        title: "Collect the rules",
        text: "We work from the current author guidelines and any journal-specific templates.",
      },
      {
        title: "Map the gaps",
        text: "Each requirement is marked as met, missing, or unclear.",
      },
      {
        title: "Edit the manuscript",
        text: "Formatting, references, and structure are brought into line with the guide.",
      },
      {
        title: "Return the audit",
        text: "You receive the revised files and a short list of items only the author can complete.",
      },
    ],
    faqs: [
      {
        question: "Which reference styles do you support?",
        answer:
          "Common styles including Vancouver, APA, AMA, Harvard, and journal-specific variants where the current guide is available.",
      },
      {
        question: "Will you reformat figures?",
        answer:
          "We check dimensions, resolution, file type, and labelling against the guide. Redrawing figures can be added to the scope.",
      },
      {
        question: "Can this be combined with proofreading?",
        answer:
          "Yes. Many authors combine journal formatting with a language pass, and the estimate reflects both.",
      },
    ],
    turnaround: "2–7 business days",
    pricing: { unit: "word", perWordLow: 0.035, perWordHigh: 0.065, minimum: 250 },
  },
  {
    slug: "letter-to-the-editor",
    pillar: "journal-submission",
    title: "Letters to the Editor & Correspondence",
    shortTitle: "Letters to the Editor",
    summary:
      "Focused correspondence that makes one point, supports it, and respects the journal's format.",
    description: [
      "A letter is not a shortened article. We help identify the single claim, select the minimum evidence needed, and fit the journal's word limit and reference rules.",
      "The same structure is useful for post-publication commentary, corrections, and some response-to-reviewer correspondence.",
    ],
    bestFor: [
      "Commentary on a recently published article",
      "A correction or clarification with a clear evidence base",
      "Journal correspondence with tight word limits",
    ],
    deliverables: [
      "One-claim outline",
      "Draft within the journal's word limit",
      "Reference check",
      "Tone and format review",
    ],
    process: [
      {
        title: "Find the point",
        text: "We identify the single claim and what evidence is actually needed to support it.",
      },
      {
        title: "Check the format",
        text: "Word limit, reference cap, title rules, and submission route are confirmed.",
      },
      {
        title: "Draft tightly",
        text: "The letter states the point, supports it, and stops.",
      },
      {
        title: "Review and send",
        text: "You approve the final text and submit it under your name.",
      },
    ],
    faqs: [
      {
        question: "Can you write a letter criticising a paper?",
        answer:
          "We can help make a criticism precise and evidence-based. We do not write personal attacks or unsupported allegations.",
      },
      {
        question: "Do I need the original authors' response?",
        answer:
          "Not usually, but the journal's format may require a specific structure. We check the current instructions.",
      },
      {
        question: "How short should it be?",
        answer:
          "As short as the claim allows, and never longer than the journal permits.",
      },
    ],
    turnaround: "2–5 business days",
    pricing: { unit: "word", perWordLow: 0.05, perWordHigh: 0.09, minimum: 150 },
  },
  {
    slug: "short-communication",
    pillar: "journal-submission",
    title: "Short Communications",
    shortTitle: "Short Communications",
    summary:
      "Compact papers that preserve the method and the claim within a tight word limit.",
    description: [
      "Short formats reward discipline. We help cut without losing the design, the result, or the limitation, and check the format against the journal's specific short-communication rules.",
      "Useful for preliminary findings, focused negative results, methods notes, and concise clinical observations.",
    ],
    bestFor: [
      "Strict word or figure limits",
      "Preliminary or focused findings",
      "Manuscripts that need cutting without losing rigour",
    ],
    deliverables: [
      "Format-aware outline",
      "Draft within the limit",
      "Figure and table reduction plan",
      "Reference and reporting check",
    ],
    process: [
      {
        title: "Check the format",
        text: "We confirm the journal's definition of a short communication and its limits.",
      },
      {
        title: "Protect the core",
        text: "The design, primary result, and main limitation are identified as non-negotiable.",
      },
      {
        title: "Cut and tighten",
        text: "Secondary material moves to supplementary files or is removed.",
      },
      {
        title: "Final check",
        text: "The draft is checked against the word, figure, and reference limits.",
      },
    ],
    faqs: [
      {
        question: "Can you cut my full paper down?",
        answer:
          "Yes, if the journal's short format is a good fit. We will tell you if the study needs the full article structure instead.",
      },
      {
        question: "What usually gets cut?",
        answer:
          "Long introductions, repeated results, and discussion points that do not change the interpretation.",
      },
      {
        question: "Do supplementary files count?",
        answer:
          "It depends on the journal. We check the current rules before deciding what moves out of the main text.",
      },
    ],
    turnaround: "1–3 weeks",
    pricing: { unit: "word", perWordLow: 0.06, perWordHigh: 0.11, minimum: 350 },
  },
  {
    slug: "proofreading",
    pillar: "language-integrity",
    title: "Proofreading & Language Editing",
    shortTitle: "Proofreading",
    summary:
      "Sentence-level correction of grammar, clarity, consistency, and academic register.",
    description: [
      "A careful pass over spelling, grammar, punctuation, terminology, and sentence flow. We preserve your meaning and flag passages where the science is ambiguous rather than quietly rewriting it.",
      "Suitable for manuscripts, reports, theses, grant applications, and response letters.",
    ],
    bestFor: [
      "A final language pass before submission",
      "Non-native English authors who want clear academic prose",
      "Consistency across a long document or multi-author draft",
    ],
    deliverables: [
      "Tracked-changes edit",
      "Clean revised file",
      "Style sheet for key terms",
      "Queries where meaning is unclear",
    ],
    process: [
      {
        title: "Read for meaning",
        text: "The editor reads the full document before changing sentences, so the argument stays intact.",
      },
      {
        title: "Edit in layers",
        text: "Grammar and punctuation first, then clarity, consistency, and register.",
      },
      {
        title: "Flag uncertainty",
        text: "Ambiguous scientific statements are queried rather than guessed at.",
      },
      {
        title: "Return both files",
        text: "You receive tracked changes and a clean copy, plus a short style sheet.",
      },
    ],
    faqs: [
      {
        question: "Do you edit the science?",
        answer:
          "We flag apparent inconsistencies, but we do not invent data or silently change findings. Scientific claims remain the author's responsibility.",
      },
      {
        question: "Will the meaning stay the same?",
        answer:
          "Yes. The aim is clearer expression of your meaning. Where a change could alter the claim, we query it instead.",
      },
      {
        question: "Can you match a journal style?",
        answer:
          "Yes, where the style is documented. Journal-specific reference and formatting work is covered by the journal editing service.",
      },
    ],
    turnaround: "3–7 business days for most manuscripts",
    pricing: { unit: "word", perWordLow: 0.018, perWordHigh: 0.032, minimum: 120 },
  },
  {
    slug: "ai-removal-humanizing",
    pillar: "language-integrity",
    title: "AI Removal & Humanizing",
    shortTitle: "Responsible AI Revision",
    summary:
      "Responsible revision of machine-sounding prose into clear, natural academic writing.",
    description: [
      "We revise repetitive phrasing, generic transitions, and unnatural rhythm so the writing sounds like a careful researcher, not a template. We do not help misrepresent authorship or guarantee results from AI detectors.",
      "The work is a language edit, not an authorship claim. Where a passage needs real evidence or a personal judgement, we flag it for the author rather than inventing detail.",
    ],
    bestFor: [
      "Drafts with repetitive or generic phrasing",
      "Text that has lost the author's voice",
      "A final clarity and naturalness pass",
    ],
    deliverables: [
      "Full language revision",
      "Revision notes explaining substantive changes",
      "Consistency and voice check",
      "Flagged passages that need author input",
    ],
    process: [
      {
        title: "Read for voice",
        text: "We identify where the prose sounds generic, repetitive, or disconnected from the evidence.",
      },
      {
        title: "Revise for clarity",
        text: "Sentences are rebuilt around the actual claim, with plain academic rhythm.",
      },
      {
        title: "Check integrity",
        text: "Unsupported claims and invented detail are removed or queried.",
      },
      {
        title: "Return with notes",
        text: "You receive the revised text and a short explanation of what changed and why.",
      },
    ],
    faqs: [
      {
        question: "Can you guarantee it will pass AI detectors?",
        answer:
          "No. Detector outputs are inconsistent and are not a reliable measure of authorship. We focus on clear, defensible writing and transparent revision.",
      },
      {
        question: "Will this hide that AI was used?",
        answer:
          "No. We do not help misrepresent authorship. If AI use must be disclosed under the journal's policy, that remains the author's responsibility.",
      },
      {
        question: "How is this different from proofreading?",
        answer:
          "Proofreading corrects language at sentence level. This service also rebuilds repetitive or generic prose and checks whether claims are actually supported.",
      },
    ],
    turnaround: "3–7 business days",
    pricing: { unit: "word", perWordLow: 0.025, perWordHigh: 0.045, minimum: 180 },
  },
  {
    slug: "plagiarism-removal",
    pillar: "language-integrity",
    title: "Plagiarism Removal & Similarity Review",
    shortTitle: "Similarity Review",
    summary:
      "Similarity review, attribution repair, and rewriting that keeps the source relationship honest.",
    description: [
      "We review the similarity report, distinguish legitimate overlap from missing attribution, and revise with proper citation and paraphrasing. We do not disguise copied work or remove references to evade a check.",
      "Some overlap is expected: methods, standard definitions, and reference lists. The work is to explain and correct the overlap, not to chase a number.",
    ],
    bestFor: [
      "A similarity report with unexplained overlap",
      "Missing or incomplete attribution",
      "A manuscript that needs a transparent integrity review",
    ],
    deliverables: [
      "Similarity report walkthrough",
      "Attribution and citation repairs",
      "Rewritten passages with source links",
      "Residual-risk note",
    ],
    process: [
      {
        title: "Read the report",
        text: "We separate expected overlap from passages that need attribution or rewriting.",
      },
      {
        title: "Trace the sources",
        text: "Each flagged passage is checked against the original source and the intended claim.",
      },
      {
        title: "Repair honestly",
        text: "Passages are rewritten or quoted and cited properly; references are not removed to lower a score.",
      },
      {
        title: "Explain what remains",
        text: "You receive a short note on residual overlap and why it is legitimate.",
      },
    ],
    faqs: [
      {
        question: "Can you get my score below a threshold?",
        answer:
          "We do not target a number. We correct attribution and expression, then explain what overlap remains and why.",
      },
      {
        question: "What if I copied a methods section?",
        answer:
          "Standard methods can often be quoted with citation, or rewritten in your own words. We will show you the proper route.",
      },
      {
        question: "Do you use plagiarism software?",
        answer:
          "We work from the report you provide or the report your institution or journal generates. We do not claim access to every database.",
      },
    ],
    turnaround: "3–7 business days",
    pricing: { unit: "word", perWordLow: 0.03, perWordHigh: 0.055, minimum: 200 },
  },
  {
    slug: "data-analysis",
    pillar: "data-analysis",
    title: "Data Analysis & Interpretation",
    shortTitle: "Data Analysis",
    summary:
      "Analysis planning, statistical work, interpretation, and publication-ready outputs in SPSS, R, Excel, or GraphPad Prism.",
    description: [
      "We start with the question and the design, then check whether the planned test is defensible. The work covers cleaning, assumption checks, analysis, interpretation, and the tables and figures a journal will ask for.",
      "Every analysis is delivered with a record of decisions and a plain-language summary. If the data cannot support the intended claim, we say so before the manuscript depends on it.",
    ],
    bestFor: [
      "Clinical, laboratory, survey, and observational datasets",
      "A statistical section that needs a defensible method",
      "Publication tables and figures that need to match the analysis",
    ],
    deliverables: [
      "Analysis plan mapped to the research question",
      "Cleaning and coding log",
      "Assumption checks and model diagnostics",
      "Interpreted results with limitations",
      "Publication-ready tables and figures",
      "Reproducible script or workbook where agreed",
    ],
    process: [
      {
        title: "Plan the analysis",
        text: "The question, design, variables, and planned tests are agreed before the dataset is touched.",
      },
      {
        title: "Clean and check",
        text: "Missingness, outliers, coding, and assumptions are documented rather than quietly corrected.",
      },
      {
        title: "Analyse and interpret",
        text: "The agreed models are run, with effect sizes, uncertainty, and limitations reported alongside p-values.",
      },
      {
        title: "Build the outputs",
        text: "You receive tables, figures, a methods-ready summary, and the analysis record.",
      },
    ],
    faqs: [
      {
        question: "Do you work in my software?",
        answer:
          "SPSS, R, Excel, and GraphPad Prism are standard. Other tools can be discussed in the scope note.",
      },
      {
        question: "Can you analyse a dataset without a protocol?",
        answer:
          "Yes, but the design and intended claim still need to be clear. If they are not, we will scope a short planning step first.",
      },
      {
        question: "Will you guarantee a significant result?",
        answer:
          "No. We report what the data support, including null or inconclusive findings.",
      },
    ],
    turnaround: "1–4 weeks, depending on dataset and scope",
    pricing: {
      unit: "dataset",
      baseLow: 350,
      baseHigh: 750,
      perThousandRowsLow: 50,
      perThousandRowsHigh: 110,
      minimum: 350,
    },
    tools: ["SPSS", "R", "Excel", "GraphPad Prism"],
  },
];

export const pillars: Pillar[] = pillarMeta.map((pillar) => ({
  ...pillar,
  services: services.filter((service) => service.pillar === pillar.slug),
}));

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((pillar) => pillar.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesForPillar(slug: PillarSlug): Service[] {
  return services.filter((service) => service.pillar === slug);
}

export function getRelatedServices(service: Service, limit = 2): Service[] {
  return services
    .filter((item) => item.pillar === service.pillar && item.slug !== service.slug)
    .slice(0, limit);
}

export const researchStages = [
  {
    id: "planning",
    label: "Designing the study",
    hint: "Protocol, question, feasibility",
  },
  {
    id: "writing",
    label: "Writing the manuscript",
    hint: "Structure, argument, first draft",
  },
  {
    id: "data",
    label: "Working with data",
    hint: "Cleaning, analysis, figures",
  },
  {
    id: "submitting",
    label: "Preparing to submit",
    hint: "Files, journal rules, cover letter",
  },
  {
    id: "review",
    label: "Responding to review",
    hint: "Revisions, letters, re-checks",
  },
] as const;

export const researchNeeds = [
  { id: "write", label: "Shape the writing", hint: "Drafting, synthesis, reports" },
  { id: "analyse", label: "Analyse the data", hint: "Statistics, tables, figures" },
  { id: "comply", label: "Meet journal requirements", hint: "Formatting, files, submission" },
  { id: "polish", label: "Polish language and integrity", hint: "Editing, similarity, voice" },
  { id: "unsure", label: "I'm not sure yet", hint: "Start with a scope conversation" },
] as const;

export type StageId = (typeof researchStages)[number]["id"];
export type NeedId = (typeof researchNeeds)[number]["id"];

type RecommendationMap = Record<
  string,
  { primary: string; secondary?: string; note: string }
>;

const recommendationMap: RecommendationMap = {
  "planning:write": {
    primary: "systematic-analysis",
    secondary: "research-article",
    note: "A protocol-led synthesis is easier to defend when the question and eligibility rules are settled first.",
  },
  "planning:analyse": {
    primary: "data-analysis",
    secondary: "meta-analysis",
    note: "An analysis plan now prevents a dataset from arriving without a testable question.",
  },
  "planning:comply": {
    primary: "journal-submission",
    secondary: "systematic-analysis",
    note: "Checking the target journal's requirements early can change the study design and reporting.",
  },
  "planning:polish": {
    primary: "proofreading",
    secondary: "systematic-analysis",
    note: "A language baseline now makes later editing faster and more consistent.",
  },
  "writing:write": {
    primary: "research-article",
    secondary: "review-article",
    note: "The manuscript needs a structure that follows the evidence, not a generic template.",
  },
  "writing:analyse": {
    primary: "data-analysis",
    secondary: "research-article",
    note: "The analysis and the article should be built around the same question and the same limitations.",
  },
  "writing:comply": {
    primary: "journal-specific-editing",
    secondary: "journal-submission",
    note: "Formatting and reference compliance are quicker to fix before the final submission pass.",
  },
  "writing:polish": {
    primary: "proofreading",
    secondary: "ai-removal-humanizing",
    note: "A sentence-level edit will clarify the argument without changing the science.",
  },
  "data:analyse": {
    primary: "data-analysis",
    secondary: "meta-analysis",
    note: "The priority is a documented analysis with assumptions, interpretation, and outputs that match.",
  },
  "data:write": {
    primary: "research-article",
    secondary: "report-writing",
    note: "The results need to be written around what the data can support, not the other way round.",
  },
  "data:comply": {
    primary: "journal-submission",
    secondary: "journal-specific-editing",
    note: "Datasets, tables, and figure files often have journal-specific requirements worth checking early.",
  },
  "data:polish": {
    primary: "proofreading",
    secondary: "plagiarism-removal",
    note: "A language and integrity pass will make the results section easier to read and attribute.",
  },
  "submitting:comply": {
    primary: "journal-submission",
    secondary: "journal-specific-editing",
    note: "This is a package and compliance problem: checklist, files, declarations, and portal.",
  },
  "submitting:polish": {
    primary: "proofreading",
    secondary: "plagiarism-removal",
    note: "A final language and similarity pass reduces avoidable queries before review.",
  },
  "submitting:write": {
    primary: "letter-to-the-editor",
    secondary: "short-communication",
    note: "The short formats need one clear claim and a tight evidence base.",
  },
  "submitting:analyse": {
    primary: "data-analysis",
    secondary: "journal-submission",
    note: "If the analysis is still moving, the submission timeline needs to be reset around it.",
  },
  "review:write": {
    primary: "letter-to-the-editor",
    secondary: "journal-specific-editing",
    note: "Response correspondence should answer the reviewer's point directly, not restate the paper.",
  },
  "review:analyse": {
    primary: "data-analysis",
    secondary: "meta-analysis",
    note: "Reviewer requests for new analyses need a clear plan before the response letter is written.",
  },
  "review:comply": {
    primary: "journal-specific-editing",
    secondary: "journal-submission",
    note: "Revisions often change formatting, references, and reporting checklists as well as text.",
  },
  "review:polish": {
    primary: "proofreading",
    secondary: "ai-removal-humanizing",
    note: "A clean language pass makes the revision and response easier for editors to follow.",
  },
};

const defaultNeedByStage: Record<StageId, NeedId> = {
  planning: "write",
  writing: "write",
  data: "analyse",
  submitting: "comply",
  review: "comply",
};

export function getRecommendation(stage: StageId, need: NeedId) {
  const resolvedNeed = need === "unsure" ? defaultNeedByStage[stage] : need;
  const entry =
    recommendationMap[`${stage}:${resolvedNeed}`] ??
    recommendationMap[`writing:${resolvedNeed}`];

  return {
    primary: getService(entry.primary)!,
    secondary: entry.secondary ? getService(entry.secondary) : undefined,
    note: entry.note,
    unsure: need === "unsure",
  };
}

export function formatPriceRange(low: number, high: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const lowLabel = formatter.format(Math.round(low / 10) * 10);
  const highLabel = formatter.format(Math.round(high / 10) * 10);
  return lowLabel === highLabel ? lowLabel : `${lowLabel}–${highLabel}`;
}
