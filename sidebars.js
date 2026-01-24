/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    'quickstart',
    'architecture',
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/overview',
        'api/authentication',
        'api/events',
        'api/attendance',
        'api/bingo',
        'api/osrs',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/bingo-plugin',
        'guides/tile-events',
        'guides/permissions',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: true,
      items: [
        'development/local-setup',
        'development/deployment',
        'development/contributing',
      ],
    },
  ],
};

export default sidebars;
