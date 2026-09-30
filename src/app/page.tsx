import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Search } from 'lucide-react';
import { categories } from '@/data/navigation';
import { guideModules, guideSteps } from '@/data/guide';
import { sourceList } from '@/data/sources';
import { formatDate, getArticles, getArticle, toSummary } from '@/lib/content';
import { GlucoseJourney } from '@/components/diagrams/glucose-journey';
import { ArticleCard } from '@/components/site/article-card';
import { Example } from '@/components/site/example';
import { Icon } from '@/components/site/icon';
import { NumberTicker } from '@/components/site/number-ticker';
import { SectionHeading } from '@/components/site/section-heading';
import { ThreeLevels } from '@/components/site/three-levels';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: { absolute: 'The Diabetes Guide: diabetes explained in simple words' },
  description: 'Learn how diabetes works in simple words, with a real-life example for every idea. A step-by-step guide anyone can follow, from children to grandparents.',
  alternates: { canonical: '/' },
};

const threeSteps = [
  { title: 'Food becomes sugar', text: 'When you eat, your body breaks food into a tiny sugar called glucose. It travels in your blood.', example: 'A slice of bread turns into tiny sugar pieces, like a toy taken apart into blocks.' },
  { title: 'Insulin carries a message', text: 'Your pancreas sends insulin, a messenger that says “use this sugar for energy or store it”.', example: 'Insulin is the teacher’s bell. When it rings, the class knows what to do.' },
  { title: 'The body stays balanced', text: 'In diabetes, insulin is missing or ignored, so sugar stays too high for too long.', example: 'If the bell breaks, or nobody listens, the classroom becomes messy.' },
];

const faqs = [
  { q: 'Is diabetes caused by eating too much sugar?', a: 'No, not by itself. Type 1 happens when the body’s defenders harm the insulin makers. Type 2 grows from many things together, like family history, age, where the body stores fat, sleep and more. One sweet does not cause either.', ex: 'Like a flood: it takes a lot more than a single raindrop.' },
  { q: 'Can diabetes be cured?', a: 'Type 2 can go into remission for some people, which means sugar stays in a healthy range without the usual medicine. It can come back, so check-ups continue. For Type 1, insulin is still needed today, and scientists are working on new ideas.', ex: 'Remission is a fire gone quiet. You still watch the embers.' },
  { q: 'Do I need to stop eating sweets forever?', a: 'This site does not give diet rules. Food is one part of a bigger picture, and the best plan is one that fits your life and your health team’s advice.', ex: 'The best exercise plan is the one you can keep doing.' },
  { q: 'Can I use this site to decide about my medicine?', a: 'No. It teaches ideas, but it cannot diagnose you or change your treatment. Never stop insulin or any medicine without asking your doctor or nurse.', ex: 'A map shows the roads, but your doctor is the guide who knows your journey.' },
];

function Section({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section aria-labelledby={id} className="border-t">
      <div className={cn('container-page py-16 sm:py-20', className)}>{children}</div>
    </section>
  );
}

export default function HomePage() {
  const articles = getArticles();
  const featured = ['fundamentals/mental-model', 'type-2/remission', 'future/state-of-research'].map((s) => getArticle(s)).filter((a) => !!a);
  const lastChecked = new Date(Math.max(...articles.map((a) => new Date(a.reviewedDate).getTime()))).toISOString();
  const stats: [number, string][] = [[articles.length, 'short articles'], [sourceList.length, 'real sources'], [categories.length, 'topics'], [guideSteps.length, 'guide steps']];

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title">
        <div className="container-page pt-14 pb-12 text-center sm:pt-20">
          <p className="inline-flex h-8 items-center gap-2.5 rounded-full border bg-background px-3.5 text-xs text-muted-foreground shadow-xs">
            <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
            <span>Sources checked <span className="font-medium text-foreground">{formatDate(lastChecked)}</span></span>
            <span className="h-3.5 w-px bg-border" aria-hidden="true" />
            <span><span className="num font-medium text-foreground">{articles.length}</span> articles</span>
          </p>
          <h1 id="hero-title" className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.08] font-bold tracking-[-0.03em] text-balance lg:text-5xl">
            Diabetes, explained so <span className="text-brand">anyone</span> can understand it.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Every idea comes in simple words first, with a real-life example. Children can follow it. Parents can trust it. The science words are there when you want them.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><Link href="/learn">Start the step-by-step guide <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/search"><Search /> Search a question</Link></Button>
          </div>
          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {['Simple words', 'An example for every step', 'Real sources, always shown'].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5"><Check className="size-4 text-success" aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="container-page pb-16 sm:pb-20">
          <GlucoseJourney className="my-0 rounded-2xl" />
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Library at a glance" className="container-page pb-16 sm:pb-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-4">
          {stats.map(([n, label]) => (
            <div key={label} className="flex flex-col-reverse gap-1 bg-background px-5 py-5">
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="text-3xl font-semibold tracking-tight"><NumberTicker value={n} /></dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The idea in 3 steps */}
      <Section id="three-title">
        <SectionHeading id="three-title" eyebrow="The whole idea" title="Here is diabetes in three easy steps.">Read these three and you already understand the heart of it.</SectionHeading>
        <ol className="mt-10 grid gap-3 md:grid-cols-3">
          {threeSteps.map((s, i) => (
            <li key={s.title} className="flex flex-col rounded-lg border bg-card p-5">
              <p className="label text-muted-foreground">Step <span className="num">{i + 1}</span></p>
              <h3 className="mt-2 text-h4">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
              <div className="mt-auto pt-5"><Example className="text-sm">{s.example}</Example></div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Three levels */}
      <Section id="levels-title" className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading id="levels-title" eyebrow="One idea, three ways" title="Pick the words that fit you.">Here is what insulin does, told three ways. Every article on this site works like this: easy first, science later.</SectionHeading>
        <ThreeLevels />
      </Section>

      {/* Guide */}
      <Section id="guide-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="guide-title" eyebrow="A clear path" title="New here? Follow the steps.">{guideSteps.length} short steps in {guideModules.length} chapters. Each one takes a few minutes, and the site remembers where you stopped.</SectionHeading>
          <Button asChild variant="outline"><Link href="/learn">See all steps <ArrowRight /></Link></Button>
        </div>
        <ol className="mt-10 divide-y overflow-hidden rounded-lg border bg-card">
          {guideModules.map((m, i) => (
            <li key={m.id}>
              <Link href={`/${m.steps[0].slug}`} className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-tint sm:px-5">
                <span className="num w-6 shrink-0 text-sm text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1 font-semibold">{m.title}</span>
                <span className="hidden text-sm text-muted-foreground sm:inline"><span className="num">{m.steps.length}</span> steps</span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {/* Topics */}
      <Section id="topics-title">
        <SectionHeading id="topics-title" eyebrow="Follow your curiosity" title="Or pick a topic.">Each topic is a small shelf of articles. Choose the one you are wondering about.</SectionHeading>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const count = articles.filter((a) => a.category === c.key).length;
            return (
              <li key={c.key}>
                <Link href={`/${c.key}`} className="flex h-full gap-3.5 rounded-lg border bg-card p-4 transition-colors hover:border-rule hover:bg-tint">
                  <Icon name={c.icon} className="mt-0.5 size-[1.125rem] shrink-0 text-muted-foreground" />
                  <span className="min-w-0">
                    <span className="flex items-baseline justify-between gap-2"><span className="font-semibold">{c.label}</span><span className="num text-xs text-muted-foreground">{count}</span></span>
                    <span className="mt-1 block text-sm leading-snug text-muted-foreground">{c.kid}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Featured */}
      <Section id="featured-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="featured-title" eyebrow="Good places to start" title="Popular reads." />
          <Button asChild variant="ghost" className="-mr-3"><Link href="/research">All articles <ArrowRight /></Link></Button>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {featured.map((a) => <ArticleCard key={a.slug} article={toSummary(a)} />)}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq-title" className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <SectionHeading id="faq-title" eyebrow="Quick answers" title="Questions people often ask." />
        <Accordion type="single" collapsible defaultValue="q0" className="rounded-lg border bg-card px-5">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger className="text-[0.9375rem]">{f.q}</AccordionTrigger>
              <AccordionContent>
                <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{f.a}</p>
                <Example className="mt-3 text-sm">{f.ex}</Example>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* CTA */}
      <section className="container-page">
        <div className="rounded-2xl border bg-tint px-6 py-12 text-center sm:py-16">
          <h2 className="mx-auto max-w-xl text-h2 text-balance">Ready to understand it, one small step at a time?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">No account. No tracking. Your progress stays on your own device.</p>
          <Button asChild size="lg" className="mt-7"><Link href="/learn">Begin step 1 <ArrowRight /></Link></Button>
        </div>
      </section>
    </>
  );
}
