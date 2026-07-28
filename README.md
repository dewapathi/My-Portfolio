# Pradeepa Lakruwan — Portfolio

"Cosmic Systems" — a cinematic, 3D-driven portfolio for a senior software engineer. Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, React Three Fiber, GSAP, Lenis, and Framer Motion.

## Tech stack

- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS, CSS custom properties for the design token system (`app/globals.css`)
- **3D**: React Three Fiber + drei + `@react-three/postprocessing` (bloom) — the hero's orbiting-node scene, gated to a 3-tier quality system (see `lib/device-tier.ts`)
- **Scroll & motion**: Lenis (smooth scroll) synced to GSAP ScrollTrigger, plus Framer Motion for component-level reveals and micro-interactions
- **Icons**: Lucide React

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start        # serve the production build
npm run lint      # ESLint
npx tsc --noEmit  # type-check
```

## Architecture

```
app/
  layout.tsx            — fonts, JSON-LD, global providers (Lenis/GSAP, preloader, cursor, grain)
  page.tsx               — composes the homepage sections in order
  work/[slug]/page.tsx   — case-study route for each flagship project (generateStaticParams)
  opengraph-image.tsx, robots.ts, sitemap.ts

content/                 — single source of truth for all real content (no hardcoded copy in components)
  site.ts                — identity, nav, contact links
  projects.ts             — all 8 projects; `flagship: true` gets a /work/[slug] case-study page
  experience.ts, services.ts, metrics.ts, engineering.ts

lib/
  seo.ts                 — metadata + JSON-LD builders
  device-tier.ts          — WebGL quality tier detection (high / standard / lightweight)
  utils.ts

components/
  motion/                — reusable motion primitives (SmoothScrollProvider, Preloader, MagneticCursor,
                            GrainOverlay, KineticText, StatCounter, PipelineDiagram, Marquee)
  three/                 — CosmicScene (the hero WebGL scene) + CosmicGate (the 3-tier gate/fallback)
  projects/               — ProjectChapter, ProjectArchiveItem, ProjectVisual, CaseStudyBody
  sections/               — one component per homepage section
  Header.tsx, Footer.tsx
```

## Updating content

Everything real lives in `content/*.ts` — edit those files, not the components, to change copy, add a project, or update experience/services. Adding a 5th flagship project: add it to `content/projects.ts` with `flagship: true` and a unique `slug`; a static route is generated automatically at build time.

## WebGL performance model

The hero's 3D scene (`components/three/CosmicScene.tsx`) never mounts on coarse-pointer devices, small viewports, or when `prefers-reduced-motion` is set — those get a zero-JS CSS constellation fallback instead (`components/three/CosmicGate.tsx`). Where it does mount, `standard` tier renders fewer particles/nodes and skips pointer-parallax + bloom; only `high` tier gets the full experience, and even then the bloom post-processing pass is a separately-loaded chunk.

## Known content gaps

These are intentionally not filled with placeholders — say the word and they can be wired in:

- No professional headshot photo exists in `public/` — the About section is designed without a photo slot rather than a fake avatar.
- No CV/resume file exists — Contact uses a `mailto:...?subject=CV%20Request` link instead of a fake download.
- No scheduling link (Calendly/cal.com/etc.) exists anywhere in the content — there's no "schedule a call" CTA.
- `project.live` / `project.github` are `null` for all 8 projects in `content/projects.ts` — those links simply don't render until real URLs are added.

## Deployment

Built for Vercel (zero-config Next.js deploy). Any Next.js-compatible host works.
