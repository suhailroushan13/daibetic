'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CircleHelp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Quiz({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <aside className="my-8 rounded-2xl border border-brand/25 bg-brand-soft/60 p-5">
      <p className="mb-2 flex items-center gap-2 text-[0.8125rem] font-semibold tracking-wide text-brand-foreground uppercase"><CircleHelp className="size-4" aria-hidden="true" /> Quick check</p>
      <p className="font-medium">{question}</p>
      <Button variant={open ? 'secondary' : 'default'} size="sm" className="mt-3" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? 'Hide the answer' : 'Show the answer'}
      </Button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <span className="mt-3 block rounded-xl bg-background/80 p-3 text-[0.95rem] leading-relaxed">{answer}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </aside>
  );
}
