"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSound } from "./SoundManager";
import type { ExperienceMode } from "@/lib/living-system/device-mode";

const HOLD_DURATION = 1000;
const DISCHARGE_DURATION = 650;
const CIRCUMFERENCE = 2 * Math.PI * 54;
const MOTE_COUNT = 6;

// Deterministic placement (no Math.random — reproducible, SSR-safe), each
// mote scattered at its own angle/distance so they don't read as a uniform
// ring, matching the codebase's established pseudo-random convention.
function pseudo(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const MOTES = Array.from({ length: MOTE_COUNT }, (_, i) => {
  const angle = (i / MOTE_COUNT) * Math.PI * 2 + pseudo(i * 3.1) * 0.6;
  const distance = 74 + pseudo(i * 7.7) * 22;
  return { angle, distance, delay: pseudo(i * 5.3) * 0.15 };
});

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
  const dischargeFromRef = useRef(0);
  const dischargeStartRef = useRef(0);
  const { setEnabled, playTone } = useSound();

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const startHold = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
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

  // Releasing early lets the gathered energy bleed away rather than
  // vanishing instantly — the system was genuinely responding to the hold,
  // so letting go should feel like it's genuinely discharging, not like a
  // UI value snapping back to its default.
  const cancelHold = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress((current) => {
      if (current <= 0) return 0;
      dischargeFromRef.current = current;
      dischargeStartRef.current = performance.now();
      const decay = () => {
        const elapsed = performance.now() - dischargeStartRef.current;
        const t = Math.min(1, elapsed / DISCHARGE_DURATION);
        const eased = 1 - Math.pow(1 - t, 2);
        const next = dischargeFromRef.current * (1 - eased);
        setProgress(next);
        if (t < 1) rafRef.current = requestAnimationFrame(decay);
        else rafRef.current = null;
      };
      rafRef.current = requestAnimationFrame(decay);
      return current;
    });
  };

  const motes = useMemo(
    () =>
      MOTES.map((m, i) => {
        // Motes start scattered at their full radius and converge toward the
        // core's center as the hold progresses — energy gathering, not
        // decoration orbiting in place.
        const pull = Math.max(0, progress - m.delay) / (1 - m.delay || 1);
        const eased = Math.min(1, pull);
        const r = m.distance * (1 - eased * 0.82);
        const x = Math.cos(m.angle) * r;
        const y = Math.sin(m.angle) * r;
        return (
          <span
            key={i}
            aria-hidden="true"
            className="living-entry__mote"
            style={{
              opacity: progress > 0.02 ? 0.25 + eased * 0.75 : 0,
              transform: `translate(${x}px, ${y}px) scale(${0.5 + eased * 0.7})`,
            }}
          />
        );
      }),
    [progress]
  );

  if (mode === "reduced-motion") {
    return (
      <div className="living-entry living-entry--static">
        <p className="living-entry__signal">Every system begins with a signal.</p>
        <button type="button" className="living-entry__enter-button" onClick={onEnter}>
          Enter the Living System
        </button>
        <a href="#about" className="living-entry__skip">
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
        {motes}
        <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,180,92,0.18)" strokeWidth="2" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#FFB45C"
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
        <a href="#about" className="living-entry__skip">
          Skip experience
        </a>
      </div>
    </div>
  );
}
