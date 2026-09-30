'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleCard } from '@/components/site/article-card';
import { categories } from '@/data/navigation';
import type { ArticleSummary } from '@/lib/article-types';
import { cn } from '@/lib/utils';

const views = [
  { value: 'all', label: 'All' },
  { value: 'easy', label: 'Easy reads' },
  { value: 'core', label: 'Core ideas' },
  { value: 'strong', label: 'Well proven' },
  { value: 'new', label: 'New research' },
] as const;

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

  const select = 'h-10 rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40';

  return (
    <MotionConfig reducedMotion="user">
      <div className="space-y-4">
        <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
          <TabsList className="h-auto max-w-full flex-wrap justify-start" aria-label="Kinds of articles">
            {views.map((v) => <TabsTrigger key={v.value} value={v.value}>{v.label}</TabsTrigger>)}
          </TabsList>
        </Tabs>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="index-query" className="sr-only">Find an article by title</label>
            <Input id="index-query" type="search" placeholder="Find an article by title…" className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <label className="sr-only" htmlFor="index-category">Topic</label>
          <select id="index-category" className={select} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All topics</option>
            {categories.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
          <label className="sr-only" htmlFor="index-difficulty">Reading level</label>
          <select id="index-difficulty" className={select} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Any level</option>
            <option value="Beginner">Easy read</option>
            <option value="Intermediate">Medium read</option>
            <option value="Advanced">Deep dive</option>
          </select>
        </div>
      </div>

      <p id="index-count" className="mt-5 text-sm text-muted-foreground" role="status">{shown.length} {shown.length === 1 ? 'article' : 'articles'}</p>

      <motion.div layout className={cn('mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3')}>
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((a) => (
            <motion.div key={a.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}>
              <ArticleCard article={a} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {shown.length === 0 && (
        <div id="index-empty" className="mt-6 rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
          No articles match. Try clearing a filter or using a simpler word.
        </div>
      )}
    </MotionConfig>
  );
}
