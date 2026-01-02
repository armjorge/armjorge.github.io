import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import type { SiteConfig } from '../types';

type LangKey = 'en' | 'es' | 'fr';

const baseConfig: SiteConfig = {
    website: 'https://armjorge.github.io',
    avatar: {
        src: avatar,
        alt: 'Jorge Armando Cuaxospa Jiménez'
    },
    title: 'J. A. Cuaxospa Jiménez - Business Intelligence',
    subtitle: 'Minimal Astro.js theme',
    description: 'Astro.js and Tailwind CSS theme for blog and portfolio by justgoodui.com',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        { text: 'Home', href: '/' },
        { text: 'Projects', href: '/projects' },
        //{ text: 'Blog', href: '/blog' },
        //{ text: 'Tags', href: '/tags' }
    ],
    footerNavLinks: [
        { text: 'About', href: '/about' },
        { text: 'Contact', href: '/contact' },
        { text: 'Terms', href: '/terms' }
    ],
    socialLinks: [
        { text: 'LinkedIn', href: 'https://mx.linkedin.com/in/jorge-armando-cuaxospa' },
        { text: 'Email', href: 'mailto:armjorge@gmail.com' }

    ],
    hero: {
        title: 'Hi There & Welcome to My Corner of the Web!',
        text: "I'm **Ethan Donovan**, a web developer at Amazing Studio, dedicated to the realms of collaboration and artificial intelligence.\nMy approach involves embracing intuition, conducting just enough research, and leveraging aesthetics as a catalyst for exceptional products.\nI have a profound appreciation for top-notch software, visual design, and the principles of product-led growth.\n\nFeel free to explore some of my coding endeavors on [GitHub](https://github.com/JustGoodUI/dante-astro-theme) or follow me on [Twitter/X](https://twitter.com/justgoodui).",
        image: {
            src: hero,
            alt: 'A person sitting at a desk in front of a computer'
        },
        actions: [{ text: 'Get in Touch', href: '/contact' }]
    },
    subscribe: {
        enabled: true,
        title: 'Subscribe to Dante Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        form: {
            action: '#'
        }
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

const siteConfigs: Record<LangKey, SiteConfig> = {
    en: baseConfig,
    es: {
        ...baseConfig,
        title: 'J. A. Cuaxospa Jiménez - Inteligencia de Negocios',
        headerNavLinks: [
            { text: 'Inicio', href: '/about' },
            { text: 'Proyectos', href: '/projects' },
            //{ text: 'Blog', href: '/blog' },
            // { text: 'Etiquetas', href: '/tags' }
        ],
        footerNavLinks: [
            { text: 'Acerca de', href: '/about' },
            { text: 'Contacto', href: '/contact' },
            { text: 'Términos', href: '/terms' }
        ]
    },
    fr: {
        ...baseConfig,
        title: 'J. A. Cuaxospa Jiménez - Intelligence d\'Affaires',
        headerNavLinks: [
            { text: 'Accueil', href: '/about' },
            { text: 'Projets', href: '/projects' },
            //{ text: 'Blog', href: '/blog' },
            //{ text: 'Tags', href: '/tags' }
        ],
        footerNavLinks: [
            { text: 'À propos', href: '/about' },
            { text: 'Contact', href: '/contact' },
            { text: 'Conditions', href: '/terms' }
        ]
    }
};

export const getSiteConfig = (lang: string = 'en'): SiteConfig => siteConfigs[(lang as LangKey)] ?? siteConfigs.en;

// Keep default export for existing imports (defaults to English)
export default siteConfigs.en;
