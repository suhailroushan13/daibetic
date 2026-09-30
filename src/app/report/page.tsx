import type { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { reportParts } from '@/data/report';
import { getArticle } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/site/reveal';

export const metadata: Metadata = {
  title: 'The full report in 18 parts',
  description: 'Read everything in order: how glucose works, how diabetes develops, how it is found and treated, and where research is heading.',
  alternates: { canonical: '/report' },
};

export default function ReportPage() {
  return (
    <div className="container-page py-12">
      <Reveal>
        <p className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">The long view · 18 parts</p>
        <h1 className="mt-2 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-balance sm:text-6xl">From one tiny sugar to the frontier of research.</h1>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-muted-foreground">The whole library in reading order. Each part links to short articles with their own sources.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg"><Link href="/learn">Or follow the easy step-by-step guide</Link></Button>
          <Button asChild size="lg" variant="outline"><a href="/report.md" download><Download /> Download as a text file</a></Button>
        </div>
      </Reveal>
      <ol className="mt-12 grid gap-4 md:grid-cols-2">
        {reportParts.map((part, i) => (
          <Reveal as="li" key={part.title} className="rounded-2xl border bg-card p-5">
            <p className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">Part {String(i + 1).padStart(2, '0')}</p>
            <h2 className="mt-1 font-serif text-xl font-semibold">{part.title}</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {part.slugs.map((slug) => {
                const a = getArticle(slug);
                return a ? <li key={slug}><Link href={a.route} className="text-muted-foreground transition-colors hover:text-brand-foreground">{a.title} →</Link></li> : null;
              })}
            </ul>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
