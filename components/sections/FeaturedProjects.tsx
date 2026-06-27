"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function AIPipelineMockup({ project }: { project: Project }) {
  const steps = [
    { label: "Sentry Error", sub: "Webhook", c: "#F87171" },
    { label: "Secret Filter", sub: "Middleware", c: "#FBBF24" },
    { label: "Claude Haiku", sub: "File Discovery", c: project.accentFrom },
    { label: "Claude Sonnet", sub: "Fix Generation", c: project.accentTo },
    { label: "Draft PR", sub: "Bitbucket", c: "#34D399" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8" style={{ background: "#0D1117" }}>
      <p className="text-[10px] font-mono font-bold tracking-[0.12em] uppercase mb-2" style={{ color: `${project.accentFrom}80` }}>
        AutoFix Pipeline
      </p>
      {steps.map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-1 w-full max-w-[200px]">
          <div
            className="w-full rounded-lg px-4 py-2.5 text-center"
            style={{ background: `${s.c}14`, border: `1px solid ${s.c}30` }}
          >
            <p className="text-[11px] font-bold leading-none mb-1" style={{ color: s.c }}>{s.label}</p>
            <p className="text-[9.5px] leading-none" style={{ color: `${s.c}70` }}>{s.sub}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="h-4 w-px" style={{ background: `${s.c}40` }} />
          )}
        </div>
      ))}
    </div>
  );
}

function StudentDashboardMockup({ project }: { project: Project }) {
  const students = [
    { name: "Amal Perera",  role: "Admin",   present: true },
    { name: "Nimal Silva",  role: "Student", present: true },
    { name: "Kasun Raj",    role: "Student", present: false },
    { name: "Saman Fernando", role: "Teacher", present: true },
  ];
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-7">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold" style={{ color: project.accentFrom }}>Students</span>
        <span
          className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: `${project.accentFrom}20`, color: project.accentFrom }}
        >
          + Enroll
        </span>
      </div>
      <div className="rounded-lg overflow-hidden flex-1" style={{ border: `1px solid ${project.accentFrom}20` }}>
        <div
          className="grid grid-cols-3 px-3 py-2 text-[9.5px] font-bold uppercase tracking-wider"
          style={{ background: `${project.accentFrom}14`, color: project.accentFrom }}
        >
          <span>Name</span>
          <span>Role</span>
          <span>Attendance</span>
        </div>
        {students.map((s, i) => (
          <div
            key={i}
            className="grid grid-cols-3 px-3 py-2.5 text-[11px] border-t"
            style={{ borderColor: `${project.accentFrom}14`, color: `${project.accentFrom}CC` }}
          >
            <span className="font-medium truncate">{s.name}</span>
            <span
              className="text-[9.5px] font-bold px-2 py-0.5 rounded-full w-fit"
              style={{
                background: s.role === "Admin" ? `${project.accentFrom}20` : s.role === "Teacher" ? `${project.accentTo}20` : "rgba(255,255,255,0.06)",
                color: s.role === "Admin" ? project.accentFrom : s.role === "Teacher" ? project.accentTo : `${project.accentFrom}80`,
              }}
            >
              {s.role}
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${s.present ? "bg-[#10B981]" : "bg-[#EF4444]"}`} />
              {s.present ? "Present" : "Absent"}
            </span>
          </div>
        ))}
      </div>
      <div
        className="flex items-center justify-between rounded-lg px-4 py-2.5"
        style={{ background: `${project.accentFrom}10`, border: `1px solid ${project.accentFrom}20` }}
      >
        <span className="text-[10.5px]" style={{ color: `${project.accentFrom}80` }}>Stripe fees collected</span>
        <span className="text-[11px] font-bold" style={{ color: project.accentFrom }}>LKR 48,200</span>
      </div>
    </div>
  );
}

function AWSFlowMockup({ project }: { project: Project }) {
  const nodes = [
    { label: "EventBridge", sub: "Event trigger", c: "#FF9900" },
    { label: "Lambda", sub: "Producer fn", c: "#FF9900" },
    { label: "SQS Queue", sub: "Decoupled buffer", c: "#FF9900" },
    { label: "Lambda", sub: "Consumer fn", c: "#FF9900" },
    { label: "SES", sub: "Email delivery", c: "#34D399" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-8" style={{ background: "#0D1117" }}>
      <p className="text-[10px] font-mono font-bold tracking-[0.12em] uppercase mb-2" style={{ color: "#FF990070" }}>
        Serverless Pipeline
      </p>
      {nodes.map((n, i) => (
        <div key={i} className="flex flex-col items-center gap-1 w-full max-w-[220px]">
          <div
            className="w-full rounded-lg px-4 py-2 text-center"
            style={{ background: `${n.c}12`, border: `1px solid ${n.c}28` }}
          >
            <p className="text-[11px] font-bold leading-none mb-0.5" style={{ color: n.c }}>{n.label}</p>
            <p className="text-[9.5px] leading-none" style={{ color: `${n.c}60` }}>{n.sub}</p>
          </div>
          {i < nodes.length - 1 && (
            <div className="h-3 w-px" style={{ background: "rgba(255,153,0,0.30)" }} />
          )}
        </div>
      ))}
      <div className="flex items-center gap-3 mt-3">
        {["Auto-retry", "Zero server", "Fault-tolerant"].map((t) => (
          <span key={t} className="text-[9px] font-mono px-2 py-1 rounded" style={{ background: "#FF990012", color: "#FF9900", border: "1px solid #FF990025" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectMockup({ project }: { project: Project }) {
  if (project.id === "01") return <AIPipelineMockup project={project} />;
  if (project.id === "04") return <StudentDashboardMockup project={project} />;
  if (project.id === "05") return <AWSFlowMockup project={project} />;
  return (
    <div className="absolute inset-0 flex items-center justify-center p-10">
      <div
        className="w-full rounded-xl p-5 space-y-3"
        style={{
          background: `${project.accentFrom}12`,
          border: `1px solid ${project.accentFrom}25`,
        }}
      >
        {[85, 70, 92, 60, 78].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="h-7 w-7 rounded-lg shrink-0"
              style={{ background: `${project.accentFrom}30` }}
            />
            <div className="flex-1 space-y-1.5">
              <div
                className="h-2 rounded-full"
                style={{
                  background: `${project.accentFrom}38`,
                  width: `${w}%`,
                }}
              />
              <div
                className="h-1.5 rounded-full"
                style={{
                  background: `${project.accentFrom}20`,
                  width: `${w - 24}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const flip = index % 2 !== 0;

  return (
    <div className="group rounded-2xl border border-[var(--divider)] bg-[var(--surface)] overflow-hidden hover:border-[var(--accent)]/20 hover:shadow-[0_16px_60px_rgba(14,21,32,0.09)] dark:hover:shadow-[0_16px_60px_rgba(0,0,0,0.35)] transition-all duration-500">
      {/* Accent top bar */}
      <div
        className="h-[3px]"
        style={{
          background: `linear-gradient(90deg, ${project.accentFrom}, ${project.accentTo})`,
        }}
      />

      <div
        className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"}`}
      >
        {/* Visual side */}
        <div
          className="relative lg:w-[44%] shrink-0 min-h-[260px] sm:min-h-[340px] lg:min-h-[460px] overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.accentFrom}20, ${project.accentTo}16)`,
          }}
        >
          {project.image ? (
            <>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <div
                className={`absolute inset-0 ${
                  flip
                    ? "bg-gradient-to-l"
                    : "bg-gradient-to-r"
                } from-transparent to-[var(--surface)]/8`}
              />
            </>
          ) : (
            <ProjectMockup project={project} />
          )}

          {/* Category badge */}
          <div className="absolute top-5 left-5">
            <span
              className="text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full backdrop-blur-md"
              style={{
                background: `${project.accentFrom}28`,
                color: project.accentFrom,
                border: `1px solid ${project.accentFrom}38`,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Production badge */}
          <div className="absolute bottom-5 left-5">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#10B981] bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Live in Production
            </span>
          </div>
        </div>

        {/* Content side */}
        <div className="flex-1 p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
          {/* Number + title */}
          <div className="flex items-start gap-4 mb-8">
            <span
              className="font-mono text-[2.2rem] font-bold leading-none select-none shrink-0 mt-1"
              style={{ color: `${project.accentFrom}38` }}
            >
              {project.id}
            </span>
            <div>
              <h3
                className="font-serif font-normal text-[var(--deep)] leading-tight mb-2"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                {project.title}
              </h3>
              <p className="text-[var(--muted)] text-sm italic leading-relaxed">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Case study blocks */}
          <div className="grid sm:grid-cols-1 gap-5 mb-8">
            <div>
              <p
                className="text-[10px] font-bold tracking-[0.14em] uppercase mb-2"
                style={{ color: project.accentFrom }}
              >
                The Problem
              </p>
              <p className="text-sm text-[var(--deep)] leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <p
                  className="text-[10px] font-bold tracking-[0.14em] uppercase mb-2"
                  style={{ color: project.accentFrom }}
                >
                  What I Delivered
                </p>
                <p className="text-sm text-[var(--deep)] leading-relaxed">
                  {project.impact}
                </p>
              </div>
              <div>
                <p
                  className="text-[10px] font-bold tracking-[0.14em] uppercase mb-2"
                  style={{ color: project.accentFrom }}
                >
                  My Role
                </p>
                <p className="text-sm text-[var(--accent)] font-medium leading-relaxed">
                  {project.role}
                </p>
              </div>
            </div>
          </div>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md border"
                style={{
                  background: `${project.accentFrom}0E`,
                  color: project.accentFrom,
                  borderColor: `${project.accentFrom}28`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 pt-6 border-t border-[var(--divider)]">
            <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
            <span className="text-sm font-medium text-[#10B981]">
              Deployed &amp; live in production
            </span>
            <div className="flex gap-4 ml-auto">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Live
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="section-outer bg-[var(--surface-2)]">
      <div className="section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09 } },
          }}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-4">
            Selected Work
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-normal text-[var(--deep)] leading-[1.1] tracking-[-0.025em] text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Projects built for real users,
            <br className="hidden sm:block" />
            in production.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg text-[var(--muted)] max-w-xl leading-relaxed"
          >
            Real problems. Production systems. Measurable impact.
          </motion.p>
        </motion.div>

        <div className="space-y-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={fadeUp}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
