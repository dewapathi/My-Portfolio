"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { EXPERIENCE } from "@/content/experience";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ExperienceOrbit() {
  const exp = EXPERIENCE[0];

  return (
    <section id="experience" className="section-outer bg-[var(--ground)]">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="section-label mb-4">
            Experience
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-medium text-[var(--deep)] leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            3+ years of production impact.
          </motion.h2>
        </motion.div>

        <div className="max-w-3xl">
          {/* Role card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="card p-6 sm:p-8 mb-10"
          >
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
            <h3 className="font-semibold text-lg text-[var(--deep)] mb-3">{exp.title}</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{exp.description}</p>
          </motion.div>

          {/* Milestone path — each highlight is its own node, not a bullet list */}
          <div className="relative pl-4 sm:pl-5">
            <div className="absolute left-4 sm:left-5 top-2 bottom-2 w-px bg-[var(--divider)]" />
            <div className="space-y-6">
              {exp.highlights.map((hl, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-9"
                >
                  <span className="absolute left-[-1px] top-[3px] flex items-center justify-center h-4 w-4 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] ring-4 ring-[var(--ground)] shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                  <p className="text-sm sm:text-base text-[var(--deep)] leading-relaxed">{hl}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech pills */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-1.5 mt-10 pl-4 sm:pl-5"
          >
            {exp.stack.map((t) => (
              <span key={t} className="pill-accent">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
