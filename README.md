# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Live:** https://anshikanexi.github.io/nexi-web/

## Status (25 Sep 2026)

### Live
GitHub Pages deploys on every push to `main`.

### Today (25 Sep)
Highest-priority unfinished piece after the Experience phone console: **Home waitlist as a lock surface**.

- Home now loads `lock-surface.css` + `experience-result.css` + `home-lock.css`
- Panel 05 is a product console: Reserve → Code → Circle protocol rail
- Three glass meters (Seat / Circle code / Inbound) assemble on load
- Inbound `?ref=` and a saved device circle hydrate the meters
- Waitlist still stores **name + email only**; reserve still issues the hashed circle handoff
- `app.js` updates the home meters when a code is issued

### Product surface
- **Home** — 5-panel cinematic + waitlist lock surface + circle-code confirmation + inbound banner
- **Why / How / Intelligence / Blueprint / Journey / Sample / Referral / Leaderboard** — cinematic inner + lock surface
- **Experience Nexi** — cinematic console + live Mission Zero + last-lock restore + post-diagnosis reserve + phone keyboard surface

### Tomorrow
Smoke a second waitlist email through a live `?ref=` against `credit_circle_invite` if a test address is provided. Pixel-pass Home lock surface against Referral on a 390px viewport. Revisit binary OG PNG if a non-text push path appears.

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: name + email only
- Circle ranks: code / alias / invites
- Experience engine: `onboarding-decision` (Mission Zero)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live: https://anshikanexi.github.io/nexi-web/
