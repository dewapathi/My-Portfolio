# Chapter 1 — Art Direction Bible

Every choice below is tied to a specific beat in `STORY_BIBLE.md`. Nothing here exists as generic mood — if a rule doesn't serve a specific moment in the story, it doesn't belong in this document. This directly answers the earlier critique that the whole chapter currently runs on one lighting setup and one palette from first frame to last: that ends here.

## Core principle: light is diegetic, not decorative

Light intensity in this world is not mood lighting — it *is* the measurement of system health. Brighter means healthier and faster. Dimmer means strained. Total absence means the one unforgettable moment. This single rule is what stops "atmospheric" from being a synonym for "arbitrary" — every lighting change has to be justifiable as "the system got better" or "the system got worse," never "this looked nice here."

## Color progression, stage by stage

The single biggest visual-identity fix: the palette has an arc now, not a temperature.

1. **Curiosity** — near-total black. One point of light, a restrained cool cyan, desaturated hard (not the saturated `#4CD8E0` used everywhere today — closer to a dim `#2A5C60`). Nothing else exists. The world hasn't earned color yet.
2. **Discovery** — the cyan grows, still restrained. The first principle-glyph (`Design before building.`) appears in a *distinct* hue family from the system's own color — a muted warm gold (`#C9A567`-range), never the cyan. Evidence-of-thinking and system-state must never share a palette, or they'll read as the same kind of object.
3. **Responsibility** — the cool palette begins losing saturation as strain rises, drifting toward a sickly grey-amber, as if color itself is being spent under load. This is the first moment color is allowed to look *wrong* on purpose.
4. **Failure** — color collapses toward near-monochrome grey-blue as the symptom clears (Restart/Scale/Rollback path) or toward true black (Investigate path, leading into the blackout). Rain, if visible before the cut to black, is cold and desaturated — the first "weather" in the chapter, and the only place blue-grey rain belongs.
5. **The blackout** — no color. Not "very dark" — actually black, matching the void of Curiosity almost exactly. This is intentional: the chapter's two absences of color (the beginning and the blackout) should look nearly identical, so the loop registers even subconsciously.
6. **Recovery** — color returns from the ground up, cyan first, following the direction light already returns in. Muted at first, matching stage 2's restraint, not stage 6's eventual richness — recovery earns its brightness gradually, it doesn't arrive fully saturated.
7. **Mastery** — the palette must visibly exceed anything seen earlier in the chapter: fuller cyan, and for the first and only time, a warm white-gold highlight family (distinct from both the cool system color and the gold principle-glyphs) on whatever reads as "alive and fast" in this moment (particles, canopy edges). This is the only stage allowed to look genuinely bright.
8. **Reflection** — mastery's palette, quieted — same hues, lower intensity, slower movement. Contrast through calm, not through a new color.
9. **Connection** — the cool system cyan and the warm gold principle color are the only two hues allowed to physically merge on screen, into the soft white (`#F3F4F9`, consistent with the existing type color) the name is built from. The name is visually made of both halves of the story, literally.

No other hues exist in Chapter 1 outside this list. If a future addition wants a new color, it needs a beat-level justification first, not a "this looked nice" one.

## Lighting language

- **One rule above all others: every light source's intensity must be attached to a real value already driving the story (health, strain, recovery progress) — never an independent designer-chosen brightness.** This was true of the Living Core's approach-based brightening already; it now applies to the whole scene, not one object.
- **Curiosity → Discovery**: a single point light, intensity near zero, rising just enough to make the seed and the first principle-glyph legible and nothing else. No fill light. Total contrast is correct here.
- **Responsibility**: introduce a second, competing light source that reads as "trying too hard to keep things lit" — flickering slightly, losing ground as strain rises, rather than a clean directional key. Instability in the light itself should be legible before the incident hits.
- **Failure**: light doesn't cut cleanly to black — it should visibly lose a fight, guttering rather than switching off, for roughly a second, before either the partial-symptom-clear (quick-fix path) or the full blackout (Investigate path).
- **The blackout**: zero light sources active, not merely dimmed — an actual absence, not a near-black ambient value. This has to be verified visually, not assumed from a low intensity number.
- **Recovery → Mastery**: light returns as a single source at first (the fix, specifically) before other lights rejoin — light rejoining the world should look like infrastructure coming back online in sequence, not a scene-wide fade-up.
- **Reflection**: the most evenly-lit moment in the chapter — no strain-flicker, no single dramatic key, just calm, settled illumination. This is the one place "conventional good lighting" is correct, because everything before it has been unconventional on purpose.

## Materials

- **Organic surfaces (canopy, undergrowth) physically respond to story state**, not just emissive-intensity lerps: during Responsibility they should read as visibly compressed/drooping (a scale or displacement change, not just dimmer color), and during Mastery they should exceed their original scale/fullness from Curiosity/Discovery — the material itself telling the strain-then-triumph story, independent of lighting.
- **Manufactured/structural surfaces** (the four choice-glyphs, any deployment/automation motif) stay smooth, more reflective, closer to the "designed object" language already established in `DESIGN_LANGUAGE.md` §6 — the contrast between grown/organic and built/designed materials should itself communicate "this part of the world was made on purpose."
- **Nothing gets a new material without a symbolic justification** — nothing is "add a nice texture here," everything is "this needs to look built vs. grown, healthy vs. strained, before vs. after."

## Environmental symbolism

- **Rain = incident, and only appears once, right before the blackout or alongside the symptom-clear path.** It is not ambient weather; if it's raining, something is currently wrong. It should never reappear later in the chapter, or its meaning dilutes.
- **Root-glow = data/information flowing**, unchanged from the current build — already correct, keep as-is.
- **The four choice-glyphs are diegetic objects embedded in the strained structure itself**, not a floating HTML menu: a closed loop (Restart), a branching duplicate (Scale), a backward-curving arrow (Rollback), a lens/aperture shape (Investigate) — lit only at the moment of the choice, dimmed and inert otherwise so they don't read as a persistent UI element sitting outside the world.
- **The patch of ground that never fully recovers on the quick-fix path** is the environment's way of saying "the cause is still there" without another line of text — a small, quiet, permanent flaw the visitor can go back and notice.

## Visual motifs

- **Principle-glyphs** (`Understand first.`, `Design before building.`, etc.) use the same construction/energy-sweep technique from `DESIGN_LANGUAGE.md` §2, but at roughly half the scale of the name reveal, and always spatially anchored to the object demonstrating them (near the blueprint-shape, near the automation completing itself) — never centered HUD text floating independent of the world. If a principle-glyph could be moved anywhere on screen without losing meaning, it's being staged wrong.
- **The name** is the only text in the chapter allowed full-screen dominance, and only at Connection, built from both the cyan and gold light already established.
- **The single statistic** (`Latency ↓ 60%`) gets its own brief, isolated visual treatment distinct from both the principle-glyphs and the name — it's a measurement, not an identity fragment or a discovery, and should look like one (closer to the instrumentation-glyph language introduced at Mastery than to typography used elsewhere).

## Composition rules

Range is the fix for the "every frame looks the same" critique — each stage gets a distinct compositional register, not just a distinct color:

1. **Curiosity**: extreme close, tiny subject against overwhelming black — macro loneliness.
2. **Discovery**: medium shot, camera and subject moving together at the same modest scale.
3. **Responsibility**: wide — the full extent of the strain should be visible at once, so the scale of the problem registers before the choice is made.
4. **Failure**: composition collapses toward center-frame tightness right before the cut to black — the world visually closing in.
5. **The blackout**: no composition. Confirmed literally — nothing should be positioned, lit, or framed, because nothing exists on screen.
6. **Recovery**: the camera slowly widens/lifts as light returns, revealing scale gradually rather than all at once.
7. **Mastery**: the single widest, most open composition in the entire chapter — this is the visual payoff, and it should be unambiguously the biggest frame anywhere in Chapter 1.
8. **Reflection**: static, centered, symmetrical — order after the chapter's only chaos.
9. **Connection**: level, centered, name in the middle of frame, a visible path continuing ahead — an invitation shot, not a hero shot.

## What this document does not do

It does not specify camera movement paths, timing, or easing (that's `CAMERA_BIBLE.md`), does not specify what the visitor can actually do with a mouse or keyboard beyond the four choice-glyphs already fixed by the story (that's `INTERACTION_BIBLE.md`), and does not specify sound (that's `SOUND_BIBLE.md`). Every rule above is a constraint those documents have to work inside, not a suggestion they're free to override.
