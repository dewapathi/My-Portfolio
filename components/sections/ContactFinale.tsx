"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, MapPin, FileText } from "lucide-react";
import { SITE } from "@/content/site";

const socials = [
  {
    label: "GitHub",
    href: SITE.github,
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// A lightweight "reconnecting nodes" motif — the hero's orbit concept,
// rendered as static/CSS-animated SVG rather than a second WebGL scene.
function ReconnectingNodes() {
  const nodes = [
    { x: 40, y: 30 },
    { x: 260, y: 15 },
    { x: 320, y: 90 },
    { x: 180, y: 110 },
    { x: 60, y: 95 },
  ];
  return (
    <svg
      viewBox="0 0 360 130"
      className="w-full max-w-md mx-auto lg:mx-0 opacity-70"
      aria-hidden="true"
    >
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % nodes.length];
        return (
          <line
            key={`l-${i}`}
            x1={n.x}
            y1={n.y}
            x2={next.x}
            y2={next.y}
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.35"
          />
        );
      })}
      {nodes.map((n, i) => (
        <circle key={`c-${i}`} cx={n.x} cy={n.y} r={i === 0 ? 6 : 4} fill="var(--accent)" opacity={i === 0 ? 1 : 0.7} />
      ))}
    </svg>
  );
}

export default function ContactFinale() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the mailto fallback link still works.
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#080D16" }}
    >
      <div className="absolute inset-0 dot-grid-light pointer-events-none opacity-50" />
      <div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(91,79,255,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="section-outer relative z-10">
        <div className="section-inner">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center mb-4">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-bold tracking-[0.14em] uppercase text-[#4A6080] mb-8"
              >
                Get in touch
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-medium text-[#EDF1FF] leading-[1.05] tracking-[-0.02em] mb-6 text-balance"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
              >
                Have a system worth building?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="text-base sm:text-lg text-[#6A7E9E] leading-relaxed mb-4 max-w-lg"
              >
                Whether you&apos;re launching a product, modernizing a
                platform, or automating an engineering workflow, let&apos;s
                discuss what production-ready looks like.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2 mb-10"
              >
                <span className="h-2 w-2 rounded-full bg-[#34D399] animate-pulse-slow" />
                <span className="text-sm font-medium text-[#34D399]">
                  Available for selected freelance and product engagements
                </span>
                <span className="text-[#34D399]/40">·</span>
                <span className="flex items-center gap-1 text-sm text-[#6A7E9E]">
                  <MapPin className="h-3.5 w-3.5" />
                  {SITE.location}
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="hidden lg:block"
            >
              <ReconnectingNodes />
            </motion.div>
          </div>

          {/* Primary actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button
              type="button"
              onClick={handleCopyEmail}
              data-cursor="Copy"
              className="relative inline-flex items-center gap-2.5 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(91,79,255,0.4)] hover:bg-[var(--accent-hover)] transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" /> Copied to clipboard
                  </motion.span>
                ) : (
                  <motion.span
                    key="email"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" /> {SITE.email}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href={`mailto:${SITE.email}?subject=CV%20Request`}
              data-cursor="Request"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6A7E9E] hover:text-[#EDF1FF] transition-colors"
            >
              <FileText className="h-4 w-4" />
              Request CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="border-t border-[#1B2A40] mb-8"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex items-center gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-cursor={s.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1B2A40] text-[#6A7E9E] hover:text-[#EDF1FF] hover:border-[#2A3D5A] transition-all text-sm font-medium"
              >
                {s.svg}
                {s.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
