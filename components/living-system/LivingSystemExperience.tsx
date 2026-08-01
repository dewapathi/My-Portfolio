"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SoundProvider, useSound } from "./SoundManager";
import { useLenis } from "@/components/motion/SmoothScrollProvider";
import EntryGate from "./EntryGate";
import IncidentOverlay from "./IncidentOverlay";
import { useIncidentTimeline } from "@/lib/living-system/use-incident-timeline";
// Plain static import, not next/dynamic — a next/dynamic + {ssr:false}
// boundary around an @react-three/fiber tree previously produced a real
// Next-15/React-19 module-resolution crash in this project (react-reconciler
// resolved the wrong React instance across the async chunk). Gating render
// on the `entered` client-side state below achieves the same "never touches
// the server, never mounts before ready" outcome without that risk.
import LivingSystemCanvas from "./LivingSystemCanvas";
import { detectExperienceMode, type ExperienceMode } from "@/lib/living-system/device-mode";
import "./living-system.css";

gsap.registerPlugin(ScrollTrigger);

function FallbackContent() {
  return (
    <div className="living-fallback">
      <h1>The Living System</h1>
      <p>
        A system runs quietly for months. Then, without warning, a request
        fails: <strong>500 Internal Server Error</strong>. The cause isn&apos;t
        obvious, and the easy fixes — restart, scale, roll back — only clear
        the symptom. What actually resolves it is refusing to move on until
        the root cause is understood, not just the alarm silenced.
      </p>
      <p>
        That instinct — investigate before you patch — is the same one behind
        a real production result: caching and async offloading that cut API
        latency by more than 60% once the actual bottleneck was found, not
        guessed at.
      </p>
    </div>
  );
}

function LivingSystemInner({ mode }: { mode: ExperienceMode }) {
  const [entered, setEntered] = useState(false);

  const masterProgressRef = useRef(0);
  const awakeningProgressRef = useRef(0);
  const journeyWrapperRef = useRef<HTMLDivElement>(null);
  const awakeningSpacerRef = useRef<HTMLDivElement>(null);
  const sound = useSound();
  const { enabled: soundEnabled, startAmbient, stopAmbient } = sound;

  const { phase, chosenId, strainRef, choose } = useIncidentTimeline({
    entered,
    awakeningProgressRef,
    sound,
  });

  // The camera holds once a choice is actually clicked — not merely once
  // the choice prompt reaches full strain. "choice" itself has to stay
  // scrollable in both directions (the timeline hook lets it revert to
  // "straining"/"dormant" as strain drops), or a visitor who scrolls
  // slightly too far gets stuck staring at a frozen, maximally-dimmed
  // scene with no way back except sitting through the whole sequence.
  // Committing — the actual point of no return — is choosing, not arriving.
  const frozen = phase !== "dormant" && phase !== "straining" && phase !== "choice";

  // The canvas is scoped to this chapter via position:sticky (see
  // living-system.css) rather than pinned to the whole viewport, so it can
  // hand off to normal page content afterward. That means a visitor who
  // keeps scrolling during the incident's ~17s real-time sequence could
  // exhaust the chapter's remaining scroll room and release the sticky
  // mid-sequence, scrolling the overlay text out of view. Locking scroll
  // for exactly the frozen span closes that gap without affecting scroll
  // anywhere else on the page.
  //
  // CSS `overflow: hidden` alone doesn't do this: Lenis intercepts wheel
  // input and drives scroll itself via its own scrollTo calls, which aren't
  // blocked by the overflow property (that only stops the browser's native
  // overflow-driven scrolling). Confirmed by testing — scroll kept moving
  // during the "frozen" phase even with overflow hidden. `lenis.stop()` is
  // the actual, official way to pause it; the CSS toggle stays too, since
  // it's what covers reduced-motion visitors (no Lenis instance at all).
  const lenis = useLenis();
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    if (frozen) {
      document.documentElement.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.documentElement.style.overflow = prev;
      lenis?.start();
    }
    return () => {
      document.documentElement.style.overflow = prev;
      lenis?.start();
    };
  }, [frozen, lenis]);

  useEffect(() => {
    if (!entered || !journeyWrapperRef.current || !awakeningSpacerRef.current) return;

    const masterTrigger = ScrollTrigger.create({
      trigger: journeyWrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        masterProgressRef.current = self.progress;
      },
    });

    // "bottom top" (spanning the spacer's full height) was correct back
    // when a second chapter followed it, giving room to scroll that far.
    // Now this spacer is the only content on the page, so the natively
    // scrollable distance is capped at (height - viewport) — "bottom top"
    // would ask for more scroll than the page can ever produce, and this
    // progress value would top out short of 1 forever, never reaching the
    // incident trigger. "bottom bottom" matches what's actually scrollable.
    const awakeningTrigger = ScrollTrigger.create({
      trigger: awakeningSpacerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        awakeningProgressRef.current = self.progress;
      },
    });

    return () => {
      masterTrigger.kill();
      awakeningTrigger.kill();
    };
  }, [entered]);

  useEffect(() => {
    if (entered && soundEnabled && phase === "dormant") {
      startAmbient();
    }
    return () => stopAmbient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered, soundEnabled]);

  return (
    <div className="living-experience">
      {!entered && <EntryGate mode={mode} onEnter={() => setEntered(true)} />}

      {entered && (
        <div className="living-scroll-content" ref={journeyWrapperRef}>
          <div ref={awakeningSpacerRef} className="living-chapter">
            <div className="living-canvas-sticky">
              <LivingSystemCanvas
                mode={mode}
                masterProgressRef={masterProgressRef}
                awakeningProgressRef={awakeningProgressRef}
                strainRef={strainRef}
                frozen={frozen}
              />
              <IncidentOverlay phase={phase} chosenId={chosenId} onChoose={choose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LivingSystemExperience() {
  const [mode, setMode] = useState<ExperienceMode | null>(null);

  useEffect(() => {
    detectExperienceMode().then(setMode);
  }, []);

  if (mode === null) return null;

  // Lite tier (coarse pointer / small viewport) and reduced-motion both get
  // the same accessible, content-complete fallback — a real CSS/canvas-2D
  // "lite" chapter presentation is scoped for full chapter implementation,
  // not this pass (see ARCHITECTURE.md).
  if (mode === "lite" || mode === "reduced-motion") {
    return (
      <div className="living-experience">
        <FallbackContent />
      </div>
    );
  }

  return (
    <SoundProvider>
      <LivingSystemInner mode={mode} />
    </SoundProvider>
  );
}
