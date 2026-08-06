---
title: "Liftw"
date: "2026-07-28"
category: "Fullstack"
status: "Live"
featured: true
link: "https://liftw.xyz"
stack: ["Next.js", "Postgres", "Prisma", "MCP"]
---

**Liftw** is a private gym tracker: log workouts, track volume and PRs, and optionally connect AI coaches through MCP — without a social feed or locked-in chatbot.

Site: [liftw.xyz](https://liftw.xyz)

## Why it exists

Most gym apps push social noise or hide your data behind a closed AI. Liftw is private-by-default: you own the log, and you choose when an agent gets a revocable API key.

## What it does

- Log sessions — exercises, sets, weight, reps, RPE, warmups
- Session + rest timers; optional calorie estimates
- Progress charts: volume, muscle balance, estimated 1RM, PRs
- MCP-ready APIs so tools like Claude/Cursor can coach from your real history
- Auth, onboarding, profile, and account controls

## Stack notes

Next.js + TypeScript on the web, Postgres/Prisma for the log, and an MCP surface for optional AI coaching. Built for people who actually train and want numbers they can trust.
