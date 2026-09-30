import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-16">
      <p className="label text-muted-foreground"><span className="num">404</span> · A missing page</p>
      <h1 className="mt-3 text-h1 text-balance">Let’s find another way in.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">This page is not here. It may have moved, or the address may have a typo.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild><Link href="/search">Search the site</Link></Button>
        <Button asChild variant="outline"><Link href="/research">Browse all articles</Link></Button>
      </div>
    </div>
  );
}
