import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://your-site.netlify.app', // TODO: replace with actual domain
  adapter: netlify(),
  integrations: [sitemap(), preact()],
});
