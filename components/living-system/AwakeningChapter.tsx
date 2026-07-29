"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ExperienceMode } from "@/lib/living-system/device-mode";
import Forest from "./Forest";
import FireflyField from "./FireflyField";
import SpatialIdentity from "./SpatialIdentity";

export default function AwakeningChapter({
  progressRef,
  mode,
  strainRef,
}: {
  progressRef: React.MutableRefObject<number>;
  mode: ExperienceMode;
  strainRef?: React.MutableRefObject<number>;
}) {
  // Doubled from the first pass — the critique's "empty void" complaint held
  // even after the material/lighting fixes: too many camera angles simply
  // had no tree in frame. Cheap to raise since canopy/trunk are each one
  // instanced draw call regardless of count.
  const treeCount = mode === "cinematic" ? 84 : 44;
  const fireflyCount = mode === "cinematic" ? 300 : 150;

  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const point1Ref = useRef<THREE.PointLight>(null);
  const point2Ref = useRef<THREE.PointLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);

  // Light intensity is diegetic here, not mood — it's the system's health
  // made visible. Every source in the scene dims together under strain, not
  // just one dramatic key light, or the incident reads as "someone turned
  // the brightness down" rather than "the system is failing."
  useFrame(() => {
    const strain = strainRef?.current ?? 0;
    const dim = 1 - strain * 0.82;
    if (ambientRef.current) ambientRef.current.intensity = 0.16 * dim;
    if (dirRef.current) dirRef.current.intensity = 1.4 * dim;
    if (point1Ref.current) point1Ref.current.intensity = 0.7 * dim;
    if (point2Ref.current) point2Ref.current.intensity = 0.5 * dim;
    if (hemiRef.current) hemiRef.current.intensity = 0.25 * dim;
  });

  return (
    <group>
      <ambientLight ref={ambientRef} intensity={0.16} />
      <directionalLight
        ref={dirRef}
        position={[6, 14, -4]}
        intensity={1.4}
        color="#DDEBFF"
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-camera-near={1}
        shadow-camera-far={34}
      />
      <pointLight ref={point1Ref} position={[0, 8, -10]} intensity={0.7} color="#4CD8E0" />
      <pointLight ref={point2Ref} position={[-6, 3, -30]} intensity={0.5} color="#9B7CFF" />
      <hemisphereLight ref={hemiRef} args={["#1B3A2A", "#05070A", 0.25]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -60]} receiveShadow>
        <planeGeometry args={[400, 500]} />
        <meshStandardMaterial color="#05070A" roughness={1} />
      </mesh>
      <Forest progressRef={progressRef} treeCount={treeCount} strainRef={strainRef} />
      <FireflyField count={fireflyCount} strainRef={strainRef} />
      <SpatialIdentity progressRef={progressRef} />
    </group>
  );
}
