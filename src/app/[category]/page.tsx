import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { categories } from '@/data/navigation';
import { getArticlesByCategory, toSummary } from '@/lib/content';
import { ArticleList, ArticleRow } from '@/components/site/article-card';
import { PageHeader } from '@/components/site/section-heading';

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

  return (
    <div className="container-page py-6 sm:py-8">
      <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
        <ChevronRight className="size-3.5" aria-hidden="true" />
        <Link href="/research" className="transition-colors hover:text-foreground">All articles</Link>
        <ChevronRight className="size-3.5" aria-hidden="true" />
        <span aria-current="page" className="text-foreground">{c.label}</span>
      </nav>
      <PageHeader eyebrow="Topic" title={c.label}>{c.kid}</PageHeader>
      <p className="mt-10 mb-3 text-sm text-muted-foreground"><span className="num">{articles.length}</span> {articles.length === 1 ? 'article' : 'articles'} in this topic</p>
      {articles.length > 0 ? (
        <ArticleList>{articles.map((a) => <ArticleRow key={a.slug} article={toSummary(a)} showCategory={false} />)}</ArticleList>
      ) : (
        <p className="rounded-lg border border-dashed p-6 text-muted-foreground">Nothing here yet. <Link className="text-brand hover:underline" href="/research">Browse all articles</Link>.</p>
      )}
    </div>
  );
}
