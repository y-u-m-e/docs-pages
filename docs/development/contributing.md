---
id: contributing
title: Contributing Guide
sidebar_position: 3
---

# Contributing Guide

How to contribute to Yume Tools development.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch from `dev`
4. Make your changes
5. Submit a pull request to `dev`

```bash
# Clone
git clone https://github.com/your-username/webpage.git
cd webpage

# Create feature branch
git checkout dev
git checkout -b feature/your-feature
```

---

## Code Style

### TypeScript/JavaScript

- Use TypeScript for new code
- ESLint configuration provided
- Prettier for formatting

```bash
# Lint
npm run lint

# Format
npm run format
```

### React Components

```typescript
// Use functional components with hooks
export function MyComponent({ prop }: MyComponentProps) {
  const [state, setState] = useState<string>('');
  
  return (
    <div className="my-class">
      {/* JSX */}
    </div>
  );
}
```

### CSS/Styling

- Use Tailwind CSS
- shadcn/ui for component library
- Custom CSS in `index.css` when needed

```tsx
// Prefer Tailwind classes
<div className="flex items-center gap-4 p-4 rounded-lg bg-card">

// Use cn() for conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class"
)}>
```

---

## Commit Messages

Follow conventional commits:

```
type(scope): description

feat(auth): add Discord role sync
fix(bingo): correct point calculation
docs(api): update authentication docs
refactor(events): simplify submission handler
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `refactor` | Code refactoring |
| `test` | Adding tests |
| `chore` | Maintenance |

---

## Pull Requests

### PR Checklist

- [ ] Branch created from `dev`
- [ ] Code follows style guide
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] Descriptive PR title and description

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring

## Testing
How was this tested?

## Screenshots (if applicable)
```

### Review Process

1. Submit PR to `dev` branch
2. Automated checks run
3. Code review by maintainer
4. Address feedback
5. Merge when approved

---

## Project Structure

### Frontend Projects

```
emuy-pages/
├── src/
│   ├── components/    # Reusable components
│   │   └── ui/        # shadcn/ui components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilities, API config
│   ├── pages/         # Page components
│   └── main.tsx       # Entry point
├── public/            # Static assets
└── index.html
```

### Worker Projects

```
auth-api/
├── src/
│   └── index.js       # Worker entry point
├── schema.sql         # Database schema
├── wrangler.jsonc     # Cloudflare config
└── package.json
```

---

## Adding Features

### New Page (Frontend)

1. Create component in `src/pages/`
2. Add route in `App.tsx`
3. Add navigation link in `Layout.tsx`
4. Update permissions if needed

### New API Endpoint (Worker)

1. Add handler in `src/index.js`
2. Update schema if needed
3. Document in `docs-pages`
4. Test locally with Wrangler

### New Permission

1. Add to `rbac_permissions` table
2. Add to relevant roles
3. Implement checks in code
4. Document in permissions guide

---

## Testing

### Local Testing

```bash
# Frontend
npm run dev
# Open http://localhost:5173

# Worker
npx wrangler dev
# API at http://localhost:8787
```

### Testing Auth

1. Use Discord Developer Portal test app
2. Configure local redirect URIs
3. Test full OAuth flow

### Testing with Production Data

:::warning
Never test with real user data locally. Use mock data.
:::

---

## Documentation

Documentation lives in `docs-pages/docs/`:

```bash
cd docs-pages
npm run dev
# Opens http://localhost:4000
```

### Adding New Docs

1. Create `.md` file in appropriate folder
2. Add frontmatter with id, title, sidebar_position
3. Add to `sidebars.js` if needed
4. Test locally

---

## Getting Help

- **Discord**: Join our server for questions
- **GitHub Issues**: Bug reports and feature requests
- **Code Review**: Ask for feedback in PRs

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers get started
- Keep discussions technical and on-topic
