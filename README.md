# The Diabetes Guide

Diabetes explained in simple words, with a real-life example for every idea. Built with Next.js (App Router), Tailwind CSS v4, shadcn/ui-style components, Radix and Motion.

## How the content works

- `content/research/**.mdx` – the full, sourced articles (unchanged science text).
- `src/data/simple/*.ts` – the **plain-language layer** for every article: a one-line summary, 2–3 steps that each end with an example, and a "remember" line. The build fails if an article has none.
- `src/data/guide.ts` – the 19-step guide on `/learn` (5 chapters, each with an example).
- `src/data/glossary.ts` – glossary words with a simple meaning and an example.
- `src/data/sources.ts` – the bibliography. Articles may only cite IDs that exist here.

Each article page shows: **In simple words** (with examples) → **The full story** (real science words) → **Sources**.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint         # type check
npm run build && npm start
npm run audit:content   # needs the site running on :3000
npx playwright install chromium && npm test
```

`SITE_URL` (see `.env.example`) sets canonical URLs, the sitemap and the RSS feed.

## Analytics and search

- **Vercel Web Analytics** – `<Analytics />` in the root layout; view it in the Vercel project's Analytics tab.
- **Live visitor count** – `/api/visitors` counts unique browsers in Upstash Redis (`KV_REST_API_URL`, `KV_REST_API_TOKEN`). It shows beside the search bar (in a strip above the header on phones) and in the footer, and hides itself when Redis is not configured.
- **Google Search Console** – set `GOOGLE_SITE_VERIFICATION` to the HTML-tag token, or verify the domain with a DNS TXT record. The sitemap is at `/sitemap.xml` and is listed in `/robots.txt`.
