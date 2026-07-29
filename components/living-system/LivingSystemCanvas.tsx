"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import CameraRig from "./CameraRig";
import AwakeningChapter from "./AwakeningChapter";
import { createJourneyCurve } from "@/lib/living-system/curve-paths";
import type { ExperienceMode } from "@/lib/living-system/device-mode";

// Plain @react-three/postprocessing components, not an
// @react-three/fiber-reconciler module — the dynamic-import exception
// already proven safe for this exact chunk-splitting pattern this session.
const LivingSystemPost = dynamic(() => import("./LivingSystemPost"), { ssr: false });

/** Fog is read from `scene.fog` by the renderer every frame, but `<fog>`
 *  itself has no per-frame hook — this mutates the same fog object the JSX
 *  attaches, tightening it as the incident builds so the world visibly
 *  closes in rather than just dimming. */
function StrainFog({ strainRef }: { strainRef: React.MutableRefObject<number> }) {
  const { scene } = useThree();
  useFrame(() => {
    const fog = scene.fog as THREE.Fog | null;
    if (!fog) return;
    const s = strainRef.current;
    fog.near = THREE.MathUtils.lerp(6, 2.5, s);
    fog.far = THREE.MathUtils.lerp(42, 15, s);
  });
  return null;
}

function Scene({
  mode,
  masterProgressRef,
  awakeningProgressRef,
  strainRef,
  frozen,
}: {
  mode: ExperienceMode;
  masterProgressRef: React.MutableRefObject<number>;
  awakeningProgressRef: React.MutableRefObject<number>;
  strainRef: React.MutableRefObject<number>;
  frozen: boolean;
}) {
  const curve = useMemo(() => createJourneyCurve(), []);
  // Matches LivingCore's group position in Forest.tsx — the incident freezes
  // the camera looking at the one fixed, unmissable focal point in the
  // scene, not wherever the scroll happened to leave the tangent pointing.
  const incidentFocus = useMemo(() => new THREE.Vector3(0, 3.2, -58), []);

  return (
    <>
      {/* Attached here, directly under the Canvas-created scene root — nesting
          this inside a <group> sets `group.fog`, which Three's renderer never
          reads (only `scene.fog` is consulted), so the fog would silently do
          nothing. */}
      <fog attach="fog" args={["#05070A", 6, 42]} />
      <StrainFog strainRef={strainRef} />
      <CameraRig
        curve={curve}
        progressRef={masterProgressRef}
        allowParallax={mode === "cinematic"}
        frozen={frozen}
        strainRef={strainRef}
        focusPoint={incidentFocus}
      />
      <AwakeningChapter progressRef={awakeningProgressRef} mode={mode} strainRef={strainRef} />
      {mode === "cinematic" && <LivingSystemPost />}
    </>
  );
}

export default function LivingSystemCanvas({
  mode,
  masterProgressRef,
  awakeningProgressRef,
  strainRef,
  frozen,
}: {
  mode: ExperienceMode;
  masterProgressRef: React.MutableRefObject<number>;
  awakeningProgressRef: React.MutableRefObject<number>;
  strainRef: React.MutableRefObject<number>;
  frozen: boolean;
}) {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const onVisibility = () => setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Canvas
      dpr={mode === "cinematic" ? [1, 1.5] : [1, 1.25]}
      frameloop={frameloop}
      shadows={mode === "cinematic"}
      camera={{ position: [0, 1.6, 6], fov: 50 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#05070A"]} />
      <Suspense fallback={null}>
        <Scene
          mode={mode}
          masterProgressRef={masterProgressRef}
          awakeningProgressRef={awakeningProgressRef}
          strainRef={strainRef}
          frozen={frozen}
        />
      </Suspense>
    </Canvas>
  );
}
