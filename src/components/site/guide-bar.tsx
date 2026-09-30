'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGuideProgress } from '@/lib/guide-progress';
import { learningPath } from '@/data/guide';

interface Props {
  slug: string;
  step: number;
  total: number;
  moduleTitle: string;
  stepTitle: string;
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

/** Shown on the pages that belong to the step-by-step guide. */
export function GuideBar({ slug, step, total, moduleTitle, stepTitle, prev, next }: Props) {
  const router = useRouter();
  const { done, ready, complete, undo } = useGuideProgress();
  const isDone = done.includes(slug);
  const finished = done.filter((s) => learningPath.includes(s)).length;

  return (
    <aside aria-label="Step-by-step guide" className="not-prose my-8 rounded-lg border bg-card p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-brand">Guide · step <span className="num">{step}</span> of <span className="num">{total}</span></p>
          <p className="mt-0.5 truncate text-sm font-semibold">{moduleTitle} → {stepTitle}</p>
        </div>
        <Button asChild variant="ghost" size="sm" className="-mr-2"><Link href="/learn">All steps</Link></Button>
      </div>
      <Progress value={ready ? Math.round((finished / total) * 100) : 0} className="mt-3" aria-label={`${finished} of ${total} steps finished`} />
      <p className="mt-2 text-xs text-muted-foreground" role="status">{ready ? `${finished} of ${total} steps finished. Your progress stays on this device only.` : ' '}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {prev && <Button asChild variant="outline" size="sm"><Link href={`/${prev.slug}`}><ArrowLeft /> Back</Link></Button>}
        <Button
          size="sm"
          variant={isDone ? 'outline' : 'default'}
          onClick={() => {
            if (isDone) { undo(slug); return; }
            complete(slug);
            router.push(next ? `/${next.slug}` : '/learn');
          }}
        >
          {isDone ? <><Check className="text-success" /> Done · undo</> : next ? <>Mark done and continue <ArrowRight /></> : <>Mark done and finish <Check /></>}
        </Button>
        {next && <span className="hidden text-xs text-muted-foreground sm:inline">Next: {next.title}</span>}
      </div>
    </aside>
  );
}
