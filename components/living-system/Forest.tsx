"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

type TreeSpec = { x: number; z: number; height: number };

function pseudo(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** A perfectly smooth icosahedron reads as a glossy plastic ball no matter
 *  how the blobs are clustered — the critique flagged the sharp specular
 *  highlight on every canopy as the clearest "programmer-made" tell. This
 *  displaces each vertex along its own normal by a hash-noise amount so the
 *  surface itself is irregular, then recomputes normals so lighting (and
 *  flat shading) actually responds to the new bumps instead of shading a
 *  perfect sphere. Built once and reused across all instances — per-instance
 *  rotation (already randomized) is what keeps the shared shape from reading
 *  as an obviously repeated stamp. */
function createFoliageGeometry(radius: number, detail: number, bumpiness: number) {
  const geometry = new THREE.IcosahedronGeometry(radius, detail);
  const position = geometry.attributes.position;
  const vertex = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    const n = pseudo(vertex.x * 12.9898 + vertex.y * 78.233 + vertex.z * 37.719 + i * 0.017);
    vertex.multiplyScalar(1 + (n - 0.5) * bumpiness);
    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function useForest(count: number): TreeSpec[] {
  return useMemo(() => {
    const items: TreeSpec[] = [];
    // The first version scattered trees on a full 360° ring around the
    // origin — fine for a camera orbiting a point, wrong for this one,
    // which travels down a near-straight corridor (the curve's x barely
    // moves off 0). Half the trees ended up off to the side or behind the
    // direction of travel, invisible in the ~50° FOV no matter how many
    // were added — which is why raising the count alone still left long
    // stretches of the journey empty. Placing every tree flanking the
    // corridor (left/right by parity, at a lateral distance the camera is
    // actually looking toward) guarantees the density is where the eye is.
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      const lateral = 2.6 + ((i * 29) % 15) + pseudo(i * 4.1) * 2;
      // Evenly spaced by index across the full depth range (rather than a
      // modulo-based scatter) so coverage stays consistent regardless of
      // count — a modulo pattern left gaps deep enough that whole stretches
      // of the middle journey had no tree in view at all.
      const z = -(i / count) * 66 - 2 - pseudo(i * 7.7) * 4;
      items.push({
        x: side * lateral,
        z,
        height: 2 + ((i * 13) % 30) / 10,
      });
    }
    return items;
  }, [count]);
}

const BLOBS_PER_TREE = 3;
// Emerald primary / muted teal secondary — no purple/violet, per the
// "restrained cinematic palette" discipline. Amber is reserved for the
// Living Core and other genuinely important moments, not spread across the
// whole canopy.
const CANOPY_HUES = ["#39E6A3", "#42BFA6", "#2FBF8A"];
// Collar bands up each trunk, in the same low-to-high order they light: a
// tree that also reads as an infrastructure column, not just a plant.
const BAND_HEIGHT_FRACTIONS = [0.26, 0.52, 0.78];
const BAND_BASE_RADIUS = 0.13;

/** Each "tree" is a small irregular cluster of blobs, not one perfect
 *  icosahedron — the single-primitive-per-tree look was the first thing
 *  flagged in the Chapter 1 critique as reading "programmer-made." */
function TreeCluster({
  trees,
  strainRef,
}: {
  trees: TreeSpec[];
  strainRef?: React.MutableRefObject<number>;
}) {
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const canopyRef = useRef<THREE.InstancedMesh>(null);
  const bandRef = useRef<THREE.InstancedMesh>(null);
  const canopyMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const bandMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const canopyCount = trees.length * BLOBS_PER_TREE;
  const bandCount = trees.length * BAND_HEIGHT_FRACTIONS.length;
  const canopyGeometry = useMemo(() => createFoliageGeometry(0.7, 2, 0.4), []);

  // The forest dims under strain rather than only the lights around it — a
  // canopy that keeps glowing at full brightness while everything else goes
  // dark reads as a rendering bug, not a system under load.
  useFrame(() => {
    const strain = strainRef?.current ?? 0;
    if (canopyMaterialRef.current) {
      canopyMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(0.16, 0.03, strain);
    }
    if (bandMaterialRef.current) {
      bandMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(0.55, 0.1, strain);
    }
  });

  useEffect(() => {
    const trunk = trunkRef.current;
    const canopy = canopyRef.current;
    const bands = bandRef.current;
    if (!trunk || !canopy || !bands) return;

    trees.forEach((t, ti) => {
      const tilt = (pseudo(ti * 3.7) - 0.5) * 0.12;
      dummy.position.set(t.x, t.height / 2, t.z);
      dummy.rotation.set(0, 0, tilt);
      dummy.scale.set(1, t.height, 1);
      dummy.updateMatrix();
      trunk.setMatrixAt(ti, dummy.matrix);

      // Structural collar bands up the trunk — fusing the organic tree with
      // the server-tower reading the brief asked for: a trunk that's also
      // an infrastructure column, not just a plant.
      BAND_HEIGHT_FRACTIONS.forEach((frac, bi) => {
        const trunkRadiusHere = THREE.MathUtils.lerp(0.14, 0.06, frac) + 0.03;
        const scale = trunkRadiusHere / BAND_BASE_RADIUS;
        dummy.position.set(t.x, t.height * frac, t.z);
        dummy.rotation.set(Math.PI / 2, 0, tilt);
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        bands.setMatrixAt(ti * BAND_HEIGHT_FRACTIONS.length + bi, dummy.matrix);
      });

      for (let b = 0; b < BLOBS_PER_TREE; b++) {
        const idx = ti * BLOBS_PER_TREE + b;
        const jx = (pseudo(ti * 3.1 + b) - 0.5) * 0.95;
        const jz = (pseudo(ti * 5.7 + b) - 0.5) * 0.95;
        const jy = pseudo(ti * 7.3 + b) * 0.45;
        const baseScale = 1.05 + (ti % 5) * 0.07;
        const sx = baseScale * (0.55 + pseudo(ti * 9.1 + b) * 0.55);
        const sy = sx * (0.8 + pseudo(ti * 11.3 + b) * 0.4);
        const sz = sx * (0.85 + pseudo(ti * 2.9 + b) * 0.35);

        dummy.position.set(t.x + jx, t.height + 0.35 + jy, t.z + jz);
        dummy.rotation.set(
          pseudo(ti + b * 2.1) * 0.7,
          pseudo(ti * 2 + b) * Math.PI * 2,
          pseudo(ti * 1.7 + b) * 0.5
        );
        dummy.scale.set(sx, sy, sz);
        dummy.updateMatrix();
        canopy.setMatrixAt(idx, dummy.matrix);
        canopy.setColorAt(idx, color.set(CANOPY_HUES[(ti + b) % CANOPY_HUES.length]));
      }
    });
    trunk.instanceMatrix.needsUpdate = true;
    canopy.instanceMatrix.needsUpdate = true;
    bands.instanceMatrix.needsUpdate = true;
    if (canopy.instanceColor) canopy.instanceColor.needsUpdate = true;
  }, [trees, dummy, color]);

  useEffect(() => () => canopyGeometry.dispose(), [canopyGeometry]);

  return (
    <>
      {/* frustumCulled defaults true, but Three culls InstancedMesh against
          the UNTRANSFORMED base geometry's bounding sphere (~1 unit, at the
          mesh's local origin) — it has no idea the instanceMatrix buffer
          scatters copies of that geometry across ±20 units and 66 units of
          depth. The whole draw call was silently vanishing the moment the
          camera moved away from world origin, which is what actually made
          the forest look sparse — not tree count or placement, both of
          which I'd been tuning blind to this. */}
      <instancedMesh ref={trunkRef} args={[undefined, undefined, trees.length]} receiveShadow frustumCulled={false}>
        <cylinderGeometry args={[0.06, 0.14, 1, 6]} />
        <meshStandardMaterial color="#101A16" roughness={0.9} />
      </instancedMesh>
      {/* Muted teal, not emerald — differentiates "structural/circuit" from
          "organic/foliage" bioluminescence, and tone-mapped now (was
          bypassing the grading curve entirely, which combined with the old
          chromatic-aberration pass is what produced the colored-outline
          glitch look on every band). */}
      <instancedMesh ref={bandRef} args={[undefined, undefined, bandCount]} frustumCulled={false}>
        <torusGeometry args={[BAND_BASE_RADIUS, 0.012, 6, 12]} />
        <meshStandardMaterial
          ref={bandMaterialRef}
          color="#101A16"
          emissive="#42BFA6"
          emissiveIntensity={0.55}
          roughness={0.5}
        />
      </instancedMesh>
      {/* Base color carries the read now (dark secondary-foliage green);
          emissive is a controlled accent, not the dominant surface color —
          this was rendering as flat bright cyan paint at emissiveIntensity
          0.32 with an un-toneMapped material bypassing the whole grading
          curve. */}
      <instancedMesh
        ref={canopyRef}
        args={[canopyGeometry, undefined, canopyCount]}
        castShadow
        receiveShadow
        frustumCulled={false}
      >
        <meshStandardMaterial
          ref={canopyMaterialRef}
          color="#183229"
          emissive="#39E6A3"
          emissiveIntensity={0.16}
          roughness={0.82}
          metalness={0}
          flatShading
        />
      </instancedMesh>
    </>
  );
}

/** The scene's one destination — everything in Chapter 1 is staged to lead
 *  the eye toward this. Breathes on its own; brightens as the visitor
 *  approaches, foreshadowing "the world awakens as you scroll." */
function LivingCore({
  progressRef,
  strainRef,
}: {
  progressRef: React.MutableRefObject<number>;
  strainRef?: React.MutableRefObject<number>;
}) {
  const shellRef = useRef<THREE.MeshStandardMaterial>(null);
  const innerRef = useRef<THREE.MeshStandardMaterial>(null);
  const poolRef = useRef<THREE.MeshBasicMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const pulse = 0.85 + Math.sin(state.clock.elapsedTime * 0.55) * 0.15;
    const approach = THREE.MathUtils.clamp(progressRef.current / 0.5, 0, 1);
    const strainDim = 1 - (strainRef?.current ?? 0) * 0.85;
    const target = (1.2 + approach * 2.2) * pulse * strainDim;
    if (innerRef.current) {
      innerRef.current.emissiveIntensity += (target - innerRef.current.emissiveIntensity) * 0.06;
    }
    if (shellRef.current) {
      // The shell itself only glows a little — most of what reads as "light"
      // is the inner core bleeding through it, not the shell's own surface.
      const shellTarget = 0.15 + target * 0.12;
      shellRef.current.emissiveIntensity += (shellTarget - shellRef.current.emissiveIntensity) * 0.06;
    }
    if (poolRef.current) {
      const poolTarget = (0.2 + approach * 0.45) * strainDim;
      poolRef.current.opacity += (poolTarget - poolRef.current.opacity) * 0.06;
    }
    if (lightRef.current) {
      const lightTarget = (2 + approach * 5) * strainDim;
      lightRef.current.intensity += (lightTarget - lightRef.current.intensity) * 0.06;
    }
  });

  return (
    // Amber, deliberately — the rest of the environment is emerald/teal;
    // this is the one thing in the whole scene that gets the "important
    // moment" color, so it reads as significant the instant it's visible,
    // not as one more bioluminescent object among many. A dormant black
    // sphere with no visible detail read as broken, not mysterious — the
    // obsidian outer shell is translucent specifically so the brighter
    // inner core is visible glowing through it, giving the surface
    // something to read even before it's fully awake.
    <group position={[0, 3.2, -58]}>
      <mesh>
        <icosahedronGeometry args={[1.15, 3]} />
        <meshStandardMaterial
          ref={innerRef}
          color="#FFB45C"
          emissive="#FFB45C"
          emissiveIntensity={1.2}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.4, 2]} />
        <meshStandardMaterial
          ref={shellRef}
          color="#0B100E"
          emissive="#FFB45C"
          emissiveIntensity={0.15}
          roughness={0.32}
          metalness={0.55}
          transparent
          opacity={0.62}
        />
      </mesh>
      {/* A restrained pool of warm light on the ground beneath — grounds the
          core in the environment instead of it floating as an isolated
          object with no relationship to its surroundings. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.14, 0]}>
        <circleGeometry args={[3.2, 24]} />
        <meshBasicMaterial ref={poolRef} color="#FFB45C" transparent opacity={0.2} depthWrite={false} />
      </mesh>
      <pointLight ref={lightRef} color="#FFB45C" intensity={2} distance={26} />
    </group>
  );
}

/** Thin glowing veins beneath the forest floor — visible foreshadowing of
 *  the root network the visitor is about to descend into, not decoration. */
function RootVeins({
  progressRef,
  strainRef,
}: {
  progressRef: React.MutableRefObject<number>;
  strainRef?: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const rootLightRefs = useRef<(THREE.PointLight | null)[]>([]);

  const veinPaths = useMemo(() => {
    const paths: THREE.Vector3[][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      for (let s = 0; s <= 6; s++) {
        const t = s / 6;
        const r = t * 22;
        points.push(
          new THREE.Vector3(
            Math.cos(angle + t * 0.6) * r,
            0.03,
            -58 + Math.sin(angle + t * 0.6) * r * 0.4 + t * 14
          )
        );
      }
      paths.push(points);
    }
    return paths;
  }, []);

  // A handful of low-intensity emerald lights sitting at the midpoint of
  // every other vein — depth cues along the path the eye is meant to
  // follow, not a general-purpose glow-everything pass.
  const rootLightPositions = useMemo(
    () => [veinPaths[0][3], veinPaths[2][3], veinPaths[4][3]],
    [veinPaths]
  );

  useFrame(() => {
    if (!groupRef.current) return;
    const approach = THREE.MathUtils.clamp((progressRef.current - 0.15) / 0.4, 0, 1);
    const strainDim = 1 - (strainRef?.current ?? 0) * 0.9;
    groupRef.current.children.forEach((child) => {
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
      if (mat) mat.opacity = (0.08 + approach * 0.5) * strainDim;
    });
    rootLightRefs.current.forEach((light) => {
      if (light) light.intensity = (0.15 + approach * 0.35) * strainDim;
    });
  });

  return (
    <group ref={groupRef}>
      {veinPaths.map((pts, i) => (
        <Line key={i} points={pts} color="#42BFA6" lineWidth={1.5} transparent opacity={0.1} />
      ))}
      {rootLightPositions.map((pos, i) => (
        <pointLight
          key={i}
          ref={(el) => {
            rootLightRefs.current[i] = el;
          }}
          position={pos}
          color="#39E6A3"
          intensity={0.15}
          distance={10}
        />
      ))}
    </group>
  );
}

/** A single soft ring that finds and marks whichever tree is nearest the
 *  visitor's projected pointer position — the forest acknowledging you,
 *  not just being flown past. */
function ProximityMarker({ trees }: { trees: TreeSpec[] }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const { camera } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const groundPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const hitPoint = useMemo(() => new THREE.Vector3(), []);
  const [nearest, setNearest] = useState<TreeSpec | null>(null);

  useFrame((state) => {
    raycaster.setFromCamera(state.pointer, camera);
    const hit = raycaster.ray.intersectPlane(groundPlane, hitPoint);
    if (hit) {
      let closest: TreeSpec | null = null;
      let closestDist = 5;
      for (const t of trees) {
        const d = Math.hypot(t.x - hit.x, t.z - hit.z);
        if (d < closestDist) {
          closestDist = d;
          closest = t;
        }
      }
      setNearest((prev) => (prev === closest ? prev : closest));
    }

    if (ringRef.current && materialRef.current) {
      const targetOpacity = nearest ? 0.5 : 0;
      materialRef.current.opacity += (targetOpacity - materialRef.current.opacity) * 0.1;
      if (nearest) {
        ringRef.current.position.x += (nearest.x - ringRef.current.position.x) * 0.15;
        ringRef.current.position.z += (nearest.z - ringRef.current.position.z) * 0.15;
      }
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.06;
      ringRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
      <ringGeometry args={[0.55, 0.68, 32]} />
      <meshBasicMaterial ref={materialRef} color="#42BFA6" transparent opacity={0} />
    </mesh>
  );
}

// A per-tree contact-shadow disc lived here — removed. Confirmed by
// disabling it directly that it was the actual source of the "black dome"
// bug: alpha-blended discs from nearby trees stack darker wherever they
// overlap in screen space (three ~0.3-opacity layers compound to roughly
// 0.7), and reducing per-instance opacity/scale only ever shrank the
// effect, never fixed the stacking. Real-time shadow mapping near the
// camera plus the trunk-to-ground color transition already grounds the
// trees without it, verified visually.

export default function Forest({
  progressRef,
  treeCount,
  strainRef,
}: {
  progressRef: React.MutableRefObject<number>;
  treeCount: number;
  strainRef?: React.MutableRefObject<number>;
}) {
  const trees = useForest(treeCount);

  return (
    <>
      <TreeCluster trees={trees} strainRef={strainRef} />
      <LivingCore progressRef={progressRef} strainRef={strainRef} />
      <RootVeins progressRef={progressRef} strainRef={strainRef} />
      <ProximityMarker trees={trees} />
    </>
  );
}
