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
const CANOPY_HUES = ["#4CD8E0", "#9B7CFF", "#5FE0A8"];

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
  const canopyMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const canopyCount = trees.length * BLOBS_PER_TREE;
  const canopyGeometry = useMemo(() => createFoliageGeometry(0.7, 2, 0.4), []);

  // The forest dims under strain rather than only the lights around it — a
  // canopy that keeps glowing at full brightness while everything else goes
  // dark reads as a rendering bug, not a system under load.
  useFrame(() => {
    if (canopyMaterialRef.current) {
      const strain = strainRef?.current ?? 0;
      canopyMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(0.32, 0.05, strain);
    }
  });

  useEffect(() => {
    const trunk = trunkRef.current;
    const canopy = canopyRef.current;
    if (!trunk || !canopy) return;

    trees.forEach((t, ti) => {
      const tilt = (pseudo(ti * 3.7) - 0.5) * 0.12;
      dummy.position.set(t.x, t.height / 2, t.z);
      dummy.rotation.set(0, 0, tilt);
      dummy.scale.set(1, t.height, 1);
      dummy.updateMatrix();
      trunk.setMatrixAt(ti, dummy.matrix);

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
        <meshStandardMaterial color="#0E1E16" roughness={0.9} />
      </instancedMesh>
      <instancedMesh
        ref={canopyRef}
        args={[canopyGeometry, undefined, canopyCount]}
        castShadow
        receiveShadow
        frustumCulled={false}
      >
        <meshStandardMaterial
          ref={canopyMaterialRef}
          color="#173225"
          emissive="#4CD8E0"
          emissiveIntensity={0.32}
          roughness={0.88}
          metalness={0}
          flatShading
          toneMapped={false}
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
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const pulse = 0.85 + Math.sin(state.clock.elapsedTime * 0.55) * 0.15;
    const approach = THREE.MathUtils.clamp(progressRef.current / 0.5, 0, 1);
    const strainDim = 1 - (strainRef?.current ?? 0) * 0.85;
    const target = (1.1 + approach * 1.6) * pulse * strainDim;
    if (materialRef.current) {
      materialRef.current.emissiveIntensity +=
        (target - materialRef.current.emissiveIntensity) * 0.06;
    }
    if (lightRef.current) {
      const lightTarget = (2 + approach * 5) * strainDim;
      lightRef.current.intensity += (lightTarget - lightRef.current.intensity) * 0.06;
    }
  });

  return (
    <group position={[0, 3.2, -58]}>
      <mesh>
        <icosahedronGeometry args={[1.4, 3]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#4CD8E0"
          emissive="#4CD8E0"
          emissiveIntensity={1.1}
          roughness={0.2}
          metalness={0.3}
          transparent
          opacity={0.92}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={lightRef} color="#4CD8E0" intensity={2} distance={26} />
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

  useFrame(() => {
    if (!groupRef.current) return;
    const approach = THREE.MathUtils.clamp((progressRef.current - 0.15) / 0.4, 0, 1);
    const strainDim = 1 - (strainRef?.current ?? 0) * 0.9;
    groupRef.current.children.forEach((child) => {
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
      if (mat) mat.opacity = (0.08 + approach * 0.5) * strainDim;
    });
  });

  return (
    <group ref={groupRef}>
      {veinPaths.map((pts, i) => (
        <Line key={i} points={pts} color="#4CD8E0" lineWidth={1.5} transparent opacity={0.1} />
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
      <meshBasicMaterial ref={materialRef} color="#4CD8E0" transparent opacity={0} toneMapped={false} />
    </mesh>
  );
}

const CONTACT_SHADOW_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const CONTACT_SHADOW_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float alpha = smoothstep(1.0, 0.0, d) * 0.55;
    gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
  }
`;

/** Real-time shadow mapping only covers a tight frustum near the camera's
 *  start (kept small for GPU cost) — most of the forest sits well outside
 *  it and would otherwise float, ungrounded, on the black plane. A cheap
 *  per-tree soft dark disc guarantees every tree reads as planted in the
 *  ground regardless of whether the shadow camera happens to reach it. */
function ContactShadows({ trees }: { trees: TreeSpec[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: CONTACT_SHADOW_VERTEX,
        fragmentShader: CONTACT_SHADOW_FRAGMENT,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    trees.forEach((t, i) => {
      const scale = 1.1 + t.height * 0.16;
      dummy.position.set(t.x, 0.02, t.z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.set(scale, scale, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [trees, dummy]);

  useEffect(() => () => material.dispose(), [material]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, material, trees.length]}
      renderOrder={1}
      frustumCulled={false}
    >
      <planeGeometry args={[1.6, 1.6]} />
    </instancedMesh>
  );
}

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
      <ContactShadows trees={trees} />
      <TreeCluster trees={trees} strainRef={strainRef} />
      <LivingCore progressRef={progressRef} strainRef={strainRef} />
      <RootVeins progressRef={progressRef} strainRef={strainRef} />
      <ProximityMarker trees={trees} />
    </>
  );
}
