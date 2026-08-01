"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { DeviceTier } from "@/lib/device-tier";

// @react-three/postprocessing is a meaningful chunk of JS that only "high"
// tier devices ever render — split out so it's not in everyone's bundle.
// (Unlike @react-three/fiber itself, this doesn't call Reconciler() at
// module scope, so — unlike Hero3D earlier in this project — dynamic
// import here doesn't hit the Next-15/React-19 RSC module-resolution bug.)
const CosmicBloom = dynamic(() => import("./CosmicBloom"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

type OrbitNodeSpec = {
  label: string;
  radius: number;
  speed: number;
  yOffset: number;
  color: string;
};

// Bolder, more electric than the original soft periwinkle/cyan/violet/cream
// set — fewer competing pastel hues, each one pushed to feel deliberate.
const NODES: OrbitNodeSpec[] = [
  { label: "Cloud Infrastructure", radius: 2.6, speed: 0.14, yOffset: 0.32, color: "#14E8CB" },
  { label: "API Gateway", radius: 2.05, speed: -0.19, yOffset: -0.42, color: "#5B4FFF" },
  { label: "Database Layer", radius: 3.15, speed: 0.1, yOffset: 0.12, color: "#C3C7D9" },
  { label: "Mobile Clients", radius: 1.75, speed: -0.24, yOffset: 0.5, color: "#FF7A45" },
  { label: "AI Pipeline", radius: 2.4, speed: 0.17, yOffset: -0.22, color: "#C650FF" },
  { label: "Deployment", radius: 3.4, speed: -0.12, yOffset: -0.5, color: "#5B4FFF" },
];

function StarField({ count }: { count: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5.5 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#AEB4C2" size={0.018} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

function OrbitNode({ node }: { node: OrbitNodeSpec }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += node.speed * delta;
    }
  });

  return (
    <group ref={groupRef}>
      <Line
        points={[
          [0, 0, 0],
          [node.radius, node.yOffset, 0],
        ]}
        color={node.color}
        lineWidth={1}
        transparent
        opacity={0.32}
      />
      <mesh
        position={[node.radius, node.yOffset, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[hovered ? 0.15 : 0.12, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 2.4 : 1.4}
          roughness={0.3}
          metalness={0.4}
          toneMapped={false}
        />
        {hovered && (
          <Html center style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
            <span className="cosmic-node-label">{node.label}</span>
          </Html>
        )}
      </mesh>
    </group>
  );
}

function Core({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const material = materialRef.current;
    if (material) {
      const target = 2.2 - scrollProgress.current * 1.6;
      material.emissiveIntensity += (target - material.emissiveIntensity) * 0.05;
    }
  });

  return (
    <mesh>
      <icosahedronGeometry args={[0.85, 2]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#5B4FFF"
        emissive="#5B4FFF"
        emissiveIntensity={2.2}
        roughness={0.25}
        metalness={0.5}
        transparent
        opacity={0.9}
        toneMapped={false}
      />
    </mesh>
  );
}

function Scene({
  tier,
  scrollProgress,
}: {
  tier: DeviceTier;
  scrollProgress: React.MutableRefObject<number>;
}) {
  const sceneGroupRef = useRef<THREE.Group>(null);
  const orbitsRef = useRef<THREE.Group>(null);
  const nodes = tier === "high" ? NODES : NODES.slice(0, 4);

  useFrame((state) => {
    const scene = sceneGroupRef.current;
    if (scene && tier === "high") {
      // Pointer parallax — high tier only, per the performance plan.
      const { pointer } = state;
      scene.rotation.y += (pointer.x * 0.22 - scene.rotation.y) * 0.03;
      scene.rotation.x += (-pointer.y * 0.14 - scene.rotation.x) * 0.03;
    }
    const orbits = orbitsRef.current;
    if (orbits) {
      const targetScale = 1 + scrollProgress.current * 0.7;
      orbits.scale.setScalar(orbits.scale.x + (targetScale - orbits.scale.x) * 0.06);
    }
  });

  return (
    <group ref={sceneGroupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.3} color="#5B4FFF" />
      <pointLight position={[-4, -3, -2]} intensity={0.7} color="#C650FF" />

      <Core scrollProgress={scrollProgress} />

      <group ref={orbitsRef}>
        {nodes.map((node) => (
          <OrbitNode key={node.label} node={node} />
        ))}
      </group>

      {tier === "high" && <StarField count={900} />}
      {tier === "standard" && <StarField count={320} />}

      {tier === "high" && <CosmicBloom />}
    </group>
  );
}

export default function CosmicScene({ tier }: { tier: DeviceTier }) {
  const reduceMotion = useReducedMotion();
  const scrollProgress = useRef(0);
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const onVisibility = () => setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const trigger = ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });
    return () => trigger.kill();
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={tier === "high" ? [1, 2] : [1, 1.25]}
        frameloop={frameloop}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene tier={tier} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,black_0%,black_60%,transparent_82%)] bg-black/10 dark:bg-black/25" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[var(--ground)]/60" />
    </div>
  );
}
