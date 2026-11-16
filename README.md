# Scientific-Scribe

A rebuilt marketing site for Scientific-Scribe, an academic research and publication support practice. The site presents fourteen services across four pillars, with dedicated service pages, a two-step service matcher, a transparent planning estimator, a resource hub, and a written-scope contact flow.

The content and UX follow `Project-Briefing.md`. The visual system follows `Tech_And_Stack.md`: high-contrast black/white themes, signal red `#E8391D`, Neue Montreal with system fallbacks, a frosted-glass header, CSS-variable theming, and reduced-motion support. `Website-Design.md` was intentionally not used.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4 via `@tailwindcss/postcss` |
| Theme | `next-themes` |
| Motion | `framer-motion` |
| Icons | `react-icons/pi` |
| Language | TypeScript |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + type check
npm run start    # serve the production build
npm run lint
```

`RESEND_API_KEY` in `.env.example` is unused by this build. The contact form intentionally composes a `mailto:` message in the visitor's email client rather than posting to a server.

## Before launch

Replace the placeholders in `src/lib/site.ts`:

```ts
url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://scientific-scribe.example",
email: "hello@scientific-scribe.example",
```

- `site.url` feeds canonical URLs, JSON-LD, `sitemap.xml`, `robots.txt`, and the OG image footer.
- `site.email` feeds every `mailto:` link and the contact flow.
- The OG image footer also contains a hard-coded `scientific-scribe.example`; update it in `src/app/opengraph-image.tsx`.
- Review `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` against the real business, hosting, email provider, retention schedule, and jurisdiction. The copy describes the current static/mailto implementation and is not legal advice.

Optional: set `NEXT_PUBLIC_SITE_URL` in the deployment environment instead of editing the fallback.

## Content model

- `src/lib/services.ts` — pillars, fourteen services, deliverables, process steps, FAQs, pricing logic, matcher mappings.
- `src/lib/resources.ts` — resource metadata and FAQs.
- `src/lib/site.ts` — site identity, navigation, footer links, `mailto` helper.

Service URLs are `/services/{pillar}/{slug}`. Note that the data analysis service resolves to `/services/data-analysis/data-analysis` because the pillar and service share a slug.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: console, matcher, pillars, data figure, before/after, process, estimator, resources, ethics |
| `/services` | Filterable service index |
| `/services/[pillar]` | Pillar overview |
| `/services/[pillar]/[slug]` | Service scope, deliverables, process, FAQs, quote route |
| `/match` | Full service matcher |
| `/estimate` | Estimator, assumptions, pricing table |
| `/resources` | Resource hub |
| `/resources/[slug]` | PRISMA builder, cover-letter tool, or tool comparison |
| `/about` | Practice position; `#integrity` anchor |
| `/contact` | Scope request form (`mailto:`) |
| `/privacy`, `/terms` | Plain-language notices |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image` | SEO and PWA metadata |

## SEO

- Per-page titles, descriptions, and canonicals.
- Organization, Service, ItemList, FAQPage, Article, BreadcrumbList, ContactPage, and AboutPage JSON-LD.
- `sitemap.ts` covers every static route, pillar, service, and resource.
- Generated OG image at `src/app/opengraph-image.tsx`.
- No review markup is used because there are no verifiable client reviews. No acceptance, significance, or detector-score guarantees appear in the copy.
