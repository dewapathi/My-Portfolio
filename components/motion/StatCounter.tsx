"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function parseValue(raw: string) {
  const match = raw.match(/^(\d+(?:\.\d+)?)/);
  if (!match) return { number: null, decimals: 0, suffix: raw };
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return {
    number: parseFloat(match[1]),
    decimals,
    suffix: raw.slice(match[0].length),
  };
}

export default function StatCounter({
  value,
  className,
  style,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const { number, decimals, suffix } = parseValue(value);

    if (number === null || reduceMotion) {
      el.textContent = value;
      return;
    }

    el.textContent = `0${suffix}`;
    const counter = { val: 0 };

    const st = ScrollTrigger.create({
      trigger: el,
      // "top 100%" = fires as soon as any part of the element is visible at
      // all — important for above-the-fold stats that shouldn't need an
      // actual scroll gesture to start counting.
      start: "top 100%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: number,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${counter.val.toFixed(decimals)}${suffix}`;
          },
        });
      },
    });

    return () => st.kill();
  }, [value]);

  return (
    <span ref={ref} className={className} style={style}>
      {value}
    </span>
  );
}
