---
id: deployment
title: Deployment Guide
sidebar_position: 2
---

# Deployment Guide

How to deploy changes to staging and production.

## Deployment Pipeline

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   dev       │────▶│   staging   │────▶│ production  │
│   branch    │     │   preview   │     │   (main)    │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## Branch Strategy

### `dev` Branch
- Active development
- All commits go here first
- Auto-deploys to staging previews

### `main` Branch
- Production-ready code
- Merged from `dev` after testing
- Auto-deploys to production

:::warning Important
**Never push directly to main.** All changes must go through `dev` first.
:::

---

## Frontend Deployments

Frontends are deployed via Cloudflare Pages with Git integration.

### Automatic Deployment

Push to trigger automatic deployment:

```bash
# Deploy to staging
git checkout dev
git add .
git commit -m "feat: add new feature"
git push origin dev
# → Deploys to preview URL (*.pages.dev)

# Deploy to production (via merge)
git checkout main
git merge dev
git push origin main
# → Deploys to production (emuy.gg)
```

### Preview URLs

Each push to `dev` creates a unique preview:
- `https://abc123.emuy-pages.pages.dev`

Check the GitHub commit or Cloudflare dashboard for the exact URL.

### Manual Deploy via Dashboard

1. Go to [DevOps Page](https://emuy.gg/devops)
2. Find the project in "Deploy" tab
3. Click "Deploy to Production"
4. Confirm the merge

---

## Worker Deployments

Workers are deployed via Wrangler CLI.

### Deploy to Production

```bash
cd auth-api
npx wrangler deploy
```

### Deploy with Specific Environment

```bash
# Production
npx wrangler deploy --env production

# Staging (if configured)
npx wrangler deploy --env staging
```

### Rollback

If something goes wrong:

```bash
# List recent deployments
npx wrangler deployments list

# Rollback to previous
npx wrangler rollback
```

---

## Database Migrations

### D1 Migrations

```bash
# Apply migration to production
npx wrangler d1 execute auth-db --file=migrations/001_add_column.sql

# Apply to local first for testing
npx wrangler d1 execute auth-db --local --file=migrations/001_add_column.sql
```

### Migration Best Practices

1. **Always backup first**
2. **Test locally** before production
3. **Use transactions** where possible
4. **Small, incremental changes** are safer

---

## Environment Configuration

### Frontend (.env)

```bash
# .env.production
VITE_API_URL=https://api.emuy.gg
VITE_AUTH_URL=https://api.emuy.gg/auth
```

### Workers (wrangler.jsonc)

```json
{
  "name": "auth-api",
  "vars": {
    "ENVIRONMENT": "production"
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "auth-db",
      "database_id": "xxx-xxx-xxx"
    }
  ]
}
```

---

## Staging Environments

### Accessing Staging

Staging sites require `view_devops` permission:

1. Visit the `*.pages.dev` preview URL
2. Login with Discord
3. If authorized, you'll see the staging banner

### Staging Auth Flow

Staging uses a modified auth flow:
- JWT passed via URL parameter (not cookie)
- Stored in localStorage
- Works across different domains

---

## Deployment Checklist

Before deploying to production:

- [ ] All changes tested locally
- [ ] Tested on staging preview
- [ ] No console errors
- [ ] Database migrations applied (if any)
- [ ] Environment variables configured
- [ ] Documentation updated (if needed)

---

## Monitoring

### Cloudflare Dashboard

- Workers: Analytics, errors, invocations
- Pages: Build logs, deployment history
- D1: Query analytics, storage usage

### Health Checks

```bash
# Check all services
curl https://api.emuy.gg/health

# Check specific service
curl https://api.emuy.gg/auth/health
```

### Logs

```bash
# Tail worker logs
npx wrangler tail auth-api

# Filter errors only
npx wrangler tail auth-api --status error
```

---

## Rollback Procedures

### Frontend Rollback

1. Go to Cloudflare Pages dashboard
2. Find the project
3. Go to Deployments
4. Click "Rollback" on a previous deployment

Or via Git:

```bash
git revert HEAD
git push origin main
```

### Worker Rollback

```bash
npx wrangler rollback
```

### Database Rollback

For D1, you'll need to run a reverse migration:

```sql
-- migrations/001_add_column_rollback.sql
ALTER TABLE users DROP COLUMN new_column;
```

---

## Emergency Procedures

### Site Down

1. Check Cloudflare status
2. Check worker logs: `npx wrangler tail`
3. Check D1 connectivity
4. Rollback if recent deployment

### Database Issues

1. Check D1 dashboard for errors
2. Verify bindings in wrangler.jsonc
3. Test with simple query
4. Contact Cloudflare support if persistent
