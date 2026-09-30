import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { getArticle, getArticles, toSummary } from '@/lib/content';
import { categories } from '@/data/navigation';
import { ResearchBrowser } from '@/components/site/research-browser';
import { EvidenceBadge } from '@/components/site/evidence-badge';
import { Reveal } from '@/components/site/reveal';

export const metadata: Metadata = {
  title: 'All articles',
  description: 'Browse every diabetes article by topic, reading level or how well proven it is. Each one starts in simple words and has real sources.',
  alternates: { canonical: '/research' },
};

export default function ResearchIndexPage() {
  const articles = getArticles();
  const pick = getArticle('fundamentals/mental-model')!;
  return (
    <div className="container-page py-12">
      <Reveal>
        <p className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">The blog</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Read about diabetes, your way.</h1>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-muted-foreground">{articles.length} short articles across {categories.length} topics. Every one begins with a plain-words summary and an example.</p>
      </Reveal>

      <Reveal delay={0.08}>
        <Link href={pick.route} className="group mt-10 grid gap-6 overflow-hidden rounded-3xl border bg-gradient-to-br from-brand-soft via-card to-sun-soft/50 p-6 transition-shadow hover:shadow-lg sm:p-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">Start with this one</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight font-semibold sm:text-4xl">{pick.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{pick.simple.tldr}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-medium text-brand-foreground">Read the article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
          </div>
          <div className="flex flex-col justify-end gap-2 text-sm text-muted-foreground md:items-end">
            <span className="inline-flex items-center gap-1.5"><Clock className="size-4" aria-hidden="true" />{pick.readingTime} min read</span>
            <EvidenceBadge level={pick.evidenceLevel} />
          </div>
        </Link>
      </Reveal>

      <div className="mt-12">
        <ResearchBrowser articles={articles.map(toSummary)} />
      </div>
    </div>
  );
}
