import Link from 'next/link';
import { cn } from '@/lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-8', className)}>
      <rect width="32" height="32" rx="9" fill="var(--brand)" />
      <path d="M16 6.5c3.6 4.6 6.5 8 6.5 11.4a6.5 6.5 0 0 1-13 0C9.5 14.500 12.400 11.100 16 6.500Z" fill="var(--background)" />
      <path d="M12.800 18.200a3.300 3.300 0 0 0 3.200 3.300" fill="none" stroke="var(--sun)" strokeWidth="1.800" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('group inline-flex items-center gap-2.5 rounded-lg font-semibold tracking-tight', className)} aria-label="Glucose Atlas home">
      <LogoMark className="transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110" />
      <span className="font-serif text-xl">Glucose Atlas</span>
    </Link>
  );
}
