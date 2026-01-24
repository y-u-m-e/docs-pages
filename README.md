# Docs Pages

Documentation site for Yume Tools at docs.emuy.gg.

## Built With

- [Docsify](https://docsify.js.org/) - Documentation site generator

## Development

```bash
npm install
npm run dev
```

Visit http://localhost:4000

## Deploy

```bash
npm run deploy
```

## Adding Documentation

1. Create a Markdown file in `docs/`
2. Add it to `docs/_sidebar.md`
3. Deploy

## Structure

```
docs/
├── index.html      # Docsify config
├── _sidebar.md     # Navigation
├── _coverpage.md   # Cover page
├── README.md       # Home page
├── quickstart.md   # Getting started
├── architecture.md # System overview
├── api/            # API reference
│   ├── overview.md
│   ├── authentication.md
│   └── ...
├── apps/           # Frontend app docs
├── guides/         # How-to guides
└── dev/            # Developer docs
```

