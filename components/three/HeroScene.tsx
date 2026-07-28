"use client";

import { useEffect, useState } from "react";
import Hero3D from "./Hero3D";

/**
 * Gate for the WebGL hero: skips the R3F canvas entirely (not just
 * slowed-down) on coarse pointers, reduced motion, and small viewports,
 * swapping in a cheap CSS gradient blob instead.
 */
export default function HeroScene() {
  const [ready, setReady] = useState(false);
  const [webglAllowed, setWebglAllowed] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const narrow = window.innerWidth < 768;
    setWebglAllowed(!coarse && !reduceMotion && !narrow);
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!webglAllowed) {
    return (
      <div
        className="absolute inset-0 hero-blob-fallback pointer-events-none"
        aria-hidden="true"
      />
    );
  }

  return <Hero3D />;
}
