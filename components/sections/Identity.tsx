"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const PILLARS = [
  {
    title: "Frontend",
    detail: "React, Next.js, TypeScript — responsive, accessible, fast.",
  },
  {
    title: "Backend",
    detail: "Django, FastAPI, Node.js — secure APIs and business logic.",
  },
  {
    title: "Mobile",
    detail: "React Native for iOS and Android, shipped to both stores.",
  },
  {
    title: "Cloud",
    detail: "AWS deployments with Docker, CI/CD, and production infrastructure.",
  },
];

const BIO = [
  "I'm a full stack software engineer with 8+ years building reliable, scalable systems for startups and growing businesses. My work spans React and Next.js frontends, Django and Node.js backends, React Native mobile apps, and production infrastructure on AWS.",
  "I work with business logic in mind, not just code. Every system I build is designed for clarity, performance, and long-term maintainability. I've shipped payment integrations, authentication systems, admin dashboards, automation workflows, and cloud deployments across multiple industries.",
  "I take ownership from first commit to production — and beyond.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Identity() {
  return (
    <section
      id="about"
      className="section-outer bg-[var(--surface)]"
    >
      <div className="section-inner">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — positioning */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.p variants={fadeUp} className="section-label mb-5">
              About
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-normal text-[var(--deep)] leading-[1.1] tracking-[-0.025em] mb-8 text-balance"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Building reliable systems,
              <br />
              not just code.
            </motion.h2>

            <div className="space-y-5">
              {BIO.map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-base sm:text-lg text-[var(--muted)] leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right — expertise pillars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 lg:pt-14"
          >
            {PILLARS.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="card p-6 card-hover"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  <span className="font-semibold text-[var(--deep)] text-sm">
                    {pillar.title}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {pillar.detail}
                </p>
              </motion.div>
            ))}

            {/* Availability callout */}
            <motion.div
              variants={fadeUp}
              className="sm:col-span-2 rounded-2xl bg-[var(--accent-light)] border border-[var(--accent-mid)] p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-[var(--available)] animate-pulse-slow" />
                <span className="text-xs font-bold tracking-[0.1em] uppercase text-[var(--accent)]">
                  Currently available
                </span>
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Open to freelance contracts, long-term partnerships, and
                startup engagements. I work with a small number of clients at a
                time to give every project full attention.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
