// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Yume Tools Docs",
  tagline: 'OSRS Clan Management Platform Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.emuy.gg',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config (not using, but required)
  organizationName: 'yume',
  projectName: 'docs-pages',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Docs at root instead of /docs
          editUrl: 'https://github.com/yume/docs-pages/tree/main/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Social card image
      image: 'img/social-card.png',
      
      navbar: {
        title: "Yume Tools",
        logo: {
          alt: 'Yume Tools Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://emuy.gg',
            label: 'Dashboard',
            position: 'right',
          },
          {
            href: 'https://github.com/yume/docs-pages',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Quick Start',
                to: '/quickstart',
              },
              {
                label: 'API Reference',
                to: '/api/overview',
              },
              {
                label: 'Architecture',
                to: '/architecture',
              },
            ],
          },
          {
            title: 'Apps',
            items: [
              {
                label: 'Dashboard',
                href: 'https://emuy.gg',
              },
              {
                label: 'Ironforged Events',
                href: 'https://ironforged-events.emuy.gg',
              },
              {
                label: 'Bingo Tracker',
                href: 'https://bingo.emuy.gg',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/yume',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/yume',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Yume Tools. Built with Docusaurus.`,
      },
      
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'sql'],
      },
      
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
