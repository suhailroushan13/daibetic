'use client';

import { useState } from 'react';
import { CircleHelp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Quiz({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <aside className="my-8 rounded-lg border bg-card p-5">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand"><CircleHelp className="size-4" aria-hidden="true" /> Quick check</p>
      <p className="font-medium text-foreground">{question}</p>
      <Button variant="outline" size="sm" className="mt-3" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? 'Hide the answer' : 'Show the answer'}
      </Button>
      {open && <p className="mt-3 border-l-2 border-brand pl-3.5 leading-relaxed text-foreground">{answer}</p>}
    </aside>
  );
}
