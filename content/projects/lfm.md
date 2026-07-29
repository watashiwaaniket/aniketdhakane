---
title: "lfm"
date: "2026-07-26"
category: "Misc"
status: "Live"
featured: true
link: "https://lfm.aniketdhakane.xyz/"
stack: ["Go", "macOS", "Last.fm", "Discord"]
---

**lfm** (linkFM) is a tiny local macOS daemon that watches what you’re playing in Apple Music, scrobbles it correctly to Last.fm, and optionally mirrors it on Discord Rich Presence.

Site: [lfm.aniketdhakane.xyz](https://lfm.aniketdhakane.xyz/) · Source: [github.com/watashiwaaniket/lfm](https://github.com/watashiwaaniket/lfm)

## Why it exists

I wanted scrobbling that respects Last.fm’s rules — no audio sniffing, no double-counts when you pause — and a single static binary I can install once and forget.

## What it does

- **Apple Music → Last.fm** via AppleScript + the official Last.fm API
- **True scrobble rules**: track longer than 30s, then 50% played or 4 minutes
- **Pause-aware timing**: wall-clock only while Music is actually playing
- **Discord Rich Presence** (optional): track, artist, album art while you listen
- **LaunchAgent**: `lfm install` starts at login; logs under `~/Library/Logs/lfm`

## Architecture

```
lfm/
├── apps/cli   # Go daemon (scrobbler + Discord RPC + launchd)
└── apps/web   # Product landing → Cloudflare Workers
```

One process handles both scrobbling and Discord presence. Prefer either LaunchAgent **or** `lfm run`, not both.

## Install (short version)

```bash
git clone https://github.com/watashiwaaniket/lfm.git
cd lfm/apps/cli
go build -o lfm .
lfm auth       # browser auth → session key
lfm run        # foreground
# or
lfm install    # LaunchAgent background
```

## Takeaway

A small systems-ish product: correct APIs, a boring reliable daemon, and a clean marketing surface for people who actually listen.
