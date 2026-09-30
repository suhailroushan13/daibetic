import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Droplets, Search, Sparkles, Utensils, Scale, Mail } from 'lucide-react';
import { categories, toneClasses } from '@/data/navigation';
import { guideModules, guideSteps } from '@/data/guide';
import { sourceList } from '@/data/sources';
import { formatDate, getArticles, getArticle, toSummary } from '@/lib/content';
import { GlucoseJourney } from '@/components/diagrams/glucose-journey';
import { ArticleCard } from '@/components/site/article-card';
import { Icon } from '@/components/site/icon';
import { Reveal, Stagger, StaggerItem } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
import { ThreeLevels } from '@/components/site/three-levels';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: { absolute: 'Glucose Atlas: diabetes explained in simple words' },
  description: 'Learn how diabetes works in simple words, with a real-life example for every idea. A step-by-step guide anyone can follow, from children to grandparents.',
  alternates: { canonical: '/' },
};

const threeSteps = [
  { icon: Utensils, title: 'Food becomes sugar', text: 'When you eat, your body breaks food into a tiny sugar called glucose. It travels in your blood.', example: 'A slice of bread turns into tiny sugar pieces, like a toy taken apart into blocks.' },
  { icon: Mail, title: 'Insulin carries a message', text: 'Your pancreas sends insulin, a messenger that says “use this sugar for energy or store it”.', example: 'Insulin is the teacher’s bell. When it rings, the class knows what to do.' },
  { icon: Scale, title: 'The body stays balanced', text: 'In diabetes, insulin is missing or ignored, so sugar stays too high for too long.', example: 'If the bell breaks, or nobody listens, the classroom becomes messy.' },
];

const faqs = [
  { q: 'Is diabetes caused by eating too much sugar?', a: 'No, not by itself. Type 1 happens when the body’s defenders harm the insulin makers. Type 2 grows from many things together, like family history, age, where the body stores fat, sleep and more. One sweet does not cause either.', ex: 'Like a flood: it takes a lot more than a single raindrop.' },
  { q: 'Can diabetes be cured?', a: 'Type 2 can go into remission for some people, which means sugar stays in a healthy range without the usual medicine. It can come back, so check-ups continue. For Type 1, insulin is still needed today, and scientists are working on new ideas.', ex: 'Remission is a fire gone quiet. You still watch the embers.' },
  { q: 'Do I need to stop eating sweets forever?', a: 'This site does not give diet rules. Food is one part of a bigger picture, and the best plan is one that fits your life and your health team’s advice.', ex: 'The best exercise plan is the one you can keep doing.' },
  { q: 'Can I use this site to decide about my medicine?', a: 'No. It teaches ideas, but it cannot diagnose you or change your treatment. Never stop insulin or any medicine without asking your doctor or nurse.', ex: 'A map shows the roads, but your doctor is the guide who knows your journey.' },
];

export default function HomePage() {
  const articles = getArticles();
  const featured = ['fundamentals/mental-model', 'type-2/remission', 'future/state-of-research'].map((s) => getArticle(s)).filter((a) => !!a);
  const lastChecked = new Date(Math.max(...articles.map((a) => new Date(a.reviewedDate).getTime()))).toISOString();

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-glow relative overflow-hidden border-b" aria-labelledby="hero-title">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-1.5 text-sm font-medium shadow-xs backdrop-blur">
              <Sparkles className="size-4 text-sun" aria-hidden="true" /> Made simple, for everyone
            </p>
            <h1 id="hero-title" className="mt-5 font-serif text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
              Diabetes, explained so <span className="text-gradient">anyone</span> can understand it.
            </h1>
            <p className="mt-5 max-w-xl text-xl leading-relaxed text-muted-foreground">
              Every idea comes in simple words first, with a real-life example. Children can follow it. Parents can trust it. The science words are there when you want them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/learn">Start the step-by-step guide <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/search"><Search /> Search a question</Link></Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li>✓ Simple words</li><li>✓ An example for every step</li><li>✓ Real sources, always shown</li>
            </ul>
          </Reveal>
          <Reveal delay={0.12} y={26}><GlucoseJourney compact /></Reveal>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Library at a glance" className="container-page -mt-7 relative z-10">
        <Stagger className="grid grid-cols-2 gap-3 rounded-3xl border bg-card p-4 shadow-lg sm:grid-cols-4 sm:p-5">
          {[[String(articles.length), 'short articles'], [String(sourceList.length), 'real sources'], [String(categories.length), 'topics'], [formatDate(lastChecked), 'last source check']].map(([n, l]) => (
            <StaggerItem key={l} className="text-center">
              <p className="font-serif text-3xl font-semibold text-brand-foreground tabular-nums sm:text-4xl">{n}</p>
              <p className="text-sm text-muted-foreground">{l}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* The idea in 3 steps */}
      <section className="container-page mt-24" aria-labelledby="three-title">
        <SectionHeading id="three-title" eyebrow="The whole idea" title="Here is diabetes in three easy steps.">Read these three cards and you already understand the heart of it.</SectionHeading>
        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {threeSteps.map((s, i) => (
            <StaggerItem key={s.title}>
              <div className="relative flex h-full flex-col rounded-3xl border bg-card p-6 transition-shadow hover:shadow-lg">
                <span className="absolute top-5 right-6 font-serif text-5xl font-semibold text-muted-foreground/25" aria-hidden="true">{i + 1}</span>
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand"><s.icon className="size-6" aria-hidden="true" /></span>
                <h3 className="mt-4 font-serif text-2xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
                <div className="mt-auto pt-5"><p className="rounded-2xl bg-sun-soft p-3.5 text-sm leading-relaxed text-sun-foreground"><strong>For example: </strong>{s.example}</p></div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Three levels */}
      <section className="container-page mt-24" aria-labelledby="levels-title">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading id="levels-title" eyebrow="One idea, three ways" title="Pick the words that fit you.">Here is what insulin does, told three ways. Every article on this site works like this: easy first, science later.</SectionHeading>
          <Reveal><ThreeLevels /></Reveal>
        </div>
      </section>

      {/* Guide */}
      <section className="mt-24 border-y bg-muted/40 py-20" aria-labelledby="guide-title">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="guide-title" eyebrow="A clear path" title="New here? Follow the steps.">{guideSteps.length} short steps in {guideModules.length} chapters. Each one takes a few minutes, and the site remembers where you stopped.</SectionHeading>
            <Button asChild variant="soft"><Link href="/learn">See all steps <ArrowRight /></Link></Button>
          </div>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
            {guideModules.map((m, i) => (
              <StaggerItem key={m.id}>
                <Link href={`/${m.steps[0].slug}`} className="group flex h-full flex-col rounded-2xl border bg-card p-5 transition-all hover:-translate-y-1 hover:border-brand/50 hover:shadow-md">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand text-primary-foreground"><Icon name={m.icon} className="size-5" /></span>
                  <p className="mt-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Chapter {i + 1}</p>
                  <h3 className="mt-1 font-serif text-lg leading-snug font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{m.steps.length} steps</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-brand-foreground">Start <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Topics */}
      <section className="container-page mt-24" aria-labelledby="topics-title">
        <SectionHeading id="topics-title" eyebrow="Follow your curiosity" title="Or pick a topic.">Each topic is a small shelf of articles. Choose the one you are wondering about.</SectionHeading>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {categories.map((c) => {
            const count = articles.filter((a) => a.category === c.key).length;
            return (
              <StaggerItem key={c.key}>
                <Link href={`/${c.key}`} className="group flex h-full gap-4 rounded-2xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
                  <span className={cn('inline-flex size-12 shrink-0 items-center justify-center rounded-xl', toneClasses[c.tone].icon)}><Icon name={c.icon} className="size-6" /></span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2"><span className="font-semibold">{c.label}</span><span className="text-xs text-muted-foreground">{count}</span></span>
                    <span className="mt-1 block text-sm leading-snug text-muted-foreground">{c.kid}</span>
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Featured */}
      <section className="container-page mt-24" aria-labelledby="featured-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="featured-title" eyebrow="Good places to start" title="Popular reads." />
          <Button asChild variant="ghost"><Link href="/research">All articles <ArrowRight /></Link></Button>
        </div>
        <Stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {featured.map((a) => <StaggerItem key={a.slug}><ArticleCard article={toSummary(a)} /></StaggerItem>)}
        </Stagger>
      </section>

      {/* FAQ */}
      <section className="container-page mt-24" aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading id="faq-title" eyebrow="Quick answers" title="Questions people often ask." />
          <Reveal>
            <Accordion type="single" collapsible defaultValue="q0" className="rounded-3xl border bg-card px-5">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`q${i}`}>
                  <AccordionTrigger className="text-base">{f.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{f.a}</p>
                    <p className="mt-3 rounded-xl bg-sun-soft px-3 py-2 text-sun-foreground"><strong>For example: </strong>{f.ex}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page mt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand p-8 text-primary-foreground sm:p-12">
            <Droplets className="animate-float absolute -top-6 -right-4 size-40 text-white/10" aria-hidden="true" />
            <h2 className="max-w-xl font-serif text-3xl font-semibold text-balance sm:text-4xl">Ready to understand it, one small step at a time?</h2>
            <p className="mt-3 max-w-xl text-lg opacity-90">No account. No tracking. Your progress stays on your own device.</p>
            <Button asChild size="lg" variant="secondary" className="mt-6"><Link href="/learn">Begin step 1 <ArrowRight /></Link></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
