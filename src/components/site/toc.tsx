'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Heading } from '@/lib/content';

export function Toc({ headings }: { headings: (Heading | { text: string; id: string; depth: 2 })[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">On this page</p>
      <ul className="space-y-1 border-l">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l-2 border-transparent py-1 pr-2 leading-snug text-muted-foreground transition-colors hover:text-foreground aria-[current=location]:border-brand aria-[current=location]:font-medium aria-[current=location]:text-brand-foreground',
                h.depth === 3 ? 'pl-7 text-[0.8125rem]' : 'pl-4',
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
