import type { Metadata } from 'next';
import Link from 'next/link';
import { SearchPageClient } from '@/components/site/search-page-client';
import { PageHeader } from '@/components/site/section-heading';

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
    <div className="container-page max-w-3xl py-12 sm:py-16">
      <PageHeader eyebrow="Ask a question, follow the sources" title="What would you like to understand?">
        Search runs on your own device over the articles here. It shows you pages with sources and never makes up medical answers.
      </PageHeader>
      <section aria-label="Search the library" className="mt-8">
        <SearchPageClient />
        <noscript><p>Search needs JavaScript. <Link href="/research">Browse all articles</Link> or use the <Link href="/glossary">word list</Link>.</p></noscript>
      </section>
      <section className="mt-12" aria-labelledby="starters">
        <h2 id="starters" className="text-h4">Popular first questions</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {starters.map(([href, label]) => <li key={href}><Link href={href} className="block rounded-lg border p-4 text-sm font-medium transition-colors hover:border-rule hover:bg-tint">{label} →</Link></li>)}
        </ul>
      </section>
    </div>
  );
}
