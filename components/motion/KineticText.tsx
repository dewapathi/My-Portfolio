"use client";

import { useEffect, useRef, type CSSProperties, type JSX } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

type KineticTextProps = {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
  splitBy?: "chars" | "words";
  delay?: number;
};

export default function KineticText({
  children,
  as = "span",
  className,
  style,
  splitBy = "words",
  delay = 0,
}: KineticTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as any;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type: splitBy,
        wordsClass: "kinetic-unit",
        charsClass: "kinetic-unit",
      });
      const units = splitBy === "chars" ? split.chars : split.words;

      gsap.set(units, { display: "inline-block", willChange: "transform" });
      gsap.from(units, {
        yPercent: 115,
        opacity: 0,
        rotateZ: splitBy === "chars" ? 5 : 2,
        duration: 1,
        ease: "power4.out",
        stagger: splitBy === "chars" ? 0.018 : 0.06,
        delay,
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [splitBy, delay]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
