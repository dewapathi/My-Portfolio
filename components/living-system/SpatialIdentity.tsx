"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

type TextRef = THREE.Object3D & { fillOpacity: number };
type ProgressRef = React.MutableRefObject<number>;

function localProgress(progressRef: ProgressRef, startAt: number, duration: number) {
  return THREE.MathUtils.clamp((progressRef.current - startAt) / duration, 0, 1);
}

// A fixed WORLD position for this text was the first version's approach, and
// it broke: the camera closes the distance to a static point far faster than
// the reveal choreography assumed, so by the time the tagline finished fading
// in the camera had already flown almost on top of the text, blowing it up
// into giant, off-screen-cropped letters. Anchoring to the camera instead
// (constant distance, billboarded to face it every frame) makes the reveal
// legible regardless of how fast the curve moves, while still inheriting the
// camera's own breathing/parallax motion so it doesn't read as a flat HUD.
const ANCHOR_DISTANCE = 11;

/** A thin additive-blended strip that sweeps upward through a text block as
 *  it reveals — "constructed by energy lines," not a plain opacity fade.
 *  Reads progressRef directly every frame — the earlier draft passed a
 *  ref's `.current` snapshot down as a plain number prop, which only
 *  reflects whatever it was at the last React render (refs don't trigger
 *  re-renders), so it silently never updated. */
function EnergySweep({
  progressRef,
  overallFadeRef,
  startAt,
  duration,
  y,
  width,
}: {
  progressRef: ProgressRef;
  overallFadeRef: ProgressRef;
  startAt: number;
  duration: number;
  y: number;
  width: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;
    const progress = localProgress(progressRef, startAt, duration);
    const eased = THREE.MathUtils.smoothstep(progress, 0, 1);
    meshRef.current.position.y = y - 0.35 + eased * 0.7;
    materialRef.current.opacity =
      Math.sin(eased * Math.PI) * 0.9 * (progress > 0.02 ? 1 : 0) * overallFadeRef.current;
  });

  return (
    <mesh ref={meshRef} position={[0, y, 0.02]}>
      <planeGeometry args={[width, 0.02]} />
      <meshBasicMaterial ref={materialRef} color="#4CD8E0" transparent opacity={0} toneMapped={false} />
    </mesh>
  );
}

function RevealWord({
  text,
  progressRef,
  overallFadeRef,
  startAt,
  duration,
  anchorX,
  x,
  y,
  fontSize,
  color,
  letterSpacing,
}: {
  text: string;
  progressRef: ProgressRef;
  overallFadeRef: ProgressRef;
  startAt: number;
  duration: number;
  anchorX: "left" | "right" | "center";
  x: number;
  y: number;
  fontSize: number;
  color: string;
  letterSpacing?: number;
}) {
  const ref = useRef<TextRef>(null);

  useFrame(() => {
    const node = ref.current;
    if (!node) return;
    const progress = localProgress(progressRef, startAt, duration);
    const eased = THREE.MathUtils.smoothstep(progress, 0, 1);
    node.fillOpacity = eased * overallFadeRef.current;
    node.position.y = y - (1 - eased) * 0.22;
    const scale = 0.94 + eased * 0.06;
    node.scale.set(scale, scale, scale);
  });

  return (
    <Text
      ref={ref}
      fontSize={fontSize}
      color={color}
      anchorX={anchorX}
      anchorY="middle"
      fillOpacity={0}
      position={[x, y, 0]}
      letterSpacing={letterSpacing}
    >
      {text}
    </Text>
  );
}

export default function SpatialIdentity({ progressRef }: { progressRef: ProgressRef }) {
  const groupRef = useRef<THREE.Group>(null);
  const roleRef = useRef<TextRef>(null);
  const taglineRef = useRef<TextRef>(null);
  const overallFadeRef = useRef(1);
  const { camera } = useThree();
  const forward = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (groupRef.current) {
      camera.getWorldDirection(forward);
      groupRef.current.position.copy(camera.position).addScaledVector(forward, ANCHOR_DISTANCE);
      groupRef.current.quaternion.copy(camera.quaternion);
    }

    // Held through the tagline's own reveal window, then dissolves — the
    // identity card does its job and gets out of the way instead of
    // dragging along as a stale HUD element for the rest of the journey.
    const fadeOut = 1 - THREE.MathUtils.smoothstep(localProgress(progressRef, 0.4, 0.1), 0, 1);
    overallFadeRef.current = fadeOut;

    const role = localProgress(progressRef, 0.16, 0.1);
    const tagline = localProgress(progressRef, 0.24, 0.12);
    if (roleRef.current) {
      roleRef.current.fillOpacity = role * fadeOut;
      roleRef.current.position.y = 1.7 - (1 - role) * 0.15;
    }
    if (taglineRef.current) taglineRef.current.fillOpacity = tagline * fadeOut;
  });

  return (
    <group ref={groupRef}>
      <RevealWord
        text="PRADEEPA"
        progressRef={progressRef}
        overallFadeRef={overallFadeRef}
        startAt={0.02}
        duration={0.08}
        anchorX="right"
        x={-0.12}
        y={2.5}
        fontSize={1.05}
        color="#F3F4F9"
        letterSpacing={0.02}
      />
      <RevealWord
        text="LAKRUWAN"
        progressRef={progressRef}
        overallFadeRef={overallFadeRef}
        startAt={0.06}
        duration={0.08}
        anchorX="left"
        x={0.12}
        y={2.5}
        fontSize={1.05}
        color="#F3F4F9"
        letterSpacing={0.02}
      />
      <EnergySweep
        progressRef={progressRef}
        overallFadeRef={overallFadeRef}
        startAt={0.02}
        duration={0.12}
        y={2.5}
        width={6.4}
      />

      <Text ref={roleRef} fontSize={0.3} color="#AEB4C2" anchorX="center" anchorY="middle" fillOpacity={0} position={[0, 1.7, 0]} letterSpacing={0.18}>
        FULL STACK SOFTWARE ENGINEER
      </Text>
      <Text
        ref={taglineRef}
        fontSize={0.22}
        color="#8890A3"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0}
        position={[0, 1.05, 0]}
        maxWidth={6}
        textAlign="center"
        lineHeight={1.4}
      >
        I build production systems that connect people, products, data, cloud infrastructure, and intelligent automation.
      </Text>
    </group>
  );
}
