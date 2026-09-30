'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem('atlas-theme', next); } catch { /* storage unavailable */ }
  }

  return (
    <Button id="theme-toggle" variant="ghost" size="icon" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}

/** Runs before first paint so the page never flashes the wrong theme. */
export const themeScript = `(function(){try{var t=localStorage.getItem('atlas-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;
