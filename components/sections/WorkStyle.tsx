"use client";

import { motion } from "framer-motion";
import {
  Code2,
  MessageSquare,
  BarChart2,
  Layers,
  Eye,
  CheckSquare,
  LifeBuoy,
  Target,
} from "lucide-react";
import { WORK_STYLE } from "@/lib/data";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code2,
  MessageSquare,
  BarChart2,
  Layers,
  Eye,
  CheckSquare,
  LifeBuoy,
  Target,
};

export default function WorkStyle() {
  return (
    <section className="section-outer bg-[var(--surface)]">
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
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="section-label mb-4"
          >
            How I work
          </motion.p>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="font-serif font-normal text-[var(--deep)] leading-[1.1] tracking-[-0.025em] text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Principles I build every project on.
          </motion.h2>
        </motion.div>

        {/* Principles grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORK_STYLE.map((p, i) => {
            const Icon = ICON_MAP[p.icon] ?? Code2;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group p-6 rounded-2xl border border-transparent hover:border-[var(--divider)] hover:bg-[var(--surface-2)] transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-[var(--accent-light)] mb-4">
                  <Icon className="h-4.5 w-4.5 text-[var(--accent)]" style={{ height: 18, width: 18 }} />
                </div>
                <h3 className="font-semibold text-sm text-[var(--deep)] mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
