"use client";

import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/**
 * The graded final image. ChromaticAberration was removed outright — at the
 * offsets needed to be "subtle," it was invisible; at the offset that was
 * actually visible, it read as RGB channel-separation glitching on every
 * high-contrast emissive edge in the scene (tree bands, canopy rim, the
 * core), which is exactly the "rendering glitch" look this chapter was
 * criticized for. Bloom's threshold is raised so only genuinely bright
 * emissive surfaces bloom — it was catching general midtones before,
 * smearing the whole image into a haze instead of picking out light
 * sources.
 */
export default function LivingSystemPost() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.32} luminanceThreshold={0.42} luminanceSmoothing={0.25} mipmapBlur />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.025} />
      <Vignette eskil={false} offset={0.32} darkness={0.55} />
    </EffectComposer>
  );
}
