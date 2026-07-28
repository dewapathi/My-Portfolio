"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE, CORE_STACK, STATS } from "@/lib/data";
import HeroScene from "@/components/three/HeroScene";
import KineticText from "@/components/motion/KineticText";
import StatCounter from "@/components/motion/StatCounter";

type CP = { t: string; c?: string };

const CODE: { n: number; p: CP[] }[] = [
  { n: 1,  p: [{ t: "# Sentry AutoFix \xB7 Claude Haiku + Sonnet pipeline", c: "#8B949E" }] },
  { n: 2,  p: [{ t: "" }] },
  { n: 3,  p: [{ t: "@webhook_handler", c: "#79C0FF" }, { t: "(source=" }, { t: '"sentry"', c: "#A5D6FF" }, { t: ")" }] },
  { n: 4,  p: [{ t: "def ", c: "#FF7B72" }, { t: "triage_error", c: "#D2A8FF" }, { t: "(payload):" }] },
  { n: 5,  p: [{ t: "    error", c: "#FFA657" }, { t: " = " }, { t: "secret_filter", c: "#D2A8FF" }, { t: "(payload)" }] },
  { n: 6,  p: [{ t: "" }] },
  { n: 7,  p: [{ t: "    # Phase 1: Haiku → file discovery (cheap)", c: "#8B949E" }] },
  { n: 8,  p: [{ t: "    files", c: "#FFA657" }, { t: " = claude." }, { t: "haiku", c: "#6366F1" }, { t: "(" }, { t: "find_files_prompt", c: "#D2A8FF" }, { t: "(error))" }] },
  { n: 9,  p: [{ t: "" }] },
  { n: 10, p: [{ t: "    # Phase 2: Sonnet → root-cause fix + PR", c: "#8B949E" }] },
  { n: 11, p: [{ t: "    pr", c: "#FFA657" }, { t: " = claude." }, { t: "sonnet", c: "#8B5CF6" }, { t: "(" }, { t: "generate_fix", c: "#D2A8FF" }, { t: "(error, files))" }] },
  { n: 12, p: [{ t: "" }] },
  { n: 13, p: [{ t: "    bitbucket.", c: "#FFA657" }, { t: "create_draft_pr", c: "#D2A8FF" }, { t: "(pr)" }] },
  { n: 14, p: [{ t: "    return ", c: "#FF7B72" }, { t: "Response", c: "#FFA657" }, { t: "(status=202)" }] },
];

const LIVE_SYSTEMS = [
  { name: "AI Developer Automation", tech: "Claude API \xB7 Django \xB7 Celery" },
  { name: "Serverless Email Pipeline", tech: "Lambda \xB7 SQS \xB7 EventBridge" },
  { name: "Vehicle Parts Platform",   tech: "React Native \xB7 Django \xB7 PayHere" },
  { name: "Student Mgmt System",      tech: "Next.js \xB7 Django \xB7 Stripe" },
];

function CodeEditorCard() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 rounded-2xl opacity-25 blur-2xl"
        style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
      />
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#0D1117", border: "1px solid rgba(48,54,61,0.9)" }}
      >
        {/* Chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ background: "#161B22", borderColor: "rgba(48,54,61,0.8)" }}
        >
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <div className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex ml-3 text-[11px] font-mono">
            <div
              className="px-3 py-1 text-[#CDD9E5]"
              style={{
                background: "#0D1117",
                border: "1px solid rgba(48,54,61,0.8)",
                borderBottom: "none",
                borderRadius: "4px 4px 0 0",
              }}
            >
              autofix.py
            </div>
            <div className="px-3 py-1 text-[#6E7681]">devassist.py</div>
          </div>
        </div>

        {/* Code body */}
        <div className="p-5 font-mono text-[12.5px] leading-[1.75]">
          <div className="flex gap-5">
            <div
              className="select-none shrink-0 text-right"
              style={{ color: "#3D444D", lineHeight: "1.75", minWidth: "14px" }}
            >
              {CODE.map((l) => (
                <div key={l.n}>{l.n}</div>
              ))}
            </div>
            <div>
              {CODE.map((l) => (
                <div key={l.n} style={{ whiteSpace: "pre", color: "#CDD9E5" }}>
                  {l.p.length === 0 || (l.p.length === 1 && l.p[0].t === "")
                    ? " "
                    : l.p.map((part, i) => (
                        <span key={i} style={{ color: part.c ?? "#CDD9E5" }}>
                          {part.t}
                        </span>
                      ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-2 border-t text-[11px] font-mono"
          style={{
            background: "#161B22",
            borderColor: "rgba(48,54,61,0.6)",
            color: "#6E7681",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[#10B981]">Production</span>
            </span>
            <span>Claude API · Django</span>
          </div>
          <span>CreatIT Solutions</span>
        </div>
      </div>
    </div>
  );
}

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
      <HeroScene />
      <div
        className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute top-1/3 right-0 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 68%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--ground)] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-10 items-center">
          {/* LEFT: Text */}
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.div variants={item} className="mb-8">
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

            <KineticText
              as="h1"
              splitBy="words"
              delay={0.25}
              className="font-serif font-normal text-[var(--deep)] leading-[0.95] tracking-[-0.03em] mb-5"
              style={{ fontSize: "clamp(3rem, 5.5vw, 5.5rem)" }}
            >
              {SITE.name}
            </KineticText>

            <KineticText
              as="p"
              splitBy="words"
              delay={0.45}
              className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-[var(--muted)] mb-6"
            >
              {SITE.role}
            </KineticText>

            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-[var(--deep)] leading-relaxed mb-8 max-w-xl"
            >
              I architect and ship{" "}
              <span className="text-[var(--accent)] font-medium">
                production software systems
              </span>{" "}
              — from cloud infrastructure and AI automation to mobile app
              stores.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Link
                href="#projects"
                data-cursor="View"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0E1520] text-white dark:bg-white dark:text-[#0E1520] px-6 py-3.5 text-sm font-semibold shadow-[0_4px_20px_rgba(14,21,32,0.18)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.12)] hover:opacity-85 transition-opacity"
              >
                View Work <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="#contact"
                data-cursor="Talk"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--divider)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--deep)] hover:bg-[var(--surface-2)] transition-colors"
              >
                Let&apos;s Talk <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${SITE.email}?subject=CV%20Request`}
                data-cursor="Email"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--deep)] transition-colors"
              >
                <Download className="h-4 w-4" />
                Request CV
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="border-t border-[var(--divider)] mb-8"
            />

            <motion.div variants={item} className="flex flex-wrap gap-2 mb-8">
              {CORE_STACK.map((tech) => (
                <span key={tech} className="pill-soft">
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap gap-x-10 gap-y-4"
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <StatCounter
                    value={s.value}
                    className="font-serif text-3xl font-normal text-[var(--deep)] leading-none mb-1"
                  />
                  <span className="text-xs text-[var(--muted)] tracking-wide">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Developer Visual — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-4"
          >
            <CodeEditorCard />

            <div className="grid grid-cols-2 gap-3">
              {LIVE_SYSTEMS.map((sys, i) => (
                <motion.div
                  key={sys.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + i * 0.08 }}
                  className="flex items-start gap-2.5 rounded-xl border border-[var(--divider)] bg-[var(--surface)] px-3.5 py-3 hover:border-[var(--accent)]/30 hover:bg-[var(--surface-2)] transition-all duration-200"
                >
                  <span className="mt-[5px] h-2 w-2 rounded-full shrink-0 bg-[#10B981]" />
                  <div>
                    <p className="text-xs font-semibold text-[var(--deep)] leading-none mb-1.5">
                      {sys.name}
                    </p>
                    <p className="text-[10.5px] text-[var(--muted)] font-mono leading-none">
                      {sys.tech}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
