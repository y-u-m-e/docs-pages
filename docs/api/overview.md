---
id: overview
title: API Overview
sidebar_position: 1
---

# API Overview

All APIs are accessible via the gateway at `api.emuy.gg` or directly through subdomains.

## Base URLs

| Service | Gateway URL | Direct URL |
|---------|-------------|------------|
| Auth | `api.emuy.gg/auth/*` | `auth.api.emuy.gg/*` |
| Events | `api.emuy.gg/events/*` | `events.api.emuy.gg/*` |
| Attendance | `api.emuy.gg/attendance/*` | `attendance.api.emuy.gg/*` |
| OSRS | `api.emuy.gg/osrs/*` | `osrs.api.emuy.gg/*` |
| Bingo | `api.emuy.gg/bingo/*` | `bingo.api.emuy.gg/*` |

:::tip
Use the gateway URL (`api.emuy.gg`) for all requests. The gateway handles routing, CORS, and provides a unified entry point.
:::

---

## Response Format

All responses are JSON with a consistent structure.

### Success Response

```json
{
  "data": { ... },
  "error": null
}
```

### Error Response

```json
{
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request - Invalid parameters |
| `401` | Unauthorized - Authentication required |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found |
| `429` | Rate Limited |
| `500` | Internal Server Error |

---

## Authentication

Most endpoints require authentication via Discord OAuth. The auth cookie is shared across all `*.emuy.gg` subdomains.

### Cookie Auth (Browser)

Include credentials in fetch requests:

```javascript
fetch('https://api.emuy.gg/auth/me', {
  credentials: 'include'
})
```

### Bearer Token (Programmatic)

For staging environments or programmatic access:

```javascript
fetch('https://api.emuy.gg/auth/me', {
  headers: {
    'Authorization': 'Bearer your-jwt-token'
  }
})
```

### API Key Auth (Bingo Plugin)

For bingo plugin endpoints, use the `X-Bingo-Key` header:

```bash
curl -H "X-Bingo-Key: your-api-key" \
  https://api.emuy.gg/bingo/config/event-id
```

---

## Rate Limits

| Endpoint Type | Limit |
|---------------|-------|
| Public endpoints | 60 requests/minute |
| Authenticated endpoints | 120 requests/minute |
| Plugin endpoints | 30 requests/minute |

When rate limited, you'll receive a `429` response:

```json
{
  "error": "Rate limit exceeded. Try again in 60 seconds."
}
```

---

## CORS

CORS is enabled for all known domains:

- `*.emuy.gg`
- `*.pages.dev` (Cloudflare Pages previews)
- `localhost:3000`
- `localhost:5173`

For other origins, CORS requests will be rejected.

---

## Health Checks

All services expose a health endpoint:

```bash
# Gateway health (aggregates all services)
curl https://api.emuy.gg/health

# Individual service health
curl https://api.emuy.gg/auth/health
curl https://api.emuy.gg/events/health
curl https://api.emuy.gg/attendance/health
curl https://api.emuy.gg/osrs/health
curl https://api.emuy.gg/bingo/health
```

Response:

```json
{
  "status": "healthy",
  "service": "auth-api",
  "timestamp": "2024-01-15T12:00:00.000Z"
}
```
