"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export const REQUEST_STAGES = [
  { label: "Client", sub: "Request initiated", color: "#AEB4C2" },
  { label: "API Gateway", sub: "Routing", color: "#4CD8E0" },
  { label: "Auth", sub: "JWT verified", color: "#D9A25C" },
  { label: "Domain Service", sub: "Business logic", color: "#4CD8E0" },
  { label: "Cache", sub: "Redis hit", color: "#9B7CFF" },
  { label: "Database", sub: "PostgreSQL", color: "#4CD8E0" },
  { label: "Async Queue", sub: "Celery task queued", color: "#D9A25C" },
  { label: "Response", sub: "200 OK · 42ms", color: "#34D399" },
];

function useRootCurve(zOffset: number) {
  return useMemo(() => {
    const points = REQUEST_STAGES.map(
      (_, i) => new THREE.Vector3((i % 2 === 0 ? -1.3 : 1.3), -i * 1.05, zOffset - i * 1.6)
    );
    return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.2);
  }, [zOffset]);
}

function RequestPacket({
  curve,
  trigger,
  onStageChange,
}: {
  curve: THREE.CatmullRomCurve3;
  trigger: number;
  onStageChange: (stage: number) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const tRef = useRef(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (trigger === 0) return;
    visibleRef.current = true;
    const obj = { t: 0 };
    const tween = gsap.to(obj, {
      t: 1,
      duration: REQUEST_STAGES.length * 0.55,
      ease: "power1.inOut",
      onUpdate: () => {
        tRef.current = obj.t;
        const stage = Math.min(
          REQUEST_STAGES.length - 1,
          Math.floor(obj.t * REQUEST_STAGES.length)
        );
        onStageChange(stage);
      },
      onComplete: () => {
        onStageChange(REQUEST_STAGES.length - 1);
        setTimeout(() => {
          visibleRef.current = false;
        }, 700);
      },
    });
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.visible = visibleRef.current;
    if (glowRef.current) glowRef.current.visible = visibleRef.current;
    if (!visibleRef.current) return;
    const pos = curve.getPointAt(THREE.MathUtils.clamp(tRef.current, 0, 0.999));
    meshRef.current.position.copy(pos);
    glowRef.current?.position.copy(pos);
  });

  return (
    <>
      <mesh ref={meshRef} visible={false}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial color="#4CD8E0" emissive="#4CD8E0" emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      <pointLight ref={glowRef} color="#4CD8E0" intensity={2} distance={4} />
    </>
  );
}

function RootNode({
  position,
  stage,
  index,
  activeStage,
}: {
  position: THREE.Vector3;
  stage: (typeof REQUEST_STAGES)[number];
  index: number;
  activeStage: number;
}) {
  const active = activeStage >= index;
  return (
    <group position={position}>
      <mesh>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial
          color={stage.color}
          emissive={stage.color}
          emissiveIntensity={active ? 1.6 : 0.35}
          roughness={0.4}
          toneMapped={false}
        />
      </mesh>
      <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
        <div className={`root-node-label ${active ? "root-node-label--active" : ""}`}>
          <span className="root-node-label__title">{stage.label}</span>
          <span className="root-node-label__sub">{stage.sub}</span>
        </div>
      </Html>
    </group>
  );
}

export default function RootNetworkChapter({
  progressRef,
  requestTrigger,
  onStageChange,
  activeStage,
  zOffset = -70,
}: {
  progressRef: React.MutableRefObject<number>;
  requestTrigger: number;
  onStageChange: (stage: number) => void;
  activeStage: number;
  zOffset?: number;
}) {
  const curve = useRootCurve(zOffset);
  const linePoints = useMemo(() => curve.getPoints(40), [curve]);

  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, -4, zOffset - 6]} intensity={0.7} color="#9B7CFF" />
      <Line points={linePoints} color="#1B2A22" lineWidth={2} transparent opacity={0.5} />
      {REQUEST_STAGES.map((stage, i) => (
        <RootNode
          key={stage.label}
          index={i}
          stage={stage}
          activeStage={activeStage}
          position={curve.getPointAt(i / (REQUEST_STAGES.length - 1))}
        />
      ))}
      <RequestPacket curve={curve} trigger={requestTrigger} onStageChange={onStageChange} />
    </group>
  );
}
