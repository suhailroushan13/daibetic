'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SearchPanel } from '@/components/site/search-panel';

export function SearchDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Button variant="outline" size="sm" className="hidden h-9 w-56 justify-start gap-2 text-muted-foreground md:inline-flex" onClick={() => setOpen(true)} aria-label="Search the library">
        <Search />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="rounded border bg-muted px-1.5 py-0.5 font-sans text-[0.6875rem]">Ctrl K</kbd>
      </Button>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)} aria-label="Search the library">
        <Search />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0" showClose={false} aria-describedby="search-help">
          <DialogTitle className="sr-only">Search the library</DialogTitle>
          <DialogDescription id="search-help" className="sr-only">Type a word or a question. Use the arrow keys to move through results.</DialogDescription>
          <SearchPanel autoFocus compact onNavigate={() => setOpen(false)} inputId="palette-query" />
        </DialogContent>
      </Dialog>
    </>
  );
}
