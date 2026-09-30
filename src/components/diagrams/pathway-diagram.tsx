'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { pathways } from '@/data/pathways';
import { sources } from '@/data/sources';
import { cn } from '@/lib/utils';

export function PathwayDiagram({ kind = 'feedback' }: { kind?: string }) {
  const pathway = pathways[kind] || pathways.feedback;
  const [selected, setSelected] = useState(0);
  const id = useId();
  const n = pathway.nodes.length;

  return (
    <figure className="pathway-figure my-8 rounded-lg border bg-card p-5 sm:p-6">
      <div className="mb-1 flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-muted-foreground">Step by step</span>
        <Badge variant="outline">A simple model</Badge>
      </div>
      <h3 className="text-h4 text-foreground">{pathway.title}</h3>

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
                  'relative w-36 self-stretch rounded-md border p-3 text-left transition-colors',
                  selected === i ? 'border-brand-border bg-brand-muted' : 'bg-background hover:bg-tint',
                )}
              >
                <span className={cn('num mb-1.5 flex size-6 items-center justify-center rounded-full text-xs font-semibold', selected === i ? 'bg-primary text-primary-foreground' : 'border text-foreground')}>{i + 1}</span>
                <span className="block text-[0.8125rem] leading-snug font-semibold text-foreground">{node.title}</span>
              </button>
              {i < n - 1 && (
                <svg viewBox="0 0 28 12" className="mx-0.5 h-3 w-7 shrink-0 text-rule" aria-hidden="true">
                  <path d="M0 6h22m-5-4 5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="flow-line" />
                </svg>
              )}
            </li>
          ))}
        </ol>
        {pathway.loop && <p className="mt-2 text-xs text-muted-foreground">↺ This is a loop: the end feeds back to the start.</p>}
      </div>

      <p className="step-detail mt-3 rounded-md border bg-tint p-4 leading-relaxed text-foreground" aria-live="polite">
        <strong className="font-semibold">{pathway.nodes[selected].title}.</strong> {pathway.nodes[selected].detail}
      </p>

      <details className="mt-3 text-sm">
        <summary className="font-medium text-brand hover:underline">Read every step in a list</summary>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5">
          {pathway.nodes.map((node) => <li key={node.title}><strong>{node.title}.</strong> {node.detail}</li>)}
        </ol>
      </details>

      <figcaption id={id} className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {pathway.note}{' '}
        <Link href={`/sources#${pathway.source}`} className="font-medium text-brand hover:underline">Source: {sources[pathway.source].organization}</Link>
      </figcaption>
    </figure>
  );
}
