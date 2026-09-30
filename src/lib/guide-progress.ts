'use client';

import { useCallback, useEffect, useState } from 'react';

/** Guide progress lives only in this browser (localStorage). Every access is guarded. */
const KEY = 'atlas-guide-progress';
const EVENT = 'atlas-progress-change';

export function readProgress(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

function write(done: string[]) {
  try { localStorage.setItem(KEY, JSON.stringify(done)); } catch { /* storage unavailable */ }
  window.dispatchEvent(new Event(EVENT));
}

/** Returns the finished step slugs and helpers. `ready` is false until the browser has been read. */
export function useGuideProgress() {
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setDone(readProgress());
    sync();
    setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener(EVENT, sync); window.removeEventListener('storage', sync); };
  }, []);

  const complete = useCallback((slug: string) => write([...new Set([...readProgress(), slug])]), []);
  const undo = useCallback((slug: string) => write(readProgress().filter((s) => s !== slug)), []);
  const reset = useCallback(() => write([]), []);
  return { done, ready, complete, undo, reset };
}
