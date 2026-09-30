import type { Metadata } from 'next';
import { glossary } from '@/data/glossary';
import { GlossaryBrowser } from '@/components/site/glossary-browser';
import { PageHeader } from '@/components/site/section-heading';

export const metadata: Metadata = {
  title: 'The word list (glossary)',
  description: 'Hard diabetes words, explained in everyday language with an example for each. Insulin resistance, HbA1c, C-peptide and more.',
  alternates: { canonical: '/glossary' },
};

export default function GlossaryPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <PageHeader eyebrow="Word list" title="Big words, made small.">
        {glossary.length} words you will meet while reading. Each has a simple meaning, an example, and the science definition if you want it.
      </PageHeader>
      <div className="mt-8"><GlossaryBrowser entries={glossary} /></div>
    </div>
  );
}
