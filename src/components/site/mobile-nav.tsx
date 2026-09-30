'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/site/nav-link';
import { navLinks } from '@/components/site/nav-links';
import { categories } from '@/data/navigation';
import { Icon } from '@/components/site/icon';
import Link from 'next/link';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button id="menu-toggle" variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="px-5 pt-5 font-serif text-xl">Menu</SheetTitle>
        <SheetDescription className="sr-only">Pages and topics in Glucose Atlas</SheetDescription>
        <nav id="library-navigation" aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-6">
          {navLinks.map((l) => (
            <NavLink key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2.5 text-base">{l.label}</NavLink>
          ))}
          <p className="mt-5 mb-1 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Topics</p>
          {categories.map((c) => (
            <Link key={c.key} href={`/${c.key}`} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent">
              <Icon name={c.icon} className="size-4 text-muted-foreground" />
              {c.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
