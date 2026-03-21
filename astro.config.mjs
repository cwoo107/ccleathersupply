import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [tailwind()],
  adapter: netlify(),
  output: 'hybrid',
  site: 'https://ccleathersupply.com',
});