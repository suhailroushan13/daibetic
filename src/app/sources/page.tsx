import type { Metadata } from 'next';
import Link from 'next/link';
import { sourceList } from '@/data/sources';
import { SourcesBrowser } from '@/components/site/sources-browser';
import { Reveal } from '@/components/site/reveal';

export const metadata: Metadata = {
  title: 'Sources',
  description: 'Every guideline, trial and official page behind Glucose Atlas, with who was studied and what the limits are.',
  alternates: { canonical: '/sources' },
};

export default function SourcesPage() {
  const rows = [...sourceList].sort((a, b) => b.year - a.year).map((s) => ({ id: s.id, year: s.year, type: s.type, evidence: s.evidence, topics: s.topics }));
  return (
    <div className="container-page py-12">
      <Reveal>
        <p className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">Every claim has a trail</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Go straight to the source.</h1>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-muted-foreground">{sourceList.length} references. Guidelines for care, original studies for specific findings, and the limits of each one written down.</p>
        <p className="mt-4 max-w-2xl rounded-2xl border bg-muted/50 p-4 text-sm text-muted-foreground">
          For pages that are updated all the time, the year may be the year we looked at them. Our “how well proven” labels are our own simple labels, not an official grading. <Link href="/about" className="font-medium text-brand-foreground underline underline-offset-2">Read how we work →</Link>
        </p>
      </Reveal>
      <div className="mt-8"><SourcesBrowser rows={rows} /></div>
    </div>
  );
}
