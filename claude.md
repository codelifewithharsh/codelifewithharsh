# CodeLifeWithHarsh — Personal Website

## Project Overview
Personal portfolio + content hub for Harsh Goyal (codelifewithharsh) — a frontend engineer building AI products and creating content. Target audience: recruiters (especially in Australia), potential clients, and Instagram/YouTube followers learning AI/automation.

## Design Tokens (Tailwind v4 — defined in `app/globals.css` `@theme`)

| Token | Value |
|---|---|
| `--color-action-blue` | `#0066cc` |
| `--color-focus-blue` | `#0071e3` |
| `--color-sky-blue` | `#2997ff` |
| `--color-near-black` | `#1d1d1f` |
| `--color-dark-tile` | `#272729` |
| `--color-parchment` | `#f5f5f7` |
| `--font-sans` | Inter, system-ui, … |

**Body background**: `#1d1d1f` — **no** `tailwind.config.ts` (Tailwind v4 uses `@theme` only).

## Tech Stack

| Layer | Library / Version |
|---|---|
| Framework | Next.js 15.5.15 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Email | Resend v6.12.2 |
| GitHub calendar | react-github-calendar v5.0.6 |

## Routes

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — server component |
| `/toolkit` | `app/toolkit/page.tsx` | Toolkit page — server component with metadata |
| `/api/contact` | `app/api/contact/route.ts` | POST — sends email via Resend to harshgoyal1415@gmail.com |

## File Structure (actual)

```
app/
  layout.tsx
  page.tsx
  globals.css                  ← Tailwind @theme + all global keyframes
  api/
    contact/
      route.ts                 ← Resend email handler
  toolkit/
    page.tsx                   ← Metadata + layout shell
    ToolkitContent.tsx         ← All toolkit UI ("use client")

components/
  Navbar.tsx                   ← Sticky, cross-page aware
  Hero.tsx                     ← Homepage hero with floating badges
  Stats.tsx                    ← Light-bg animated counters (after hero)
  CodeLifeWithHarsh.tsx        ← Reel showcase section
  About.tsx                    ← Story + achievement badges
  Projects.tsx                 ← 4 project cards grid
  Skills.tsx                   ← 4 grouped tag buckets
  Connect.tsx                  ← Contact form (calls /api/contact)
  Footer.tsx                   ← Black footer with link columns + socials
  AnimatedSection.tsx          ← FadeUp, SlideLeft, StaggerGrid/Item, useCountUp
  OrbitalRing.tsx              ← Orbiting logo animation (toolkit hero only)

data/
  resources.json               ← 23 resources, 6 categories
  weekly-pick.json             ← Single "Pick of the Week" card

public/
  logo.png
  hero.png                     ← Hero photo
  background.png               ← Toolkit hero background
  logos/                       ← claude.png, n8n.png, react.png, nextjs.png,
                                  flutter.png, vapi.png, supabase.png, github.png
  (other project images)
```

## Homepage Sections (in order)

### 1. Navbar (`components/Navbar.tsx`)
- Sticky, black bg — `bg-black/85 backdrop-blur` when scrolled
- Logo (`/logo.png`) → smooth scroll to top on `/`, `router.push('/')` from other pages
- Nav links: **Studio** (`#content`), **About** (`#about`), **Projects** (`#projects`), **Skills** (`#skills`)
- **Toolkit** link styled separately: blue pill border, active highlight on `/toolkit`
- **"Let's connect"** CTA button → scrolls to `#connect` (or navigates to `/#connect` cross-page)
- `usePathname` used for cross-page awareness

### 2. Hero (`components/Hero.tsx`)
- Full-viewport, dark `#1d1d1f` bg
- Name: "Harsh Goyal" — 64–92px, semibold, tight tracking
- Subtitle: "Software Engineer · AI Builder · Creator"
- Two statement lines: "I build AI products." / "Teaching what I learn." (second at 50% opacity)
- Hero photo: `/hero.png` with blue glow behind
- Floating badge chips (Framer Motion float animations): "10M+ Users", "Tech Conclave Speaker", "Quick Facts"
- CTAs: "See my work" (→ `#projects`), "Let's connect" (→ `#connect`)
- Social icons: Instagram, LinkedIn, GitHub, YouTube

### 3. Stats (`components/Stats.tsx`)
- Light `#f5f5f7` background section
- 4 animated count-up counters in a grid: `2+` years, `5+` awards, `100+` n8n templates, `16K+` Instagram views
- Uses `useCountUp` from `AnimatedSection.tsx` + Framer Motion `useInView`

### 4. CodeLifeWithHarsh (`components/CodeLifeWithHarsh.tsx`)
- Section id: `#content`
- Heading: "codelifewithharsh" / "I teach what I build"
- 3 placeholder reel cards (9:16 ratio) — Tutorial, Project demo, AI explainer
- Reel stack hover fan animation (CSS classes `.reel-1/.reel-2/.reel-3`)
- Buttons: "Follow on Instagram", "Connect on LinkedIn", "GitHub"

### 5. About (`components/About.tsx`)
- Section id: `#about`
- 60-word story about 2 years at Zeta, BITS Pilani, AI focus, Australia opportunities
- Inline achievement badges: "Tech Talk at Zeta", "Multiple Awards"

### 6. Projects (`components/Projects.tsx`)
- Section id: `#projects`
- Heading: "What I build" / "Latest projects"
- 4 cards: Job Fit Evaluator (n8n/RAG), AI Voice Assistant (Vapi), App Review Analyzer (NLP), 100 n8n Templates
- All GitHub links → `https://github.com/codelifewithharsh`

### 7. Skills (`components/Skills.tsx`)
- Section id: `#skills`
- 4 tag groups: Frontend, AI & Automation, Tools & Infrastructure, Currently Learning

### 8. Connect (`components/Connect.tsx`)
- Section id: `#connect`
- 3-field form: Name, Email, "What do you need?" textarea
- Submits to `POST /api/contact` → Resend → harshgoyal1415@gmail.com
- Trust line: "I reply within 24 hours"
- Social links row

### 9. Footer (`components/Footer.tsx`)
- Black bg, two link columns: Sections + Content
- Social icons: Instagram, LinkedIn, GitHub, YouTube
- Copy: "Made with intent. Shipped with care."

---

## Toolkit Page (`/toolkit`)

Full client component in `app/toolkit/ToolkitContent.tsx`.

### Sections (top to bottom)

**Breadcrumb** — "← Home / Toolkit"

**Changelog strip** — slim pill banner linking to `#changelog`

**Hero** — full-width section with `background.png` + gradient overlay blending to `#1d1d1f`. Two-column layout:
- Left: eyebrow, h1 "Everything I use to build.", description, filter tabs, difficulty legend
- Right (desktop only): `OrbitalRing` component — 3 rings, 8 orbiting logos, CSS-only animation
- Mobile: static logo grid (hidden on `md+`)

**Stats bar** — 4 animated counters matching the Studio style: `40+` Resources, `6` Categories, `Weekly` Updated, `100%` Free. Bordered grid card on dark bg.

**Pick of the Week** — full-width dark card, data from `data/weekly-pick.json`

**Resource grid** — `StaggerGrid` of `ResourceCard` components filtered by tab. Each card has:
- `id={resource.id}` for deep-linking
- `iDailyUse` → "✓ I use this daily" badge
- `level` → colored dot (green=beginner, amber=intermediate, red=advanced)
- Copy-link button → copies `window.location.origin + '/toolkit#' + id`

**GitHub calendar** — `react-github-calendar` (dynamic import, named export workaround)

**Changelog section** — id `#changelog`, timestamped entries

**Email subscribe** — placeholder section

### Data files

**`data/resources.json`** — 23 resources with fields:
```ts
{
  id: string;           // e.g. "stack-1" — used for anchor deep-linking
  emoji: string;
  title: string;
  description: string;
  category: string;     // one of the 6 categories below
  tags: string[];       // e.g. ["Free", "Free tier"]
  type: string;         // Tool | Docs | Guide | Template
  link: string;
  youtubeLink?: string;
  isFeatured: boolean;
  iDailyUse: boolean;   // shows "I use this daily" badge
  level: "beginner" | "intermediate" | "advanced";
}
```
Categories: `Automation & Workflows`, `LLMs & APIs`, `Voice AI`, `Frontend + AI`, `Learning Paths`, `My Daily Stack`

**`data/weekly-pick.json`** — single object: `title`, `description`, `link`, `reelLink`, `category`, `week`

### OrbitalRing (`components/OrbitalRing.tsx`)
- `LOGO_DATA` exported for mobile static grid
- 3 rings: r=90 (cw), r=150 (ccw), r=215 (cw)
- Container: 480×480px
- CSS keyframes `orbit-cw`, `orbit-ccw`, `logo-breathe` in `globals.css`
- Technique: `rotate(θ) translateX(var(--r)) rotate(-θ)` — logos stay upright
- `--r` CSS custom property set inline per logo
- Hover: pauses animation, scales logo 1.4×, shows tooltip

---

## Animations (globals.css)

| Keyframe | Used by |
|---|---|
| `float-a/b/c` | Hero floating badge chips |
| `orbit-cw` / `orbit-ccw` | OrbitalRing logos |
| `logo-breathe` | OrbitalRing logos (scale 1→1.08→1) |
| `pulse-dot` | Status indicator dots |

CSS utilities: `.reel-1/.reel-2/.reel-3` fan stack, `.stat-hover` underline, `.card-lift`, `.nav-link` underline, `.pulse-dot`

---

## Social Links

| Platform | URL |
|---|---|
| Instagram | https://www.instagram.com/codelifewithharsh?igsh=OWtpcHRhMWJlaW1h |
| LinkedIn | https://www.linkedin.com/in/code-life-with-harsh/ |
| GitHub | https://github.com/codelifewithharsh |
| YouTube | https://youtube.com/@codelifewithharsh |
| Email | codelifewithharsh@gmail.com |

---

## Environment Variables

| Key | Purpose |
|---|---|
| `RESEND_API_KEY` | Contact form email sending |

---

## Build Notes
- `npm run build` compiles cleanly — verify after any change to `ToolkitContent.tsx` or `OrbitalRing.tsx`
- `react-github-calendar` v5 uses named export; dynamic import pattern:
  ```ts
  dynamic(() => import("react-github-calendar").then(m => ({ default: m.GitHubCalendar })))
  ```
- No `tailwind.config.ts` — all design tokens live in `globals.css` `@theme` block
- `--r` CSS custom property on orbital wrappers requires cast: `["--r" as string]: \`${radius}px\``
