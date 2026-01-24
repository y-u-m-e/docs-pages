---
id: authentication
title: Authentication API
sidebar_position: 2
---

# Authentication API

Central authentication service using Discord OAuth.

## Public Endpoints

### GET /auth/login

Initiate Discord OAuth flow.

**Query Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `return_url` | No | URL to redirect after successful login |

**Example:**

```bash
curl "https://api.emuy.gg/auth/login?return_url=https://emuy.gg/dashboard"
```

Redirects to Discord authorization page.

---

### GET /auth/callback

OAuth callback handler. Called by Discord after authorization.

:::note
This endpoint is for internal use only. Do not call directly.
:::

---

### GET /auth/me

Get current authenticated user information.

**Headers:**
| Header | Required | Description |
|--------|----------|-------------|
| Cookie: `auth_token` | Yes* | JWT token (auto-included in browser) |
| Authorization | Yes* | `Bearer <jwt-token>` (alternative) |

*One of the two is required.

**Response:**

```json
{
  "authenticated": true,
  "user": {
    "id": "166201366228762624",
    "username": "yume",
    "global_name": "y u m e",
    "avatar": "abc123hash",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  "roles": [
    { 
      "id": "admin", 
      "name": "Admin", 
      "color": "#F44336", 
      "priority": 100 
    }
  ],
  "permissions": [
    "view_admin", 
    "manage_users", 
    "view_devops"
  ],
  "is_super_admin": true
}
```

**Unauthenticated Response:**

```json
{
  "authenticated": false
}
```

---

### GET /auth/permissions

Get only the current user's RBAC permissions (lighter response).

**Response:**

```json
{
  "permissions": ["view_dashboard", "view_events"],
  "roles": [{ "id": "member", "name": "Member" }],
  "is_super_admin": false
}
```

---

### GET /auth/logout

Clear session and logout.

**Query Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `return_url` | No | URL to redirect after logout |

**Example:**

```bash
curl "https://api.emuy.gg/auth/logout?return_url=https://emuy.gg"
```

---

## Inter-Service Endpoints

### POST /auth/validate

Validate a user token (for other microservices).

**Headers:**
| Header | Required | Description |
|--------|----------|-------------|
| `X-Service-Key` | Yes | Service authentication key |

**Request Body:**

```json
{
  "token": "jwt-token-here"
}
```

**Response:**

```json
{
  "valid": true,
  "user": {
    "id": "166201366228762624",
    "username": "yume"
  },
  "permissions": ["view_events", "submit_attendance"],
  "roles": [{ "id": "member", "name": "Member" }]
}
```

---

## Admin Endpoints

:::caution Permission Required
These endpoints require `view_admin` or `manage_users` permission.
:::

### GET /auth/admin/users

List users with pagination and search.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page |
| `search` | string | - | Search by username |

**Response:**

```json
{
  "users": [
    {
      "id": "166201366228762624",
      "username": "yume",
      "global_name": "y u m e",
      "roles": [{ "id": "admin", "name": "Admin" }],
      "is_banned": false,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 20
}
```

---

### POST /auth/admin/users

Update user (ban/unban).

**Request Body:**

```json
{
  "user_id": "166201366228762624",
  "action": "ban",
  "reason": "Spam"
}
```

---

### GET /auth/admin/roles

List all RBAC roles.

**Response:**

```json
{
  "roles": [
    {
      "id": "admin",
      "name": "Admin",
      "color": "#F44336",
      "priority": 100,
      "permissions": ["view_admin", "manage_users"]
    },
    {
      "id": "member",
      "name": "Member",
      "color": "#4CAF50",
      "priority": 10,
      "permissions": ["view_dashboard"]
    }
  ]
}
```

---

### POST /auth/admin/roles

Create new role.

**Request Body:**

```json
{
  "id": "moderator",
  "name": "Moderator",
  "color": "#2196F3",
  "priority": 50,
  "permissions": ["view_admin", "manage_attendance"]
}
```

---

### PUT /auth/admin/roles/:id

Update existing role.

**Request Body:**

```json
{
  "name": "Senior Moderator",
  "color": "#1976D2",
  "priority": 60,
  "permissions": ["view_admin", "manage_attendance", "manage_events"]
}
```

---

### DELETE /auth/admin/roles/:id

Delete a role.

:::warning
Deleting a role removes it from all users. This action cannot be undone.
:::

---

### POST /auth/admin/user-roles

Assign role to user.

**Request Body:**

```json
{
  "user_id": "166201366228762624",
  "role_id": "moderator"
}
```

---

### DELETE /auth/admin/user-roles

Remove role from user.

**Request Body:**

```json
{
  "user_id": "166201366228762624",
  "role_id": "moderator"
}
```

---

### GET /auth/admin/activity

View activity logs.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 50 | Items per page |
| `user_id` | string | - | Filter by user |
| `action` | string | - | Filter by action type |

**Response:**

```json
{
  "logs": [
    {
      "id": 1,
      "user_id": "166201366228762624",
      "action": "login",
      "details": "Logged in via Discord OAuth",
      "ip_address": "192.168.1.1",
      "created_at": "2024-01-15T12:00:00.000Z"
    }
  ],
  "total": 500,
  "page": 1
}
```
