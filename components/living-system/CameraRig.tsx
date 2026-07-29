"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Walks a single curve by scroll progress — the backbone of "scroll = a
 * guided journey" rather than free-fly navigation. Pointer movement adds a
 * small, capped look-around nudge; it never lets the visitor roam.
 *
 * A slow, layered noise-like drift rides on top of the curve position —
 * without it the camera is a mechanically perfect lerp toward a point,
 * which reads as a rendered path, not a viewpoint. Real handheld/steadicam
 * footage never holds perfectly still even when "static."
 */
export default function CameraRig({
  curve,
  progressRef,
  allowParallax = true,
  frozen = false,
  strainRef,
  focusPoint,
}: {
  curve: THREE.CatmullRomCurve3;
  progressRef: React.MutableRefObject<number>;
  allowParallax?: boolean;
  /** Once the incident takes over, the camera stops advancing along the
   *  curve entirely — this isn't a slow-down, it's a hard hold, the world
   *  taking the wheel back from scroll input. */
  frozen?: boolean;
  /** 0 = calm, 1 = fully strained. Narrows FOV as the incident builds —
   *  the world closing in, not just dimming. */
  strainRef?: React.MutableRefObject<number>;
  /** Where the camera looks once frozen, instead of wherever the curve
   *  tangent happened to be pointing at that exact scroll position. Without
   *  this the incident could freeze mid-scroll staring into an empty
   *  stretch of corridor — the failure and recovery need a guaranteed,
   *  meaningful subject in frame, not whatever the visitor's scroll speed
   *  happened to land on. */
  focusPoint?: THREE.Vector3;
}) {
  const targetPos = useRef(new THREE.Vector3());
  const lookAt = useRef(new THREE.Vector3());
  const tangent = useMemo(() => new THREE.Vector3(), []);
  const frozenAnchor = useRef<{ pos: THREE.Vector3; look: THREE.Vector3 } | null>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const breatheX = Math.sin(time * 0.35) * 0.055 + Math.sin(time * 0.9) * 0.02;
    const breatheY = Math.cos(time * 0.28) * 0.04 + Math.sin(time * 1.3) * 0.015;
    const strain = strainRef?.current ?? 0;

    if (frozen) {
      if (!frozenAnchor.current) {
        frozenAnchor.current = {
          pos: state.camera.position.clone(),
          look: focusPoint ? focusPoint.clone() : lookAt.current.clone(),
        };
      }
    } else {
      frozenAnchor.current = null;
    }

    if (frozen && frozenAnchor.current) {
      const anchor = frozenAnchor.current;
      lookAt.current.copy(anchor.look);
      lookAt.current.x += breatheX;
      lookAt.current.y += breatheY * 0.6;

      state.camera.position.copy(anchor.pos);
      state.camera.position.x += breatheX * 0.3;
      state.camera.position.y += breatheY * 0.3;
      state.camera.lookAt(lookAt.current);
    } else {
      const t = THREE.MathUtils.clamp(progressRef.current, 0, 0.999);
      curve.getPointAt(t, targetPos.current);
      curve.getTangentAt(t, tangent);

      lookAt.current.copy(targetPos.current).addScaledVector(tangent, 4);
      lookAt.current.x += breatheX;
      lookAt.current.y += breatheY * 0.6;

      if (allowParallax) {
        lookAt.current.x += state.pointer.x * 0.6;
        lookAt.current.y += state.pointer.y * 0.3;
      }

      state.camera.position.lerp(targetPos.current, 0.06);
      state.camera.position.x += breatheX * 0.3;
      state.camera.position.y += breatheY * 0.3;
      state.camera.lookAt(lookAt.current);
    }

    if (state.camera instanceof THREE.PerspectiveCamera) {
      const baseFov = 50 + Math.sin(time * 0.18) * 0.6;
      const targetFov = THREE.MathUtils.lerp(baseFov, 39, strain);
      if (Math.abs(state.camera.fov - targetFov) > 0.01) {
        state.camera.fov += (targetFov - state.camera.fov) * 0.03;
        state.camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}
