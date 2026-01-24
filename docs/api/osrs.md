---
id: osrs
title: OSRS API
sidebar_position: 6
---

# OSRS API

OSRS data integration service that proxies and caches external APIs.

## WOM (Wise Old Man) Proxy

### GET /osrs/wom/player

Get player data from Wise Old Man.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | RSN to look up |

**Response:**

```json
{
  "id": 12345,
  "username": "Zezima",
  "displayName": "Zezima",
  "type": "regular",
  "build": "main",
  "country": "US",
  "status": "active",
  "exp": 4600000000,
  "ehp": 15000,
  "ehb": 2000,
  "ttm": 0,
  "tt200m": 5000,
  "registeredAt": "2020-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z",
  "latestSnapshot": {
    "skills": {
      "overall": { "rank": 1, "level": 2277, "experience": 4600000000 },
      "attack": { "rank": 100, "level": 99, "experience": 200000000 }
    }
  }
}
```

---

### GET /osrs/wom/group

Get group data from Wise Old Man.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | WOM group ID |

**Response:**

```json
{
  "id": 123,
  "name": "Yume",
  "clanChat": "Yume",
  "description": "OSRS clan",
  "memberCount": 150,
  "members": [
    {
      "username": "yume",
      "role": "leader",
      "joinedAt": "2020-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## GroupIron.men Proxy

### GET /osrs/groupiron/group

Get group ironman data.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Group name |

**Response:**

```json
{
  "name": "Iron Friends",
  "members": [
    {
      "username": "Iron1",
      "totalLevel": 2100,
      "totalXp": 500000000
    }
  ],
  "totalLevel": 8400,
  "averageLevel": 2100
}
```

---

## RuneProfile Proxy

### GET /osrs/runeprofile/player

Get player profile from RuneProfile.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | RSN to look up |

**Response:**

```json
{
  "username": "Zezima",
  "combatLevel": 126,
  "skills": {...},
  "quests": {...},
  "achievements": {...}
}
```

---

## Caching

All OSRS API responses are cached to reduce load on external services:

| Endpoint | Cache Duration |
|----------|----------------|
| Player data | 5 minutes |
| Group data | 15 minutes |
| Leaderboards | 1 hour |

To force a fresh fetch, add `?refresh=true` to any request (rate limited).

---

## Automation Rules

:::caution Permission Required
These endpoints require `manage_automation` permission.
:::

### GET /osrs/automation/rules

List automation rules.

**Response:**

```json
{
  "rules": [
    {
      "id": 1,
      "name": "New Member Welcome",
      "trigger": "wom_member_join",
      "action": "discord_message",
      "config": {
        "channel_id": "123456789",
        "message": "Welcome {username} to the clan!"
      },
      "enabled": true
    }
  ]
}
```

---

### POST /osrs/automation/rules

Create automation rule.

**Request Body:**

```json
{
  "name": "Level 99 Announcement",
  "trigger": "wom_skill_99",
  "action": "discord_message",
  "config": {
    "channel_id": "123456789",
    "message": "🎉 {username} just achieved 99 {skill}!"
  },
  "enabled": true
}
```

---

### PUT /osrs/automation/rules/:id

Update automation rule.

---

### DELETE /osrs/automation/rules/:id

Delete automation rule.

---

## Sesh Calendar Integration

### GET /osrs/sesh/events

Get upcoming events from Sesh calendar.

**Response:**

```json
{
  "events": [
    {
      "id": "sesh_123",
      "title": "Corp Beast Mass",
      "description": "Weekly corp mass event",
      "start_time": "2024-01-15T20:00:00.000Z",
      "end_time": "2024-01-15T22:00:00.000Z",
      "location": "World 420, Corp Cave",
      "attendees": 15
    }
  ]
}
```

---

### POST /osrs/sesh/sync

Trigger calendar sync (admin only).

**Response:**

```json
{
  "synced": true,
  "events_updated": 5,
  "last_sync": "2024-01-15T12:00:00.000Z"
}
```
