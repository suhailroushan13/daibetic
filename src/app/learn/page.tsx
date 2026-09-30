import type { Metadata } from 'next';
import Link from 'next/link';
import { guideModules, guideSteps } from '@/data/guide';
import { getArticle } from '@/lib/content';
import { LearnPath, type LearnModule } from '@/components/site/learn-path';
import { Reveal } from '@/components/site/reveal';

export const metadata: Metadata = {
  title: 'Start here: a step-by-step guide',
  description: 'Learn how diabetes works one small step at a time. Each step uses simple words and a real-life example, and the site remembers where you stopped.',
  alternates: { canonical: '/learn' },
};

export default function LearnPage() {
  let n = 0;
  const modules: LearnModule[] = guideModules.map((m) => ({
    id: m.id,
    icon: m.icon,
    title: m.title,
    summary: m.summary,
    example: m.example,
    outcomes: m.outcomes,
    steps: m.steps.map((s) => {
      const a = getArticle(s.slug);
      if (!a) throw new Error(`Guide step points to a missing article: ${s.slug}`);
      n += 1;
      return { slug: s.slug, title: s.title, hook: s.hook, minutes: a.readingTime, number: n };
    }),
  }));

  return (
    <div className="container-page py-12">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">The step-by-step guide</p>
          <h1 className="mt-2 font-serif text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-6xl">Start at step 1. Take it one small step at a time.</h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">You do not need a medical background. There are {guideSteps.length} short steps. Each one explains an idea in simple words, gives a real-life example, and then lets you go deeper if you want.</p>
          <p className="mt-3 text-sm text-muted-foreground">Prefer to jump around? <Link href="/research" className="font-medium text-brand-foreground underline underline-offset-2">Browse all articles</Link> or <Link href="/report" className="font-medium text-brand-foreground underline underline-offset-2">read the full 18-part report</Link>.</p>
        </div>
      </Reveal>
      <div className="mx-auto mt-12 max-w-4xl">
        <LearnPath modules={modules} />
      </div>
    </div>
  );
}
