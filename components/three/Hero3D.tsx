"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useMemo, useState } from "react";

function Scene({ mode }: { mode: "light" | "dark" }) {
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

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 6, 6]} intensity={0.95} />
      <directionalLight position={[-6, -2, -6]} intensity={0.45} />

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.9}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.25, 5]} />
          <MeshDistortMaterial
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
    </>
  );
}

export default function Hero3D() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  const [mode, setMode] = useState<"light" | "dark">("light");
  useEffect(() => {
    const update = () => {
      setMode(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-80 saturate-110">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene mode={mode} />
        </Suspense>
      </Canvas>

      {/* Blend + readability helpers */}
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_0%,black_55%,transparent_78%)] bg-black/10 dark:bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/55 dark:to-black/45" />
    </div>
  );
}

