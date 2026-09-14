# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Live:** https://anshikanexi.github.io/nexi-web/

## Status (14 Sep 2026)

### Live
GitHub Pages deploys on every push to `main`.

### Today (14 Sep)
Highest-priority unfinished piece from 13 Sep plan: **Referral + Leaderboard mobile pixel-pass**.

- Referral share card, claim row, preview code, perk stack, and circle rules inherit the shared inner mobile chrome
- Invite inputs + copy actions go full-width; preview code wraps instead of overflowing the glass
- Leaderboard rows tighten (rank / alias / invites) with named alias + tag typography; empty/error states left-align and stack CTAs
- `inner-mobile.css` now covers Sample, Journey, Referral, Leaderboard
- Waitlist still stores **name + email only**
- OG raster PNG still blocked (GitHub file tools are text-only); live OG remains `assets/og-share.svg`

### Product surface
- **Home** — 5-panel cinematic + waitlist + circle-code confirmation + inbound banner
- **Why / How / Intelligence / Blueprint / Journey / Sample / Referral / Leaderboard** — cinematic inner
- **Experience Nexi** — cinematic console + live Mission Zero + last-lock restore + post-diagnosis reserve

### Tomorrow
Why / How / Blueprint / Intelligence mobile consistency pass (typography, tile padding, doctrine chips). Smoke a second waitlist email through a live `?ref=` against `credit_circle_invite` if a test address is provided. Revisit binary OG PNG if a non-text push path appears.

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: name + email only
- Circle ranks: code / alias / invites
- Experience engine: `onboarding-decision` (Mission Zero)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live: https://anshikanexi.github.io/nexi-web/
