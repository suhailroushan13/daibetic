import { ExternalLink } from 'lucide-react';
import { sources } from '@/data/sources';
import { EvidenceBadge } from '@/components/site/evidence-badge';

export function SourceCard({ id, number, bibliography = false }: { id: string; number?: number; bibliography?: boolean }) {
  const source = sources[id];
  if (!source) throw new Error(`Missing source ${id}`);
  return (
    <article
      id={bibliography ? id : `source-${id}`}
      className="scroll-mt-24 rounded-xl border bg-card p-4 target:border-brand target:ring-2 target:ring-brand/25"
      data-source-card
      data-source-year={source.year}
      data-source-type={source.type}
      data-source-evidence={source.evidence}
      data-source-topics={source.topics.join(' ')}
    >
      <h3 className="text-[0.95rem] leading-snug font-semibold">
        {number && <span className="mr-1.5 text-brand">{number}.</span>}
        <a href={source.url} rel="noopener noreferrer" target="_blank" className="inline-flex items-start gap-1.5 hover:underline">
          {source.title}
          <ExternalLink className="mt-1 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">{source.organization} · {source.year} · {source.type}</p>
      <div className="mt-2"><EvidenceBadge level={source.evidence} /></div>
      <details className="group mt-3 text-sm">
        <summary className="cursor-pointer text-xs font-medium text-brand-foreground marker:content-none hover:underline">Who was studied, limits and source check</summary>
        <div className="mt-2 space-y-1.5 text-muted-foreground">
          {source.population && <p><strong className="text-foreground">Population:</strong> {source.population}</p>}
          {source.sampleSize && <p><strong className="text-foreground">Sample:</strong> {source.sampleSize}</p>}
          <p><strong className="text-foreground">Limitations:</strong> {source.limitations}</p>
          <p>Source checked {source.checked}. See the original publication for full methods.</p>
        </div>
      </details>
    </article>
  );
}
