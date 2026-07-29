# Architecture — The Living System

## Where this lives

The proof-of-concept is built at an **isolated route**, `app/lab/living-system/page.tsx`, rather than replacing the live homepage. The current Cosmic Systems site keeps running at `/` untouched until the POC is reviewed and the direction is confirmed — non-destructive by construction, not just by promise.

## Folder structure (POC scope; full structure grows chapter-by-chapter)

```
app/
  lab/living-system/page.tsx    — POC route, not linked from main nav

components/
  living-system/
    LivingSystemExperience.tsx   — top-level client component: mounts entry + canvas + DOM overlays
    EntryGate.tsx                 — Chapter 0: void, press-and-hold core, skip/sound/reduced-motion branches
    LivingSystemCanvas.tsx        — the R3F <Canvas>, camera rig, scroll-linked progress
    CameraRig.tsx                 — walks a CatmullRomCurve3 by scroll progress; shared by every chapter
    AwakeningChapter.tsx           — Scene 1.1: instanced forest + spatial typography
    RootNetworkChapter.tsx         — Scene 2.1: root geometry + request-simulation trigger + packet travel
    RequestSimulationPanel.tsx     — the real-DOM "Run a request" control + accessible text equivalent
    SoundManager.tsx               — Web Audio oscillator tones, mute state, page-visibility pause

  shaders/
    dissolveMaterial.ts            — noise-threshold reveal/dissolve, used for spatial typography and chapter transitions

lib/
  living-system/
    device-mode.ts                 — extends lib/device-tier.ts: adds the FPS probe, returns Cinematic/Balanced/Lite/ReducedMotion
    curve-paths.ts                  — the CatmullRomCurve3 definitions per chapter
```

## What's intentionally *not* introduced yet

- **No Zustand.** The brief allows for it "if required" — for the POC's scope (one scroll progress value, one sound-enabled boolean, one performance mode), React context + a couple of refs is simpler and avoids a dependency for state that doesn't need it. If chapter 4's project-world selector or chapter 5's node-graph builder end up needing genuinely shared, cross-tree state once built, that's the point to reconsider — not before.
- **No physics engine.** "Physics-like" reactions (seeds nudging, leaves bending near the pointer) are spring-interpolated (`gsap.quickTo`/simple lerp toward a target), the same lightweight technique already used for the tilt effect on project cards this session — not a rapier/cannon dependency.
- **No WebGPU renderer.** Plain `@react-three/fiber` WebGL2, per the trade-off flagged in `EXPERIENCE_BIBLE.md`.
- **No new animation library.** GSAP ScrollTrigger drives the camera rig (as it already drives every scroll-scrubbed effect in the current site); Framer Motion stays reserved for ordinary UI micro-interactions (buttons, the entry screen's fades) exactly as the brief itself specifies.

## Integration with the existing codebase

- `content/*.ts` is imported as-is — no duplicate content store.
- `lib/seo.ts` metadata pattern is reused for the POC route's (currently `noindex`, since it's a lab route not meant for search engines yet).
- `MotionConfig reducedMotion="user"` (already global in `app/layout.tsx`) continues to cover every Framer Motion element used for ordinary UI (entry buttons, overlays) — verified working this session.
- The existing `MagneticCursor` component gains new `data-cursor` values (`Enter`, `Activate`, `Run`) on the POC's interactive elements — no changes to the component itself.

## Performance & disposal

- The R3F `<Canvas>` only mounts client-side, gated by the same "decide the tier before ever mounting" pattern already used in the retired `CosmicGate` — carried forward, not reinvented.
- `frameloop` is set to `"never"` on `document.hidden` (existing pattern from `CosmicScene`).
- Geometry/materials for instanced meshes are created once via `useMemo` and disposed in a `useEffect` cleanup when the chapter unmounts (relevant once chapters start unmounting as the visitor leaves them — for the POC both chapters stay mounted simultaneously along one continuous rail, so this becomes load-bearing starting with chapter 3's implementation, documented here so it isn't forgotten).

## Validation before continuing past the POC

Before starting chapter 3 (Cloud Canopy) implementation: confirm in the running POC that FPS stays acceptable on a mid-range laptop in Balanced mode, that the dissolve shader reads correctly in both themes' contexts, and that the reduced-motion fallback is genuinely equivalent in content (not just "less broken"). This is the literal content of the brief's own Phase 4 ("Test FPS and memory before building the entire experience").
