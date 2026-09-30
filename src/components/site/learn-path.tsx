'use client';

import Link from 'next/link';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Example } from '@/components/site/example';
import { useGuideProgress } from '@/lib/guide-progress';
import { cn } from '@/lib/utils';

export interface LearnModule {
  id: string;
  icon: string;
  title: string;
  summary: string;
  example: string;
  outcomes: string[];
  steps: { slug: string; title: string; hook: string; minutes: number; number: number }[];
}

export function LearnPath({ modules }: { modules: LearnModule[] }) {
  const { done, ready, reset } = useGuideProgress();
  const all = modules.flatMap((m) => m.steps);
  const finished = all.filter((s) => done.includes(s.slug)).length;
  const nextStep = all.find((s) => !done.includes(s.slug));
  const percent = ready ? Math.round((finished / all.length) * 100) : 0;

  return (
    <>
      <div className="rounded-lg border bg-card p-5" role="region" aria-label="Your progress">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{!ready ? 'Loading your progress…' : finished === 0 ? 'Ready when you are.' : finished === all.length ? 'You finished every step. Well done!' : `${finished} of ${all.length} steps finished`}</p>
            <Progress value={percent} className="mt-2.5" aria-label="Guide progress" />
          </div>
          {ready && nextStep && (
            <Button asChild>
              <Link href={`/${nextStep.slug}`}>{finished === 0 ? 'Start step 1' : `Continue with step ${nextStep.number}`} <ArrowRight /></Link>
            </Button>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Progress is saved only in this browser. Nothing is sent anywhere.</p>
      </div>

      <ol className="mt-4">
        {modules.map((m, mi) => {
          const doneHere = m.steps.filter((s) => done.includes(s.slug)).length;
          return (
            <li key={m.id} className="border-b py-10 last:border-b-0">
              <section aria-labelledby={`m-${m.id}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="label text-muted-foreground">Chapter <span className="num">{mi + 1}</span> of <span className="num">{modules.length}</span></p>
                  {ready && <span className="num inline-flex h-6 items-center rounded-full border px-2.5 text-xs font-medium">{doneHere}/{m.steps.length} done</span>}
                </div>
                <h2 id={`m-${m.id}`} className="mt-2 text-h3">{m.title}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{m.summary}</p>
                <Example className="mt-4">{m.example}</Example>
                <div className="mt-5">
                  <p className="text-sm font-semibold">After this chapter you can:</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {m.outcomes.map((o) => <li key={o} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />{o}</li>)}
                  </ul>
                </div>
                <ol className="mt-6 divide-y overflow-hidden rounded-lg border bg-card">
                  {m.steps.map((s) => {
                    const isDone = ready && done.includes(s.slug);
                    const isNext = ready && nextStep?.slug === s.slug;
                    return (
                      <li key={s.slug}>
                        <Link href={`/${s.slug}`} className="learning-step group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-tint">
                          <span className={cn('num flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold', isDone ? 'bg-success text-white' : isNext ? 'bg-primary text-primary-foreground' : 'border text-muted-foreground')}>
                            {isDone ? <Check className="size-3.5" aria-label="Finished" /> : s.number}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.9375rem] font-semibold">{s.title}</span>
                            <span className="block text-sm text-muted-foreground">{s.hook}</span>
                          </span>
                          <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline"><span className="num">{s.minutes}</span> min</span>
                          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </section>
            </li>
          );
        })}
      </ol>

      {ready && finished > 0 && (
        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm" onClick={() => { if (window.confirm('Clear your progress on this device?')) reset(); }}><RotateCcw /> Start over</Button>
        </div>
      )}
    </>
  );
}
