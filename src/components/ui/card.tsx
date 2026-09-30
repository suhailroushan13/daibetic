import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type DivProps = HTMLAttributes<HTMLDivElement>;

export const cardClass = 'flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-xs';

export function Card({ className, ...props }: DivProps) {
  return <div data-slot="card" className={cn(cardClass, className)} {...props} />;
}
export function CardHeader({ className, ...props }: DivProps) {
  return <div data-slot="card-header" className={cn('grid auto-rows-min items-start gap-1.5 px-6', className)} {...props} />;
}
export function CardTitle({ className, ...props }: DivProps) {
  return <div data-slot="card-title" className={cn('leading-none font-semibold tracking-tight', className)} {...props} />;
}
export function CardDescription({ className, ...props }: DivProps) {
  return <div data-slot="card-description" className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
export function CardContent({ className, ...props }: DivProps) {
  return <div data-slot="card-content" className={cn('px-6', className)} {...props} />;
}
export function CardFooter({ className, ...props }: DivProps) {
  return <div data-slot="card-footer" className={cn('flex items-center px-6', className)} {...props} />;
}
