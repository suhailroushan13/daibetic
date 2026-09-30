import { Logo } from '@/components/site/logo';
import { SearchDialog } from '@/components/site/search-dialog';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { MobileNav } from '@/components/site/mobile-nav';
import { navLinks } from '@/components/site/nav-links';
import { NavLink } from '@/components/site/nav-link';
import { LiveVisitors, LiveVisitorsPill } from '@/components/site/live-visitors';
import { OpenSourceLink } from '@/components/site/open-source-link';

/** Phones have no room beside the search button, so the live count and GitHub link sit above the header. */
export function PhoneTopBar() {
  return (
    <div className="border-b bg-tint sm:hidden">
      <div className="container-page flex h-9 items-center justify-center gap-3">
        <LiveVisitors />
        <OpenSourceLink className="h-6 px-2.5" />
      </div>
    </div>
  );
}

// The header row widens to 80rem once the nav shows, leaving room for the pills beside search.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background" id="site-header">
      <div className="container-page flex h-14 items-center gap-6 md:h-15 xl:max-w-[80rem]">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((l) => (
            <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <div className="mr-1 hidden items-center gap-2 sm:flex">
            <LiveVisitorsPill className="h-8" />
            <OpenSourceLink className="h-8 max-lg:w-8 max-lg:justify-center max-lg:px-0" labelClassName="hidden lg:inline" />
          </div>
          <SearchDialog />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
