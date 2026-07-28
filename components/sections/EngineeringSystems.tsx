"use client";

import { motion } from "framer-motion";
import {
  Shield,
  CreditCard,
  Smartphone,
  Monitor,
  Cloud,
  Database,
} from "lucide-react";

const SYSTEMS = [
  {
    Icon: Shield,
    title: "Auth & Security Systems",
    description:
      "JWT, OAuth 2.0, RBAC, session management, API key rotation, and rate limiting — production-grade security baked into every layer.",
    tags: ["JWT", "OAuth", "RBAC", "Rate Limiting"],
    color: "#6366F1",
  },
  {
    Icon: CreditCard,
    title: "Payment Integrations",
    description:
      "Stripe subscriptions, Payhere, webhook handling, refund flows, and PCI-compliant transaction pipelines — end to end.",
    tags: ["Stripe", "Payhere", "Webhooks", "Subscriptions"],
    color: "#10B981",
  },
  {
    Icon: Smartphone,
    title: "Mobile App Systems",
    description:
      "React Native apps for iOS and Android — push notifications, offline sync, biometric auth, and App Store / Play Store submission.",
    tags: ["React Native", "Expo", "FCM", "Push Notifs"],
    color: "#3B82F6",
  },
  {
    Icon: Monitor,
    title: "Admin Dashboards",
    description:
      "Role-based admin panels with live analytics, data export, bulk operations, and real-time status — built for operators, not just developers.",
    tags: ["Next.js", "Recharts", "RBAC", "CSV Export"],
    color: "#F59E0B",
  },
  {
    Icon: Cloud,
    title: "AWS Cloud Infrastructure",
    description:
      "EC2, RDS, S3, Lambda, SES, SNS, Secrets Manager — zero-downtime deploys, automated CI/CD, and environment isolation.",
    tags: ["EC2", "RDS", "Lambda", "CI/CD"],
    color: "#EF4444",
  },
  {
    Icon: Database,
    title: "Database Architecture",
    description:
      "Schema design from scratch, migration strategies, query optimisation, indexing plans, and Redis caching layers for scale.",
    tags: ["PostgreSQL", "MySQL", "Redis", "Migrations"],
    color: "#8B5CF6",
  },
];

const ARCH_FLOW = [
  { label: "React / Next.js", sub: "Frontend" },
  { label: "Django REST", sub: "API Layer" },
  { label: "PostgreSQL", sub: "Database" },
  { label: "Redis", sub: "Cache" },
  { label: "AWS EC2 / S3", sub: "Cloud" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function EngineeringSystems() {
  return (
    <section className="section-outer bg-[var(--ground)]">
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
            className="font-serif font-normal text-[var(--deep)] leading-[1.1] tracking-[-0.025em] text-balance"
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
            Not just frontend. Not just backend. The whole stack — from schema
            to deployment, from auth to payments.
          </motion.p>
        </motion.div>

        {/* Architecture flow diagram — sequential stage reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="mb-14 overflow-x-auto pb-2"
        >
          <div className="flex items-center gap-0 mx-auto w-fit">
            {ARCH_FLOW.map((node, i) => (
              <div key={node.label} className="flex items-center">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface)] px-5 py-3 text-center hover:border-[var(--accent)]/40 hover:bg-[var(--surface-2)] hover:shadow-[0_4px_20px_rgba(24,80,212,0.06)] transition-all duration-200 cursor-default">
                    <p className="text-sm font-semibold text-[var(--deep)] whitespace-nowrap">
                      {node.label}
                    </p>
                    <p className="text-[11px] text-[var(--muted)] font-mono mt-0.5">
                      {node.sub}
                    </p>
                  </div>
                </motion.div>
                {i < ARCH_FLOW.length - 1 && (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scaleX: 0 },
                      visible: { opacity: 1, scaleX: 1, transition: { duration: 0.3, ease: "easeOut" } },
                    }}
                    className="flex items-center px-1.5 shrink-0 origin-left"
                  >
                    <div className="h-px w-6 bg-[var(--divider)]" />
                    <svg
                      className="h-3.5 w-3.5 text-[var(--accent)] -ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Systems grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SYSTEMS.map(({ Icon, title, description, tags, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group rounded-2xl border border-[var(--divider)] bg-[var(--surface)] p-6 hover:border-[var(--divider)] hover:bg-[var(--surface-2)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-300"
            >
              <div
                className="inline-flex items-center justify-center h-10 w-10 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}1A`, color }}
              >
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="text-base font-semibold text-[var(--deep)] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                {description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md"
                    style={{
                      background: `${color}14`,
                      color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
