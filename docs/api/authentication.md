# Authentication API

Central authentication service using Discord OAuth.

## Endpoints

### GET /auth/login

Initiate Discord OAuth flow.

**Query Parameters:**
- `return_url` - URL to redirect after login

**Example:**
```
GET https://api.emuy.gg/auth/login?return_url=https://emuy.gg/dashboard
```

### GET /auth/callback

OAuth callback handler (internal use).

### GET /auth/me

Get current authenticated user.

**Response:**
```json
{
  "authenticated": true,
  "user": {
    "id": "166201366228762624",
    "username": "yume",
    "global_name": "y u m e",
    "avatar": "hash"
  },
  "roles": [
    { "id": "admin", "name": "Admin", "color": "#F44336", "priority": 100 }
  ],
  "permissions": ["view_admin", "manage_users", "..."],
  "is_super_admin": true
}
```

### GET /auth/permissions

Get current user's RBAC permissions only.

**Response:**
```json
{
  "permissions": ["view_dashboard", "view_events", "..."],
  "roles": [{ "id": "member", "name": "Member" }],
  "is_super_admin": false
}
```

### GET /auth/logout

Clear session and logout.

**Query Parameters:**
- `return_url` - URL to redirect after logout

## Inter-Service Validation

### POST /auth/validate

Validate a user token (for other services).

**Headers:**
- `X-Service-Key` - Service authentication key

**Request:**
```json
{
  "token": "jwt-token-here"
}
```

**Response:**
```json
{
  "valid": true,
  "user": { ... },
  "permissions": [...],
  "roles": [...]
}
```

## Admin Endpoints

Requires `view_admin` or `manage_users` permission.

### GET /auth/admin/users

List users with pagination and search.

### POST /auth/admin/users

Update user (ban/unban).

### GET /auth/admin/roles

List all RBAC roles.

### POST /auth/admin/roles

Create new role.

### PUT /auth/admin/roles/:id

Update role.

### DELETE /auth/admin/roles/:id

Delete role.

### POST /auth/admin/user-roles

Assign role to user.

### DELETE /auth/admin/user-roles

Remove role from user.

### GET /auth/admin/activity

View activity logs.

