"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setProgress(100);
      setDone(true);
      const t = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(t);
    }

    document.body.style.overflow = "hidden";

    let raf: number;
    const start = performance.now();
    const durationMs = 900;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        document.body.style.overflow = "";
        setTimeout(() => setMounted(false), 550);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`preloader ${done ? "preloader--done" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading site"
    >
      <div className="preloader__inner">
        <span className="preloader__mark">PL</span>
        <span className="preloader__pct">{progress}%</span>
      </div>
    </div>
  );
}
