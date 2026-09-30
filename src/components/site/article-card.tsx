import Link from 'next/link';
import { categories } from '@/data/navigation';
import { difficultyLabel, type ArticleSummary } from '@/lib/article-types';
import { EvidenceBadge } from '@/components/site/evidence-badge';
import { Icon } from '@/components/site/icon';
import { cn } from '@/lib/utils';

function categoryOf(article: ArticleSummary) {
  return categories.find((c) => c.key === article.category)!;
}

/** A flat card, used in small grids (popular reads, related articles). */
export function ArticleCard({ article, className, showEvidence = true }: { article: ArticleSummary; className?: string; showEvidence?: boolean }) {
  const cat = categoryOf(article);
  return (
    <article data-article-card className={cn('relative flex h-full flex-col rounded-lg border bg-card p-5 transition-colors hover:border-rule hover:bg-tint', className)}>
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon name={cat.icon} className="size-3.5" />{cat.short}
      </p>
      <h3 className="mt-3 text-[1.0625rem] leading-snug font-semibold tracking-[-0.01em]">
        <Link href={article.route} className="after:absolute after:inset-0 after:rounded-lg after:content-['']">{article.title}</Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.tldr}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 text-xs text-muted-foreground">
        <span><span className="num">{article.readingTime}</span> min</span>
        <span>{difficultyLabel[article.difficulty]}</span>
        {showEvidence && <EvidenceBadge level={article.evidenceLevel} className="ml-auto" />}
      </div>
    </article>
  );
}

/** A directory row, used in long lists (all articles, a topic). Wrap rows in <ArticleList>. */
export function ArticleRow({ article, showCategory = true }: { article: ArticleSummary; showCategory?: boolean }) {
  const cat = categoryOf(article);
  return (
    <li data-article-card className="relative flex gap-4 px-4 py-4 transition-colors hover:bg-tint sm:px-5">
      <div className="min-w-0 flex-1">
        <h3 className="leading-snug font-semibold tracking-[-0.01em]">
          <Link href={article.route} className="after:absolute after:inset-0 after:content-['']">{article.title}</Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{article.tldr}</p>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {showCategory && <span className="inline-flex items-center gap-1.5"><Icon name={cat.icon} className="size-3.5" />{cat.short}</span>}
          <span><span className="num">{article.readingTime}</span> min</span>
          <span>{difficultyLabel[article.difficulty]}</span>
          <EvidenceBadge level={article.evidenceLevel} className="sm:hidden" />
        </p>
      </div>
      <EvidenceBadge level={article.evidenceLevel} className="hidden self-start sm:inline-flex" />
    </li>
  );
}

export function ArticleList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn('divide-y overflow-hidden rounded-lg border bg-card', className)}>{children}</ul>;
}
