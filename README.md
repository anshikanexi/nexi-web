# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Live:** https://anshikanexi.github.io/nexi-web/

## Status (8 Sep 2026)

### Live
GitHub Pages deploys on every push to `main`.

### Today (8 Sep)
Highest-priority unfinished piece from 7 Sep plan: **Sample Result hydration against the live diagnosis payload + referral share preview**.

- Sample Result now has matching IDs (`sample-root`, title/sub/note/status) so `sample-hydrate.js` actually paints
- Live Experience diagnosis stored in `nexi.lastDiagnosis` hydrates want / bottleneck / lens / mission / belief / tomorrow
- Triple-lens collision meters assemble on Sample Result the same way they do after Experience lock
- Static sample remains the fallback when this device has no live run
- Referral reads stored circle code, paints a glass share preview, copies a crafted invite message
- Inbound `?ref=` still captured; claimed codes persist to `nexi.circle`
- Waitlist still stores **name + email only**
- Existing Supabase project only (`wzygcmsikopblntwdqsv`)

### Product surface
- **Home** — 5-panel cinematic + waitlist + circle-code confirmation
- **Why / How / Intelligence / Blueprint / Journey / Sample / Referral / Leaderboard** — cinematic inner
- **Experience Nexi** — cinematic console + live Mission Zero + post-diagnosis reserve

### Tomorrow
Verify `claim_circle_code` / `credit_circle_invite` / `get_circle_leaderboard` against a real reserve on production; polish Home waitlist confirmation to match Sample assembly motion; optional OG image asset for share cards.

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: name + email only
- Circle ranks: code / alias / invites
- Experience engine: `onboarding-decision` (Mission Zero)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live: https://anshikanexi.github.io/nexi-web/
