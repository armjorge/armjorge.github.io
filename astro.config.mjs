import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import siteConfig from './src/data/site-config';
import remarkHashtags from './src/plugins/remark-hashtags.js'; // Add this import
import remarkImageResize from './src/plugins/remark-image-resize.js';
import remarkTableViz from './src/plugins/remark-table-viz.js';


// https://astro.build/config
export default defineConfig({
    base: '/armjorge_page/',
    site: siteConfig.website,
    vite: {
        plugins: [tailwindcss()]
    },
    markdown: {
        remarkPlugins: [remarkImageResize, remarkHashtags],
        rehypePlugins: [remarkTableViz],
    },
    integrations: [mdx(), sitemap()]
});
