import type { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { Callout, Definition, Footnote, KeyTakeaway, ResearchStatus, Warning } from '@/components/mdx/callouts';
import { Quiz } from '@/components/mdx/quiz';
import { Timeline } from '@/components/mdx/timeline';
import { GlucoseJourney } from '@/components/diagrams/glucose-journey';
import { PathwayDiagram } from '@/components/diagrams/pathway-diagram';
import { ResearchChart } from '@/components/diagrams/research-chart';
import { RiskExplorer } from '@/components/diagrams/risk-explorer';
import { EvidenceBadge } from '@/components/site/evidence-badge';
import { sources } from '@/data/sources';

type Components = NonNullable<MDXRemoteProps['components']>;

function Anchor({ href = '', children, ...rest }: ComponentProps<'a'>) {
  if (href.startsWith('/')) return <Link href={href} {...rest}>{children}</Link>;
  if (href.startsWith('#')) return <a href={href} {...rest}>{children}</a>;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
}

function Table({ children }: { children?: ReactNode }) {
  return (
    <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
      <table>{children}</table>
    </div>
  );
}

/** MDX components for one article. Citations are numbered by the article's own source list. */
export function createMdxComponents(articleSources: string[]): Components {
  function Citation({ id, label }: { id: string; label?: string }) {
    const source = sources[id];
    if (!source) throw new Error(`Invalid citation: ${id}`);
    const n = articleSources.indexOf(id) + 1;
    return (
      <a className="citation" href={`#source-${id}`} data-citation={id} aria-label={`Source ${n || ''}: ${source.title}`} title={source.title}>
        {label || n || '↗'}
      </a>
    );
  }

  return {
    a: Anchor,
    table: Table,
    Callout,
    Warning,
    KeyTakeaway,
    Definition,
    ResearchStatus,
    Footnote,
    Quiz,
    Timeline,
    Citation,
    EvidenceBadge,
    InteractiveDiagram: PathwayDiagram,
    FlowDiagram: PathwayDiagram,
    AnatomyDiagram: () => <GlucoseJourney />,
    Chart: ResearchChart,
    RiskExplorer,
  } as Components;
}
