"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Smartphone,
  KeyRound,
  Boxes,
  Workflow,
  Database,
  Cloud,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { ENGINEERING_LAYERS } from "@/content/engineering";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// Icon + accent per layer — reuses the existing token palette (cyan / violet
// / warm / base accent) rather than inventing new colors, just gives each
// layer a distinct visual identity instead of identical text-only rows.
const LAYER_ICON: Record<string, LucideIcon> = {
  product: Layers,
  clients: Smartphone,
  api: KeyRound,
  domain: Boxes,
  async: Workflow,
  data: Database,
  cloud: Cloud,
  monitoring: ShieldAlert,
};

const LAYER_ACCENT: Record<string, string> = {
  product: "var(--accent)",
  clients: "var(--accent-warm)",
  api: "var(--accent-violet)",
  domain: "var(--accent)",
  async: "var(--accent-cyan)",
  data: "var(--accent-violet)",
  cloud: "var(--accent-cyan)",
  monitoring: "var(--accent-warm)",
};

export default function EngineeringDepth() {
  const [active, setActive] = useState(0);
  const layer = ENGINEERING_LAYERS[active];
  const Icon = LAYER_ICON[layer.id] ?? Layers;
  const accent = LAYER_ACCENT[layer.id] ?? "var(--accent)";

  return (
    <section id="engineering" className="section-outer bg-[var(--ground)] relative overflow-hidden">
      {/* Background follows the active layer's accent — the section reacts
          to the selection instead of sitting on one flat color throughout. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: 1 }}
        style={{
          background: `radial-gradient(circle at 12% 18%, color-mix(in srgb, ${accent} 10%, transparent) 0%, transparent 55%)`,
          transition: "background 0.6s ease-out",
        }}
      />

      <div className="section-inner relative">
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

        <div className="grid lg:grid-cols-[minmax(0,320px)_1fr] gap-6">
          {/* Layer selector — a vertical stack line reinforces "these are
              layers of one system," not a random list of tabs. */}
          <div
            className="relative flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
            role="tablist"
            aria-label="Engineering layers"
          >
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-[27px] top-3 bottom-3 w-px bg-[var(--divider)]"
            />
            {ENGINEERING_LAYERS.map((l, i) => {
              const LIcon = LAYER_ICON[l.id] ?? Layers;
              const isActive = active === i;
              return (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`relative z-10 shrink-0 flex items-center gap-3 text-left px-3.5 py-3 rounded-xl border transition-all duration-200 ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent-light)]"
                      : "border-[var(--divider)] bg-[var(--surface)] hover:border-[var(--accent)]/30"
                  }`}
                >
                  <span
                    className={`shrink-0 flex items-center justify-center h-7 w-7 rounded-lg transition-colors duration-200 ${
                      isActive ? "text-white" : "text-[var(--muted-2)] bg-[var(--surface-2)]"
                    }`}
                    style={isActive ? { backgroundColor: LAYER_ACCENT[l.id] ?? "var(--accent)" } : undefined}
                  >
                    <LIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`font-mono text-[10px] block mb-0.5 ${isActive ? "text-[var(--accent)]" : "text-[var(--muted-2)]"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm font-semibold whitespace-nowrap lg:whitespace-normal ${isActive ? "text-[var(--accent)]" : "text-[var(--deep)]"}`}
                    >
                      {l.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={layer.id}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl border border-[var(--divider)] bg-[var(--surface)] p-8 lg:p-10"
            >
              {/* Giant watermark numeral — a graphic device, not more text */}
              <span
                aria-hidden="true"
                className="absolute -top-6 -right-2 font-display font-semibold select-none pointer-events-none"
                style={{
                  fontSize: "clamp(6rem, 14vw, 11rem)",
                  color: accent,
                  opacity: 0.07,
                  lineHeight: 1,
                }}
              >
                {String(active + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="flex items-center justify-center h-11 w-11 rounded-xl text-white shrink-0"
                    style={{ backgroundColor: accent }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-xs font-bold tracking-[0.14em] uppercase" style={{ color: accent }}>
                    Layer {String(active + 1).padStart(2, "0")} / {ENGINEERING_LAYERS.length}
                  </p>
                </div>
                <h3 className="font-display font-medium text-2xl text-[var(--deep)] mb-3">
                  {layer.label}
                </h3>
                <p className="text-base text-[var(--muted)] leading-relaxed mb-7 max-w-xl">
                  {layer.description}
                </p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                >
                  {layer.technologies.map((t) => (
                    <motion.span
                      key={t}
                      variants={{
                        hidden: { opacity: 0, y: 6 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className="pill-soft"
                    >
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
