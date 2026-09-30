import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeading({ eyebrow, title, children, className, id }: { eyebrow?: string; title: ReactNode; children?: ReactNode; className?: string; id?: string }) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow && <p className="mb-2 text-xs font-semibold tracking-wider text-brand-foreground uppercase">{eyebrow}</p>}
      <h2 id={id} className="font-serif text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {children && <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  );
}
