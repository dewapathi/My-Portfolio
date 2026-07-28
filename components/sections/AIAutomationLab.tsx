"use client";

import { motion } from "framer-motion";
import PipelineDiagram, { type PipelineStep } from "@/components/motion/PipelineDiagram";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const AUTOFIX_STEPS: PipelineStep[] = [
  {
    label: "Sentry Event",
    sub: "Webhook",
    color: "#F87171",
    bg: "rgba(248,113,113,0.10)",
    description: "A new error webhook fires the moment an exception is captured in production.",
  },
  {
    label: "Secret Filter",
    sub: "Security Boundary",
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.10)",
    description: "Django middleware strips all credentials and secrets before anything reaches the LLM.",
  },
  {
    label: "Claude Haiku",
    sub: "File Discovery",
    color: "#818CF8",
    bg: "rgba(129,140,248,0.15)",
    description: "Maps the affected codebase fast and cheap — file discovery only, no fix logic yet.",
  },
  {
    label: "Claude Sonnet",
    sub: "Root-Cause Analysis",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.15)",
    description: "Analyses the root cause and generates the actual fix code.",
  },
  {
    label: "Bitbucket",
    sub: "Draft Pull Request",
    color: "#34D399",
    bg: "rgba(52,211,153,0.10)",
    description: "Opens a draft pull request automatically — nothing merges on its own.",
  },
  {
    label: "Human Review",
    sub: "Required",
    color: "#E5E7EB",
    bg: "rgba(229,231,235,0.08)",
    description: "A developer reviews and approves before anything reaches production.",
  },
];

const DEVASSIST_STEPS: PipelineStep[] = [
  {
    label: "Dev Input",
    sub: "Text / Voice",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.10)",
    description: "Developer describes a feature or fix in plain text or voice.",
  },
  {
    label: "Claude Haiku",
    sub: "Context Mapping",
    color: "#818CF8",
    bg: "rgba(129,140,248,0.15)",
    description: "Maps relevant files across the repository for context.",
  },
  {
    label: "Claude Sonnet",
    sub: "Code Generation",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.15)",
    description: "Generates production-quality code using that file context.",
  },
  {
    label: "Draft PR",
    sub: "Auto-committed",
    color: "#34D399",
    bg: "rgba(52,211,153,0.10)",
    description: "Committed to a branch as a draft pull request — not merged.",
  },
  {
    label: "Human Review",
    sub: "Required",
    color: "#E5E7EB",
    bg: "rgba(229,231,235,0.08)",
    description: "The developer reviews and merges — Claude never merges its own code.",
  },
];

const METRICS = [
  { label: "Haiku", detail: "File discovery — fast, cheap token use", color: "#818CF8" },
  { label: "Sonnet", detail: "Root-cause analysis + fix generation", color: "#A78BFA" },
  { label: "Secret Filter", detail: "Zero credentials reach the LLM", color: "#FBBF24" },
  { label: "Draft-only PRs", detail: "Human review always required", color: "#34D399" },
];

export default function AIAutomationLab() {
  return (
    <section
      id="ai-lab"
      className="section-outer"
      style={{ background: "#080D16" }}
    >
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "#818CF8" }}>
            AI Automation Lab
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-medium leading-[1.1] tracking-[-0.02em] text-balance mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#EEF2FF" }}
          >
            Anthropic Claude API in production.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed max-w-2xl"
            style={{ color: "rgba(238,242,255,0.55)" }}
          >
            Two systems built at CreatIT Solutions using multi-model Claude pipelines — Haiku for fast, cheap discovery; Sonnet for deep reasoning and code generation. Hover or tap a stage below for what it actually does.
          </motion.p>
        </motion.div>

        {/* System cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-14">
          {/* Sentry AutoFix */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-8 flex flex-col"
            style={{
              background: "rgba(129,140,248,0.06)",
              border: "1px solid rgba(129,140,248,0.18)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center text-base"
                style={{ background: "rgba(129,140,248,0.15)", border: "1px solid rgba(129,140,248,0.25)" }}
              >
                ⚡
              </div>
              <div>
                <h3 className="font-semibold text-base leading-none mb-1" style={{ color: "#EEF2FF" }}>
                  Sentry AutoFix
                </h3>
                <p className="text-[11px] font-mono" style={{ color: "rgba(129,140,248,0.7)" }}>
                  Automated error triage → draft PR
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-1 mt-4" style={{ color: "rgba(238,242,255,0.55)" }}>
              Sentry webhook fires on each new error. A Django middleware strips all credentials before touching the LLM. Claude Haiku maps the affected codebase (cheap). Claude Sonnet analyses the root cause and generates a fix. A draft PR opens in Bitbucket automatically — no human in the loop until review.
            </p>

            <PipelineDiagram steps={AUTOFIX_STEPS} className="mt-6" interactive />

            <div className="mt-6 flex flex-wrap gap-2">
              {["Claude API", "Django", "Celery", "Webhook", "Bitbucket API", "Secret Filter"].map((t) => (
                <span
                  key={t}
                  className="text-[10.5px] font-mono px-2.5 py-1 rounded-md"
                  style={{ background: "rgba(129,140,248,0.10)", color: "#818CF8", border: "1px solid rgba(129,140,248,0.2)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* DevAssist */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-8 flex flex-col"
            style={{
              background: "rgba(96,165,250,0.06)",
              border: "1px solid rgba(96,165,250,0.18)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center text-base"
                style={{ background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.25)" }}
              >
                🤖
              </div>
              <div>
                <h3 className="font-semibold text-base leading-none mb-1" style={{ color: "#EEF2FF" }}>
                  DevAssist
                </h3>
                <p className="text-[11px] font-mono" style={{ color: "rgba(96,165,250,0.7)" }}>
                  Natural language → working code → PR
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-1 mt-4" style={{ color: "rgba(238,242,255,0.55)" }}>
              Developer describes a feature or fix in plain text or voice. Claude Haiku maps relevant files in the repository. Claude Sonnet generates production-quality code with context from those files. A draft PR is auto-committed to the branch — the developer reviews and merges.
            </p>

            <PipelineDiagram steps={DEVASSIST_STEPS} className="mt-6" interactive />

            <div className="mt-6 flex flex-wrap gap-2">
              {["Claude API", "Haiku + Sonnet", "Multi-model", "Django", "Bitbucket", "Draft PR"].map((t) => (
                <span
                  key={t}
                  className="text-[10.5px] font-mono px-2.5 py-1 rounded-md"
                  style={{ background: "rgba(96,165,250,0.10)", color: "#60A5FA", border: "1px solid rgba(96,165,250,0.2)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Design principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-8"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p
            className="text-[11px] font-bold tracking-[0.14em] uppercase mb-6"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Pipeline Design Principles
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {METRICS.map((m) => (
              <div key={m.label}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: m.color }} />
                  <p className="text-sm font-semibold" style={{ color: m.color }}>
                    {m.label}
                  </p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(238,242,255,0.45)" }}>
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
