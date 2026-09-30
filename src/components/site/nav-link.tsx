'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function NavLink({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + '/');
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn('rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-foreground', className)}
    >
      {children}
    </Link>
  );
}
