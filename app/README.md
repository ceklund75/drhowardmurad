# App README

This directory contains the buildable Next.js application for the Dr. Howard Murad website. It uses the App Router and a headless WordPress + GraphQL backend.

---

## Contents

- `public/`
  - `fonts/` – Adobe Caslon Pro and Barlow Semi Condensed font files
  - `images/` – Logos and shared imagery

- `src/app/`
  - Route handlers for pages, blog, preview, and revalidation
  - Layouts, loading states, error handling, `robots.ts`, `sitemap.ts`

- `src/components/`
  - `blog/` – Blog grid, hero, post renderer, video buttons, share actions
  - `header/` – Header, mobile navigation, header shell
  - `footer/` – Footer and newsletter inline form
  - `forms/` – Newsletter and other form UI
  - `modals/` – VideoModal and related components
  - `pages/` – Page layout, sections, and page renderer
  - `shared/` – Reusable primitives (buttons, links, back-to-top, etc.)
  - `ui/` – UI helpers and design‑system‑style components

- `src/lib/`
  - `graphql/` – GraphQL client, queries, pagination helpers
  - `blog/` – Blog‑specific data helpers
  - `navigation/` – Menu and navigation builders
  - `seo/` – Metadata builders, JSON‑LD, TSF integration
  - `utils/` – Logger, theming, Tailwind safelist, shared utilities

---

## Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000.

---

## Environment

Define required environment variables in `.env.local` at the project root (see `src/lib/graphql/client.ts` and the root README for details).

For an overview of the migration, architecture, and deployment, see the root `README.md`.
