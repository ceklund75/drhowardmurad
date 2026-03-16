# Dr. Howard Murad — Website Migration

End‑to‑end migration of the Dr. Howard Murad marketing site from a legacy WordPress/Uncode theme to a modern headless architecture. I designed and implemented the entire frontend, data layer, and deployment.

**Tech:** Next.js · TypeScript · Tailwind CSS · GraphQL · WordPress (headless)

---

## Role

I led the full migration and build, including:

- App architecture and routing using the Next.js App Router
- GraphQL integration with the headless WordPress backend
- UI/UX implementation, responsive layout, and accessibility
- SEO metadata and JSON‑LD helpers
- Environment configuration and deployment setup

---

## Features

- Static and dynamic pages backed by a GraphQL API
- Rich blog experience (grid, hero, post renderer, video modals, share actions)
- Preview and revalidation routes for CMS‑like authoring workflows
- Custom font stack (Adobe Caslon Pro, Barlow Semi Condensed) served from `public/fonts`
- Newsletter and other forms implemented with reusable form components

---

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000.

---

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Development server       |
| `npm run build`   | Production build         |
| `npm run start`   | Serve production build   |
| `npm run lint`    | Run ESLint               |
| `npm run analyze` | Bundle analysis (if configured) |

---

## Environment Variables

Create a `.env.local` at the project root:

```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=   # GraphQL API URL for content
NEXT_PUBLIC_ANALYTICS_ID=       # Analytics ID (if applicable)
```

See `src/lib/graphql/client.ts` and related files in `src/lib/graphql/` for the full set of expected variables.

---

## Project Structure

```text
public/
  fonts/           # Adobe Caslon Pro, Barlow Semi Condensed
  images/          # Logos and shared imagery

src/
  app/             # App Router pages, layouts, metadata, preview/revalidate routes
  components/
    blog/          # Blog grid, hero, post renderer, video buttons, sharing
    header/        # Header, mobile menu, navigation shell
    footer/        # Footer, newsletter inline form
    forms/         # Newsletter and other form components
    modals/        # VideoModal and related UI
    pages/         # Page layout and sections
    shared/        # Reusable primitives (buttons, links, etc.)
    ui/            # Design system utilities and UI helpers
  lib/
    graphql/       # GraphQL client, queries, pagination helpers
    blog/          # Blog data utilities
    navigation/    # Menu and navigation helpers
    seo/           # Metadata builders, JSON‑LD, TSF helpers
    utils/         # Logger, theming, Tailwind safelist, shared utilities

```

---

## Deployment

This app can be deployed to any Next.js‑compatible host (e.g., Vercel, Netlify):

1. Set environment variables in your hosting provider.
2. Install dependencies and run `npm run build`.
3. Start the app with `npm run start` (or use your host’s Next.js/Node adapter).
