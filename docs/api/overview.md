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

## Response Format

All responses are JSON:

```json
{
  "data": { ... },
  "error": null
}
```

Error responses:

```json
{
  "error": "Error message"
}
```

## Authentication

Most endpoints require authentication via Discord OAuth. The auth cookie is shared across all subdomains.

### Cookie Auth
Include credentials in fetch requests:

```javascript
fetch('https://api.emuy.gg/auth/me', {
  credentials: 'include'
})
```

### API Key Auth (Bingo Plugin)
For bingo plugin endpoints, use the `X-Bingo-Key` header:

```bash
curl -H "X-Bingo-Key: your-api-key" https://api.emuy.gg/bingo/config/event-id
```

## Rate Limits

- Public endpoints: 60 requests/minute
- Authenticated endpoints: 120 requests/minute
- Plugin endpoints: 30 requests/minute

## CORS

CORS is enabled for all known domains. For local development, `localhost:3000` and `localhost:5173` are allowed.

