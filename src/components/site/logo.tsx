import Link from 'next/link';
import { cn } from '@/lib/utils';

/** Text-only wordmark: lowercase, bold, tight tracking, last word in the brand blue. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('shrink-0 rounded-md text-lg font-bold tracking-[-0.03em] whitespace-nowrap sm:text-xl', className)} aria-label="The Diabetes Guide home">
      <span className="text-foreground">the diabetes</span> <span className="text-brand">guide</span>
    </Link>
  );
}
