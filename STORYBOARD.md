# Storyboard — The Living System

## Part A — Full chapter map (overview depth)

Detailed shot-by-shot storyboards for chapters 3-7 will be written one at a time, immediately before each is built (per `EXPERIENCE_BIBLE.md` §12). This table exists so the whole arc is visible now.

| Ch. | Environment | Focal point | User action | Info communicated | Mobile alt | Reduced-motion alt |
|---|---|---|---|---|---|---|
| 0 | Black void, distant pulse | Circular energy core | Press-and-hold ~1s | Brand entry | Same, shorter hold (touch) | Static entry screen, single "Enter" button |
| 1 | Bioluminescent forest | Four energy seeds | Hover/tap each seed, then all four | Backend/Cloud/Mobile/AI capability areas | Tap-to-reveal, no hover | Semantic heading + 4 capability cards |
| 2 | Root network | "Run a request" control | Select 1 of 5 scenarios | Backend architecture, real latency win | Same control, shorter camera move | Existing PipelineDiagram-style static diagram |
| 3 | Cloud canopy | "Deploy to production" + mode toggle | Trigger deploy sequence; switch Experience/Architecture mode | AWS services, CI/CD pipeline | Simplified single-path deploy anim | Static architecture list (already in `content/engineering.ts`) |
| 4 | 5 floating project worlds | World selector | Drag/scroll/arrow/swipe to focus, click/tap to enter | Project positioning + 1-line hook | Swipe, larger targets | Existing `Work.tsx` project list |
| 5 | AI grove | Node-graph builder | Connect Input→...→Output | How the AI pipelines are actually architected | Preset workflows, tap to reveal | Existing `AIAutomationLab` pipeline diagrams |
| 6 | Operations city | Incident simulator + skyline timeline | Trigger an incident type; scroll through skyline | Production ownership, experience timeline | Single incident type, tap | Existing `ExperienceOrbit` timeline |
| — | Observation deck (quiet) | Portrait/editorial composition | Passive, camera pauses | About/human moment | Same, static | Existing `About.tsx` content |
| 7 | Transmission portal | Contact channels | Hover for beam, click to copy/open | Contact | Tap, no hover-beam | Existing `ContactFinale.tsx` content |

## Part B — Detailed storyboard for the proof-of-concept scope

### Scene 0.1 — Void

- **Camera**: static, centered, looking at origin.
- **Environment**: pure `--void` background, a single faint point light pulsing at ~0.3Hz.
- **Focal point**: the point of light.
- **Typography**: "Every system begins with a signal." fades in over 1.5s, holds, fades out. Then "Enter the Living System" + the energy-core control appear.
- **User action**: none yet (read-only beat).
- **Audio**: silence (sound not yet permitted).
- **Transition in**: page load, no prior state.
- **Mobile**: identical — this scene is already minimal.
- **Reduced motion**: skip straight to a static "Enter" button with the same copy, no pulse animation (opacity-only, near-instant per the global `MotionConfig` behavior already verified this session).

### Scene 0.2 — The energy core (press-and-hold)

- **Camera**: static, slow push-in (subtle, capped scale) while held.
- **Environment**: the core is a small icosahedron, emissive, `--cyan`. A ring (2D SVG overlay, not 3D) traces progress.
- **User action**: `pointerdown` starts a 1000ms timer driving the ring's `stroke-dashoffset` and the core's `emissiveIntensity`/scale; `pointerup`/`pointerleave` before completion reverses both smoothly (no jarring snap-back).
- **On completion**: ring completes, core flashes, a short procedural tone plays (if sound enabled), camera "enters" the core (rapid scale/opacity transition standing in for a dolly-through), chapter 1 mounts underneath.
- **Secondary controls**: "Enter without sound" / "Enable sound" (two explicit buttons, not a single ambiguous toggle — matches the brief), "Skip experience" (routes to the semantic fallback).
- **Mobile**: identical interaction via touch (`pointerdown`/`pointerup` cover touch already); hold duration unchanged.
- **Reduced motion**: no press-and-hold at all — a single "Enter" button, immediate transition, no core animation.
- **Assets required**: none (procedural geometry + CSS/SVG ring).

### Scene 1.1 — Forest awakens

- **Camera**: begins low and close to the ground, rail moves forward and slightly upward as scroll progresses through the chapter.
- **Environment**: instanced "trees" (procedural tapered-cylinder trunks + icosahedron canopy clusters, emissive nodes scattered along branches), instanced firefly particles drifting via a cheap noise-driven offset, ground fog via Three's built-in `Fog`.
- **Focal point**: initially the nearest tree lighting up as the camera passes; the "living core" (a larger emissive sphere) visible in the distance throughout.
- **Typography**: "PRADEEPA LAKRUWAN" constructed via a dissolve shader on `drei`'s `<Text>` (SDF), triggered once the camera passes a scroll-progress threshold; then "FULL STACK SOFTWARE ENGINEER"; then the tagline; then the location line — each a separate scrubbed reveal, not simultaneous.
- **User action**: pointer-move gives ±limited-degree parallax on the camera's look-at target (capped, never full free-look); hovering a tree gives a subtle bend/emissive-brighten reaction.
- **Transition out**: at the chapter's scroll end, environment begins the dissolve toward Scene 2.1 (see below) — trees fade, root-tunnel geometry fades in, camera continues the same rail downward.
- **Mobile**: no pointer-parallax (no hover concept on touch); camera rail shortened; text reveals unchanged.
- **Reduced motion**: static illustrated gradient background, all four text lines present immediately in normal document flow (no 3D scene mounted at all).
- **Assets required**: none — all procedural. (A real headshot/photo is not used here; that's reserved for the observation-deck/About chapter per the existing content gap already documented in `README.md`.)

### Scene 2.1 — Root network + request simulation

- **Camera**: continues descending from Scene 1.1's rail, levels out looking down a "tunnel" of glowing root structures.
- **Environment**: instanced tube-like roots (simple bent-cylinder instances along a few Catmull-Rom curves), a handful of "database crystal" nodes (emissive icosahedra) placed at curve endpoints, labeled via `drei`'s `<Html>` (same technique as the retired `CosmicScene`'s node labels).
- **Focal point**: a labeled pipeline — Client → API Gateway → Auth → Domain Service → Cache → Database → Async Queue → Response — laid out along one root curve.
- **User action**: a "Run a request" control (real `<button>`, in-DOM, positioned over the canvas) launches a small glowing packet that travels `curve.getPointAt(t)` via a GSAP-tweened `t`, lighting each node as it passes and popping a short label/latency figure at that node.
- **Scenario select**: for the POC, one scenario ships fully (cached API response); the UI lists the other four from the brief (database query, background report, payment transaction, mobile notification) as selectable but the POC only needs one working end-to-end to prove the pattern — the remaining four are mechanically identical (same curve/packet system, different node labels/timings) and get filled in during full chapter implementation.
- **Reduced motion / accessible equivalent**: the exact same information already exists as a real DOM description (a simple ordered list of the pipeline stages with their one-line explanations) rendered alongside the canvas, not only inside it.
- **Assets required**: none.
