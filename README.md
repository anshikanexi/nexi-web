# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Live:** https://anshikanexi.github.io/nexi-web/

## Status (10 Sep 2026)

### Live
GitHub Pages deploys on every push to `main`.

### Today (10 Sep)
Highest-priority unfinished piece from 9 Sep plan: **persist last diagnosis across Sample / Journey + OG share card**.

- Last Experience lock hydrates Sample Result *and* a live chapter card on Journey (same `nexi.lastDiagnosis` store)
- Experience gate shows **Open last lock** when a diagnosis exists on this device
- Canonical share art at `assets/og-share.svg` + `og.html` preview
- OG / Twitter image tags on Home, Experience, Sample, Referral
- Waitlist still stores **name + email only**
- Existing Supabase project only (`wzygcmsikopblntwdqsv`)

### Product surface
- **Home** — 5-panel cinematic + waitlist + circle-code confirmation
- **Why / How / Intelligence / Blueprint / Journey / Sample / Referral / Leaderboard** — cinematic inner
- **Experience Nexi** — cinematic console + live Mission Zero + last-lock restore + post-diagnosis reserve

### Tomorrow
Smoke-test inbound `?ref=` against `credit_circle_invite` with a second waitlist email; convert OG SVG to a raster PNG if social crawlers refuse SVG; tighten leaderboard empty/live states.

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: name + email only
- Circle ranks: code / alias / invites
- Experience engine: `onboarding-decision` (Mission Zero)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live: https://anshikanexi.github.io/nexi-web/
