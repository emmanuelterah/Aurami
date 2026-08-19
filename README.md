# AURA — Landing Page

A cinematic, dark landing page for **AURA Robotics** and its humanoid robot **Aria**, built with the latest Next.js (App Router) and TypeScript. Ported from the original design component in `aura.zip` (see `docs/design-reference.png`).

## Stack

- **Next.js 16** (App Router, React 19)
- **TypeScript**
- **CSS Modules + global tokens** — no styling dependencies
- **Yarn** as the package manager

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
yarn build
yarn start
```

## Structure

```
src/
  app/
    layout.tsx        # Manrope font, metadata, globals
    globals.css       # design tokens, keyframes, scroll-reveal utilities
    page.tsx          # section composition
    page.module.css   # grain + vignette overlays
  components/
    Nav.tsx           # fixed nav w/ scroll-driven backdrop + mobile overlay
    Hero.tsx          # hero with light-sweep stage + magnetic CTAs
    Story.tsx         # narrative chapters (intro, awareness, life, safety, …)
    Showcase.tsx      # interactive capability hotspots (client)
    Engineering.tsx   # engineering layer tabs (client)
    Applications.tsx  # horizontal snap-scroll application cards
    Waitlist.tsx      # waitlist form (client)
    Footer.tsx
    MagnetField.tsx   # global magnetic-button cursor effect
  lib/
    content.ts        # all page copy & data in one place
```

## Notes

- Scroll reveals use CSS scroll-driven animations (`animation-timeline: view()`); in browsers without support they gracefully degrade to load-time animations. `prefers-reduced-motion` disables all motion.
- The `[ render ]` placeholder panels are intentional slots from the design — swap them for real renders/video by replacing the `.stripes` placeholder blocks.
- Accent color is a single token: change `--accent` in `src/app/globals.css` to retheme the whole page (design options: `oklch(0.74 0.12 274)`, `oklch(0.72 0.13 292)`, `oklch(0.76 0.1 205)`, `oklch(0.8 0.12 60)`).
