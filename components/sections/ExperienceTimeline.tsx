"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-outer bg-[var(--ground)]">
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
            Experience
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-normal text-[var(--deep)] leading-[1.1] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            3+ years of production impact.
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl">
          {/* Vertical rule */}
          <div className="absolute left-4 sm:left-5 top-2 bottom-2 w-px bg-[var(--divider)]" />

          <div className="space-y-10">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-12 sm:pl-14"
              >
                {/* Dot */}
                <div className="absolute left-[13px] sm:left-[17px] top-[6px] h-3 w-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--ground)] shrink-0" />

                <div className="card p-6 sm:p-8">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.1em] uppercase text-[var(--accent)]">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </span>
                    <span className="w-px h-3 bg-[var(--divider)]" />
                    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
                      <Briefcase className="h-3.5 w-3.5" />
                      {exp.company}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg text-[var(--deep)] mb-3">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-5">
                    {exp.highlights.map((hl, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm text-[var(--muted)]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        {hl}
                      </li>
                    ))}
                  </ul>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((t) => (
                      <span key={t} className="pill-accent">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
