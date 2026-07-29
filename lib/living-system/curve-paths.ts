import * as THREE from "three";

/**
 * The single camera-rail curve for the POC's two chapters (Awakening +
 * Root Network) — one continuous path, not two independently-cut scenes,
 * so the descent into the root network reads as one journey.
 */
export function createJourneyCurve() {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.6, 6),
    new THREE.Vector3(0.4, 1.4, -10),
    new THREE.Vector3(-0.3, 1.1, -28),
    new THREE.Vector3(0, 0.6, -46),
    new THREE.Vector3(0, -1.5, -60),
    new THREE.Vector3(0, -4.5, -72),
    new THREE.Vector3(0, -7, -82),
    new THREE.Vector3(0, -8.6, -90),
  ]);
}

export const ROOT_NETWORK_Z_OFFSET = -70;
