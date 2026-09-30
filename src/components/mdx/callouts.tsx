import type { ReactNode } from 'react';
import { BookOpenText, Info, Key, Lightbulb, TriangleAlert, FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Flat, tinted box. Colour lives in the border, tint and icon; text stays full contrast. */
function Box({ tone, icon, title, children, role }: { tone: string; icon: ReactNode; title: string; children: ReactNode; role?: 'note' | 'alert' }) {
  return (
    <aside role={role} className={cn('my-7 flex gap-3 rounded-lg border p-4 text-[0.9375rem] leading-relaxed text-foreground sm:p-5', tone)}>
      <span className="mt-0.5 shrink-0" aria-hidden="true">{icon}</span>
      <div className="min-w-0">
        <p className="mb-1 text-sm font-semibold">{title}</p>
        <div className="space-y-2 [&_p]:m-0">{children}</div>
      </div>
    </aside>
  );
}

export function Callout({ title = 'Note', type = 'note', children }: { title?: string; type?: 'note' | 'warning' | 'analogy'; children: ReactNode }) {
  if (type === 'warning') return <Warning title={title}>{children}</Warning>;
  if (type === 'analogy') return <Box tone="border-secondary/40 bg-secondary-subtle" icon={<Lightbulb className="size-[1.125rem] text-warning" />} title={title}>{children}</Box>;
  return <Box tone="border-brand-border bg-brand-muted" icon={<Info className="size-[1.125rem] text-brand" />} title={title}>{children}</Box>;
}

export function Warning({ title = 'Safety note', children }: { title?: string; children: ReactNode }) {
  return <Box role="note" tone="border-warning/40 bg-warning-subtle" icon={<TriangleAlert className="size-[1.125rem] text-warning" />} title={title}>{children}</Box>;
}

export function KeyTakeaway({ children }: { children: ReactNode }) {
  return <Box tone="border-success/35 bg-success-subtle" icon={<Key className="size-[1.125rem] text-success" />} title="The key idea">{children}</Box>;
}

export function Definition({ term, children }: { term: string; children: ReactNode }) {
  return (
    <Box tone="bg-tint" icon={<BookOpenText className="size-[1.125rem] text-muted-foreground" />} title="In plain English">
      <p><dfn><strong>{term}</strong></dfn> — {children}</p>
    </Box>
  );
}

export function ResearchStatus({ status, date, children }: { status: string; date: string; children: ReactNode }) {
  return (
    <Box tone="bg-tint" icon={<FlaskConical className="size-[1.125rem] text-muted-foreground" />} title={`Research status · ${date}`}>
      <p><strong>{status}</strong></p>
      {children}
    </Box>
  );
}

export function Footnote({ id, children }: { id: string; children: ReactNode }) {
  return <aside id={`footnote-${id}`} role="note" className="my-5 rounded-md border bg-tint p-3 text-sm text-muted-foreground">{children}</aside>;
}
