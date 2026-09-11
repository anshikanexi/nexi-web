# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Live:** https://anshikanexi.github.io/nexi-web/

## Status (11 Sep 2026)

### Live
GitHub Pages deploys on every push to `main`.

### Today (11 Sep)
Highest-priority unfinished piece from 10 Sep plan: **inbound `?ref=` credit path + leaderboard live/empty/error states**.

- `?ref=` is captured site-wide, painted as a glass inbound banner, and attached to waitlist join (`credit_circle_invite`)
- Self-referrals still skipped; waitlist still stores **name + email only**
- Leaderboard: skeleton while reading, honest empty state with CTAs, distinct error state (no fake ranks)
- Referral page explains inbound codes before the visitor claims their own
- Home now carries OG / Twitter share tags (SVG card — raster PNG still blocked by GitHub file-tool text-only push)

### Product surface
- **Home** — 5-panel cinematic + waitlist + circle-code confirmation + inbound banner
- **Why / How / Intelligence / Blueprint / Journey / Sample / Referral / Leaderboard** — cinematic inner
- **Experience Nexi** — cinematic console + live Mission Zero + last-lock restore + post-diagnosis reserve

### Tomorrow
Generate and commit a 1200×630 PNG share card (binary push), then smoke a second waitlist email through a live `?ref=` against `credit_circle_invite`. Pixel-pass Experience console on mobile.

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: name + email only
- Circle ranks: code / alias / invites
- Experience engine: `onboarding-decision` (Mission Zero)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live: https://anshikanexi.github.io/nexi-web/
