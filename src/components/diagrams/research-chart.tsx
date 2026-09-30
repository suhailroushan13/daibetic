'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { datasets } from '@/data/datasets';
import { sources } from '@/data/sources';

export function ResearchChart({ dataset = 'prevalence' }: { dataset?: string }) {
  const data = datasets[dataset];
  const [table, setTable] = useState(false);
  const id = useId();
  if (!data) return <p>Dataset unavailable. No values have been substituted.</p>;
  const max = Math.ceil(Math.max(...data.points.map((p) => p.value)) / 5) * 5;
  const isLine = dataset === 'prevalence';
  const y = (v: number) => 230 - (v / max) * 192;

  return (
    <figure className="research-chart my-8 rounded-lg border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-muted-foreground">Real data · {data.unit}</span>
        <button type="button" className="text-xs font-medium text-brand hover:underline" onClick={() => setTable(!table)} aria-expanded={table}>{table ? 'Hide' : 'Show'} data table</button>
      </div>
      <h3 className="mt-1 text-h4 text-foreground">{data.title}</h3>
      <p className="text-sm text-muted-foreground">{data.measure}</p>
      <svg viewBox="0 0 600 285" role="img" aria-labelledby={id} className="mt-3 h-auto w-full">
        <title id={id}>{`${data.title}: ${data.points.map((p) => `${p.label}, ${p.value}${data.unit}`).join('; ')}`}</title>
        {[0, 1, 2, 3, 4].map((t) => (
          <g key={t}>
            <line x1="58" x2="560" y1={230 - t * 48} y2={230 - t * 48} stroke="var(--hairline)" />
            <text x="44" y={234 - t * 48} textAnchor="end" fill="var(--muted-foreground)" fontSize="11" fontFamily="var(--font-num)">{Math.round(((max * t) / 4) * 10) / 10}</text>
          </g>
        ))}
        {isLine && <path d={`M150 ${y(data.points[0].value)}L460 ${y(data.points[1].value)}`} stroke="var(--brand)" strokeWidth="2" strokeDasharray="6 5" fill="none" />}
        {data.points.map((p, i) => {
          const x = 150 + i * 310;
          const top = y(p.value);
          return (
            <g key={p.label}>
              {isLine ? (
                <circle cx={x} cy={top} r="6" fill="var(--brand)" />
              ) : (
                <rect x={x - 58} y={top} width="116" height={230 - top} rx="4" fill={i === 0 ? 'var(--brand)' : 'var(--status-stale)'} />
              )}
              <text x={x} y={top - 12} textAnchor="middle" fontSize="16" fontWeight="600" fill="var(--foreground)" fontFamily="var(--font-num)">{p.value}{data.unit}</text>
              <text x={x} y="256" textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">{p.label}</text>
            </g>
          );
        })}
      </svg>
      <div hidden={!table} className="table-scroll">
        <table>
          <caption className="p-2 text-left text-xs text-muted-foreground">{data.population}</caption>
          <thead><tr><th>Observation</th><th>{data.unit}</th></tr></thead>
          <tbody>{data.points.map((p) => <tr key={p.label}><td>{p.label}</td><td>{p.value}</td></tr>)}</tbody>
        </table>
      </div>
      <noscript><p>{data.points.map((p) => `${p.label}: ${p.value}${data.unit}`).join('; ')}</p></noscript>
      <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
        <strong className="font-semibold">Who was counted:</strong> {data.population}. {data.limitations}{' '}
        <Link href={`/sources#${data.sourceId}`} className="font-medium text-brand hover:underline">Source: {sources[data.sourceId].organization} ({sources[data.sourceId].year})</Link>
      </figcaption>
    </figure>
  );
}
