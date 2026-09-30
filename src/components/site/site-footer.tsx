import Link from 'next/link';
import { Logo } from '@/components/site/logo';
import { categories } from '@/data/navigation';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-muted/40">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Diabetes explained in simple words, with real-life examples and honest sources. Made for everyone, from children to grandparents.
          </p>
          <p className="max-w-sm rounded-xl border bg-card p-3 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Not medical advice.</strong> This site teaches ideas. It cannot diagnose you or tell you what to take. Please talk to a doctor or nurse about your own health.
          </p>
        </div>
        <nav aria-label="Topics" className="text-sm">
          <h2 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Topics</h2>
          <ul className="grid grid-cols-1 gap-1.5">
            {categories.slice(0, 7).map((c) => (
              <li key={c.key}><Link className="text-muted-foreground transition-colors hover:text-foreground" href={`/${c.key}`}>{c.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Site" className="text-sm">
          <h2 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Explore</h2>
          <ul className="grid gap-1.5">
            {[['/learn', 'Step-by-step guide'], ['/research', 'All articles'], ['/glossary', 'Word list'], ['/sources', 'Sources'], ['/report', 'Full 18-part report'], ['/about', 'How we work'], ['/rss.xml', 'RSS feed']].map(([href, label]) => (
              <li key={href}><Link className="text-muted-foreground transition-colors hover:text-foreground" href={href}>{label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t">
        <p className="container-page py-5 text-xs text-muted-foreground">
          AI-assisted educational research, source-checked on 30 September 2026. Not independently reviewed by a medical professional.
        </p>
      </div>
    </footer>
  );
}
