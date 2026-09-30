import type { Metadata } from 'next';
import Link from 'next/link';
import { guideModules, guideSteps } from '@/data/guide';
import { getArticle } from '@/lib/content';
import { LearnPath, type LearnModule } from '@/components/site/learn-path';
import { PageHeader } from '@/components/site/section-heading';

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
    <div className="container-page py-12 sm:py-16">
      <PageHeader eyebrow="The step-by-step guide" title="Start at step 1. Take it one small step at a time." center>
        You do not need a medical background. There are {guideSteps.length} short steps. Each one explains an idea in simple words, gives a real-life example, and then lets you go deeper if you want.
      </PageHeader>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Prefer to jump around? <Link href="/research" className="font-medium text-brand hover:underline">Browse all articles</Link> or <Link href="/report" className="font-medium text-brand hover:underline">read the full 18-part report</Link>.
      </p>
      <div className="mx-auto mt-12 max-w-3xl">
        <LearnPath modules={modules} />
      </div>
    </div>
  );
}
