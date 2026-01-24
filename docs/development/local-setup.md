---
id: local-setup
title: Local Development Setup
sidebar_position: 1
---

# Local Development Setup

Guide to setting up Yume Tools for local development.

## Prerequisites

- Node.js 18+
- npm or pnpm
- Cloudflare account (for Wrangler)
- Discord Developer Application

---

## Repository Structure

```
webpage/
├── emuy-pages/          # Main dashboard (React)
├── ironforged-pages/    # Tile events frontend
├── bingo-pages/         # Bingo frontend
├── docs-pages/          # Documentation (Docusaurus)
├── auth-api/            # Authentication worker
├── events-api/          # Tile events worker
├── attendance-api/      # Attendance worker
├── bingo-api/           # Bingo worker
├── osrs-api/            # OSRS data worker
├── api-gateway/         # Gateway worker
└── packages/
    ├── api-utils/       # Shared utilities
    └── auth-client/     # Auth client library
```

---

## Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/yume/webpage.git
cd webpage

# Install dependencies for a frontend
cd emuy-pages
npm install

# Start development server
npm run dev
```

### 2. Environment Setup

Create `.dev.vars` in each worker directory:

```bash
# auth-api/.dev.vars
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
JWT_SECRET=local_dev_secret_key
SERVICE_KEY=local_service_key
```

### 3. Database Setup

Workers use Cloudflare D1. For local dev:

```bash
# Create local D1 database
cd auth-api
npx wrangler d1 create auth-db --local

# Run migrations
npx wrangler d1 execute auth-db --local --file=schema.sql
```

---

## Frontend Development

### emuy-pages (Main Dashboard)

```bash
cd emuy-pages
npm install
npm run dev
# Opens at http://localhost:5173
```

**API Configuration:**

The frontend uses `src/lib/api-config.ts` to determine API URLs:

```typescript
// Local development points to production APIs
// Or configure local workers
export const API_URLS = {
  AUTH: 'https://api.emuy.gg/auth',
  // Or for local: 'http://localhost:8787/auth'
};
```

### ironforged-pages & bingo-pages

Same process:

```bash
cd ironforged-pages
npm install
npm run dev
```

---

## Worker Development

### Running Workers Locally

```bash
cd auth-api
npm install
npx wrangler dev
# Opens at http://localhost:8787
```

### D1 Database Access

```bash
# List tables
npx wrangler d1 execute auth-db --local --command="SELECT name FROM sqlite_master WHERE type='table'"

# Query data
npx wrangler d1 execute auth-db --local --command="SELECT * FROM users LIMIT 5"

# Run SQL file
npx wrangler d1 execute auth-db --local --file=schema.sql
```

### Environment Variables

Create `.dev.vars` for secrets:

```bash
# .dev.vars (not committed to git)
DISCORD_CLIENT_ID=123456789
DISCORD_CLIENT_SECRET=secret_here
JWT_SECRET=dev_jwt_secret
```

---

## Testing Auth Locally

### 1. Discord OAuth Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create or select your application
3. Add redirect URI: `http://localhost:8787/auth/callback`

### 2. Start Auth Worker

```bash
cd auth-api
npx wrangler dev
```

### 3. Test Login Flow

```bash
# Open in browser
http://localhost:8787/auth/login?return_url=http://localhost:5173
```

---

## Common Issues

### CORS Errors

Local development may hit CORS issues. The workers allow `localhost:5173` by default.

If you get CORS errors:
1. Check `src/cors.ts` in api-utils
2. Ensure your local port is in the allowed origins

### Database Not Found

```bash
# Recreate local database
npx wrangler d1 create auth-db --local
npx wrangler d1 execute auth-db --local --file=schema.sql
```

### Wrangler Auth Issues

```bash
# Re-authenticate with Cloudflare
npx wrangler login
```

### Port Conflicts

Change the port in package.json or use flags:

```bash
# Vite
npm run dev -- --port 3000

# Wrangler
npx wrangler dev --port 8788
```

---

## Shared Packages

### api-utils

Shared utilities for workers:

```typescript
import { jsonResponse, errorResponse } from '@yume/api-utils';
import { validateToken } from '@yume/api-utils/auth';
```

### auth-client

React auth context for frontends:

```typescript
import { AuthProvider, useAuth } from '@yume/auth-client';
```

To develop packages:

```bash
cd packages/api-utils
npm install
npm run build
npm link

# In worker
npm link @yume/api-utils
```

---

## Next Steps

- [Deployment Guide](/development/deployment) - Deploy your changes
- [Contributing Guide](/development/contributing) - Contribution guidelines
