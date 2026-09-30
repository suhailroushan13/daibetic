import type { Metadata } from 'next';
import { glossary } from '@/data/glossary';
import { GlossaryBrowser } from '@/components/site/glossary-browser';
import { Reveal } from '@/components/site/reveal';

export const metadata: Metadata = {
  title: 'The word list (glossary)',
  description: 'Hard diabetes words, explained in everyday language with an example for each. Insulin resistance, HbA1c, C-peptide and more.',
  alternates: { canonical: '/glossary' },
};

export default function GlossaryPage() {
  return (
    <div className="container-page py-12">
      <Reveal>
        <p className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">Word list</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Big words, made small.</h1>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-muted-foreground">{glossary.length} words you will meet while reading. Each has a simple meaning, an example, and the science definition if you want it.</p>
      </Reveal>
      <div className="mt-8"><GlossaryBrowser entries={glossary} /></div>
    </div>
  );
}
