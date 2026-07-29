"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VERTEX = /* glsl */ `
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aSize;
  uniform float uTime;
  uniform float uStrain;
  varying float vFlicker;

  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * aSpeed + aPhase) * 0.35;
    pos.x += cos(uTime * aSpeed * 0.6 + aPhase * 1.3) * 0.28;
    // Under strain the fireflies sink toward the ground rather than simply
    // dimming in place — an event leaving the world, not a light switching
    // off. By the time strain reaches 1 they've sunk well below the canopy.
    pos.y -= uStrain * uStrain * 2.6;
    vFlicker = 0.4 + 0.6 * (0.5 + 0.5 * sin(uTime * aSpeed * 2.2 + aPhase * 4.0));
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (9.0 / -mvPosition.z) * (0.6 + vFlicker * 0.4) * (1.0 - uStrain * 0.6);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uStrain;
  varying float vFlicker;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, alpha * vFlicker * 0.95 * (1.0 - uStrain));
  }
`;

/** Individually-flickering soft glow sprites, not a uniform PointsMaterial
 *  dot field — the first critique pass flagged fireflies as looking
 *  mechanically identical to each other. */
export default function FireflyField({
  count,
  strainRef,
}: {
  count: number;
  strainRef?: React.MutableRefObject<number>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, phases, speeds, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (((i * 53) % 100) / 100) * 44 - 22;
      positions[i * 3 + 1] = ((i * 17) % 60) / 10 + 0.2;
      positions[i * 3 + 2] = -((((i * 71) % 100) / 100) * 62) - 2;
      phases[i] = (i * 12.9898) % (Math.PI * 2);
      speeds[i] = 0.25 + ((i * 7) % 10) / 12;
      sizes[i] = 5 + ((i * 13) % 10);
    }
    return { positions, phases, speeds, sizes };
  }, [count]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uStrain.value = strainRef?.current ?? 0;
    }
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uStrain: { value: 0 },
          uColor: { value: new THREE.Color("#D9A25C") },
        }}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
      />
    </points>
  );
}
