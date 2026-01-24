# Yume Tools Documentation

Documentation site for Yume Tools, built with [Docusaurus](https://docusaurus.io/).

## Live Site

- **Production**: [docs.emuy.gg](https://docs.emuy.gg)
- **Staging**: Preview deployments on `*.pages.dev`

## Development

### Prerequisites

- Node.js 18+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:4000
```

### Build

```bash
npm run build
```

This generates static content into the `build` directory.

### Deploy

```bash
# Deploy to Cloudflare Pages
npm run deploy
```

## Project Structure

```
docs-pages/
├── docs/                  # Documentation content
│   ├── intro.md           # Home page
│   ├── quickstart.md      # Getting started
│   ├── architecture.md    # System architecture
│   ├── api/               # API reference
│   ├── guides/            # User guides
│   └── development/       # Developer docs
├── src/
│   └── css/
│       └── custom.css     # Custom styling
├── static/
│   └── img/               # Images and assets
├── docusaurus.config.js   # Docusaurus configuration
├── sidebars.js            # Sidebar navigation
└── package.json
```

## Adding Content

### New Documentation Page

1. Create a `.md` file in the appropriate `docs/` subdirectory
2. Add frontmatter:

```yaml
---
id: my-page
title: My Page Title
sidebar_position: 5
---
```

3. Add to `sidebars.js` if needed
4. Write your content in Markdown

### Supported Features

- Markdown with MDX
- Code blocks with syntax highlighting
- Admonitions (tip, warning, danger, etc.)
- Tabs
- Images and diagrams
- Math equations

## Contributing

1. Create a branch from `dev`
2. Make your changes
3. Test locally with `npm run dev`
4. Submit a PR to `dev` branch

**Never push directly to main.**
