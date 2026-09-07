# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Live:** https://anshikanexi.github.io/nexi-web/

## Status (7 Sep 2026)

### Live
GitHub Pages deploys on every push to `main`.

### Today (7 Sep)
Highest-priority unfinished piece: **mobile Experience + waitlist / circle-code handoff after diagnosis**.

- Experience result now includes an in-console reserve form (name + email only)
- Successful reserve claims the hashed circle code and paints a copyable invite + Referral / Leaderboard handoff
- Same confirmation card is used on Home waitlist
- Cinematic chrome now has a working mobile nav (hamburger + glass drawer) — Experience was previously losing links under 900px
- Side-orb stays visible on small screens at compact size; claim row / composer / diagnosis grid stack cleanly
- Inner pages: tighter hero + leaderboard rows on ≤820px
- Waitlist still stores **name + email only**
- Existing Supabase project only (`wzygcmsikopblntwdqsv`)

### Product surface
- **Home** — 5-panel cinematic + waitlist + circle-code confirmation
- **Why / How / Intelligence / Blueprint / Journey / Sample / Referral / Leaderboard** — cinematic inner
- **Experience Nexi** — cinematic console + live Mission Zero + post-diagnosis reserve

### Tomorrow
Pixel-pass Sample Result hydration against the live diagnosis payload; tighten referral share preview; verify `claim_circle_code` / `credit_circle_invite` RPCs against a real reserve.

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: name + email only
- Circle ranks: code / alias / invites
- Experience engine: `onboarding-decision` (Mission Zero)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live: https://anshikanexi.github.io/nexi-web/
