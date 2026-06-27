"use client";

import { motion } from "framer-motion";
import { TECH_STACK } from "@/lib/data";

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: "⬡",
  Backend: "⬢",
  Mobile: "◈",
  "Cloud & DevOps": "◉",
  Database: "◎",
  Integrations: "◈",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function TechStack() {
  return (
    <section id="stack" className="section-outer bg-[var(--surface)]">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="section-label mb-4">
            Technology Stack
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-normal text-[var(--deep)] leading-[1.1] tracking-[-0.025em] text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            What I build with.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base sm:text-lg text-[var(--muted)] max-w-xl leading-relaxed"
          >
            A clear view of the technologies I use daily and the problems I
            apply them to — no inflated skill meters.
          </motion.p>
        </motion.div>

        {/* Stack grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_STACK.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="card p-6 card-hover"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-5">
                <span
                  className="font-mono text-base text-[var(--accent)] select-none"
                  aria-hidden
                >
                  {CATEGORY_ICONS[group.category] ?? "◆"}
                </span>
                <h3 className="font-semibold text-sm text-[var(--deep)]">
                  {group.category}
                </h3>
              </div>

              {/* Core stack */}
              <div className="mb-4">
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--muted-2)] mb-2.5">
                  Core
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.core.map((t) => (
                    <span key={t} className="pill-core">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Also experienced */}
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--muted-2)] mb-2.5">
                  Also experienced with
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.more.map((t) => (
                    <span key={t} className="pill-soft">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm text-[var(--muted-2)]"
        >
          I pick the right tool for the job — not the trendiest one.
        </motion.p>
      </div>
    </section>
  );
}
