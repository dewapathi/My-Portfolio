"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE, CORE_STACK, STATS } from "@/lib/data";

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
      {/* Dot-grid texture */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      {/* Radial glow — top left */}
      <div
        className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(24,80,212,0.08) 0%, transparent 68%)",
        }}
      />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--ground)] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-32 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Availability badge */}
          <motion.div variants={item} className="mb-10">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--avail-border)] bg-[var(--avail-bg)] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[var(--available)] animate-pulse-slow shrink-0" />
              <span className="text-sm font-semibold text-[var(--available)]">
                Available for work
              </span>
              <span className="text-[var(--available)]/40">·</span>
              <span className="flex items-center gap-1 text-sm text-[var(--available)]/70 font-normal">
                <MapPin className="h-3.5 w-3.5" />
                {SITE.location}
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="font-serif font-normal text-[var(--deep)] leading-[0.95] tracking-[-0.03em] mb-5"
            style={{ fontSize: "clamp(3.2rem, 9vw, 7rem)" }}
          >
            {SITE.name}
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={item}
            className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-[var(--muted)] mb-7"
          >
            {SITE.role}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl lg:text-2xl text-[var(--deep)] leading-relaxed mb-10 max-w-2xl"
          >
            I design and build{" "}
            <span className="text-[var(--accent)] font-medium">
              production-ready software systems
            </span>{" "}
            that help businesses launch faster, automate operations, and scale
            with confidence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3 mb-14"
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0E1520] text-white dark:bg-white dark:text-[#0E1520] px-6 py-3.5 text-sm font-semibold shadow-[0_4px_20px_rgba(14,21,32,0.18)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.12)] hover:opacity-85 transition-opacity"
            >
              View Work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--divider)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--deep)] hover:bg-[var(--surface-2)] transition-colors"
            >
              Let&apos;s Talk
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:pradeepalakruwan.d@gmail.com?subject=CV%20Request`}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--deep)] transition-colors"
            >
              <Download className="h-4 w-4" />
              Request CV
            </a>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={item}
            className="border-t border-[var(--divider)] mb-8"
          />

          {/* Core stack pills */}
          <motion.div variants={item} className="flex flex-wrap gap-2 mb-10">
            {CORE_STACK.map((tech) => (
              <span key={tech} className="pill-soft">
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-x-10 gap-y-5"
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-serif text-3xl font-normal text-[var(--deep)] leading-none mb-1">
                  {s.value}
                </span>
                <span className="text-xs text-[var(--muted)] tracking-wide">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
