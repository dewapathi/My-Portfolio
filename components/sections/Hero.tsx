"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, BadgeCheck, Code2, ShieldCheck, Sparkles, Workflow, Hammer, CheckCircle2, Rocket } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };

  const item = {
    hidden: { y: 18, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-white text-gray-900 dark:bg-[#05060A] dark:text-white"
    >
      {/* ===== Background (premium, controlled) ===== */}
      <div className="absolute inset-0 bg-white dark:bg-[#05060A]" />

      {/* Light gradients */}
      <div
        className="absolute inset-0 opacity-80 dark:hidden"
        style={{
          backgroundImage: `
            radial-gradient(1100px circle at 18% 20%, rgba(99,102,241,0.22), transparent 58%),
            radial-gradient(900px circle at 88% 30%, rgba(236,72,153,0.14), transparent 62%),
            radial-gradient(900px circle at 55% 88%, rgba(34,211,238,0.10), transparent 62%)
          `,
        }}
      />

      {/* Dark gradients */}
      <div
        className="absolute inset-0 hidden opacity-90 dark:block"
        style={{
          backgroundImage: `
            radial-gradient(1200px circle at 18% 20%, rgba(99,102,241,0.28), transparent 55%),
            radial-gradient(900px circle at 88% 30%, rgba(236,72,153,0.18), transparent 60%),
            radial-gradient(900px circle at 55% 88%, rgba(34,211,238,0.12), transparent 60%)
          `,
        }}
      />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:80px_80px] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]" />

      {/* noise */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.45%22/%3E%3C/svg%3E')]" />

      {/* top vignette to reduce “empty” */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/80 to-transparent dark:from-black/60" />
      {/* bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-white/90 to-transparent dark:from-black/70" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-28 pb-16 sm:pb-18 lg:pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid items-center gap-10 lg:grid-cols-2"
        >
          {/* LEFT: Copy */}
          <div>
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/70 px-4 py-2 text-sm font-semibold text-gray-800 backdrop-blur dark:border-white/12 dark:bg-white/6 dark:text-white/90"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-900/5 dark:bg-white/10">
                <Sparkles className="h-4 w-4 text-gray-800 dark:text-white" />
              </span>
              Full-Stack Engineer • React • Django • AWS
              <span className="ml-1 rounded-full bg-gray-900/5 px-2 py-0.5 text-xs font-bold text-gray-700 dark:bg-white/10 dark:text-white/80">
                Available
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-balance text-5xl font-extrabold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:via-white dark:to-white/60">
                I craft
              </span>{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-pink-300 bg-clip-text text-transparent">
                high-end products
              </span>{" "}
              <span className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:via-white dark:to-white/60">
                for web.
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-white/70 sm:text-xl">
              Clean UI, secure backend, and deployment-ready systems.
              I build like a product team: fast iterations, strong architecture, and polished UX.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-7 py-4 text-base font-semibold text-white shadow-[0_18px_60px_rgba(2,132,199,0.18)] ring-1 ring-black/10 transition hover:bg-gray-800 dark:bg-white dark:text-black dark:shadow-[0_18px_60px_rgba(255,255,255,0.14)] dark:ring-white/10 dark:hover:bg-white/95"
              >
                Hire me / Let’s talk
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </motion.a>

              <motion.a
                href="#projects"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-2xl border border-gray-200/70 bg-white/70 px-7 py-4 text-base font-semibold text-gray-900 backdrop-blur transition hover:bg-white dark:border-white/14 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/9"
              >
                See my best work
              </motion.a>
            </motion.div>

            {/* mini trust row */}
            <motion.div variants={item} className="mt-10 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-white/60">
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 bg-white/70 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                <ShieldCheck className="h-4 w-4" /> <span className="text-gray-800 dark:text-white/80">Secure systems</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 bg-white/70 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                <Code2 className="h-4 w-4" /> <span className="text-gray-800 dark:text-white/80">Clean architecture</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/70 bg-white/70 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                <BadgeCheck className="h-4 w-4" /> <span className="text-gray-800 dark:text-white/80">Production-ready</span>
              </span>
            </motion.div>
          </div>

          {/* RIGHT: Premium “product preview” card */}
          <motion.div variants={item} className="relative">
            {/* Glow frame */}
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-r from-indigo-500/18 via-sky-400/16 to-pink-500/16 blur-2xl dark:from-indigo-500/25 dark:via-sky-400/20 dark:to-pink-500/20" />

            {/* Animated border */}
            <div className="relative rounded-[28px] p-[1px]">
              <div className="absolute inset-0 rounded-[28px] bg-[conic-gradient(from_180deg,rgba(99,102,241,0.55),rgba(34,211,238,0.40),rgba(236,72,153,0.50),rgba(99,102,241,0.55))] opacity-70 blur-[10px]" />
              {!reduce && (
                <motion.div
                  className="absolute inset-0 rounded-[28px] opacity-70"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  style={{
                    background:
                      "conic-gradient(from 180deg, rgba(99,102,241,0.55), rgba(34,211,238,0.40), rgba(236,72,153,0.50), rgba(99,102,241,0.55))",
                    filter: "blur(12px)",
                  }}
                />
              )}

              <div className="relative rounded-[28px] border border-gray-200/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white/90">Selected Work Preview</div>
                    <div className="text-xs text-gray-600 dark:text-white/55">2026</div>
                  </div>

                  {/* fake chart / ui blocks (looks premium) */}
                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-gray-200/60 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white/85">Microchip Tracking Portal</div>
                      <div className="mt-1 text-sm text-gray-600 dark:text-white/60">Next.js • React • API integration • Charts</div>
                      <div className="mt-4 h-2 w-full rounded-full bg-gray-900/10 dark:bg-white/10">
                        <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-indigo-300/80 via-sky-200/70 to-pink-300/75" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200/60 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white/85">Django LMS API</div>
                      <div className="mt-1 text-sm text-gray-600 dark:text-white/60">Docker • Postgres • Redis • CI/CD</div>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="h-10 rounded-xl bg-gray-900/5 dark:bg-white/7" />
                        <div className="h-10 rounded-xl bg-gray-900/5 dark:bg-white/7" />
                        <div className="h-10 rounded-xl bg-gray-900/5 dark:bg-white/7" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200/60 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white/85">Modern Mobile App</div>
                      <div className="mt-1 text-sm text-gray-600 dark:text-white/60">React Native • Tailwind • Auth flow</div>
                      <div className="mt-4 h-24 rounded-2xl bg-[radial-gradient(400px_circle_at_30%_20%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(400px_circle_at_70%_70%,rgba(236,72,153,0.12),transparent_60%)] border border-gray-200/60 dark:border-white/10" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200/60 px-6 py-4 text-sm dark:border-white/10">
                  <span className="text-gray-600 dark:text-white/60">Design + Engineering</span>
                  <span className="font-semibold text-gray-900 dark:text-white/85">View case studies →</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Engineering process (fills the “empty” area with credibility) */}
        <motion.div variants={item} className="mt-10 lg:mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white/90">How I build</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-white/60">
                A simple, repeatable process for clean UI, secure backends, and reliable delivery.
              </div>
            </div>
            <a
              href="#projects"
              className="text-sm font-semibold text-gray-900 hover:text-gray-700 dark:text-white/85 dark:hover:text-white"
            >
              See proof in projects →
            </a>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Workflow, title: "Plan", desc: "Clarify goals, scope, risks, and success metrics." },
              { icon: Hammer, title: "Build", desc: "Ship in small iterations with clean architecture." },
              { icon: CheckCircle2, title: "Test", desc: "Edge cases, performance, and security checks." },
              { icon: Rocket, title: "Deploy", desc: "CI/CD, monitoring, and production-ready releases." },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border border-gray-200/70 bg-white/70 p-5 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/9"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-900/5 dark:bg-white/10">
                      <Icon className="h-5 w-5 text-gray-900 dark:text-white" />
                    </span>
                    <div className="text-base font-bold text-gray-900 dark:text-white/90">{s.title}</div>
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-white/60">{s.desc}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue (uses the “extra” space nicely) */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-gray-200/70 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/9 md:inline-flex"
        aria-label="Scroll to about section"
      >
        Scroll
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
