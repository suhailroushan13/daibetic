import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-16">
      <p className="text-xs font-semibold tracking-wider text-brand-foreground uppercase">404 · A missing page</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-balance sm:text-6xl">Let’s find another way in.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">This page is not here. It may have moved, or the address may have a typo.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild size="lg"><Link href="/search">Search the site</Link></Button>
        <Button asChild size="lg" variant="outline"><Link href="/research">Browse all articles</Link></Button>
      </div>
    </div>
  );
}
