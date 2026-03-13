# Dr. Howard Murad — Website

Frontend for the Dr. Howard Murad website, migrated from WordPress/Uncode to a headless **Next.js + TypeScript** stack. I designed and implemented the entire application end to end.

**Tech:** Next.js · TypeScript · Tailwind CSS · GraphQL

---

## Role

I led the full migration and build, including architecture, data modeling, GraphQL integration, UI/UX, accessibility, SEO, and deployment automation.

---

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
The app runs at http://localhost:3000.

Scripts
Command	Description
npm run dev	Development server
npm run build	Production build
npm run start	Serve production build
npm run lint	Run linters
npm run analyze	Bundle analysis
Environment Variables
Create a .env.local in the app/ folder:

bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=   # GraphQL API URL
NEXT_PUBLIC_ANALYTICS_ID=       # Analytics ID (if applicable)
See src/lib/graphql/client.ts for the full list of expected variables.

Project Structure
text
src/
├── app/          # App Router pages, layouts, API routes
├── components/   # UI components (header, footer, blog, modals)
└── lib/          # GraphQL client/queries, SEO helpers, utilities
public/           # Static assets
scripts/          # Content extraction and analysis scripts
Key Areas
Routing & layouts: src/app/

Blog & content: src/components/blog/

Video modal: src/components/modals/VideoModal.tsx

GraphQL: src/lib/graphql/ — queries and client for server/client usage

SEO & metadata: src/lib/seo/ — JSON-LD and meta helpers

Styles: tailwind.config.ts, src/app/globals.css

Deployment
Deploy to Vercel, Netlify, or any Next.js-compatible host:

Set environment variables in your hosting provider.

Build command: npm run build

Start command: npm run start
```
