'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { BookOpen, CornerDownLeft, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { highlight, loadSearchIndex, searchItems, type SearchItem } from '@/lib/search';
import { cn } from '@/lib/utils';

const suggestions = ['What is insulin?', 'Type 1 vs Type 2', 'HbA1c', 'Remission', 'Symptoms', 'Prediabetes'];

function Marked({ text, query }: { text: string; query: string }) {
  return <>{highlight(text, query).map((p, i) => (p.hit ? <mark key={i} className="rounded-sm bg-secondary-subtle px-0.5 text-foreground">{p.text}</mark> : <span key={i}>{p.text}</span>))}</>;
}

export function SearchPanel({ autoFocus = false, compact = false, onNavigate, inputId = 'full-query', initialQuery = '' }: { autoFocus?: boolean; compact?: boolean; onNavigate?: () => void; inputId?: string; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    loadSearchIndex().then((i) => alive && setItems(i)).catch(() => alive && setFailed(true));
    return () => { alive = false; };
  }, []);

  const results = useMemo(() => (items ? searchItems(items, query) : []), [items, query]);
  const q = query.trim();

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const links = Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>('a.search-result') ?? []);
    if (!links.length) return;
    e.preventDefault();
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    const next = e.key === 'ArrowDown' ? (index + 1) % links.length : index <= 0 ? links.length - 1 : index - 1;
    links[next].focus();
  }

  return (
    <div onKeyDown={onKeyDown} className="flex flex-col">
      <div className={cn('relative', compact && 'border-b')}>
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <label htmlFor={inputId} className="sr-only">Search terms</label>
        <Input
          id={inputId}
          type="search"
          autoComplete="off"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “insulin”, “symptoms” or “Type 1”…"
          className={cn('h-12 pl-11 md:text-base', compact && 'h-14 rounded-none rounded-t-lg border-0 focus-visible:outline-offset-[-2px]')}
        />
      </div>

      <div ref={listRef} className={cn('overflow-y-auto', compact ? 'max-h-[55vh] p-2' : 'mt-4')} aria-live="polite">
        {failed && <p className="p-4 text-sm text-muted-foreground">Search is not available right now. You can <Link href="/research" className="text-brand underline" onClick={onNavigate}>browse all articles</Link> instead.</p>}
        {!failed && !q && (
          <div className={cn(compact ? 'p-3' : 'py-2')}>
            <p className="text-sm text-muted-foreground">Search <span className="num">{items ? items.length : '…'}</span> articles and glossary words. Not sure where to start? Try one of these:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button key={s} type="button" onClick={() => setQuery(s.replace('?', ''))} className="h-8 rounded-full border bg-background px-3.5 text-sm transition-colors hover:bg-muted">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {!failed && q && items && results.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground" role="status">Nothing matched “{q}”. No matching topics — try a simpler word, such as “insulin” or “glucose”.</p>
        )}
        {results.length > 0 && (
          <>
            <p className="px-3 pt-1 pb-2 text-xs text-muted-foreground" role="status"><span className="num">{results.length}</span> {results.length === 1 ? 'result' : 'results'}, best match first</p>
            <ul className={cn('flex flex-col', !compact && 'divide-y rounded-lg border')}>
              {results.map((r) => (
                <li key={r.url + r.title}>
                  <Link
                    href={r.url}
                    onClick={onNavigate}
                    className={cn('search-result group flex flex-col gap-1 px-3 py-2.5 transition-colors hover:bg-tint focus-visible:bg-tint focus-visible:outline-offset-[-2px]', compact && 'rounded-md')}
                  >
                    <span className="flex items-center gap-2">
                      {r.kind === 'Glossary' ? <BookOpen className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" /> : <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
                      <strong className="text-sm font-semibold"><Marked text={r.title} query={q} /></strong>
                      <Badge variant="outline" className="ml-auto">{r.kind === 'Glossary' ? 'Word' : r.category}</Badge>
                      <CornerDownLeft className="hidden size-3.5 text-muted-foreground group-focus-visible:block" aria-hidden="true" />
                    </span>
                    <span className="line-clamp-2 pl-6 text-[0.8125rem] text-muted-foreground"><Marked text={r.description} query={q} /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
