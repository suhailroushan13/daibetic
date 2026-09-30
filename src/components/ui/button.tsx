import type { ComponentProps } from 'react';
import { Slot } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
        outline: 'border bg-background text-foreground hover:bg-muted',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        ghost: 'text-muted-foreground hover:text-foreground',
        link: 'text-brand underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-7 gap-1 px-2.5 text-xs',
        sm: 'h-8 gap-1.5 px-3',
        default: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
        'icon-xs': 'size-7',
        'icon-sm': 'size-8',
        icon: 'size-10',
        'icon-lg': 'size-12',
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
