"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/content/site";
import { HERO_TELEMETRY } from "@/content/metrics";
import CosmicGate from "@/components/three/CosmicGate";
import KineticText from "@/components/motion/KineticText";
import StatCounter from "@/components/motion/StatCounter";

export default function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: reduce ? 1 : 0,
      y: reduce ? 0 : 18,
      filter: reduce ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center bg-[var(--ground)] overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <CosmicGate />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[var(--ground)] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-40 pb-28 text-center">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p
            variants={item}
            className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[var(--muted)] mb-8"
          >
            Senior Software Engineer · Colombo, Sri Lanka · Remote Worldwide
          </motion.p>

          <KineticText
            as="h1"
            splitBy="words"
            delay={0.25}
            className="font-display font-medium text-[var(--deep)] leading-[1.02] tracking-[-0.02em] mb-7 mx-auto max-w-3xl"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
          >
            I build systems that move ideas into production.
          </KineticText>

          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-[var(--muted)] leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {SITE.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <Link
              href="#work"
              data-cursor="Explore"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] text-white px-6 py-3.5 text-sm font-semibold shadow-[0_8px_32px_rgba(108,140,255,0.28)] hover:bg-[var(--accent-hover)] transition-colors"
            >
              Explore selected work <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="#contact"
              data-cursor="Talk"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--divider)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--deep)] hover:bg-[var(--surface-2)] transition-colors"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-[var(--avail-border)] bg-[var(--avail-bg)] px-4 py-2 mb-14"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--available)] animate-pulse-slow shrink-0" />
            <span className="text-sm font-medium text-[var(--available)]">
              Available for selected freelance and product engagements
            </span>
          </motion.div>

          {/* System telemetry — not ordinary stat cards */}
          <motion.div
            variants={item}
            className="mx-auto max-w-3xl rounded-2xl border border-[var(--divider)] bg-[var(--surface)]/70 backdrop-blur-md px-6 py-5"
          >
            <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[var(--muted-2)] mb-4">
              System Telemetry
            </p>
            <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-5">
              {HERO_TELEMETRY.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center min-w-[6rem]">
                  <span className="flex items-center gap-1.5 mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]" />
                    <StatCounter
                      value={stat.value}
                      className="font-display text-2xl font-medium text-[var(--deep)] leading-none"
                    />
                  </span>
                  <span className="text-[11px] text-[var(--muted)] font-mono text-center leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
