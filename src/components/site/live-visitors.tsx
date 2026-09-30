'use client';

import { useSyncExternalStore } from 'react';
import { NumberTicker } from '@/components/site/number-ticker';
import { cn } from '@/lib/utils';

/**
 * One shared visitor count for every place that shows it (top bar and footer). The first
 * subscriber records this browser's visit, then the count refreshes every minute while the
 * tab is visible. The ID is a random UUID kept in localStorage; nothing personal is sent.
 */
type Snapshot = { visitors: number | null; failed: boolean };

const ID_KEY = 'dg-visitor-id';
const REFRESH_MS = 60_000;
const INITIAL: Snapshot = { visitors: null, failed: false };

let snapshot = INITIAL;
let started = false;
const listeners = new Set<() => void>();

function publish(next: Snapshot) {
  snapshot = next;
  listeners.forEach((l) => l());
}

function visitorId() {
  try {
    const saved = localStorage.getItem(ID_KEY);
    if (saved) return saved;
    const id = crypto.randomUUID();
    localStorage.setItem(ID_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID(); /* storage unavailable */
  }
}

async function load(init?: RequestInit) {
  try {
    const res = await fetch('/api/visitors', init);
    const { visitors } = (await res.json()) as { visitors: number | null };
    if (typeof visitors !== 'number') throw new Error('Visitor count unavailable');
    // CDN-cached reads can trail the fresh count from the POST, so the number only goes up.
    publish({ visitors: Math.max(visitors, snapshot.visitors ?? 0), failed: false });
  } catch {
    if (snapshot.visitors === null) publish({ visitors: null, failed: true });
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!started) {
    started = true;
    // Automated browsers only read the count so they never add to it.
    void (navigator.webdriver
      ? load()
      : load({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: visitorId() }) }));
    // Both readers live in the root layout, so this runs for the whole visit.
    setInterval(() => { if (!document.hidden) void load(); }, REFRESH_MS);
  }
  return () => { listeners.delete(listener); };
}

function useVisitors() {
  return useSyncExternalStore(subscribe, () => snapshot, () => INITIAL);
}

function LiveDot() {
  return (
    <span className="relative flex size-2" aria-hidden="true">
      <span className="absolute inline-flex size-full rounded-full bg-success opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.4s]" />
      <span className="relative inline-flex size-2 rounded-full bg-success" />
    </span>
  );
}

function Count({ visitors }: { visitors: number | null }) {
  if (visitors === null) {
    return <span className="inline-block h-3 w-10 rounded-sm bg-hairline motion-safe:animate-pulse"><span className="sr-only">Loading</span></span>;
  }
  // Starts at the real number (no count-up from zero) and glides as new visitors arrive.
  return <NumberTicker value={visitors} from={visitors} className="font-semibold text-foreground" />;
}

function Stat({ visitors }: { visitors: number | null }) {
  return (
    <>
      <LiveDot />
      <span className="font-medium text-foreground">Live</span>
      <span className="h-3.5 w-px bg-border" aria-hidden="true" />
      <span className="flex items-center gap-1">
        <Count visitors={visitors} />
        <span>total visitors</span>
      </span>
    </>
  );
}

/** Slim strip above the header. It keeps its height while loading so the page does not jump. */
export function LiveStatsBar() {
  const { visitors, failed } = useVisitors();
  if (failed) return null;
  return (
    <div className="border-b bg-tint" id="live-stats">
      <p className="container-page flex h-8 items-center justify-center gap-2 text-xs text-muted-foreground">
        <Stat visitors={visitors} />
      </p>
    </div>
  );
}

/** Pill version for the footer. */
export function LiveVisitorsPill({ className }: { className?: string }) {
  const { visitors, failed } = useVisitors();
  if (failed) return null;
  return (
    <p className={cn('inline-flex h-7 items-center gap-2 rounded-full border bg-background px-3 text-xs text-muted-foreground', className)}>
      <Stat visitors={visitors} />
    </p>
  );
}
