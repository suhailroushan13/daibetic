'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const next: Theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    const apply = () => {
      document.documentElement.dataset.theme = next;
      flushSync(() => setTheme(next));
    };
    try { localStorage.setItem('atlas-theme', next); } catch { /* storage unavailable */ }

    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply();
      return;
    }
    // Circular reveal from the button, as in the design system's theme toggler.
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 400, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
      );
    });
  }

  return (
    <Button id="theme-toggle" variant="ghost" size="icon" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      {theme === 'dark' ? <Sun className="size-[1.125rem]" strokeWidth={1.8} /> : <Moon className="size-[1.125rem]" strokeWidth={1.8} />}
    </Button>
  );
}

/** Runs before first paint so the page never flashes the wrong theme. */
export const themeScript = `(function(){try{var t=localStorage.getItem('atlas-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;
