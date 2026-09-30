'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

const factors = [
  { name: 'Family history', type: 'Established risk factor', detail: 'A first-degree relative with T2D can increase risk. Family history captures both inherited and shared environmental influences.', simple: 'If a parent or sibling has Type 2, your chance goes up a little. It is not a promise.', example: 'If your family likes to be tall, you may be tall too, but it is not certain.' },
  { name: 'Previous gestational diabetes', type: 'Established risk factor', detail: 'Diabetes first identified in pregnancy can signal increased later T2D risk. Discuss follow-up with a clinician.', simple: 'Having diabetes during pregnancy means later check-ups are a good idea.', example: 'A warning bell after a storm: check the roof again later.' },
  { name: 'Waist & weight trend', type: 'Useful in context', detail: 'Central fat distribution can add information beyond BMI. Cutoffs and predictive performance vary by population.', simple: 'Where the body stores fat matters, not just the number on the scale.', example: 'Two boxes weigh the same, but one has the heavy items in a dangerous spot.' },
  { name: 'Physical activity', type: 'Modifiable factor', detail: 'Muscle activity improves glucose use and insulin sensitivity. Structured lifestyle programs reduce progression in high-risk adults.', simple: 'Moving your muscles helps them use sugar. This is something you can change.', example: 'A walk after dinner is like sending the sugar off to work.' },
  { name: 'Sleep & wearables', type: 'Context / weaker prediction signal', detail: 'Sleep apnea and sleep disruption matter. A wearable sleep score or heart-rate reading alone has no validated diagnostic meaning.', simple: 'Good sleep helps, but a watch score cannot tell if you have diabetes.', example: 'A toy thermometer can show a number, but it cannot say you have a fever.' },
  { name: 'HbA1c & laboratory glucose', type: 'Clinical testing', detail: 'Standardized tests assess current glucose regulation. Interpretation requires confirmation when appropriate and attention to interfering conditions.', simple: 'Lab tests are the trusted way to check sugar handling.', example: 'A doctor’s scale is more reliable than guessing your weight by how your clothes fit.' },
];

export function RiskExplorer() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <section className="risk-explorer my-8 rounded-3xl border bg-card p-5 shadow-xs sm:p-6">
      <span className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">Learning demo</span>
      <h3 className="mt-1 font-serif text-xl font-semibold">Explore the signals. Understand their limits.</h3>
      <p className="mt-2 text-sm text-muted-foreground">This is not a real risk calculator. It gives no probability, no diagnosis and no treatment advice — just an explanation of what each signal can and cannot tell you. Your choices stay on this page and are never sent anywhere.</p>
      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-medium">Tick a signal to learn about it</legend>
        <div className="flex flex-wrap gap-2">
          {factors.map((f) => {
            const on = selected.includes(f.name);
            return (
              <label key={f.name} className={cn('inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring', on ? 'border-brand bg-brand-soft text-brand-foreground' : 'hover:bg-accent')}>
                <input type="checkbox" className="size-4 accent-[var(--brand)]" checked={on} onChange={() => setSelected(on ? selected.filter((s) => s !== f.name) : [...selected, f.name])} />
                {f.name}
              </label>
            );
          })}
        </div>
      </fieldset>
      <div aria-live="polite" className="mt-4 grid gap-3">
        {!selected.length && <p className="rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">Tick a signal to see what it can — and cannot — tell you.</p>}
        <AnimatePresence initial={false}>
          {factors.filter((f) => selected.includes(f.name)).map((f) => (
            <motion.article key={f.name} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} className="rounded-2xl border bg-muted/40 p-4">
              <span className="text-xs font-semibold tracking-wide text-brand-foreground uppercase">{f.type}</span>
              <h4 className="mt-0.5 font-semibold">{f.name}</h4>
              <p className="mt-1 leading-relaxed">{f.simple}</p>
              <p className="mt-2 rounded-xl bg-sun-soft px-3 py-2 text-sm text-sun-foreground"><strong>For example: </strong>{f.example}</p>
              <p className="mt-2 text-[0.8125rem] text-muted-foreground"><strong>In science words:</strong> {f.detail}</p>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      <Link href="/prediction/risk-tree" className="mt-4 inline-block text-sm font-medium text-brand-foreground underline underline-offset-2">Follow the screening steps →</Link>
    </section>
  );
}
