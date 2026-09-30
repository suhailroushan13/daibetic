import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL || 'http://localhost:4321';
if (process.env.VERCEL_ENV === 'production' && !process.env.SITE_URL) {
  throw new Error('Set SITE_URL to the public HTTPS origin before a production deployment.');
}
export default defineConfig({
  site,
  trailingSlash: 'never',
  output: 'static',
  integrations: [mdx(), react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  build: { format: 'directory' },
});
