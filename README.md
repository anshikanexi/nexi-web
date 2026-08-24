# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Intended live:** https://anshikanexi.github.io/nexi-web/

## Status (24 Aug 2026)

### Deploy (blocking until one click)
GitHub Actions workflow is ready. **All prior runs failed** because Pages was never created for this repo (`Create Pages site failed: Resource not accessible by integration`).

**Founder — one time only:**
1. Open https://github.com/anshikanexi/nexi-web/settings/pages
2. **Build and deployment → Source:** select **GitHub Actions** (not Deploy from a branch)
3. Save. Then either re-run the latest workflow under Actions, or push any commit to `main`.

After that, every push to `main` deploys automatically.

### Product surface
- **Home** — hero + breathing orb + glass nav + live waitlist (name + email → `public.waitlist`)
- **Why Nexi** — doctrine (triple lens, diagnosis-first, next-move, memory, anti-mediocre)
- **How It Works** — full operating-model page
- **Blueprint / Intelligence / Journey** — engineering + brain + arc pages
- **Experience Nexi** — live interactive diagnosis via `onboarding-decision` + anonymous auth
- **Sample Result / Referral / Leaderboard** — showcase + growth loops

### Design system
- Navy / Titanium / Champagne / Teal, Cormorant + Raleway
- Premium mobile glass drawer nav (burger + backdrop + ESC) — sitewide via `app.js`
- Scroll-aware nav glass intensify
- Staggered card reveal on feature grids
- Heavy glass + soft pulses + CSS orb (parallax)

### Supabase
- Project: `wzygcmsikopblntwdqsv`
- Waitlist: **name + email only** (`public.waitlist`, insert for anon)
- Experience engine: edge function `onboarding-decision` (Mission Zero system prompt)

## Pages roadmap

- [x] Home
- [x] Why Nexi
- [x] How It Works
- [x] Experience Nexi (live engine)
- [x] Sample Result
- [x] Referral
- [x] Leaderboard
- [x] Blueprint
- [x] Intelligence
- [x] Journey
- [x] GitHub Pages deploy pipeline (awaiting one-time Source = GitHub Actions)
- [x] Mobile navigation (premium glass)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live path: Settings → Pages → **GitHub Actions** once, then push.
