import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import siteConfig from './src/data/site-config';
import remarkHashtags from './src/plugins/remark-hashtags.js'; // Add this import
import remarkTableViz from './src/plugins/remark-table-viz.js';


// https://astro.build/config
export default defineConfig({
    site: siteConfig.website,
    vite: {
        plugins: [tailwindcss()]
    },
    markdown: {
        remarkPlugins: [remarkHashtags],
        rehypePlugins: [remarkTableViz],
    },
    integrations: [mdx(), sitemap()]
});
