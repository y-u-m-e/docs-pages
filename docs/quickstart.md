# Quick Start

Get started with Yume Tools in minutes.

## For Users

### 1. Login with Discord

All Yume Tools services use Discord for authentication. Click "Login with Discord" on any of our sites to get started.

### 2. Join Events

- **Tile Events**: Visit [ironforged-events.emuy.gg](https://ironforged-events.emuy.gg)
- **Bingo**: Visit [bingo.emuy.gg](https://bingo.emuy.gg)

### 3. Track Attendance

Access the Cruddy Panel at [emuy.gg/cruddy-panel](https://emuy.gg/cruddy-panel) (requires permissions).

## For Developers

### API Access

All APIs are accessible through the gateway:

```bash
# Health check
curl https://api.emuy.gg/health

# Get OSRS player stats
curl https://api.emuy.gg/osrs/wom/player?username=Zezima
```

### Authentication

Protected endpoints require authentication via cookie. For programmatic access, use the service key header for inter-service communication.

See [Authentication](/api/authentication) for details.

## For Bingo Plugin Users

1. Install the "Bingo Tracker" plugin from RuneLite Plugin Hub
2. Register for a bingo event at [bingo.emuy.gg](https://bingo.emuy.gg)
3. Copy your API key (shown once after registration)
4. Enter the API key in the plugin settings
5. Play normally - achievements are tracked automatically!

