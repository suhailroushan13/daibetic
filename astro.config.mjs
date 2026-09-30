import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL || 'https://diabetes.suhailroushan.com';
export default defineConfig({
  site,
  trailingSlash: 'never',
  output: 'static',
  integrations: [mdx(), react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  build: { format: 'directory' },
});
