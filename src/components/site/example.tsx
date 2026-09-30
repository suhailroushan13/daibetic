import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** The "For example" line that follows every simple idea. An amber rule marks it as a complementary aside. */
export function Example({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('border-l-2 border-secondary pl-3.5 text-[0.9375rem] leading-relaxed', className)}>
      <strong className="font-semibold">For example: </strong>{children}
    </p>
  );
}
