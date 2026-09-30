import type { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { reportParts } from '@/data/report';
import { getArticle } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/site/section-heading';

export const metadata: Metadata = {
  title: 'The full report in 18 parts',
  description: 'Read everything in order: how glucose works, how diabetes develops, how it is found and treated, and where research is heading.',
  alternates: { canonical: '/report' },
};

export default function ReportPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <PageHeader eyebrow="The long view · 18 parts" title="From one tiny sugar to the frontier of research.">
        The whole library in reading order. Each part links to short articles with their own sources.
      </PageHeader>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild><Link href="/learn">Or follow the easy step-by-step guide</Link></Button>
        <Button asChild variant="outline"><a href="/report.md" download><Download /> Download as a text file</a></Button>
      </div>
      <ol className="mt-12 grid gap-3 md:grid-cols-2">
        {reportParts.map((part, i) => (
          <li key={part.title} className="rounded-lg border bg-card p-5">
            <p className="num text-xs font-medium text-muted-foreground">Part {String(i + 1).padStart(2, '0')}</p>
            <h2 className="mt-1.5 text-[1.0625rem] leading-snug font-semibold">{part.title}</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {part.slugs.map((slug) => {
                const a = getArticle(slug);
                return a ? <li key={slug}><Link href={a.route} className="text-muted-foreground transition-colors hover:text-brand">{a.title} →</Link></li> : null;
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
