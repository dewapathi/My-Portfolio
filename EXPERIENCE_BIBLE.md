# The Living System — Experience Bible

## 0. Where this sits relative to what exists today

The current site (built earlier this session) is "Cosmic Systems" — a dark editorial portfolio with a single WebGL hero (orbiting nodes), GSAP/Lenis scroll, and 12 semantic homepage sections plus 5 project case-study routes. It is well-built, accessible, and fast, but it is fundamentally a **conventional scrolling page with a 3D hero bolted on** — sections stacked vertically, each independently revealed. That is exactly the pattern this brief rejects.

**The Living System replaces the presentation layer, not the content.** Every fact — the 5 flagship projects, the CreatIT Solutions role, the verified metrics (60%+ latency, 20+ AWS services, 4 mobile apps, 4 payment gateways, 2 AI systems, 3+ years) — carries over unchanged from `content/*.ts`. What changes is *how the visitor moves through it*: a continuous camera journey through a bioluminescent digital ecosystem instead of a stack of `<section>` blocks.

**Audit of what's reusable vs. what's replaced:**

| Asset | Disposition |
|---|---|
| `content/*.ts` (all facts) | Reused unchanged — single source of truth |
| Lenis + GSAP ScrollTrigger (`SmoothScrollProvider`) | Reused — becomes the camera-rig timeline driver instead of just section reveals |
| `PipelineDiagram`'s sequential-node pattern | Reused as the *technique* for the Root Network request simulation, re-expressed in 3D |
| `MagneticCursor` | Extended with the new cursor-state vocabulary (EXPLORE, ACTIVATE, ENTER, INSPECT, RUN, DEPLOY, TRANSMIT) |
| `lib/device-tier.ts` | Extended into the four Performance Modes below (adds an FPS probe) |
| `CosmicScene`/`CosmicGate` (orbiting-node hero) | Retired — its *technique* (instanced particles, procedural materials, tiered quality gate) carries forward into the new world, but the visual metaphor (orbiting nodes) is replaced by the forest/root/canopy/city metaphor |
| The 12 stacked homepage sections | Retired as independent scroll-stops — their **content** becomes scenes inside the seven chapters (see map below); nothing is deleted, it's re-staged |
| `app/work/[slug]` case-study routes | Kept as the landing point after a project-world portal transition — case studies stay editorial/readable, per the brief |

No employer, client, metric, or technology is invented anywhere in this document or the build that follows it.

## 1. Core concept

**"THE LIVING SYSTEM"** — *"A journey through the systems I design, build, deploy, and evolve."*

Software-as-ecosystem metaphor: trees are services, roots are backend/data architecture, energy in roots is data, branches are APIs, canopy is cloud infrastructure, fireflies are async jobs/messages, rivers are data streams, floating islands are deployed apps, neural growths are AI automation, portals are case studies, weather is system state, the ecosystem's growth is the engineering timeline.

Tone: cinematic realism, not fantasy. Bioluminescence reads as *engineered*, not magical — closer to a research-lab visualization than a game world.

## 2. Chapter map

| # | Chapter | World | Core interaction |
|---|---|---|---|
| 0 | Cinematic Entry | Black void → energy core | Press-and-hold to enter |
| 1 | The Awakening | Bioluminescent forest | Four energy seeds → PL monogram |
| 2 | The Root Network | Underground root/data system | "Run a request" pipeline simulation |
| 3 | The Cloud Canopy | Infrastructure-as-forest-canopy | "Deploy to production" sequence + Experience/Architecture mode toggle |
| 4 | The Project Worlds | Five floating project portals | Drag/scroll/arrow-key world selector → portal transition into case study |
| 5 | The AI Grove | Composable AI-pipeline organisms | Build-a-workflow node graph |
| 6 | The Operations City | Production-ops skyline | Live incident simulation + evolving-skyline experience timeline |
| 7 | The Final Transmission | Contact portal | Copy-email beam, orbiting social nodes |

Between 4 and 5, and between 6 and 7, are the "About" (observation-deck) and pacing beats — quiet chapters by design, not every chapter is high-intensity (see §7 Pacing).

## 3. Visual language

**Color system** (CSS custom properties, dark-first — no light-mode variant for this experience; it does not make sense for a "bioluminescent night" world):
- `--void: #05070A` (near-black base)
- `--forest: #0C1F17` (deep forest green, ambient fill)
- `--navy: #0A1220` (deep navy, canopy/sky)
- `--cyan: #4CD8E0` (electric cyan — data/energy)
- `--violet: #9B7CFF` (bioluminescent violet — AI/intelligence)
- `--amber: #D9A25C` (muted amber — warnings/human-review gates)
- `--silver: #AEB4C2` (structural/silver — infrastructure)
- `--white: #F3F4F9` (soft white — typography)

No neon-cyberpunk saturation; all emissive colors are desaturated 10-15% from their "pure" hex to keep the premium/cinematic read.

**Materials**: emissive MeshStandardMaterial for bioluminescence (no custom PBR textures — procedural only, see Asset Requirements), simple glass-like `MeshPhysicalMaterial` (transmission + roughness) for holographic panels, additive-blended instanced points for particles/fireflies/data.

**Composition**: every scene keeps a foreground/midground/background depth split (near silhouette, active midground content, distant fog-obscured background) — enforced as a checklist item per scene, not left to chance.

## 4. Typography

- Display: keep **Space Grotesk** (already licensed/loaded, technical-geometric, reads well at both huge scale and small labels) — reused, not replaced, to avoid another font-identity churn this session.
- Body/UI: keep **Inter**.
- Technical labels/code fragments: keep **JetBrains Mono**.
- Spatial text (the "PRADEEPA LAKRUWAN" reveal, chapter titles) uses a **dissolve shader** (noise-threshold alpha, see Shader Plan) rendered via drei's `<Text>` (SDF-based, GPU-rendered, no external font-atlas asset pipeline needed — `drei`'s Text component generates the SDF at runtime from the loaded web font).

## 5. Interaction & cursor vocabulary

Cursor states: `EXPLORE` (default in-world), `ACTIVATE` (energy seeds, nodes), `ENTER` (project portals), `INSPECT` (architecture-mode components), `RUN` (request simulation trigger), `DEPLOY` (deployment sequence trigger), `TRANSMIT` (contact channels), `DRAG` (project-world selector). Implemented as an extension of the existing `MagneticCursor` (`data-cursor` attribute already supports arbitrary labels — this is additive, not a rewrite).

## 6. Motion language

- **Camera rig**: a single `CatmullRomCurve3` (or a small number of stitched curves, one per chapter) walked by `curve.getPointAt(scrollProgress)`, driven by GSAP ScrollTrigger `scrub`. This is the backbone of "scroll = journey."
- **Chapter transitions**: a "digital dissolve" — the outgoing scene's opacity/noise-threshold ramps down while the incoming scene's ramps up, over a short scrubbed window, so it reads as one continuous environment rather than a cut.
- **No aggressive scroll-jacking**: `smoothWheel` Lenis config stays as already tuned this session (feels natural); camera advances proportionally to scroll delta, never independently animates over multi-second durations that fight the user's own scroll input.
- **Direct chapter navigation** exists from the start (a persistent minimal journey nav) — camera-rail scrolling is the primary path, not the only path.

## 7. Pacing

Explicit intensity rating per chapter to guarantee contrast (per the brief's "quiet moments between high-intensity scenes"):

Entry (quiet, anticipatory) → Awakening (medium, building) → Root Network (high, technical) → Cloud Canopy (high, technical) → Project Worlds (medium, variable per project) → AI Grove (medium-high) → Operations City (high) → **About/observation deck (quiet — deliberate breath before the finale)** → Transmission (medium, resolving).

## 8. Sound — honest scope

No licensed or original audio assets exist in this repository, and I cannot generate or license real ambient soundscapes. What ships in the POC: a **muted-by-default** sound toggle wired to the Web Audio API producing simple procedural tones (short sine/triangle envelope blips) for discrete UI feedback only (seed activation, portal entry, copy-confirmation) — never continuous ambience. If you can supply real audio files (forest ambience loop, data-pulse one-shots, deployment ignition, portal transmission — see `ASSET_REQUIREMENTS.md`), I'll wire them into the same `SoundManager` with zero architecture change.

## 9. Accessibility strategy

- **"Skip experience"** on the entry screen routes straight to a fully semantic, server-rendered content view — the existing Cosmic-Systems-era content structure (About/Work/Engineering/Experience/Contact as real HTML) stays alive as this exact fallback, not deleted.
- **`prefers-reduced-motion`** gets the same treatment automatically (no camera rail, no parallax, static environment stills or plain gradients, direct navigation) — detected once, same pattern as `lib/device-tier.ts`.
- No information is ever hover-only or WebGL-only; every simulation has a text-equivalent description alongside it.
- Full keyboard operability: chapter nav, project-world selector (arrow keys), request-simulation trigger, all buttons — real focusable elements, not divs with click handlers.

## 10. Performance modes

Extends `lib/device-tier.ts`'s existing three-tier model into four named modes, adding a one-time FPS probe (render 30 frames of a throwaway scene, measure elapsed time) on top of the existing `hardwareConcurrency`/`deviceMemory`/viewport heuristics:

- **Cinematic** — full particle counts, bloom, dissolve shaders, all chapters load their full geometry.
- **Balanced** — ~40% particle count, simplified shaders (no bloom), lower instance counts.
- **Lite** — no WebGL camera-rail experience at all; CSS/canvas-2D chapter transitions between static illustrated stills; this *is* effectively the coarse-pointer/small-viewport case from the existing device-tier gate.
- **Reduced Motion** — the accessible semantic fallback (§9), independent of hardware capability.

Manual override control ships alongside the automatic recommendation (same UX pattern the brief asks for).

## 11. Mobile

Not a compressed desktop scene: shorter per-chapter camera paths, swipe (not drag) for the project-world selector, tap-to-reveal instead of hover, no device-tilt without explicit permission prompt, direct chapter jump always visible. Concretely this reuses the existing "lightweight tier" gate — mobile defaults to Lite unless a high-end device explicitly benchmarks into Balanced.

## 12. Scope decision for this pass

Per the brief's own Phase 1-4: **this pass delivers the audit (above), this bible, `STORYBOARD.md`, `ASSET_REQUIREMENTS.md`, `ARCHITECTURE.md`, and one small proof-of-concept** — the entry interaction, the awakening forest, the root-network transition, and one live request simulation — built at an isolated route so the live site is untouched until the direction is validated. Chapters 3-7 are storyboarded at overview depth only; full shot-by-shot storyboards and implementation happen one chapter at a time after the POC is approved, exactly as the brief's own Phase 6 specifies ("build one world at a time").
