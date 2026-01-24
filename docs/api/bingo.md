---
id: bingo
title: Bingo API
sidebar_position: 5
---

# Bingo API

Bingo competition management with RuneLite plugin integration.

## Public Endpoints

### GET /bingo/events

List all bingo events.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | - | Filter by status (`active`, `upcoming`, `completed`) |

**Response:**

```json
{
  "events": [
    {
      "id": "winter-bingo-2024",
      "name": "Winter Bingo 2024",
      "description": "Compete to complete bingo tasks!",
      "status": "active",
      "start_date": "2024-01-01T00:00:00.000Z",
      "end_date": "2024-01-31T23:59:59.000Z",
      "participant_count": 45,
      "board_size": 5
    }
  ]
}
```

---

### GET /bingo/events/:id

Get event details and board.

**Response:**

```json
{
  "id": "winter-bingo-2024",
  "name": "Winter Bingo 2024",
  "status": "active",
  "board": {
    "size": 5,
    "tasks": [
      {
        "position": 0,
        "name": "Kill 100 Goblins",
        "description": "Defeat 100 goblins",
        "points": 10,
        "trigger": "npc_kill:goblin:100"
      }
    ]
  }
}
```

---

### GET /bingo/events/:id/leaderboard

Get event leaderboard.

**Response:**

```json
{
  "leaderboard": [
    {
      "rank": 1,
      "user": {
        "id": "166201366228762624",
        "username": "yume"
      },
      "rsn": "yumes iron",
      "tasks_completed": 15,
      "bingos": 2,
      "points": 350
    }
  ]
}
```

---

## Authenticated Endpoints

### POST /bingo/events/:id/register

Register for a bingo event.

**Request Body:**

```json
{
  "rsn": "yumes iron"
}
```

**Response:**

```json
{
  "participant_id": "part_abc123",
  "api_key": "bk_xyz789...",
  "message": "Successfully registered. Save your API key - it won't be shown again!"
}
```

:::warning Important
The `api_key` is only shown once during registration. Save it immediately for the RuneLite plugin.
:::

---

### GET /bingo/events/:id/progress

Get current user's progress.

**Response:**

```json
{
  "participant_id": "part_abc123",
  "rsn": "yumes iron",
  "tasks_completed": [0, 4, 12, 24],
  "bingos": 1,
  "points": 150,
  "achievements": [
    {
      "task_position": 0,
      "completed_at": "2024-01-05T14:30:00.000Z",
      "proof": "automatic"
    }
  ]
}
```

---

## Plugin Endpoints

These endpoints are used by the RuneLite Bingo Tracker plugin.

### GET /bingo/config/:event_id

Get plugin configuration for an event.

**Headers:**
| Header | Required | Description |
|--------|----------|-------------|
| `X-Bingo-Key` | Yes | Your API key from registration |

**Response:**

```json
{
  "event_id": "winter-bingo-2024",
  "rsn": "yumes iron",
  "tasks": [
    {
      "position": 0,
      "trigger": "npc_kill:goblin:100",
      "completed": false
    }
  ],
  "poll_interval": 30000
}
```

---

### POST /bingo/submit

Submit an achievement (from plugin).

**Headers:**
| Header | Required | Description |
|--------|----------|-------------|
| `X-Bingo-Key` | Yes | Your API key |

**Request Body:**

```json
{
  "event_id": "winter-bingo-2024",
  "task_position": 0,
  "trigger_data": {
    "type": "npc_kill",
    "target": "goblin",
    "count": 100
  }
}
```

**Response:**

```json
{
  "success": true,
  "task_completed": true,
  "bingo_achieved": false,
  "points_earned": 10,
  "total_points": 160
}
```

---

## Admin Endpoints

:::caution Permission Required
These endpoints require `manage_bingo` permission.
:::

### POST /bingo/events

Create a new bingo event.

**Request Body:**

```json
{
  "id": "winter-bingo-2024",
  "name": "Winter Bingo 2024",
  "description": "Compete to complete bingo tasks!",
  "start_date": "2024-01-01T00:00:00.000Z",
  "end_date": "2024-01-31T23:59:59.000Z",
  "board_size": 5,
  "tasks": [
    {
      "position": 0,
      "name": "Kill 100 Goblins",
      "description": "Defeat 100 goblins",
      "points": 10,
      "trigger": "npc_kill:goblin:100"
    }
  ]
}
```

---

### PUT /bingo/events/:id

Update an event.

---

### DELETE /bingo/events/:id

Delete an event.

---

### GET /bingo/events/:id/participants

List event participants.

**Response:**

```json
{
  "participants": [
    {
      "id": "part_abc123",
      "user_id": "166201366228762624",
      "rsn": "yumes iron",
      "registered_at": "2024-01-01T10:00:00.000Z",
      "tasks_completed": 15
    }
  ]
}
```

---

## Trigger Types

The plugin supports various automatic triggers:

| Trigger | Format | Description |
|---------|--------|-------------|
| `npc_kill` | `npc_kill:name:count` | Kill NPCs |
| `item_obtain` | `item_obtain:item_id:count` | Obtain items |
| `skill_level` | `skill_level:skill:level` | Reach skill level |
| `quest_complete` | `quest_complete:quest_id` | Complete quest |
| `achievement` | `achievement:diary:tier` | Complete achievement diary |
| `manual` | `manual` | Requires manual verification |

**Examples:**

```
npc_kill:zulrah:50         # Kill Zulrah 50 times
item_obtain:12073:1        # Obtain 1 Abyssal whip
skill_level:slayer:99      # Reach 99 Slayer
quest_complete:dragon_slayer_2
achievement:western:elite  # Complete Western Elite diary
```
