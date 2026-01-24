---
id: bingo-plugin
title: Bingo Plugin Guide
sidebar_position: 1
---

# Bingo Tracker Plugin Guide

Complete guide to using the RuneLite Bingo Tracker plugin for automatic achievement tracking.

## Installation

### Step 1: Install from Plugin Hub

1. Open RuneLite
2. Click the wrench icon to open Configuration
3. Click "Plugin Hub" at the bottom
4. Search for "Bingo Tracker"
5. Click Install

![Plugin Hub](/img/guides/plugin-hub.png)

### Step 2: Register for an Event

1. Visit [bingo.emuy.gg](https://bingo.emuy.gg)
2. Login with Discord
3. Find an active bingo event
4. Click "Register"
5. Enter your in-game RSN
6. **Save your API key immediately!**

:::warning Save Your API Key
The API key is only shown once during registration. If you lose it, you'll need to contact an admin to regenerate it.
:::

### Step 3: Configure the Plugin

1. Open RuneLite settings
2. Find "Bingo Tracker" in the sidebar
3. Enter your API key
4. Verify the event ID matches your event

![Plugin Config](/img/guides/plugin-config.png)

---

## How It Works

The plugin automatically detects when you complete bingo tasks and submits them to the server.

### Automatic Detection

The plugin monitors game events and matches them against your bingo board tasks:

| Task Type | Detection Method |
|-----------|------------------|
| NPC Kills | Game messages, kill count |
| Item Drops | Inventory changes |
| Skill Levels | XP gains, level ups |
| Quest Completions | Quest state changes |
| Achievement Diaries | Diary completion messages |

### Submission Process

```
1. You complete a task in-game
2. Plugin detects the completion
3. Plugin sends data to server
4. Server verifies and records
5. Your board updates on the website
```

---

## Troubleshooting

### Plugin Not Detecting Tasks

1. **Check API Key**: Ensure your key is entered correctly
2. **Check Event Status**: Event must be "active"
3. **Check RSN**: Your logged-in RSN must match registration
4. **Restart Plugin**: Disable and re-enable in settings

### "Invalid API Key" Error

- Your key may have been regenerated
- Contact an admin to get a new key
- Re-register if the event allows

### Tasks Not Appearing on Website

- There may be a slight delay (up to 30 seconds)
- Refresh the page
- Check your progress page for pending submissions

### Network Errors

- Check your internet connection
- The server may be temporarily unavailable
- Tasks are queued and retried automatically

---

## Manual Submissions

Some tasks require manual verification with screenshot proof:

1. Complete the task in-game
2. Take a screenshot
3. Visit your progress page on the website
4. Click "Submit Proof" on the task
5. Upload your screenshot
6. Wait for admin approval

---

## Best Practices

### Do's

✅ Keep your API key private  
✅ Use the same RSN you registered with  
✅ Take screenshots for manual tasks immediately  
✅ Check the website for task requirements  

### Don'ts

❌ Share your API key with others  
❌ Try to submit fake completions  
❌ Log into multiple accounts with one key  
❌ Spam the server with requests  

---

## FAQ

**Q: Can I use the plugin on multiple accounts?**

A: You need to register each account separately and get unique API keys.

**Q: What if I completed a task before registering?**

A: Tasks completed before registration don't count. You need to complete them again.

**Q: Can I see other players' progress?**

A: Yes, the leaderboard on the website shows everyone's progress.

**Q: The plugin crashed, did I lose my progress?**

A: No, all confirmed completions are saved server-side. Restart RuneLite and continue.
