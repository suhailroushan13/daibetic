import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { categories, toneClasses } from '@/data/navigation';
import { getArticlesByCategory, toSummary } from '@/lib/content';
import { ArticleCard } from '@/components/site/article-card';
import { Icon } from '@/components/site/icon';
import { Reveal, Stagger, StaggerItem } from '@/components/site/reveal';
import { cn } from '@/lib/utils';

type Params = { category: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ category: c.key }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const c = categories.find((x) => x.key === category);
  if (!c) return {};
  return { title: c.label, description: c.description, alternates: { canonical: `/${c.key}` } };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const c = categories.find((x) => x.key === category);
  if (!c) notFound();
  const articles = getArticlesByCategory(c.key);
  const tone = toneClasses[c.tone];

  return (
    <div className="container-page py-10">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3.5" aria-hidden="true" />
        <Link href="/research" className="hover:text-foreground">All articles</Link>
        <ChevronRight className="size-3.5" aria-hidden="true" />
        <span aria-current="page" className="text-foreground">{c.label}</span>
      </nav>
      <Reveal>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className={cn('inline-flex size-16 shrink-0 items-center justify-center rounded-2xl', tone.icon)}><Icon name={c.icon} className="size-8" /></span>
          <div>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">{c.label}</h1>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{c.kid}</p>
          </div>
        </div>
      </Reveal>
      <p className="mt-8 text-sm text-muted-foreground">{articles.length} {articles.length === 1 ? 'article' : 'articles'} in this topic</p>
      <Stagger className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => <StaggerItem key={a.slug}><ArticleCard article={toSummary(a)} /></StaggerItem>)}
      </Stagger>
      {articles.length === 0 && <p className="mt-8 rounded-2xl border p-6 text-muted-foreground">Nothing here yet. <Link className="underline" href="/research">Browse all articles</Link>.</p>}
    </div>
  );
}
