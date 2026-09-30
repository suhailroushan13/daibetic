'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/site/nav-link';
import { navLinks } from '@/components/site/nav-links';
import { categories } from '@/data/navigation';
import { Icon } from '@/components/site/icon';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button id="menu-toggle" variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-[1.125rem]" strokeWidth={1.8} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="px-5 pt-4 text-base font-semibold">Menu</SheetTitle>
        <SheetDescription className="sr-only">Pages and topics in The Diabetes Guide</SheetDescription>
        <nav id="library-navigation" aria-label="Mobile" className="flex flex-1 flex-col overflow-y-auto px-3 pb-6">
          {navLinks.map((l) => (
            <NavLink key={l.href} href={l.href} onClick={() => setOpen(false)} className="tap flex items-center px-2 py-2.5 text-base">{l.label}</NavLink>
          ))}
          <p className="mt-6 mb-1 px-2 text-sm font-semibold">Topics</p>
          {categories.map((c) => (
            <Link key={c.key} href={`/${c.key}`} onClick={() => setOpen(false)} className="tap flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <Icon name={c.icon} className="size-4" />
              {c.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
