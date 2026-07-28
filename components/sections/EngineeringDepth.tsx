"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ENGINEERING_LAYERS } from "@/content/engineering";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function EngineeringDepth() {
  const [active, setActive] = useState(0);
  const layer = ENGINEERING_LAYERS[active];

  return (
    <section id="engineering" className="section-outer bg-[var(--ground)]">
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
            Engineering Depth
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-medium text-[var(--deep)] leading-[1.1] tracking-[-0.02em] text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Systems I design
            <br />
            and ship end-to-end.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg text-[var(--muted)] max-w-xl leading-relaxed"
          >
            Not just frontend. Not just backend. Select a layer to see what I
            actually build there.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,300px)_1fr] gap-6">
          {/* Layer selector */}
          <div
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
            role="tablist"
            aria-label="Engineering layers"
          >
            {ENGINEERING_LAYERS.map((l, i) => (
              <button
                key={l.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`shrink-0 text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                  active === i
                    ? "border-[var(--accent)] bg-[var(--accent-light)]"
                    : "border-[var(--divider)] bg-[var(--surface)] hover:border-[var(--accent)]/30"
                }`}
              >
                <span
                  className={`font-mono text-[10px] block mb-1 ${active === i ? "text-[var(--accent)]" : "text-[var(--muted-2)]"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-sm font-semibold whitespace-nowrap lg:whitespace-normal ${active === i ? "text-[var(--accent)]" : "text-[var(--deep)]"}`}
                >
                  {l.label}
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={layer.id}
              role="tabpanel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[var(--divider)] bg-[var(--surface)] p-8 lg:p-10"
            >
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[var(--accent)] mb-3">
                Layer {String(active + 1).padStart(2, "0")} / {ENGINEERING_LAYERS.length}
              </p>
              <h3 className="font-display font-medium text-2xl text-[var(--deep)] mb-3">
                {layer.label}
              </h3>
              <p className="text-base text-[var(--muted)] leading-relaxed mb-7 max-w-xl">
                {layer.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {layer.technologies.map((t) => (
                  <span key={t} className="pill-soft">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
