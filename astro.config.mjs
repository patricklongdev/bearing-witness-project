import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bearingwitnessproject.ca',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/admin/') })],
});
