# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Intended live:** https://anshikanexi.github.io/nexi-web/

## Status (23 Aug 2026)

### Deploy
- GitHub Actions workflow `.github/workflows/pages.yml` deploys root static site to **GitHub Pages** on every push to `main`.
- **One-time (if still 404):** Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**. Then re-run the workflow or push any commit.

### Product surface
- **Home** — hero + breathing orb + glass nav + live waitlist (name + email → `public.waitlist`)
- **Why Nexi** — doctrine (triple lens, diagnosis-first, next-move, memory, anti-mediocre)
- **How It Works** — full operating-model page
- **Blueprint / Intelligence / Journey** — engineering + brain + arc pages
- **Experience Nexi** — live interactive diagnosis via `onboarding-decision` + anonymous auth
- **Sample Result / Referral / Leaderboard** — showcase + growth loops

### Design system (today)
- Navy / Titanium / Champagne / Teal, Cormorant + Raleway
- **Premium mobile glass drawer nav** (burger + backdrop + ESC) — injected sitewide via `app.js`
- Scroll-aware nav glass intensify
- Staggered card reveal on feature grids
- Heavy glass + soft pulses + orb parallax

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
- [x] GitHub Pages deploy pipeline
- [x] Mobile navigation (premium glass)

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. GitHub Pages: Settings → Pages → **GitHub Actions**.
