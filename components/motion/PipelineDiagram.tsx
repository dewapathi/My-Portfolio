"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type PipelineStep = {
  label: string;
  sub: string;
  color: string;
  bg?: string;
};

/**
 * Sequential node reveal + draw-in connector for pipeline/architecture
 * diagrams. Animates once the diagram scrolls into view; each step's
 * connector "grows" in right after its node lands.
 */
export default function PipelineDiagram({
  steps,
  className,
}: {
  steps: PipelineStep[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll<HTMLElement>("[data-pipeline-node]");
    const connectors = root.querySelectorAll<HTMLElement>(
      "[data-pipeline-connector]"
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });

      nodes.forEach((node, i) => {
        tl.from(
          node,
          { opacity: 0, y: 14, duration: 0.5, ease: "power3.out" },
          i === 0 ? undefined : "-=0.3"
        );
        const connector = connectors[i];
        if (connector) {
          tl.fromTo(
            connector,
            { scaleY: 0 },
            { scaleY: 1, duration: 0.25, ease: "power2.out" },
            "-=0.15"
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [steps]);

  return (
    <div ref={rootRef} className={`flex flex-col items-center ${className ?? ""}`}>
      {steps.map((step, i) => (
        <div key={step.label + i} className="flex flex-col items-center w-full">
          <div
            data-pipeline-node
            className="w-full max-w-[220px] rounded-lg px-4 py-2.5 text-center"
            style={{
              background: step.bg ?? `${step.color}14`,
              border: `1px solid ${step.color}30`,
            }}
          >
            <p
              className="text-[11px] font-bold leading-none mb-1"
              style={{ color: step.color }}
            >
              {step.label}
            </p>
            <p className="text-[9.5px] leading-none" style={{ color: `${step.color}80` }}>
              {step.sub}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div
              data-pipeline-connector
              className="h-4 w-px origin-top"
              style={{ background: `${step.color}40` }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
