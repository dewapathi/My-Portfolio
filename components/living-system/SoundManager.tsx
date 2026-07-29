"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type SoundContextValue = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  playTone: (freq?: number, duration?: number) => void;
  startAmbient: () => void;
  stopAmbient: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}

/**
 * No licensed/original audio assets exist in this repo (see
 * ASSET_REQUIREMENTS.md) — everything here is synthesized via Web Audio,
 * never real recordings. `playTone` is a discrete UI blip; `startAmbient`
 * is a genuine (if minimal) sound-design layer: a low sub-bass drone with a
 * slow LFO on a lowpass filter, so it breathes rather than sitting static —
 * meant to read as "a world with a pulse," not silence with sound effects
 * bolted on. Muted by default; nothing plays before the visitor opts in.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<{
    oscA: OscillatorNode;
    oscB: OscillatorNode;
    lfo: OscillatorNode;
    filter: BiquadFilterNode;
    gain: GainNode;
  } | null>(null);

  useEffect(() => {
    const onVisibility = () => {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (document.hidden) ctx.suspend();
      else if (enabled) ctx.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [enabled]);

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  const ensureContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  const playTone = (freq = 440, duration = 0.18) => {
    if (!enabled) return;
    const ctx = ensureContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.05);
  };

  const startAmbient = () => {
    if (!enabled || ambientRef.current) return;
    const ctx = ensureContext();

    const oscA = ctx.createOscillator();
    const oscB = ctx.createOscillator();
    oscA.type = "sine";
    oscB.type = "triangle";
    oscA.frequency.value = 55;
    oscB.frequency.value = 55 * 1.5;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 220;
    filter.Q.value = 0.7;

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 90;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 2.5);

    oscA.connect(filter);
    oscB.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    oscA.start();
    oscB.start();
    lfo.start();
    ambientRef.current = { oscA, oscB, lfo, filter, gain };
  };

  const stopAmbient = () => {
    const chain = ambientRef.current;
    if (!chain || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    chain.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    setTimeout(() => {
      chain.oscA.stop();
      chain.oscB.stop();
      chain.lfo.stop();
    }, 1300);
    ambientRef.current = null;
  };

  return (
    <SoundContext.Provider value={{ enabled, setEnabled, playTone, startAmbient, stopAmbient }}>
      {children}
    </SoundContext.Provider>
  );
}
