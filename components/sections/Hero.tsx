"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import Link from "next/link";
import { SITE, CORE_STACK, STATS } from "@/lib/data";

type CP = { t: string; c?: string };

const CODE: { n: number; p: CP[] }[] = [
  { n: 1,  p: [{ t: "@api_view", c: "#79C0FF" }, { t: "(['POST'])" }] },
  { n: 2,  p: [{ t: "@permission_classes", c: "#79C0FF" }, { t: "([" }, { t: "IsAuthenticated", c: "#FFA657" }, { t: "])" }] },
  { n: 3,  p: [{ t: "def ", c: "#FF7B72" }, { t: "process_payment", c: "#D2A8FF" }, { t: "(request):" }] },
  { n: 4,  p: [{ t: "    order", c: "#FFA657" }, { t: " = " }, { t: "get_order", c: "#D2A8FF" }, { t: "(request.data)" }] },
  { n: 5,  p: [{ t: "    charge", c: "#FFA657" }, { t: " = stripe." }, { t: "PaymentIntent", c: "#D2A8FF" }, { t: ".create(" }] },
  { n: 6,  p: [{ t: "        amount", c: "#79C0FF" }, { t: "=order.total_cents," }] },
  { n: 7,  p: [{ t: "        customer", c: "#79C0FF" }, { t: "=request.user.stripe_id," }] },
  { n: 8,  p: [{ t: "    )" }] },
  { n: 9,  p: [{ t: "    " }, { t: "notify_customer", c: "#D2A8FF" }, { t: "(order, charge)" }] },
  { n: 10, p: [{ t: "    return ", c: "#FF7B72" }, { t: "Response", c: "#FFA657" }, { t: "(status=200)" }] },
  { n: 11, p: [{ t: "" }] },
  { n: 12, p: [{ t: "# Stripe charged \xB7 200 OK \xB7 Customer notified", c: "#8B949E" }] },
];

const LIVE_SYSTEMS = [
  { name: "M-Auto Platform",   tech: "React Native \xB7 Django REST" },
  { name: "Orivet Mobile App", tech: "React Native \xB7 Stripe \xB7 AWS" },
  { name: "Microchip Portal",  tech: "Next.js \xB7 REST APIs" },
  { name: "LMS Backend API",   tech: "Django \xB7 Docker \xB7 AWS" },
];

function CodeEditorCard() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 rounded-2xl opacity-25 blur-2xl"
        style={{ background: "linear-gradient(135deg, #1850D4, #6366F1)" }}
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
              payment_view.py
            </div>
            <div className="px-3 py-1 text-[#6E7681]">models.py</div>
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
                    ? " "
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
            <span>Django REST</span>
          </div>
          <span>ap-southeast-2 · AWS</span>
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
      <div
        className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(24,80,212,0.07) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute top-1/3 right-0 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 68%)",
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

            <motion.h1
              variants={item}
              className="font-serif font-normal text-[var(--deep)] leading-[0.95] tracking-[-0.03em] mb-5"
              style={{ fontSize: "clamp(3rem, 5.5vw, 5.5rem)" }}
            >
              {SITE.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-[var(--muted)] mb-6"
            >
              {SITE.role}
            </motion.p>

            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-[var(--deep)] leading-relaxed mb-8 max-w-xl"
            >
              I design and build{" "}
              <span className="text-[var(--accent)] font-medium">
                production-ready software systems
              </span>{" "}
              that help businesses launch faster, automate operations, and scale
              with confidence.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0E1520] text-white dark:bg-white dark:text-[#0E1520] px-6 py-3.5 text-sm font-semibold shadow-[0_4px_20px_rgba(14,21,32,0.18)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.12)] hover:opacity-85 transition-opacity"
              >
                View Work <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--divider)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--deep)] hover:bg-[var(--surface-2)] transition-colors"
              >
                Let&apos;s Talk <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${SITE.email}?subject=CV%20Request`}
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
