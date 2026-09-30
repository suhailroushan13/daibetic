'use client';

import Link from 'next/link';
import { ArrowRight, Check, Clock, RotateCcw } from 'lucide-react';
import { motion, MotionConfig } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Icon } from '@/components/site/icon';
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
    <MotionConfig reducedMotion="user">
      <div className="rounded-3xl border bg-card p-5 shadow-sm sm:p-6" role="region" aria-label="Your progress">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{!ready ? 'Loading your progress…' : finished === 0 ? 'Ready when you are.' : finished === all.length ? 'You finished every step. Well done!' : `${finished} of ${all.length} steps finished`}</p>
            <Progress value={percent} className="mt-2 h-2.5 bg-muted" aria-label="Guide progress" />
          </div>
          {ready && nextStep && (
            <Button asChild size="lg">
              <Link href={`/${nextStep.slug}`}>{finished === 0 ? 'Start step 1' : `Continue with step ${nextStep.number}`} <ArrowRight /></Link>
            </Button>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Progress is saved only in this browser. Nothing is sent anywhere.</p>
      </div>

      <ol className="mt-10 space-y-8">
        {modules.map((m, mi) => {
          const doneHere = m.steps.filter((s) => done.includes(s.slug)).length;
          return (
            <motion.li
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid gap-x-5 sm:grid-cols-[3.25rem_1fr]"
            >
              <div className="relative hidden sm:block" aria-hidden="true">
                <span className="sticky top-24 flex size-12 items-center justify-center rounded-2xl bg-brand text-primary-foreground shadow-md"><Icon name={m.icon} className="size-6" /></span>
                {mi < modules.length - 1 && <span className="absolute top-14 -bottom-10 left-6 w-0.5 -translate-x-1/2 rounded bg-gradient-to-b from-brand/40 to-transparent" />}
              </div>
              <section aria-labelledby={`m-${m.id}`} className="rounded-3xl border bg-card p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">Chapter {mi + 1} of {modules.length}</p>
                  {ready && <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{doneHere}/{m.steps.length} done</span>}
                </div>
                <h2 id={`m-${m.id}`} className="mt-1 font-serif text-2xl font-semibold sm:text-3xl">{m.title}</h2>
                <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{m.summary}</p>
                <p className="mt-4 rounded-2xl bg-sun-soft p-4 leading-relaxed text-sun-foreground"><strong>For example: </strong>{m.example}</p>
                <div className="mt-4">
                  <p className="text-sm font-medium">After this chapter you can:</p>
                  <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
                    {m.outcomes.map((o) => <li key={o} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden="true" />{o}</li>)}
                  </ul>
                </div>
                <ol className="mt-6 divide-y rounded-2xl border">
                  {m.steps.map((s) => {
                    const isDone = ready && done.includes(s.slug);
                    const isNext = ready && nextStep?.slug === s.slug;
                    return (
                      <li key={s.slug}>
                        <Link href={`/${s.slug}`} className={cn('learning-step group flex items-center gap-4 p-4 transition-colors hover:bg-accent/60 first:rounded-t-2xl last:rounded-b-2xl', isNext && 'bg-brand-soft/50')}>
                          <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors', isDone ? 'bg-leaf text-white' : isNext ? 'bg-brand text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                            {isDone ? <Check className="size-4" aria-label="Finished" /> : s.number}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold">{s.title}</span>
                            <span className="block text-sm text-muted-foreground">{s.hook}</span>
                          </span>
                          <span className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:inline-flex"><Clock className="size-3.5" aria-hidden="true" />{s.minutes} min</span>
                          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </section>
            </motion.li>
          );
        })}
      </ol>

      {ready && finished > 0 && (
        <div className="mt-8 text-center">
          <Button variant="ghost" size="sm" onClick={() => { if (window.confirm('Clear your progress on this device?')) reset(); }}><RotateCcw /> Start over</Button>
        </div>
      )}
    </MotionConfig>
  );
}
