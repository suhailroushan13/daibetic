import type { Metadata } from 'next';
import Link from 'next/link';
import { sourceList } from '@/data/sources';
import { SourcesBrowser } from '@/components/site/sources-browser';
import { PageHeader } from '@/components/site/section-heading';

export const metadata: Metadata = {
  title: 'Sources',
  description: 'Every guideline, trial and official page behind The Diabetes Guide, with who was studied and what the limits are.',
  alternates: { canonical: '/sources' },
};

export default function SourcesPage() {
  const rows = [...sourceList].sort((a, b) => b.year - a.year).map((s) => ({ id: s.id, year: s.year, type: s.type, evidence: s.evidence, topics: s.topics }));
  return (
    <div className="container-page py-12 sm:py-16">
      <PageHeader eyebrow="Every claim has a trail" title="Go straight to the source.">
        {sourceList.length} references. Guidelines for care, original studies for specific findings, and the limits of each one written down.
      </PageHeader>
      <p className="mt-6 max-w-2xl rounded-lg border bg-tint p-4 text-sm leading-relaxed text-muted-foreground">
        For pages that are updated all the time, the year may be the year we looked at them. Our “how well proven” labels are our own simple labels, not an official grading. <Link href="/about" className="font-medium text-brand hover:underline">Read how we work →</Link>
      </p>
      <div className="mt-10"><SourcesBrowser rows={rows} /></div>
    </div>
  );
}
