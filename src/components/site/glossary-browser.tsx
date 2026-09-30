'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Example } from '@/components/site/example';
import type { GlossaryEntry } from '@/data/glossary';

const anchor = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export function GlossaryBrowser({ entries }: { entries: GlossaryEntry[] }) {
  const [q, setQ] = useState('');
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? entries.filter((e) => `${e.term} ${e.simple} ${e.definition}`.toLowerCase().includes(s)) : entries;
  }, [entries, q]);
  const letters = [...new Set(entries.map((e) => e.term[0].toUpperCase()))];

  return (
    <>
      <div className="sticky top-14 z-20 -mx-4 border-b bg-background px-4 py-3 sm:mx-0 sm:px-0 md:top-15">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="glossary-filter" className="sr-only">Find a word</label>
          <Input id="glossary-filter" type="search" placeholder="Find a word, like “C-peptide”…" className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p id="glossary-count" role="status" className="text-xs text-muted-foreground"><span className="num">{shown.length}</span> {shown.length === 1 ? 'word' : 'words'}</p>
          {!q && (
            <nav aria-label="Jump to letter" className="hidden flex-wrap gap-0.5 sm:flex">
              {letters.map((l) => <a key={l} href={`#letter-${l}`} className="rounded-sm px-1.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">{l}</a>)}
            </nav>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {shown.map((e, i) => {
          const first = !q && (i === 0 || shown[i - 1].term[0].toUpperCase() !== e.term[0].toUpperCase());
          return (
            <article key={e.term} data-term={e.term.toLowerCase()} id={anchor(e.term)} className="scroll-mt-40 rounded-lg border bg-card p-5 target:border-brand target:ring-1 target:ring-brand">
              {first && <span id={`letter-${e.term[0].toUpperCase()}`} className="sr-only scroll-mt-40">{e.term[0].toUpperCase()}</span>}
              <h2 className="text-h4">{e.term}</h2>
              <p className="mt-2 leading-relaxed">{e.simple}</p>
              <Example className="mt-3 text-sm">{e.example}</Example>
              <details className="mt-3 text-sm">
                <summary className="font-medium text-brand hover:underline">The science definition</summary>
                <p className="mt-1.5 text-muted-foreground">{e.definition}</p>
              </details>
              <p className="mt-3 flex gap-4 text-sm">
                <Link href={`/${e.topic}`} className="font-medium text-brand hover:underline">Read more →</Link>
                <Link href={`/sources#${e.source}`} className="text-muted-foreground underline underline-offset-2 hover:text-foreground">Source ↗</Link>
              </p>
            </article>
          );
        })}
      </div>
      {shown.length === 0 && <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-muted-foreground">No word matches “{q}”. Try a shorter word.</p>}
    </>
  );
}
