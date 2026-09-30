import type { ReactNode } from 'react';
import { BookOpenText, Info, Key, Lightbulb, TriangleAlert, FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';

function Box({ tone, icon, title, children, role }: { tone: string; icon: ReactNode; title: string; children: ReactNode; role?: 'note' | 'alert' }) {
  return (
    <aside role={role} className={cn('my-7 flex gap-3.5 rounded-2xl border p-4 text-[0.975rem] leading-relaxed sm:p-5', tone)}>
      <span className="mt-0.5 shrink-0" aria-hidden="true">{icon}</span>
      <div className="min-w-0">
        <p className="mb-1 text-[0.8125rem] font-semibold tracking-wide uppercase">{title}</p>
        <div className="space-y-2 [&_p]:m-0">{children}</div>
      </div>
    </aside>
  );
}

export function Callout({ title = 'Note', type = 'note', children }: { title?: string; type?: 'note' | 'warning' | 'analogy'; children: ReactNode }) {
  if (type === 'warning') return <Warning title={title}>{children}</Warning>;
  if (type === 'analogy') return <Box tone="border-sun/40 bg-sun-soft text-sun-foreground" icon={<Lightbulb className="size-5" />} title={title}>{children}</Box>;
  return <Box tone="border-brand/25 bg-brand-soft/70 text-foreground" icon={<Info className="size-5 text-brand" />} title={title}>{children}</Box>;
}

export function Warning({ title = 'Safety note', children }: { title?: string; children: ReactNode }) {
  return <Box role="note" tone="border-warning-border bg-warning-surface text-warning-foreground" icon={<TriangleAlert className="size-5" />} title={title}>{children}</Box>;
}

export function KeyTakeaway({ children }: { children: ReactNode }) {
  return <Box tone="border-leaf/40 bg-leaf-soft text-leaf-foreground" icon={<Key className="size-5" />} title="The key idea"><div className="text-foreground">{children}</div></Box>;
}

export function Definition({ term, children }: { term: string; children: ReactNode }) {
  return (
    <Box tone="border-brand/25 bg-brand-soft/70" icon={<BookOpenText className="size-5 text-brand" />} title="In plain English">
      <p><dfn><strong>{term}</strong></dfn> — {children}</p>
    </Box>
  );
}

export function ResearchStatus({ status, date, children }: { status: string; date: string; children: ReactNode }) {
  return (
    <Box tone="border-violet-300/50 bg-violet-50 text-violet-950 dark:border-violet-400/25 dark:bg-violet-500/10 dark:text-violet-100" icon={<FlaskConical className="size-5" />} title={`Research status · ${date}`}>
      <p><strong>{status}</strong></p>
      {children}
    </Box>
  );
}

export function Footnote({ id, children }: { id: string; children: ReactNode }) {
  return <aside id={`footnote-${id}`} role="note" className="my-5 rounded-xl border bg-muted/50 p-3 text-sm text-muted-foreground">{children}</aside>;
}
