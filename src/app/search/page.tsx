import type { Metadata } from 'next';
import Link from 'next/link';
import { SearchPageClient } from '@/components/site/search-page-client';
import { Reveal } from '@/components/site/reveal';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search every article and glossary word. Nothing is sent to a server and no answers are generated.',
  robots: { index: false, follow: true },
};

const starters: [string, string][] = [
  ['/fundamentals/insulin', 'What does insulin actually do?'],
  ['/type-2/remission', 'Is remission the same as a cure?'],
  ['/detection/hba1c', 'What does an HbA1c test measure?'],
  ['/future/stem-cells', 'Can new beta cells treat Type 1?'],
];

export default function SearchPage() {
  return (
    <div className="container-page max-w-3xl py-12">
      <Reveal>
        <p className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">Ask a question, follow the sources</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">What would you like to understand?</h1>
        <p className="mt-3 text-lg text-muted-foreground">Search runs on your own device over the articles here. It shows you pages with sources and never makes up medical answers.</p>
      </Reveal>
      <section aria-label="Search the library" className="mt-8">
        <SearchPageClient />
        <noscript><p>Search needs JavaScript. <Link href="/research">Browse all articles</Link> or use the <Link href="/glossary">word list</Link>.</p></noscript>
      </section>
      <section className="mt-12" aria-labelledby="starters">
        <h2 id="starters" className="font-serif text-xl font-semibold">Popular first questions</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {starters.map(([href, label]) => <li key={href}><Link href={href} className="block rounded-xl border p-3.5 text-sm font-medium transition-colors hover:border-brand/50 hover:bg-accent">{label} →</Link></li>)}
        </ul>
      </section>
    </div>
  );
}
