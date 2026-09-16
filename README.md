# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Live:** https://anshikanexi.github.io/nexi-web/

## Status (16 Sep 2026)

### Live
GitHub Pages deploys on every push to `main`.

### Today (16 Sep)
Highest-priority unfinished piece from 15 Sep plan: **Home cinematic mobile polish**.

- New `home-mobile.css` — hero type scale, safe-area panel padding, stacked CTAs
- Waitlist form becomes a glass card on phone; stats stack without collision
- Inbound circle banner wraps instead of overflowing under the nav
- Circle handoff actions stack full-width with secondary glass buttons
- Product orb scales down on small viewports; dashboard mid-grid collapses cleanly
- Home viewport-fit + OG tags now match inner pages
- Waitlist still stores **name + email only**
- OG raster PNG still blocked (GitHub file tools are text-only); live OG remains `assets/og-share.svg`

### Product surface
- **Home** — 5-panel cinematic + waitlist + circle-code confirmation + inbound banner
- **Why / How / Intelligence / Blueprint / Journey / Sample / Referral / Leaderboard** — cinematic inner
- **Experience Nexi** — cinematic console + live Mission Zero + last-lock restore + post-diagnosis reserve

### Tomorrow
Experience desktop/mobile density pass on the diagnosis result (diag-grid assemble, mission card, reserve form). Smoke a second waitlist email through a live `?ref=` against `credit_circle_invite` if a test address is provided. Revisit binary OG PNG if a non-text push path appears.

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: name + email only
- Circle ranks: code / alias / invites
- Experience engine: `onboarding-decision` (Mission Zero)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live: https://anshikanexi.github.io/nexi-web/
