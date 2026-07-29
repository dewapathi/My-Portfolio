"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type IncidentPhase =
  | "dormant"
  | "straining"
  | "choice"
  | "responding"
  | "failing"
  | "blackout"
  | "rootcause"
  | "recovering"
  | "stat";

export type IncidentChoiceId = "restart" | "scale" | "rollback" | "investigate";

export const INCIDENT_CHOICES: { id: IncidentChoiceId; label: string; response: string }[] = [
  { id: "restart", label: "Restart Service", response: "Restarting service…" },
  { id: "scale", label: "Scale Horizontally", response: "Provisioning additional capacity…" },
  { id: "rollback", label: "Rollback", response: "Rolling back to previous release…" },
  { id: "investigate", label: "Investigate", response: "Pulling recent traces…" },
];

// Scroll progress (within the awakening chapter) where strain begins
// building and where it must have fully built by — the visitor is still
// scrolling through this window, so it stays tied to their own pace.
const STRAIN_START = 0.74;
const STRAIN_END = 0.92;

// Fixed, scripted durations once the incident takes over from scroll.
const RESPONDING_MS = 900;
const FAILING_MS = 1100;
// This is the one number in the whole sequence that must never be shortened
// — five real seconds of nothing, long enough that a first-time visitor
// should genuinely wonder if the page crashed.
const BLACKOUT_MS = 5000;
const ROOTCAUSE_MS = 1800;
const RECOVER_MS = 5200;

type Sound = {
  enabled: boolean;
  playTone: (freq?: number, duration?: number) => void;
  startAmbient: () => void;
  stopAmbient: () => void;
};

export function useIncidentTimeline({
  entered,
  awakeningProgressRef,
  sound,
}: {
  entered: boolean;
  awakeningProgressRef: React.MutableRefObject<number>;
  sound: Sound;
}) {
  const [phase, setPhase] = useState<IncidentPhase>("dormant");
  const [chosenId, setChosenId] = useState<IncidentChoiceId | null>(null);
  const phaseRef = useRef<IncidentPhase>("dormant");
  const strainRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const recoverStartRef = useRef<number | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Continuous part: strain rises with scroll while exploring, holds at 1
  // through the whole incident, then ramps back down on a fixed clock once
  // recovery begins. This is the only per-frame work — everything else is
  // discrete phase transitions below.
  useEffect(() => {
    if (!entered) return;

    function tick() {
      const ph = phaseRef.current;
      if (ph === "dormant" || ph === "straining") {
        const p = awakeningProgressRef.current;
        const s = THREE.MathUtils.clamp((p - STRAIN_START) / (STRAIN_END - STRAIN_START), 0, 1);
        strainRef.current = s;
        if (ph === "dormant" && s > 0.015) setPhase("straining");
        if (s >= 1) setPhase("choice");
      } else if (ph === "recovering") {
        if (recoverStartRef.current == null) recoverStartRef.current = performance.now();
        const elapsed = performance.now() - recoverStartRef.current;
        strainRef.current = 1 - Math.min(1, elapsed / RECOVER_MS);
        if (elapsed >= RECOVER_MS) setPhase("stat");
      } else if (ph === "stat") {
        strainRef.current = 0;
      } else {
        // choice / responding / failing / blackout / rootcause: fully strained
        strainRef.current = 1;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered]);

  // Discrete part: one fixed-duration hold per phase, chained by timers —
  // deliberately not folded into the rAF loop above, since these are exact
  // scripted beats, not continuously-interpolated values.
  useEffect(() => {
    if (phase === "responding") {
      const t = setTimeout(() => setPhase("failing"), RESPONDING_MS);
      return () => clearTimeout(t);
    }
    if (phase === "failing") {
      sound.stopAmbient();
      sound.playTone(140, 0.5);
      const t = setTimeout(() => setPhase("blackout"), FAILING_MS);
      return () => clearTimeout(t);
    }
    if (phase === "blackout") {
      const t = setTimeout(() => setPhase("rootcause"), BLACKOUT_MS);
      return () => clearTimeout(t);
    }
    if (phase === "rootcause") {
      sound.playTone(660, 0.3);
      const t = setTimeout(() => {
        recoverStartRef.current = null;
        setPhase("recovering");
      }, ROOTCAUSE_MS);
      return () => clearTimeout(t);
    }
    if (phase === "recovering") {
      if (sound.enabled) sound.startAmbient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const choose = (id: IncidentChoiceId) => {
    if (phaseRef.current !== "choice") return;
    setChosenId(id);
    setPhase("responding");
  };

  return { phase, chosenId, strainRef, choose };
}
