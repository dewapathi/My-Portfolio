"use client";

import { motion } from "framer-motion";
import { PROOF_STATS, PROOF_TAGS } from "@/content/metrics";
import StatCounter from "@/components/motion/StatCounter";

export default function ImpactMetrics() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#080D16" }}>
      <div className="absolute inset-0 dot-grid-light pointer-events-none opacity-60" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(31,143,118,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="section-outer relative z-10">
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-12"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-[#34D399]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] animate-pulse-slow" />
              SYSTEMS OPERATIONAL
            </span>
            <span className="text-xs font-bold tracking-[0.14em] uppercase text-[#4A6080]">
              Impact Metrics — Delivered in Production
            </span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px border border-[#1B2A40] rounded-2xl overflow-hidden mb-12">
            {PROOF_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#0C1420] px-6 py-7 flex flex-col items-start"
              >
                <StatCounter
                  value={stat.value}
                  className="font-display font-medium text-[#EDF1FF] leading-none mb-2"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                />
                <span className="text-xs text-[#4A6080] leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-[#1B2A40] mb-10" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
            className="flex flex-wrap gap-2"
          >
            {PROOF_TAGS.map((tag) => (
              <motion.span
                key={tag}
                variants={{
                  hidden: { opacity: 0, scale: 0.92 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
                }}
                className="font-mono text-[11px] font-medium px-3 py-1.5 rounded-lg border border-[#1B2A40] bg-[#0C1420] text-[#6A7E9E]"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
