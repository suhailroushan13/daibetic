'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ArticleList, ArticleRow } from '@/components/site/article-card';
import { categories } from '@/data/navigation';
import type { ArticleSummary } from '@/lib/article-types';

const views = [
  { value: 'all', label: 'All' },
  { value: 'easy', label: 'Easy reads' },
  { value: 'core', label: 'Core ideas' },
  { value: 'strong', label: 'Well proven' },
  { value: 'new', label: 'New research' },
] as const;

export const selectClass = 'h-10 w-full rounded-md border border-input bg-background px-3 text-sm';

export function ResearchBrowser({ articles }: { articles: ArticleSummary[] }) {
  const [view, setView] = useState<(typeof views)[number]['value']>('all');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (view === 'easy' && a.difficulty !== 'Beginner') return false;
      if (view === 'core' && !a.featured) return false;
      if (view === 'strong' && !['Established', 'Strong Evidence'].includes(a.evidenceLevel)) return false;
      if (view === 'new' && !['Preliminary', 'Experimental', 'Limited Evidence'].includes(a.evidenceLevel)) return false;
      if (category && a.category !== category) return false;
      if (difficulty && a.difficulty !== difficulty) return false;
      if (q && !`${a.title} ${a.tldr} ${a.tags.join(' ')}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [articles, view, query, category, difficulty]);

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Kinds of articles">
          {views.map((v) => (
            <button
              key={v.value}
              type="button"
              aria-pressed={view === v.value}
              onClick={() => setView(v.value)}
              className="h-8 rounded-full border px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-pressed:border-brand-border aria-pressed:bg-brand-muted aria-pressed:text-brand-foreground"
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_11rem_10rem]">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="index-query" className="sr-only">Find an article by title</label>
            <Input id="index-query" type="search" placeholder="Find an article by title…" className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <label className="sr-only" htmlFor="index-category">Topic</label>
          <select id="index-category" className={selectClass} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All topics</option>
            {categories.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
          <label className="sr-only" htmlFor="index-difficulty">Reading level</label>
          <select id="index-difficulty" className={selectClass} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Any level</option>
            <option value="Beginner">Easy read</option>
            <option value="Intermediate">Medium read</option>
            <option value="Advanced">Deep dive</option>
          </select>
        </div>
      </div>

      <p id="index-count" className="mt-6 mb-3 text-sm text-muted-foreground" role="status"><span className="num">{shown.length}</span> {shown.length === 1 ? 'article' : 'articles'}</p>

      {shown.length > 0 ? (
        <ArticleList>{shown.map((a) => <ArticleRow key={a.slug} article={a} />)}</ArticleList>
      ) : (
        <div id="index-empty" className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
          No articles match. Try clearing a filter or using a simpler word.
        </div>
      )}
    </>
  );
}
