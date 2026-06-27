"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const PLACEHOLDERS = [
  {
    name: "Client Name",
    role: "Founder · Company",
    initials: "CF",
  },
  {
    name: "Client Name",
    role: "CTO · Company",
    initials: "CT",
  },
  {
    name: "Client Name",
    role: "Product Manager · Company",
    initials: "PM",
  },
];

export default function Testimonials() {
  return (
    <section className="section-outer bg-[var(--ground)]">
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
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="section-label mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
            className="font-serif font-normal text-[var(--deep)] leading-[1.1] tracking-[-0.025em] text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Words from people
            <br />
            I&apos;ve built with.
          </motion.h2>
        </motion.div>

        {/* Placeholder cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {PLACEHOLDERS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card p-6 relative overflow-hidden"
            >
              {/* Blur overlay — indicates placeholder */}
              <div className="absolute inset-0 bg-[var(--surface)]/70 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-2xl">
                <span className="text-xs font-medium text-[var(--muted-2)] bg-[var(--surface)] border border-[var(--divider)] px-3 py-1.5 rounded-full">
                  Coming soon
                </span>
              </div>

              {/* Skeleton content underneath */}
              <div className="flex items-center gap-1.5 mb-4" aria-hidden>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-3.5 w-3.5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <div className="space-y-2 mb-6" aria-hidden>
                <div className="h-3 rounded-full bg-[var(--surface-2)] w-full" />
                <div className="h-3 rounded-full bg-[var(--surface-2)] w-5/6" />
                <div className="h-3 rounded-full bg-[var(--surface-2)] w-4/5" />
                <div className="h-3 rounded-full bg-[var(--surface-2)] w-3/4" />
              </div>
              <div className="flex items-center gap-3" aria-hidden>
                <div className="h-9 w-9 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-xs font-bold text-[var(--muted-2)]">
                  {p.initials}
                </div>
                <div className="space-y-1.5">
                  <div className="h-2.5 rounded-full bg-[var(--surface-2)] w-24" />
                  <div className="h-2 rounded-full bg-[var(--surface-2)] w-16" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Invite note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-[var(--muted)]">
            If we&apos;ve worked together and you&apos;d like to share your experience,{" "}
            <a
              href="mailto:pradeepalakruwan.d@gmail.com"
              className="text-[var(--accent)] hover:underline font-medium"
            >
              I&apos;d love to hear from you.
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
