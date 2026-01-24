# Architecture

Yume Tools uses a microservices architecture on Cloudflare.

## Overview

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

## Services

### API Gateway (`api.emuy.gg`)
Routes requests to backend services based on path prefix.

### Auth API (`auth.api.emuy.gg`)
- Discord OAuth authentication
- RBAC permission management
- Session management
- Inter-service token validation

### Events API (`events.api.emuy.gg`)
- Tile events management
- Participant progress tracking
- Submission handling with R2 storage
- Optional AI verification

### Attendance API (`attendance.api.emuy.gg`)
- Event attendance records
- Leaderboards
- Batch operations

### OSRS API (`osrs.api.emuy.gg`)
- WOM, GroupIron, RuneProfile proxies
- Response caching
- Automation rules
- Sesh calendar integration

### Bingo API (`bingo.api.emuy.gg`)
- Bingo event management
- Plugin API for achievements
- Leaderboards

## Frontend Apps

| App | Domain | Purpose |
|-----|--------|---------|
| emuy-pages | emuy.gg | Main dashboard |
| ironforged-pages | ironforged-events.emuy.gg | Tile events |
| bingo-pages | bingo.emuy.gg | Bingo tracker |
| docs-pages | docs.emuy.gg | Documentation |

## Databases

Each service has its own D1 database:
- `auth-db`: Users, RBAC, sessions
- `events-db`: Tile events, tiles, participants, submissions
- `attendance-db`: Attendance records
- `osrs-db`: Automation rules, watchlist, cache
- `bingo-db`: Bingo events, tasks, achievements

