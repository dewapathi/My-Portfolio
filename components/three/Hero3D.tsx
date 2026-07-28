"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Scene({
  mode,
  scrollProgress,
}: {
  mode: "light" | "dark";
  scrollProgress: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);

  const colors = useMemo(() => {
    if (mode === "dark") {
      return {
        main: "#38bdf8", // softer sky
        purple: "#c084fc",
        pink: "#fb7185",
      };
    }
    return {
      main: "#0ea5e9",
      purple: "#a855f7",
      pink: "#fb7185",
    };
  }, [mode]);

  useFrame((state) => {
    const { pointer } = state;
    const group = groupRef.current;
    if (group) {
      // Gentle magnetic parallax toward the cursor.
      group.rotation.y += (pointer.x * 0.4 - group.rotation.y) * 0.04;
      group.rotation.x += (-pointer.y * 0.25 - group.rotation.x) * 0.04;
      // Drift upward slightly as the hero scrolls out of view.
      group.position.y += (-scrollProgress.current * 1.1 - group.position.y) * 0.06;
    }
    if (materialRef.current) {
      const targetDistort = 0.28 + scrollProgress.current * 0.35;
      materialRef.current.distort +=
        (targetDistort - materialRef.current.distort) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 6, 6]} intensity={0.95} />
      <directionalLight position={[-6, -2, -6]} intensity={0.45} />

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.9}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.25, 5]} />
          <MeshDistortMaterial
            ref={materialRef}
            color={colors.main}
            roughness={0.35}
            metalness={0.45}
            distort={0.32}
            speed={1.1}
            transparent
            opacity={0.65}
          />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={1.1} floatIntensity={1.1}>
        <mesh position={[2.3, 1.0, -1.4]}>
          <sphereGeometry args={[0.38, 48, 48]} />
          <meshStandardMaterial
            color={colors.purple}
            roughness={0.25}
            metalness={0.6}
            transparent
            opacity={0.75}
          />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-2.1, -1.2, -1.2]}>
          <sphereGeometry args={[0.28, 48, 48]} />
          <meshStandardMaterial
            color={colors.pink}
            roughness={0.3}
            metalness={0.55}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      <Environment preset="city" />
    </group>
  );
}

export default function Hero3D() {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;
    const update = () => {
      setMode(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [reduceMotion]);

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

  if (reduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none opacity-80 saturate-110">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene mode={mode} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>

      {/* Blend + readability helpers */}
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_0%,black_55%,transparent_78%)] bg-black/10 dark:bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/55 dark:to-black/45" />
    </div>
  );
}
