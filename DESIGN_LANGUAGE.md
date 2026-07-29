# The Living System — Design Language

Every rule below is extracted from what actually ships in Chapter 1 (`components/living-system/`), verified in a production build. This is not a mood board — it's the set of parameters, easing curves, and patterns that Chapter 2 onward must reuse rather than reinvent. When a future chapter needs "a new kind of motion," the first question is which section below it's a variant of, not whether to invent something new.

**The one rule everything else follows: nothing in this world moves instantly, uniformly, or in isolation.** Every motion has inertia (it lerps toward a target, it doesn't jump), asymmetry (two overlaid frequencies, not one clean sine wave), and a cause (proximity, scroll progress, or time — never decoration for its own sake). A tree that bends because you scrolled past it is in-language. A tree that spins for no reason is not.

## 1. Camera

The camera is the narrator. It never behaves like a rail-mounted rendering fixture.

- **Position**: lerped toward the curve target every frame, `position.lerp(target, 0.06)` — never snapped. This is the single most important number in the whole system: 0.06 reads as weighted, physical follow-through; 1.0 reads as a teleporting robot.
- **Breathing**: two sine waves at different frequencies and amplitudes, summed, applied to the lookAt target and echoed at 30% strength on position itself:
  `breatheX = sin(t·0.35)·0.055 + sin(t·0.9)·0.02`
  `breatheY = cos(t·0.28)·0.04 + sin(t·1.3)·0.015`
  Two frequencies, not one — a single sine reads as a metronome; two overlapping ones read as a body breathing.
- **FOV breathing**: `50 + sin(t·0.18)·0.6`, itself lerped in at 0.02/frame. Barely perceptible consciously, felt physically — this is what separates "camera on a track" from "someone holding a camera."
- **Parallax**: `pointer.x·0.6 / pointer.y·0.3` added to the lookAt target, cinematic tier only. Gated off entirely below cinematic — it's a nicety, never load-bearing for legibility.
- **Never anchor content to a fixed world position and assume the camera's closing speed is safe.** This broke Chapter 1's identity reveal (`SpatialIdentity.tsx`) — the camera closed the distance faster than the reveal's own duration window. The fix, and the rule going forward: anything that must stay legible for a scroll-driven duration is anchored to the camera (constant distance, billboarded via `camera.quaternion`), not to a static point the camera drives past.

## 2. Typography

Text is constructed, not faded.

- **Word-level reveal**, not line- or paragraph-level: each word gets its own progress window (`startAt`, `duration`) inside the parent's scroll progress, not a single shared opacity.
- **Construction, not fade-in**: opacity ramps via `smoothstep`, paired with a small upward settle (`position.y -= (1-eased)·0.22`) and a scale creep (`0.94 → 1.0`). The text should look like it's arriving and settling, not materializing from nothing.
- **The energy sweep**: a thin additive-blended plane sweeps upward through the text block in sync with its reveal window (`EnergySweep` in `SpatialIdentity.tsx`) — this is the signature "constructed by energy, not rendered by a browser" beat. Reuse this exact technique (a synced sweep plane) for any headline reveal in later chapters, not a generic fade.
- **Every reveal needs an explicit fade-out**, not just a fade-in. Text that reaches opacity 1 and stays there forever reads as forgotten scenery once the camera moves on. `overallFadeRef` in `SpatialIdentity.tsx` — hold through the content's window, then dissolve — is the pattern: reveal → hold → dissolve, always three phases, never two.

## 3. Particles

One shader-driven `Points` draw call, never one mesh per particle.

- Per-particle **individuality via buffer attributes** (`aPhase`, `aSpeed`, `aSize`), not per-particle randomness at the JS level — every firefly flickers and drifts on its own schedule from one draw call.
- **Flicker**: `0.4 + 0.6·(0.5+0.5·sin(t·speed·2.2 + phase·4.0))` — never binary on/off, never a uniform strobe across all particles.
- **Soft circular falloff**, not hard-edged points: `smoothstep(0.5, 0.0, length(gl_PointCoord-0.5))` in the fragment shader, additive blending, `depthWrite: false`.
- **Size scales with the divisor tuned to the scene's actual scale** — this was a real, shipped bug (divisor `180.0` instead of `9.0` turned fireflies into giant blurry orbs). Whenever a new particle field is added to a new chapter, render one test frame at the actual camera distance before tuning anything else — point-size math does not transfer between scenes of different scale.

## 4. Environment — "breathing"

Nothing ambient is static.

- **Pulsing light sources** use a single slow sine (`0.85 + sin(t·0.55)·0.15` on the Living Core) — slower than camera breathing, so the two never sync into a distracting beat pattern.
- **Approach-based intensification**: the Core's emissive intensity and its point light both lerp toward a target that increases as `progressRef` approaches a threshold (`approach = clamp(progress/0.5, 0, 1)`) — the world visibly anticipates the visitor arriving, not just visually existing.
- **Foreshadowing via opacity, not visibility toggles**: `RootVeins` sit in the scene from the start at low opacity (0.08) and brighten as progress crosses a threshold — objects that matter later are always present, just quiet, never popped in.
- **Fog must be attached to the scene root, never nested inside a `<group>`.** `<fog attach="fog">` sets whatever object it's nested in — inside a group, that's a silent no-op, since Three's renderer only reads `scene.fog`. This was a real, shipped bug that let Chapter 2 content bleed through Chapter 1's frame. Every future chapter's fog goes directly under `<Canvas>`'s scene, as a sibling to the camera rig, never inside a chapter's own wrapper group.

## 5. World reaction (proximity)

The world acknowledges the visitor, it doesn't just get flown past.

- **Pointer → ground-plane raycast → nearest-object lerp** is the whole pattern (`ProximityMarker` in `Forest.tsx`): project the pointer onto a ground plane, find the nearest interactive object within a threshold, lerp a marker toward it, lerp its opacity toward 0.5 (never snap to full). This is the template for any "the environment notices you" moment in later chapters (a root node highlighting as you approach it in Chapter 2, a service block glowing under the cursor in Chapter 3), not a new mechanism per chapter.
- Reaction is always **continuous and proportional** (lerped scale/opacity), never a discrete hover-triggered state swap.

## 6. Materials — the "programmer-made" tax

A smooth primitive with a sharp specular highlight is the single fastest way to make procedural geometry read as placeholder art. Every organic surface (canopy, ground clutter, anything meant to read as "grown" rather than "manufactured") gets:

- **Hash-noise vertex displacement** along each vertex's own normal (see `createFoliageGeometry` in `Forest.tsx`) — never a bare `IcosahedronGeometry`/`SphereGeometry` at full smoothness.
- **`flatShading: true`, `metalness: 0`, `roughness ≥ 0.85`** — kills the glossy specular dot that reads as plastic. Manufactured surfaces (trunks, structural/UI elements) can stay smooth and slightly more reflective; organic ones cannot.
- **Contact shadows are geometry, not a hope that the shadow map reaches that far.** Real-time shadow-casting has a tight, deliberately small frustum for performance — most of a populated scene sits outside it. A cheap per-instance soft dark disc under anything that should read as "standing on the ground" (see `ContactShadows` in `Forest.tsx`) guarantees grounding regardless of shadow-camera coverage.

## 7. Color grading (the post-processing recipe)

One `EffectComposer` stack, cinematic tier only, four effects in this order and roughly this ratio — this is the "filmic" signature, reuse the stack rather than re-deriving effect choices per chapter:

`Bloom(intensity 0.5, threshold 0.22, mipmapBlur)` → `ChromaticAberration(offset ~0.0008)` → `Noise(SOFT_LIGHT, opacity 0.035)` → `Vignette(darkness 0.65)`.

Bloom carries the "bioluminescent" identity; chromatic aberration and grain are barely-conscious texture, not a visible effect on their own; vignette focuses attention without a hard mask.

## 8. Sound

Procedural only (no licensed audio in this repo) — the rule is what procedural sound is allowed to do:

- **Continuous ambience** (the drone in `SoundManager.tsx`) is dual-oscillator through a lowpass filter with a slow LFO modulating the cutoff — never a static tone. Ramp in over ~2.5s (`exponentialRampToValueAtTime`), ramp out over ~1.2s on chapter exit — never hard-cut.
- **Discrete feedback tones** (entry confirmation, request-run trigger) are short single-envelope blips tied to a specific user action, never looping, never layered with the ambience in a way that competes with it.
- Sound is opt-in and silent by default; every sound-bearing interaction has a fully silent equivalent that loses no information.

## 9. Cursor & buttons

- **Cursor states are verbs, not shapes** (`EXPLORE`, `ACTIVATE`, `ENTER`, `RUN`, etc., via `MagneticCursor`'s `data-cursor` attribute) — a future interactive object declares what pressing it *does*, not what it looks like.
- **Buttons move toward the cursor before the cursor reaches them** (magnetic pull, already the pattern in the existing site's buttons) — the same lerp-toward-target philosophy as the camera, applied at UI scale. A button that only reacts on exact hover reads as flat; one with a few pixels of magnetic pull toward a nearby cursor reads as alive.
- **Press state is a scale-down + glow increase, held while pressed, released with a small overshoot** — mirrors the entry gate's press-and-hold circular progress ring (`EntryGate.tsx`): visible accumulation while held, a confirming pulse on completion, never an instant binary state change.

## 10. Scene transitions ("portals")

- The one shipped example, `DissolveVeil` in `LivingSystemCanvas.tsx`: a hash-noise dissolve shader (`uProgress` uniform) on a plane locked to the camera, visible only inside a narrow scrubbed window around the chapter boundary (`clamp((progress-0.42)/0.16, 0, 1)`), invisible otherwise. This is the template for *every* chapter-to-chapter transition and any "portal" a visitor walks/scrolls through: a noise-threshold dissolve gated to a narrow progress window, not a hard cut and not a generic crossfade.
- A transition is **never wider than it needs to be** — 0.16 of scroll progress here. A slow, lingering dissolve reads as sluggish; the goal is a transition felt but not dwelt on.

## 11. Performance-tier scaling

Every chapter scales the same four knobs by tier — introduce a fifth knob only if the first four genuinely can't express the needed cut:

1. **Instance/particle counts** (trees, fireflies) — roughly halve balanced vs. cinematic.
2. **Post-processing** — full `EffectComposer` stack on cinematic only; balanced/lite get none.
3. **Shadows** — `castShadow`/`receiveShadow` + shadow-mapped lights only on cinematic.
4. **DPR cap** — `[1, 1.5]` cinematic, `[1, 1.25]` balanced/lite.

Tier detection must be a genuine GPU-bound probe (`measureRenderFps` in `lib/living-system/device-mode.ts` — compiles and runs an actual fragment shader, forces sync via `readPixels`), never a bare `requestAnimationFrame` throughput loop. An empty rAF loop ticks at display refresh rate regardless of whether WebGL exists at all, so it can't distinguish a real GPU from software rendering — the exact gap that let a weak/software-rendered device get handed the full cinematic pipeline undetected.

## 12. Before adding anything to a new chapter, check against this list

- Does it move with inertia (lerp) rather than snapping? If not, add a lerp factor in the 0.05–0.15 range as a starting point.
- Does it have two overlaid frequencies rather than one clean sine wave, if it's ambient/idle motion?
- If it's a reveal, does it have a hold and an explicit fade-out, not just a fade-in?
- If it's organic geometry, does it have noise displacement and `flatShading`, not a bare smooth primitive?
- If it's meant to be seen for a scroll-driven duration, is it anchored to the camera or otherwise safe against the camera's actual closing speed — not just "far enough at t=0"?
- Is fog (or anything else meant to affect the whole scene) attached as a direct child of the Canvas's scene, not nested inside a chapter's wrapper group?
- Do instanced meshes have `frustumCulled={false}` (or an explicitly recomputed bounding volume)? Three.js culls `InstancedMesh` against its *untransformed* base geometry's bounding sphere — a tiny sphere at local origin that has no idea the instance buffer scatters copies across the whole scene. This silently deleted most of Chapter 1's forest for an entire review cycle before being traced to its root cause; check it first, not last.
- Does every sound loop ramp, not hard-cut?
- Does the new element degrade through all four performance tiers using the existing four knobs (§11), rather than inventing a fifth?
