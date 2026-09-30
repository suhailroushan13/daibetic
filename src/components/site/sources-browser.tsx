'use client';

import { useMemo, useState } from 'react';
import { SourceCard } from '@/components/mdx/source-card';
import { categories } from '@/data/navigation';
import { evidenceLevels } from '@/data/evidence';

export interface SourceRow { id: string; year: number; type: string; evidence: string; topics: string[] }

export function SourcesBrowser({ rows }: { rows: SourceRow[] }) {
  const [topic, setTopic] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [evidence, setEvidence] = useState('');
  const years = useMemo(() => [...new Set(rows.map((r) => r.year))].sort((a, b) => b - a), [rows]);
  const types = useMemo(() => [...new Set(rows.map((r) => r.type))].sort(), [rows]);
  const shown = rows.filter((r) => (!topic || r.topics.includes(topic)) && (!year || String(r.year) === year) && (!type || r.type === type) && (!evidence || r.evidence === evidence));
  const select = 'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40';

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="grid gap-1 text-sm font-medium">Topic
          <select id="source-topic" className={select} value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">All topics</option>{categories.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">Year
          <select id="source-year" className={select} value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Any year</option>{years.map((y) => <option key={y}>{y}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">Kind of source
          <select id="source-type" className={select} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Any kind</option>{types.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">How well proven
          <select id="source-evidence" className={select} value={evidence} onChange={(e) => setEvidence(e.target.value)}>
            <option value="">Any</option>{evidenceLevels.map((e) => <option key={e}>{e}</option>)}
          </select>
        </label>
      </div>
      <p id="source-count" role="status" className="mt-4 text-sm text-muted-foreground">{shown.length} {shown.length === 1 ? 'source' : 'sources'}</p>
      <div className="bibliography mt-4 grid gap-3 md:grid-cols-2">
        {rows.map((r) => (
          <div key={r.id} hidden={!shown.includes(r)}><SourceCard id={r.id} bibliography /></div>
        ))}
      </div>
    </>
  );
}
