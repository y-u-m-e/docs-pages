---
id: events
title: Events API
sidebar_position: 3
---

# Events API

Tile events (Ironforged Events) management service.

## Public Endpoints

### GET /events

List all events.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | - | Filter by status (`active`, `upcoming`, `completed`) |

**Response:**

```json
{
  "events": [
    {
      "id": "ironforged-2024",
      "name": "Ironforged 2024",
      "description": "Snake-style progression event",
      "status": "active",
      "start_date": "2024-01-01",
      "end_date": "2024-03-31",
      "tile_count": 50,
      "participant_count": 25
    }
  ]
}
```

---

### GET /events/:id

Get event details.

**Response:**

```json
{
  "id": "ironforged-2024",
  "name": "Ironforged 2024",
  "description": "Snake-style progression event",
  "status": "active",
  "start_date": "2024-01-01",
  "end_date": "2024-03-31",
  "rules": "Complete tiles in order...",
  "tiles": [
    {
      "id": 1,
      "position": 1,
      "name": "First Steps",
      "description": "Complete Tutorial Island",
      "points": 10,
      "verification_type": "manual"
    }
  ]
}
```

---

### GET /events/:id/leaderboard

Get event leaderboard.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 10 | Number of entries |

**Response:**

```json
{
  "leaderboard": [
    {
      "rank": 1,
      "user": {
        "id": "166201366228762624",
        "username": "yume",
        "avatar": "hash"
      },
      "tiles_completed": 25,
      "points": 500,
      "last_completion": "2024-01-15T12:00:00.000Z"
    }
  ]
}
```

---

## Authenticated Endpoints

### GET /events/:id/progress

Get current user's progress in an event.

**Response:**

```json
{
  "event_id": "ironforged-2024",
  "user_id": "166201366228762624",
  "current_tile": 15,
  "tiles_completed": 14,
  "points": 280,
  "submissions": [
    {
      "tile_id": 14,
      "status": "approved",
      "submitted_at": "2024-01-14T10:00:00.000Z"
    }
  ]
}
```

---

### POST /events/:id/submit

Submit proof for a tile completion.

**Request Body (multipart/form-data):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tile_id` | number | Yes | The tile being completed |
| `image` | file | Yes | Screenshot proof (PNG, JPG) |
| `notes` | string | No | Additional notes |

**Response:**

```json
{
  "submission_id": "sub_abc123",
  "status": "pending",
  "message": "Submission received. Awaiting review."
}
```

---

## Admin Endpoints

:::caution Permission Required
These endpoints require `manage_events` permission.
:::

### POST /events

Create a new event.

**Request Body:**

```json
{
  "id": "ironforged-2024",
  "name": "Ironforged 2024",
  "description": "Snake-style progression event",
  "start_date": "2024-01-01",
  "end_date": "2024-03-31",
  "rules": "Complete tiles in order..."
}
```

---

### PUT /events/:id

Update an event.

---

### DELETE /events/:id

Delete an event.

:::danger
This permanently deletes the event and all associated data. Cannot be undone.
:::

---

### POST /events/:id/tiles

Add a tile to an event.

**Request Body:**

```json
{
  "position": 15,
  "name": "Boss Slayer",
  "description": "Defeat any boss 10 times",
  "points": 50,
  "verification_type": "manual"
}
```

---

### PUT /events/:id/submissions/:submission_id

Review a submission.

**Request Body:**

```json
{
  "status": "approved",
  "reviewer_notes": "Good screenshot, verified completion."
}
```

**Status options:** `pending`, `approved`, `rejected`
