import { Badge } from '@/components/ui/badge';
import { Example } from '@/components/site/example';
import type { Simple } from '@/data/simple';

/**
 * The "in simple words" layer at the top of each article:
 * one short summary, then small steps that each end with a real-life example.
 */
export function SimpleExplainer({ simple }: { simple: Simple }) {
  return (
    <section aria-labelledby="simple-heading" className="not-prose my-10 rounded-lg border bg-card p-5 sm:p-7">
      <Badge>In simple words</Badge>
      <h2 id="simple-heading" className="mt-4 text-h3 text-pretty">{simple.tldr}</h2>

      <ol className="mt-7 space-y-6">
        {simple.steps.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[auto_1fr] gap-x-4">
            <span className="num flex size-7 items-center justify-center rounded-full bg-brand-muted text-sm font-semibold text-brand-foreground" aria-hidden="true">{i + 1}</span>
            <div className="min-w-0">
              <h3 className="pt-0.5 font-semibold">
                <span className="sr-only">Step {i + 1}: </span>{step.title}
              </h3>
              <p className="mt-1 leading-relaxed text-foreground/85">{step.text}</p>
              <Example className="mt-3">{step.example}</Example>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-7 border-t pt-5 text-[0.9375rem] leading-relaxed">
        <strong className="font-semibold">Remember: </strong>{simple.remember}
      </p>
    </section>
  );
}
