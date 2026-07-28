export type DeviceTier = "high" | "standard" | "lightweight";

/**
 * Decides the WebGL quality tier once, before any Canvas mounts — never
 * mount-then-hide. "lightweight" gets no WebGL at all (a static/CSS
 * fallback instead); "standard" gets the same scene with a fraction of the
 * particles/nodes and a capped DPR; "high" is the full experience.
 */
export function detectDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "standard";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;

  if (reduceMotion || coarsePointer || narrow) return "lightweight";

  const cores = navigator.hardwareConcurrency ?? 8;
  // deviceMemory is a non-standard Navigator field (Chromium-only); guard accordingly.
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
  const midRange = window.innerWidth < 1024 || cores < 6 || memory < 4;

  return midRange ? "standard" : "high";
}
