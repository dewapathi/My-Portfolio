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
        intensity={0.55}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
    </EffectComposer>
  );
}
