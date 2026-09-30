import { Logo } from '@/components/site/logo';
import { SearchDialog } from '@/components/site/search-dialog';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { MobileNav } from '@/components/site/mobile-nav';
import { navLinks } from '@/components/site/nav-links';
import { NavLink } from '@/components/site/nav-link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background" id="site-header">
      <div className="container-page flex h-14 items-center gap-6 md:h-15">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => (
            <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <SearchDialog />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
