"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  "Architecture",
  "Development",
  "Infrastructure",
  "Deployment",
  "Monitoring",
  "Improvement",
];

export default function ScrollIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const nodes = track.querySelectorAll<HTMLElement>("[data-stage-node]");
    const line = track.querySelector<HTMLElement>("[data-stage-line]");

    const ctx = gsap.context(() => {
      gsap.set(nodes, { opacity: 0.25, y: 10 });
      if (line) gsap.set(line, { scaleX: 0 });

      // Scrubbed to scroll position, not pinned — the page keeps scrolling
      // natively while the chain draws itself in alongside it.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      if (line) tl.to(line, { scaleX: 1, ease: "none" }, 0);
      tl.to(nodes, { opacity: 1, y: 0, stagger: 0.15, ease: "none" }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-outer bg-[var(--ground)]">
      <div className="section-inner">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="section-label mb-4">How I Operate</p>
          <h2
            className="font-display font-medium text-[var(--deep)] leading-[1.1] tracking-[-0.02em] text-balance"
            style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.75rem)" }}
          >
            Production systems, not just features.
          </h2>
          <p className="mt-5 text-lg text-[var(--muted)] leading-relaxed">
            I take ownership across the full lifecycle — not a single layer
            of the stack.
          </p>
        </div>

        <div ref={trackRef} className="relative max-w-4xl mx-auto">
          <div
            data-stage-line
            className="absolute left-0 right-0 top-5 h-px bg-[var(--accent)] origin-left hidden sm:block"
          />
          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-3">
            {STAGES.map((stage, i) => (
              <div
                key={stage}
                data-stage-node
                className="flex flex-col items-center gap-3"
              >
                <span className="flex items-center justify-center h-10 w-10 rounded-full border border-[var(--divider)] bg-[var(--surface)] font-mono text-xs text-[var(--accent)] shrink-0 relative z-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-[var(--deep)] text-center">
                  {stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
