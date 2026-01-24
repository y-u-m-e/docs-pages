---
id: attendance
title: Attendance API
sidebar_position: 4
---

# Attendance API

Event attendance tracking service for clan events.

## Public Endpoints

### GET /attendance/stats

Get attendance statistics.

**Response:**

```json
{
  "total_records": 15420,
  "unique_events": 523,
  "unique_players": 89,
  "this_month": {
    "records": 342,
    "events": 28
  }
}
```

---

### GET /attendance/leaderboard

Get attendance leaderboard.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `period` | string | `all` | Time period (`week`, `month`, `year`, `all`) |
| `limit` | number | 10 | Number of entries |

**Response:**

```json
{
  "leaderboard": [
    {
      "rank": 1,
      "rsn": "Zezima",
      "total_attendance": 145,
      "events_attended": 52
    }
  ],
  "period": "all"
}
```

---

## Authenticated Endpoints

### GET /attendance

Get attendance records with filters.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 50 | Items per page |
| `rsn` | string | - | Filter by RSN |
| `event` | string | - | Filter by event name |
| `date_from` | string | - | Start date (YYYY-MM-DD) |
| `date_to` | string | - | End date (YYYY-MM-DD) |

**Response:**

```json
{
  "records": [
    {
      "id": 1,
      "rsn": "Zezima",
      "event": "Corp Beast Mass",
      "date": "2024-01-15",
      "points": 1,
      "notes": "MVP",
      "recorded_by": "yume",
      "created_at": "2024-01-15T20:00:00.000Z"
    }
  ],
  "total": 15420,
  "page": 1,
  "limit": 50
}
```

---

### GET /attendance/me

Get current user's attendance records.

**Response:**

```json
{
  "records": [...],
  "total_attendance": 45,
  "events_attended": 32
}
```

---

## Admin Endpoints

:::caution Permission Required
These endpoints require `manage_attendance` permission.
:::

### POST /attendance

Record attendance.

**Request Body:**

```json
{
  "rsn": "Zezima",
  "event": "Corp Beast Mass",
  "date": "2024-01-15",
  "points": 1,
  "notes": "MVP"
}
```

**Response:**

```json
{
  "id": 1,
  "rsn": "Zezima",
  "event": "Corp Beast Mass",
  "date": "2024-01-15",
  "points": 1,
  "notes": "MVP",
  "recorded_by": "yume",
  "created_at": "2024-01-15T20:00:00.000Z"
}
```

---

### POST /attendance/batch

Record multiple attendance entries.

**Request Body:**

```json
{
  "event": "Corp Beast Mass",
  "date": "2024-01-15",
  "entries": [
    { "rsn": "Zezima", "points": 1, "notes": "MVP" },
    { "rsn": "Lynx Titan", "points": 1 },
    { "rsn": "Woox", "points": 1 }
  ]
}
```

**Response:**

```json
{
  "created": 3,
  "failed": 0,
  "records": [...]
}
```

---

### PUT /attendance/:id

Update an attendance record.

**Request Body:**

```json
{
  "rsn": "Zezima",
  "event": "Corp Beast Mass",
  "date": "2024-01-15",
  "points": 2,
  "notes": "MVP - updated"
}
```

---

### DELETE /attendance/:id

Delete an attendance record.

---

### GET /attendance/export

Export attendance data as CSV.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `date_from` | string | - | Start date |
| `date_to` | string | - | End date |
| `event` | string | - | Filter by event |

**Response:** CSV file download

---

### POST /attendance/import

Import attendance data from CSV.

**Request Body (multipart/form-data):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | file | Yes | CSV file |
| `overwrite` | boolean | No | Overwrite existing records |

**CSV Format:**

```csv
rsn,event,date,points,notes
Zezima,Corp Beast Mass,2024-01-15,1,MVP
Lynx Titan,Corp Beast Mass,2024-01-15,1,
```
