import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeading({ eyebrow, title, children, className, id }: { eyebrow?: string; title: ReactNode; children?: ReactNode; className?: string; id?: string }) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow && <p className="label mb-2 text-muted-foreground">{eyebrow}</p>}
      <h2 id={id} className="text-h2 text-balance">{title}</h2>
      {children && <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">{children}</p>}
    </div>
  );
}

/** The heading block at the top of a page: a small label, the page title and a short lead. */
export function PageHeader({ eyebrow, title, children, center = false, className }: { eyebrow?: string; title: ReactNode; children?: ReactNode; center?: boolean; className?: string }) {
  return (
    <header className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow && <p className="label mb-3 text-muted-foreground">{eyebrow}</p>}
      <h1 className="text-h1 text-balance">{title}</h1>
      {children && <p className={cn('mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground', center && 'mx-auto')}>{children}</p>}
    </header>
  );
}
