---
id: quickstart
title: Quick Start
sidebar_position: 2
---

# Quick Start

Get started with Yume Tools in minutes.

## For Users

### 1. Login with Discord

All Yume Tools services use Discord for authentication. Click "Login with Discord" on any of our sites to get started.

```
https://emuy.gg → Click "Login with Discord"
```

### 2. Join Events

- **Tile Events**: Visit [ironforged-events.emuy.gg](https://ironforged-events.emuy.gg)
- **Bingo**: Visit [bingo.emuy.gg](https://bingo.emuy.gg)

### 3. Track Attendance

Access the Cruddy Panel at [emuy.gg/cruddy-panel](https://emuy.gg/cruddy-panel) (requires permissions).

---

## For Developers

### API Access

All APIs are accessible through the gateway:

```bash
# Health check
curl https://api.emuy.gg/health

# Get OSRS player stats (via WOM)
curl https://api.emuy.gg/osrs/wom/player?username=Zezima
```

### Authentication

Protected endpoints require authentication via cookie or Bearer token. For programmatic access, use the service key header for inter-service communication.

```javascript
// Browser - uses cookies automatically
fetch('https://api.emuy.gg/auth/me', {
  credentials: 'include'
});

// Programmatic - use Bearer token
fetch('https://api.emuy.gg/auth/me', {
  headers: {
    'Authorization': 'Bearer your-jwt-token'
  }
});
```

See [Authentication](/api/authentication) for details.

---

## For Bingo Plugin Users

The Bingo Tracker RuneLite plugin automatically tracks your achievements during bingo events.

### Setup Steps

1. **Install the Plugin**
   - Open RuneLite Plugin Hub
   - Search for "Bingo Tracker"
   - Click Install

2. **Register for an Event**
   - Visit [bingo.emuy.gg](https://bingo.emuy.gg)
   - Sign up for an active bingo event
   - Copy your API key (shown once after registration)

3. **Configure the Plugin**
   - Open RuneLite settings
   - Find "Bingo Tracker" in the sidebar
   - Enter your API key

4. **Play Normally**
   - Achievements are tracked automatically
   - Check your progress on the website

:::tip
Your API key is unique to you and the event. Keep it secret!
:::

---

## Next Steps

- Read the [Architecture Overview](/architecture) to understand the system
- Explore the [API Reference](/api/overview) for endpoint details
- Check out the [Guides](/guides/bingo-plugin) for detailed tutorials
