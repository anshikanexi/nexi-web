# Nexi Web — Ultra-Premium Marketing & Waitlist

Glassmorphism-heavy, motion-rich, product-grade site for Nexi Life OS.

**Intended live:** https://anshikanexi.github.io/nexi-web/

## Status (25 Aug 2026)

### Deploy (still blocking — one founder click)
GitHub Actions workflow is ready and correct. Prior runs failed only because Pages was never enabled for this repo (`Create Pages site failed: Resource not accessible by integration`).

**Founder — one time only (highest priority):**
1. Open https://github.com/anshikanexi/nexi-web/settings/pages
2. **Build and deployment → Source:** select **GitHub Actions** (not Deploy from a branch)
3. Save. Then re-run the latest workflow under Actions, or push any commit to `main`.

After that, every push to `main` deploys automatically. Site becomes live at the URL above.

### Today (25 Aug)
- Deepened glassmorphism: stronger blur/saturate, dual-inset highlights, gradient glass surface
- Fluid card hover assembly (lift + scale + teal rim glow)
- Orb core intensity + breath timing refined
- Primary button specular sweep on hover
- Reveal transitions lengthened for premium feel
- Waitlist card hover depth

All prior surface work remains intact. No generic templates.

### Product surface
- **Home** — hero + breathing orb + glass nav + live waitlist (name + email → `public.waitlist`)
- **Why Nexi** — doctrine (triple lens, diagnosis-first, next-move, memory, anti-mediocre)
- **How It Works** — full operating-model page
- **Blueprint / Intelligence / Journey** — engineering + brain + arc pages
- **Experience Nexi** — live interactive diagnosis via `onboarding-decision` + anonymous auth (Mission Zero system prompt — sharp, adaptive, act-early)
- **Sample Result / Referral / Leaderboard** — showcase + growth loops

### Design system
- Navy / Titanium / Champagne / Teal, Cormorant + Raleway
- Premium mobile glass drawer nav (burger + backdrop + ESC) — sitewide via `app.js`
- Scroll-aware nav glass intensify
- Staggered card reveal on feature grids
- Heavy glass + soft pulses + CSS orb (parallax) — refined 25 Aug

### Supabase
- Project: `wzygcmsikopblntwdqsv` (existing only)
- Waitlist: **name + email only** (`public.waitlist`, insert for anon)
- Experience engine: edge function `onboarding-decision` (Mission Zero)

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
- [x] 25 Aug glass + motion depth pass

## Waitlist rule

Store **only** name + email.

## Local

Open any HTML file or serve static. Live path: Settings → Pages → **GitHub Actions** once, then push.
