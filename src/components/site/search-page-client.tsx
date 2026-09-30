'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchPanel } from '@/components/site/search-panel';

function Inner() {
  const q = useSearchParams().get('q') ?? '';
  return <SearchPanel autoFocus initialQuery={q} />;
}

/** Reads ?q= in the browser so the page itself can stay fully static. */
export function SearchPageClient() {
  return <Suspense fallback={null}><Inner /></Suspense>;
}
