"use client";

import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

/**
 * The graded final image — a raw WebGL canvas with bloom and nothing else
 * reads as a tech demo, not a frame of film. Subtle by design: this is a
 * lens/lighting decision, not a filter slapped on top.
 */
export default function LivingSystemPost() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.5} luminanceThreshold={0.22} luminanceSmoothing={0.4} mipmapBlur />
      <ChromaticAberration offset={new Vector2(0.0008, 0.0008)} radialModulation={false} modulationOffset={0} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.035} />
      <Vignette eskil={false} offset={0.28} darkness={0.65} />
    </EffectComposer>
  );
}
