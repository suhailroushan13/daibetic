import { Logo } from '@/components/site/logo';
import { SearchDialog } from '@/components/site/search-dialog';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { MobileNav } from '@/components/site/mobile-nav';
import { navLinks } from '@/components/site/nav-links';
import { NavLink } from '@/components/site/nav-link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70" id="site-header">
      <div className="container-page flex h-16 items-center gap-4">
        <Logo />
        <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <SearchDialog />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

