# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Live:** https://anshikanexi.github.io/nexi-web/

## Status (24 Sep 2026)

### Live
GitHub Pages deploys on every push to `main`.

### Today (24 Sep)
Highest-priority unfinished piece from 23 Sep plan: **Experience composer / result assembly on small phones**.

- Experience now loads `lock-surface.css` so the live console matches Why / How / Intelligence / Referral glass
- New `experience-mobile.css` + `experience-mobile.js`
- Chat phase collapses marketing copy and turns the card into a full-height console
- Composer docks as a glass bar and tracks `visualViewport` keyboard inset (`--kb-inset`)
- Textarea auto-grows; result phase tightens the aside so diagnosis cells stay first
- Waitlist still stores **name + email only**
- OG raster PNG still blocked (GitHub file tools are text-only); live OG remains `assets/og-share.svg`

### Product surface
- **Home** — 5-panel cinematic + waitlist + circle-code confirmation + inbound banner
- **Why / How / Intelligence / Blueprint / Journey / Sample / Referral / Leaderboard** — cinematic inner + lock surface
- **Experience Nexi** — cinematic console + live Mission Zero + last-lock restore + post-diagnosis reserve + phone keyboard surface

### Tomorrow
Smoke a second waitlist email through a live `?ref=` against `credit_circle_invite` if a test address is provided. Audit Experience result assembly timing on iOS Safari after deploy. Revisit binary OG PNG if a non-text push path appears.

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: name + email only
- Circle ranks: code / alias / invites
- Experience engine: `onboarding-decision` (Mission Zero)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live: https://anshikanexi.github.io/nexi-web/
