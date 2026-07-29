# Asset Requirements — The Living System

## Principle

Everything in the proof-of-concept and the initial chapter builds is **procedurally generated** — no external 3D models, textures, or audio files are required to ship it. The list below separates what's already handled procedurally from what would only be needed if you want to raise fidelity later, and what's a genuine content gap independent of this rebuild.

## 3D models / Blender scenes

**Not required.** No Blender pipeline exists in this project and none is being introduced. Every environment element (trees, roots, database crystals, floating islands, city buildings, project portals) is built from primitive geometry (cylinders, icosahedra, tubes along curves) combined via instancing and procedural placement (seeded randomness, not hand-placed).

*If you later want higher visual fidelity* (sculpted vegetation, a real 3D device model for the Orivet phone scene, etc.), that requires either commissioning/sourcing licensed glTF assets or producing them in Blender — genuinely out of scope for this format. Flagging it, not blocking on it: the procedural version ships first and can be swapped later without an architecture change (the components accept geometry as props).

## Images / screenshots

Already-known gaps (carried over from the Cosmic Systems build, unchanged):
- No professional headshot — needed for the Chapter "observation deck" / About moment described in the brief. Until supplied, that scene uses an editorial typographic/environmental composition instead of a photo, same decision as before.
- No CV/resume file — Contact keeps the `mailto:...?subject=CV%20Request` pattern.
- `project.live` / `project.github` are `null` for all projects in `content/projects.ts` — those links don't render until real URLs exist.

Existing assets kept as-is: `public/images/projects/M-auto.PNG`, `Orivet.PNG`.

## Audio

**None exist in the repository and I cannot create or license real ones.** The POC's sound toggle wires to Web Audio API oscillators for short procedural UI blips only (no ambience, no music, no foley) — see `EXPERIENCE_BIBLE.md` §8.

If you want the real layered soundscape the brief describes (forest ambience, data pulses, deployment ignition, city ambience, portal transmission), I need actual audio files (royalty-free-licensed or your own) — format: compressed (`.mp3`/`.ogg`), short loops for ambience (10-30s, seamlessly loopable), 1-3s one-shots for event sounds. Drop them in `public/audio/` with a name matching the event and I'll wire them into `SoundManager` — no rearchitecture needed either way.

## Fonts

**No new fonts needed.** Reusing the already-loaded, already-licensed set: Space Grotesk (display), Inter (body), JetBrains Mono (technical/code labels) — all via `next/font/google`, already in `app/layout.tsx`.

## Textures

**Not required.** Bioluminescence, fog, and the dissolve/reveal effects are done with procedural noise inside GLSL shaders (simplex/value noise generated in-shader), not sampled image textures. No KTX2/texture-compression pipeline is needed because there are no textures to compress.

## What this means for Draco/Meshopt/KTX2

The brief's 3D-performance section assumes a glTF asset pipeline. Since no glTF models exist in this plan, Draco/Meshopt geometry compression and KTX2 texture compression are **not applicable** right now — there's nothing to compress. If real 3D assets get commissioned later, this section gets revisited alongside them.

## Summary table

| Asset type | Status |
|---|---|
| 3D models | Not needed — procedural |
| Textures | Not needed — procedural noise |
| Audio (ambience/effects) | **Gap — needs real files from you, or ships silent-by-default with tone-only feedback** |
| Headshot photo | **Known gap, carried over** |
| CV/resume file | **Known gap, carried over** |
| Fonts | Already have everything needed |
| Project screenshots | Have 2 of 10 projects; rest use procedural mockups (already built this session) |
