---
id: architecture
title: Architecture
sidebar_position: 3
---

# Architecture

Yume Tools uses a microservices architecture deployed on Cloudflare's edge network.

## System Overview

```
                    ┌─────────────────────────────────────────┐
                    │              Clients                     │
                    │  (Web Apps, Discord Bot, RuneLite Plugin)│
                    └───────────────────┬─────────────────────┘
                                        │
                    ┌───────────────────▼─────────────────────┐
                    │           API Gateway                    │
                    │         (api.emuy.gg)                    │
                    └───────────────────┬─────────────────────┘
                                        │
         ┌──────────┬──────────┬────────┴───────┬──────────┐
         ▼          ▼          ▼                ▼          ▼
    ┌─────────┐┌─────────┐┌─────────┐    ┌─────────┐┌─────────┐
    │auth-api ││events-  ││attend-  │    │osrs-api ││bingo-api│
    │         ││api      ││ance-api │    │         ││         │
    └────┬────┘└────┬────┘└────┬────┘    └────┬────┘└────┬────┘
         │          │          │              │          │
         ▼          ▼          ▼              ▼          ▼
    ┌─────────┐┌─────────┐┌─────────┐    ┌─────────┐┌─────────┐
    │auth-db  ││events-db││attend-  │    │osrs-db  ││bingo-db │
    │(D1)     ││(D1)     ││ance-db  │    │(D1)     ││(D1)     │
    └─────────┘└────┬────┘└─────────┘    └─────────┘└─────────┘
                    │
                    ▼
              ┌─────────┐
              │R2 Bucket│
              │(images) │
              └─────────┘
```

## Technology Stack

| Component | Technology |
|-----------|------------|
| Edge Runtime | Cloudflare Workers |
| Database | Cloudflare D1 (SQLite) |
| Object Storage | Cloudflare R2 |
| Frontend Hosting | Cloudflare Pages |
| Authentication | Discord OAuth 2.0 |
| Frontend Framework | React + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |

---

## Services

### API Gateway (`api.emuy.gg`)

Routes requests to backend services based on path prefix. Handles:
- Request routing to microservices
- CORS preflight responses
- Health check aggregation

### Auth API (`auth.api.emuy.gg`)

Central authentication and authorization service:
- Discord OAuth authentication flow
- JWT token generation and validation
- RBAC (Role-Based Access Control) management
- Session management with secure cookies
- Inter-service token validation

### Events API (`events.api.emuy.gg`)

Tile events (Ironforged) management:
- Event CRUD operations
- Tile and progression management
- Participant tracking
- Submission handling with R2 image storage
- Optional AI verification for submissions

### Attendance API (`attendance.api.emuy.gg`)

Event attendance tracking:
- Attendance record management
- Leaderboards and statistics
- Batch import/export operations
- Event-based filtering

### OSRS API (`osrs.api.emuy.gg`)

OSRS data integration and caching:
- Wise Old Man (WOM) API proxy
- GroupIron.men API proxy
- RuneProfile API proxy
- Response caching to reduce external calls
- Automation rules engine
- Sesh calendar integration

### Bingo API (`bingo.api.emuy.gg`)

Bingo competition management:
- Bingo event CRUD operations
- Task and board configuration
- RuneLite plugin API (achievement submission)
- Real-time leaderboards
- API key authentication for plugins

---

## Frontend Applications

| App | Domain | Purpose |
|-----|--------|---------|
| emuy-pages | `emuy.gg` | Main dashboard, admin panel |
| ironforged-pages | `ironforged-events.emuy.gg` | Tile events participation |
| bingo-pages | `bingo.emuy.gg` | Bingo tracker and leaderboards |
| docs-pages | `docs.emuy.gg` | This documentation site |

---

## Databases

Each service has its own isolated D1 database:

| Database | Service | Contents |
|----------|---------|----------|
| `auth-db` | auth-api | Users, roles, permissions, sessions, activity logs |
| `events-db` | events-api | Tile events, tiles, participants, submissions |
| `attendance-db` | attendance-api | Attendance records, event metadata |
| `osrs-db` | osrs-api | Automation rules, watchlist, API cache |
| `bingo-db` | bingo-api | Bingo events, tasks, achievements, API keys |

---

## Deployment Pipeline

```
┌─────────┐    ┌─────────┐    ┌─────────────┐    ┌─────────────┐
│  Code   │───▶│  Push   │───▶│  Cloudflare │───▶│  Preview/   │
│ Changes │    │  to Git │    │  Pages CI   │    │  Production │
└─────────┘    └─────────┘    └─────────────┘    └─────────────┘
                    │
                    ├── dev branch  ───▶ Preview deployment (staging)
                    │
                    └── main branch ───▶ Production deployment
```

### Staging Workflow

1. Push changes to `dev` branch
2. Cloudflare Pages automatically deploys a preview
3. Test at `*.pages.dev` URL
4. Merge `dev` → `main` to deploy to production

---

## Security

### Authentication Flow

```
┌────────┐  1. Login    ┌──────────┐  2. OAuth   ┌─────────┐
│ Client │─────────────▶│ auth-api │────────────▶│ Discord │
└────────┘              └──────────┘             └─────────┘
     ▲                       │
     │                       │ 3. JWT + Cookie
     │                       ▼
     └───────────────────────┘
```

### Inter-Service Auth

Services validate user tokens via the auth-api:

```javascript
// Service calls auth-api to validate user
const validation = await fetch('https://api.emuy.gg/auth/validate', {
  method: 'POST',
  headers: {
    'X-Service-Key': env.SERVICE_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ token: userJWT })
});
```
