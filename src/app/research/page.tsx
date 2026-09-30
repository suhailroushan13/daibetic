import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getArticle, getArticles, toSummary } from '@/lib/content';
import { categories } from '@/data/navigation';
import { ResearchBrowser } from '@/components/site/research-browser';
import { EvidenceBadge } from '@/components/site/evidence-badge';
import { PageHeader } from '@/components/site/section-heading';

export const metadata: Metadata = {
  title: 'All articles',
  description: 'Browse every diabetes article by topic, reading level or how well proven it is. Each one starts in simple words and has real sources.',
  alternates: { canonical: '/research' },
};

export default function ResearchIndexPage() {
  const articles = getArticles();
  const pick = getArticle('fundamentals/mental-model')!;
  return (
    <div className="container-page py-12 sm:py-16">
      <PageHeader eyebrow="All articles" title="Read about diabetes, your way.">
        {articles.length} short articles across {categories.length} topics. Every one begins with a plain-words summary and an example.
      </PageHeader>

      <Link href={pick.route} className="group mt-10 block rounded-2xl border bg-tint p-6 transition-colors hover:border-rule sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="label text-muted-foreground">Start with this one</p>
          <span className="text-xs text-muted-foreground"><span className="num">{pick.readingTime}</span> min read</span>
          <EvidenceBadge level={pick.evidenceLevel} className="ml-auto" />
        </div>
        <h2 className="mt-3 text-h3">{pick.title}</h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{pick.simple.tldr}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">Read the article <ArrowRight className="size-4" aria-hidden="true" /></span>
      </Link>

      <div className="mt-12">
        <ResearchBrowser articles={articles.map(toSummary)} />
      </div>
    </div>
  );
}
