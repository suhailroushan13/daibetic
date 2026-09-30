'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

const format = new Intl.NumberFormat('en-GB').format;

/**
 * Counts up from `from` (default 0) to `value` with spring physics the first time it
 * scrolls into view, and glides to any later value. The server renders the final number,
 * so it reads correctly without JavaScript.
 */
export function NumberTicker({ value, from = 0, className }: { value: number; from?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // React renders only the first value; later ones are written below, so a new value can
  // never flash in before the spring starts moving towards it.
  const [initial] = useState(value);
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(from);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  // The real number stays in place until the count starts, so print, previews and
  // pages that never scroll it into view still show the correct value.
  useEffect(() => {
    if (reduce) return;
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = format(Math.round(v));
    });
  }, [reduce, spring]);

  useEffect(() => {
    if (inView && !reduce) motionValue.set(value);
    else if (ref.current) ref.current.textContent = format(value);
  }, [inView, reduce, value, motionValue]);

  return <span ref={ref} className={cn('num', className)}>{format(initial)}</span>;
}
