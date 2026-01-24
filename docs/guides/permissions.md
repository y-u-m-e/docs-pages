---
id: permissions
title: Permissions Guide
sidebar_position: 3
---

# Permissions & Roles Guide

Understanding the Role-Based Access Control (RBAC) system.

## Overview

Yume Tools uses RBAC to control access to features. Users are assigned roles, and roles have permissions.

```
User → Roles → Permissions → Features
```

---

## Default Roles

### Member
Basic access for clan members.

**Permissions:**
- `view_dashboard` - View main dashboard
- `view_events` - View tile events and bingo
- `view_attendance` - View own attendance records

### Developer
Access to development and staging features.

**Permissions:**
- All Member permissions
- `view_devops` - Access DevOps page
- `view_architecture` - View architecture diagrams
- `deploy_staging` - Deploy to staging environments

### Admin
Administrative access.

**Permissions:**
- All Developer permissions
- `view_admin` - Access admin panel
- `manage_users` - Manage user accounts
- `manage_attendance` - Record/edit attendance
- `manage_events` - Create/manage tile events
- `manage_bingo` - Create/manage bingo events

### Super Admin
Full system access.

**Permissions:**
- All permissions
- `deploy_production` - Deploy to production
- `manage_roles` - Create/edit roles
- Cannot be banned or demoted

---

## Permission Reference

### Dashboard Permissions

| Permission | Description |
|------------|-------------|
| `view_dashboard` | Access main dashboard |
| `view_profile` | View own profile |

### Event Permissions

| Permission | Description |
|------------|-------------|
| `view_events` | View tile events |
| `join_events` | Join tile events |
| `submit_events` | Submit tile completions |
| `manage_events` | Create/edit/delete events |
| `review_submissions` | Review tile submissions |

### Bingo Permissions

| Permission | Description |
|------------|-------------|
| `view_bingo` | View bingo events |
| `join_bingo` | Register for bingo |
| `manage_bingo` | Create/edit bingo events |

### Attendance Permissions

| Permission | Description |
|------------|-------------|
| `view_attendance` | View attendance records |
| `submit_attendance` | Record attendance |
| `manage_attendance` | Edit/delete attendance |
| `export_attendance` | Export attendance data |

### Admin Permissions

| Permission | Description |
|------------|-------------|
| `view_admin` | Access admin panel |
| `manage_users` | Ban/unban users |
| `manage_roles` | Create/edit roles |

### DevOps Permissions

| Permission | Description |
|------------|-------------|
| `view_devops` | Access DevOps dashboard |
| `view_architecture` | View architecture diagrams |
| `deploy_staging` | Deploy to staging |
| `deploy_production` | Deploy to production |

---

## Checking Permissions

### In Code

```javascript
// Check if user has permission
const { user, permissions, isAdmin } = useAuth();

if (permissions.includes('manage_events')) {
  // Show admin controls
}

// Super admin bypass
if (isAdmin) {
  // Has all permissions
}
```

### API Response

The `/auth/me` endpoint returns permissions:

```json
{
  "permissions": ["view_dashboard", "view_events"],
  "roles": [{ "id": "member", "name": "Member" }],
  "is_super_admin": false
}
```

---

## Requesting Access

### For Users

If you need additional permissions:

1. Contact a clan admin on Discord
2. Explain what you need and why
3. Admin will assign appropriate role

### For Developers

To add new permissions:

1. Add to `rbac_permissions` table
2. Update role assignments in admin panel
3. Implement permission checks in code
4. Document in this guide

---

## Role Management (Admins)

### Assigning Roles

1. Go to Admin Panel → Users
2. Find the user
3. Click the ⋮ menu → Manage Roles
4. Select roles to assign
5. Click Save

### Creating Roles

1. Go to Admin Panel → Roles
2. Click "Add Role"
3. Enter name, color, priority
4. Select permissions
5. Click Create

### Role Priority

Higher priority roles override lower ones:

```
Super Admin (100) > Admin (90) > Developer (50) > Member (10)
```

When a user has multiple roles, they get the union of all permissions.

---

## Security Notes

1. **Least Privilege**: Only grant necessary permissions
2. **Audit Logs**: Role changes are logged
3. **Super Admin**: Reserved for trusted individuals only
4. **Regular Review**: Periodically audit role assignments
