'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import Link from 'next/link';
import { pathways } from '@/data/pathways';
import { sources } from '@/data/sources';
import { cn } from '@/lib/utils';

export function PathwayDiagram({ kind = 'feedback' }: { kind?: string }) {
  const pathway = pathways[kind] || pathways.feedback;
  const [selected, setSelected] = useState(0);
  const id = useId();
  const n = pathway.nodes.length;

  return (
    <MotionConfig reducedMotion="user">
      <figure className="pathway-figure my-8 rounded-3xl border bg-card p-5 shadow-xs sm:p-6">
        <div className="mb-1 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">Step by step</span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">A simple model</span>
        </div>
        <h3 className="font-serif text-xl font-semibold">{pathway.title}</h3>

        <div className="mt-4 overflow-x-auto pb-2" tabIndex={0} aria-label="Scrollable step diagram">
          <ol className="flex min-w-max items-stretch gap-0" aria-label="Steps">
            {pathway.nodes.map((node, i) => (
              <li key={node.title} className="flex items-center">
                <button
                  type="button"
                  aria-pressed={selected === i}
                  aria-label={`Step ${i + 1}: ${node.title}`}
                  onClick={() => setSelected(i)}
                  className={cn(
                    'relative w-36 rounded-2xl border p-3 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    selected === i ? 'border-brand bg-brand-soft shadow-sm' : 'bg-background hover:border-brand/40 hover:bg-accent',
                  )}
                >
                  <span className={cn('mb-1.5 flex size-6 items-center justify-center rounded-full text-xs font-bold', selected === i ? 'bg-brand text-primary-foreground' : 'bg-muted text-muted-foreground')}>{i + 1}</span>
                  <span className="block text-[0.8125rem] leading-snug font-semibold">{node.title}</span>
                </button>
                {i < n - 1 && (
                  <svg viewBox="0 0 28 12" className="mx-0.5 h-3 w-7 shrink-0 text-brand" aria-hidden="true">
                    <path d="M0 6h22m-5-4 5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="flow-line" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
          {pathway.loop && <p className="mt-2 text-xs text-muted-foreground">↺ This is a loop: the end feeds back to the start.</p>}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="step-detail mt-3 rounded-2xl bg-muted/60 p-4 leading-relaxed"
            aria-live="polite"
          >
            <strong>{pathway.nodes[selected].title}.</strong> {pathway.nodes[selected].detail}
          </motion.p>
        </AnimatePresence>

        <details className="mt-3 text-sm">
          <summary className="cursor-pointer font-medium text-brand-foreground hover:underline">Read every step in a list</summary>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5">
            {pathway.nodes.map((node) => <li key={node.title}><strong>{node.title}.</strong> {node.detail}</li>)}
          </ol>
        </details>

        <figcaption id={id} className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {pathway.note}{' '}
          <Link href={`/sources#${pathway.source}`} className="font-medium text-brand-foreground underline underline-offset-2">Source: {sources[pathway.source].organization}</Link>
        </figcaption>
      </figure>
    </MotionConfig>
  );
}
