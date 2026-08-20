# AURAMI — Landing Page

A cinematic, dark landing page for **AURAMI Robotics** and its humanoid robot **Aria**, built with the latest Next.js (App Router) and TypeScript. Ported from the original design component in `aura.zip` (see `docs/design-reference.png`).

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

## Project structure

```
src/
  app/                      # Next.js App Router: routes, metadata, global styles
    layout.tsx              #   root layout, fonts, favicon, OG metadata
    page.tsx                #   the landing page: composes every section in order
    globals.css             #   design tokens (--accent, --bg, ...) & shared motion
  components/
    layout/                 # site chrome, shown on every view
      Nav.tsx / .module.css     #   fixed navbar (scroll glass effect, mobile menu)
      Footer.tsx / .module.css
    sections/               # one file per landing-page section, top-to-bottom
      Hero.tsx / .module.css      #   hero copy + 3D stage
      Showcase.tsx / .module.css
      Applications.tsx / .module.css  # card slider with hover-scroll arrows
      Engineering.tsx / .module.css
      Waitlist.tsx / .module.css
      story/                #   the narrative chapters between the big sections
        index.ts            #     re-exports all chapters for page.tsx
        story.module.css    #     shared styles for every chapter
        shared.ts           #     tiny helpers (stagger delay)
        Intro.tsx, Awareness.tsx, DesignedForLife.tsx, NoScreen.tsx,
        People.tsx, Learning.tsx, Safety.tsx, Future.tsx, FinalCta.tsx
    three/                  # all Three.js / GLB rendering
      Hero3D.tsx / .module.css  #   hero robot: rim-lit slow turn
      RobotWalk.tsx / .module.css # walking patrol + attentive "aware" mode
      warmModel.ts          #   recolors baked blue glow details to brand gold
  lib/
    content.ts              # ALL site copy & data lives here — edit text here first
  fonts/                    # self-hosted Manrope woff2
public/
  logo/                     # brand SVGs (mark, lockups, favicon)
  models/                   # GLB files: hero.glb (idle), walk.glb (walking)

```

Rules of thumb when fixing things: text/copy changes almost always happen in
`src/lib/content.ts`; colors and spacing tokens in `src/app/globals.css`;
anything 3D in `src/components/three/`; a specific page section in its file
under `src/components/sections/`.

## Performance

3D models lazy-load: each section's GLB is fetched only when the section
scrolls near the viewport, each file is downloaded/parsed at most once per
page (shared loader in `src/components/three/loadModel.ts`), and rendering
pauses while a canvas is off-screen.

Before deploying, compress the models (one-time setup, then one command):

```
yarn optimize:models
```

This rewrites every GLB in `public/models` in place with meshopt compression
and WebP textures (typically 90%+ smaller). Commit the repo first. The
runtime loader already has the meshopt decoder wired in, so the compressed
files work with no code changes.

