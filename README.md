# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Live:** https://anshikanexi.github.io/nexi-web/

## Status (2 Sep 2026)

### Live
GitHub Pages deploys on every push to `main`.

### Today (2 Sep)
Highest-priority unfinished piece: **Referral + Leaderboard were preview theatre** (hashed codes on-device, fake ranks).

- Waitlist still stores **name + email only**
- New `circle_ranks` table: public code + display alias + invite count. No emails.
- Joining the waitlist with `?ref=` credits the inviter (self-referrals ignored)
- Referral page claims a live code against Supabase
- Leaderboard reads `get_circle_leaderboard` — empty state until first verified conversion
- Experience engine remains `onboarding-decision` v10 (Mission Zero)

### Product surface
- **Home** — 5-panel cinematic + waitlist
- **Why Nexi / How It Works / Intelligence / Blueprint / Journey**
- **Experience Nexi** — live `onboarding-decision` + guest auth + starters + protocol + result assembly
- **Sample Result** — crafted default or last live diagnosis
- **Referral / Leaderboard** — live early-circle ranks

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: name + email only
- Circle ranks: code / alias / invites
- Experience engine: `onboarding-decision` v10 (Mission Zero)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live: https://anshikanexi.github.io/nexi-web/
