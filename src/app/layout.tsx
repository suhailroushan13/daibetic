import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@fontsource-variable/figtree';
import '@fontsource-variable/inter';
import './globals.css';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { themeScript } from '@/components/site/theme-toggle';

const site = (process.env.SITE_URL || 'https://diabetes.suhailroushan.com').replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: 'The Diabetes Guide: diabetes explained in simple words', template: '%s · The Diabetes Guide' },
  description: 'Diabetes explained in simple words, with real-life examples and honest sources. A friendly guide for children, parents and grandparents.',
  applicationName: 'The Diabetes Guide',
  alternates: { types: { 'application/rss+xml': '/rss.xml' } },
  openGraph: { type: 'website', siteName: 'The Diabetes Guide', locale: 'en_GB' },
  twitter: { card: 'summary' },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }, { media: '(prefers-color-scheme: dark)', color: '#000000' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-svh flex-col">
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
