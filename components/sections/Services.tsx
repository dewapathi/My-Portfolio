"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Server,
  Smartphone,
  Cloud,
  Database,
  Zap,
  Shield,
  Layers,
} from "lucide-react";
import { SERVICES } from "@/lib/data";
import Link from "next/link";

const ICON_MAP: Record<string, React.ElementType> = {
  Monitor,
  Server,
  Smartphone,
  Cloud,
  Database,
  Zap,
  Shield,
  Layers,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  return (
    <section id="services" className="section-outer bg-[var(--surface)]">
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
            Services
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-normal text-[var(--deep)] leading-[1.1] tracking-[-0.025em] text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            What you can hire me to build.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base sm:text-lg text-[var(--muted)] max-w-xl leading-relaxed"
          >
            End-to-end delivery across the full product stack — or focused work
            on the layer your team needs most.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {SERVICES.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] ?? Monitor;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="card p-5 card-hover group"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-[var(--accent-light)] mb-4 group-hover:bg-[var(--accent)] transition-colors">
                  <Icon className="h-5 w-5 text-[var(--accent)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-sm text-[var(--deep)] mb-2 leading-snug">
                  {svc.title}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {svc.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-[var(--divider)] bg-[var(--surface-2)] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div>
            <p className="font-semibold text-[var(--deep)] mb-1">
              Have a specific project in mind?
            </p>
            <p className="text-sm text-[var(--muted)]">
              I work with a small number of clients at a time to ensure every
              project gets full attention.
            </p>
          </div>
          <Link
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            Start a conversation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
