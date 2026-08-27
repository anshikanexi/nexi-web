# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Live:** https://anshikanexi.github.io/nexi-web/

## Status (27 Aug 2026)

### Live
GitHub Pages is active. Every push to `main` deploys automatically.

### Today (27 Aug)
Highest-priority unfinished piece: **Home was a thin hero + waitlist.** It now carries a real product surface.

- Product orb rewritten to the app spec (Siri glass sphere: flowing champagne/teal blobs, luminosity breath, static rim — no spinning toy ring)
- Home engines: Prestige / Wealth / Soul glass cards
- Operating-loop rail: Want → Investigate → Name it → Ship today
- Sample next-move preview card (same shape as Sample Result / Experience)
- Reveal + hover depth on new home modules

No generic templates. Product-grade surface only.

### Product surface
- **Home** — hero + product orb + engines + loop + sample lock + live waitlist (name + email → `public.waitlist`)
- **Why Nexi** — doctrine (triple lens, diagnosis-first, next-move, memory, anti-mediocre)
- **How It Works** — full operating-model page
- **Blueprint / Intelligence / Journey** — engineering + brain + arc pages
- **Experience Nexi** — live interactive diagnosis via `onboarding-decision` + anonymous auth
- **Sample Result / Referral / Leaderboard** — showcase + growth loops

### Design system
- Navy / Titanium / Champagne / Teal, Cormorant + Raleway
- Premium mobile glass drawer nav — sitewide via `app.js`
- Scroll-aware nav glass intensify
- Staggered card reveal
- Product orb: canvas painter matching `NexiOrbWidget`

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: **name + email only** (`public.waitlist`, insert for anon)
- Experience engine: edge function `onboarding-decision` (Mission Zero)

## Pages roadmap

- [x] Home (27 Aug product-surface pass)
- [x] Why Nexi
- [x] How It Works
- [x] Experience Nexi (live engine)
- [x] Sample Result
- [x] Referral
- [x] Leaderboard
- [x] Blueprint
- [x] Intelligence
- [x] Journey
- [x] GitHub Pages deploy (live)
- [x] Mobile navigation (premium glass)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live: https://anshikanexi.github.io/nexi-web/
