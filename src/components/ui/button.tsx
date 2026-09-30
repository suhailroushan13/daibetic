import type { ComponentProps } from 'react';
import { Slot } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md',
        outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        soft: 'bg-brand-soft text-brand-foreground hover:bg-brand-soft/70',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-brand-foreground underline underline-offset-4 decoration-brand/40 hover:decoration-brand',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3.5',
        sm: 'h-8 gap-1.5 rounded-md px-3 text-[0.8125rem] has-[>svg]:px-2.5',
        lg: 'h-12 rounded-xl px-6 text-base has-[>svg]:px-5',
        icon: 'size-10',
        'icon-sm': 'size-8',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, type, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  return <Comp data-slot="button" {...(asChild ? {} : { type: type ?? 'button' })} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
