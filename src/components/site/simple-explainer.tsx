import { Lightbulb, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import type { Simple } from '@/data/simple';

/**
 * The "in simple words" layer at the top of each article:
 * one short summary, then small steps that each end with a real-life example.
 */
export function SimpleExplainer({ simple }: { simple: Simple }) {
  return (
    <section aria-labelledby="simple-heading" className="not-prose my-10 overflow-hidden rounded-3xl border bg-gradient-to-br from-brand-soft via-card to-sun-soft/60">
      <div className="p-6 sm:p-8">
        <p className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold tracking-wide text-brand-foreground uppercase ring-1 ring-brand/15">
          <Sparkles className="size-3.5" aria-hidden="true" /> In simple words
        </p>
        <h2 id="simple-heading" className="mt-4 font-serif text-2xl leading-snug font-semibold sm:text-[1.75rem]">
          {simple.tldr}
        </h2>

        <ol className="mt-8 space-y-6">
          {simple.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.06} className="relative grid grid-cols-[auto_1fr] gap-x-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-primary-foreground shadow-sm" aria-hidden="true">{i + 1}</span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold sm:text-lg">
                  <span className="sr-only">Step {i + 1}: </span>{step.title}
                </h3>
                <p className="mt-1 leading-relaxed text-foreground/85">{step.text}</p>
                <p className="mt-3 flex gap-2.5 rounded-xl border border-sun/30 bg-sun-soft px-4 py-3 text-[0.9375rem] leading-relaxed text-sun-foreground">
                  <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span><strong className="font-semibold">For example: </strong>{step.example}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="mt-8 rounded-2xl bg-background/80 px-4 py-3 text-[0.9375rem] leading-relaxed ring-1 ring-border">
          <strong className="font-semibold text-brand-foreground">Remember: </strong>{simple.remember}
        </p>
      </div>
    </section>
  );
}
