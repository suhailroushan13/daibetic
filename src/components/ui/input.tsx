import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-base transition-colors placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}
