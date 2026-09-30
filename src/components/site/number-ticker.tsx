'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * Counts up to `value` with spring physics the first time it scrolls into view.
 * The server renders the final number, so it reads correctly without JavaScript.
 */
export function NumberTicker({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  // The real number stays in place until the count starts, so print, previews and
  // pages that never scroll it into view still show the correct value.
  useEffect(() => {
    if (reduce) return;
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = String(Math.round(v));
    });
  }, [reduce, spring]);

  useEffect(() => {
    if (inView && !reduce) motionValue.set(value);
  }, [inView, reduce, value, motionValue]);

  return <span ref={ref} className={cn('num', className)}>{value}</span>;
}
