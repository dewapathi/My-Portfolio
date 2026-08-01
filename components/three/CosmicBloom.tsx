"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

/**
 * Isolated so it can be dynamically imported — @react-three/postprocessing
 * is a meaningful chunk of JS that only "high" tier devices ever render.
 */
export default function CosmicBloom() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.85}
        luminanceThreshold={0.12}
        luminanceSmoothing={0.35}
        mipmapBlur
      />
    </EffectComposer>
  );
}
