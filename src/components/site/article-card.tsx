import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { categories, toneClasses } from '@/data/navigation';
import { difficultyLabel, type ArticleSummary } from '@/lib/article-types';
import { EvidenceBadge } from '@/components/site/evidence-badge';
import { Icon } from '@/components/site/icon';
import { cn } from '@/lib/utils';

export function ArticleCard({ article, className, showEvidence = true }: { article: ArticleSummary; className?: string; showEvidence?: boolean }) {
  const cat = categories.find((c) => c.key === article.category)!;
  const tone = toneClasses[cat.tone];
  return (
    <article
      data-article-card
      className={cn('group relative flex h-full flex-col gap-3 rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg', className)}
    >
      <div className="flex items-center gap-2 text-xs">
        <span className={cn('inline-flex size-7 items-center justify-center rounded-lg', tone.icon)}><Icon name={cat.icon} className="size-4" /></span>
        <span className="font-medium text-muted-foreground">{cat.short}</span>
        <ArrowUpRight className="ml-auto size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-xl leading-snug font-semibold tracking-tight">
        <Link href={article.route} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">{article.title}</Link>
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.tldr}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Clock className="size-3.5" aria-hidden="true" />{article.readingTime} min</span>
        <span>{difficultyLabel[article.difficulty]}</span>
        {showEvidence && <EvidenceBadge level={article.evidenceLevel} className="ml-auto" />}
      </div>
    </article>
  );
}
