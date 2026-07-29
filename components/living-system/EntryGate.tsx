"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "./SoundManager";
import type { ExperienceMode } from "@/lib/living-system/device-mode";

const HOLD_DURATION = 1000;
const CIRCUMFERENCE = 2 * Math.PI * 54;

export default function EntryGate({
  mode,
  onEnter,
}: {
  mode: ExperienceMode;
  onEnter: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const { setEnabled, playTone } = useSound();

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const startHold = () => {
    startRef.current = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const pct = Math.min(1, elapsed / HOLD_DURATION);
      setProgress(pct);
      if (pct >= 1) {
        playTone(660, 0.32);
        onEnter();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const cancelHold = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setProgress(0);
  };

  if (mode === "reduced-motion") {
    return (
      <div className="living-entry living-entry--static">
        <p className="living-entry__signal">Every system begins with a signal.</p>
        <button type="button" className="living-entry__enter-button" onClick={onEnter}>
          Enter the Living System
        </button>
        <a href="#request-simulation" className="living-entry__skip">
          Skip to content
        </a>
      </div>
    );
  }

  return (
    <div className="living-entry">
      <p className="living-entry__signal">Every system begins with a signal.</p>

      <div
        className="living-entry__core"
        role="button"
        tabIndex={0}
        aria-label="Press and hold to enter the Living System"
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onEnter();
          }
        }}
      >
        <span
          className="living-entry__core-glow"
          style={{ opacity: 0.35 + progress * 0.65, transform: `scale(${1 + progress * 0.3})` }}
        />
        <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(76,216,224,0.18)" strokeWidth="2" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#4CD8E0"
            strokeWidth="2"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
      </div>
      <p className="living-entry__label">Press and hold to enter</p>

      <div className="living-entry__controls">
        <button
          type="button"
          className="living-entry__control-btn"
          onClick={() => {
            setEnabled(true);
            onEnter();
          }}
        >
          Enable sound
        </button>
        <button
          type="button"
          className="living-entry__control-btn"
          onClick={() => {
            setEnabled(false);
            onEnter();
          }}
        >
          Enter without sound
        </button>
        <a href="#request-simulation" className="living-entry__skip">
          Skip experience
        </a>
      </div>
    </div>
  );
}
