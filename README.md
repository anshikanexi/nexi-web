# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Live:** https://anshikanexi.github.io/nexi-web/

## Status (9 Sep 2026)

### Live
GitHub Pages deploys on every push to `main`.

### Today (9 Sep)
Highest-priority unfinished piece from 8 Sep plan: **Home waitlist confirmation assembly + live circle RPC grants**.

- Waitlist confirmation card now assembles like Sample Result (blur → lock)
- Returning visitors on this device restore the hashed circle code without re-submitting
- Claim response paints live invite count (Scout until first conversion)
- Share URLs resolve correctly under `/nexi-web/` on GitHub Pages
- `claim_circle_code` / `credit_circle_invite` / `get_circle_leaderboard` granted to `anon` + `authenticated` on the existing project
- Waitlist still stores **name + email only**
- Existing Supabase project only (`wzygcmsikopblntwdqsv`)

### Product surface
- **Home** — 5-panel cinematic + waitlist + circle-code confirmation
- **Why / How / Intelligence / Blueprint / Journey / Sample / Referral / Leaderboard** — cinematic inner
- **Experience Nexi** — cinematic console + live Mission Zero + post-diagnosis reserve

### Tomorrow
Experience diagnosis card: persist last run across Sample / Journey more tightly; add a lightweight OG share card asset; smoke-test a real inbound `?ref=` conversion against `credit_circle_invite` once a second waitlist email is available.

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: name + email only
- Circle ranks: code / alias / invites
- Experience engine: `onboarding-decision` (Mission Zero)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live: https://anshikanexi.github.io/nexi-web/
