"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { PROJECTS, type Project } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group card overflow-hidden card-hover flex flex-col"
    >
      {/* Visual area */}
      <div className="relative h-52 sm:h-60 overflow-hidden bg-[var(--surface-2)]">
        {/* Top accent bar */}
        <div
          className="absolute top-0 inset-x-0 h-0.5 z-10"
          style={{
            background: `linear-gradient(90deg, ${project.accentFrom}, ${project.accentTo})`,
          }}
        />

        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          /* Gradient placeholder for projects without screenshots */
          <div
            className="absolute inset-0 flex items-end p-6"
            style={{
              background: `linear-gradient(135deg, ${project.accentFrom}28 0%, ${project.accentTo}18 100%)`,
            }}
          >
            <div className="w-full space-y-2 opacity-60">
              <div className="h-2 rounded-full bg-[var(--divider)] w-3/4" />
              <div className="h-2 rounded-full bg-[var(--divider)] w-1/2" />
              <div className="h-2 rounded-full bg-[var(--divider)] w-2/3" />
            </div>
          </div>
        )}

        {/* Overlay gradient for image cards */}
        {project.image && (
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)]/60 via-transparent to-transparent" />
        )}

        {/* Project number + category */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <span className="font-mono text-xs font-bold text-white/70">
            {project.id}
          </span>
          <span className="w-px h-3 bg-white/30" />
          <span className="text-xs font-semibold text-white/80 tracking-wide">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 sm:p-8">
        <h3 className="font-semibold text-lg text-[var(--deep)] mb-2 group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--muted)] italic mb-4 leading-relaxed">
          {project.tagline}
        </p>

        {/* Problem */}
        <div className="mb-4">
          <p className="text-xs font-bold tracking-[0.1em] uppercase text-[var(--muted-2)] mb-1.5">
            Challenge
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Impact */}
        <div className="rounded-xl bg-[var(--surface-2)] border border-[var(--divider)] px-4 py-3 mb-5">
          <p className="text-xs font-bold tracking-[0.1em] uppercase text-[var(--muted-2)] mb-1">
            Outcome
          </p>
          <p className="text-sm text-[var(--deep)] font-medium leading-relaxed">
            {project.impact}
          </p>
        </div>

        {/* Role */}
        <p className="text-xs text-[var(--muted-2)] mb-4">
          <span className="font-semibold text-[var(--muted)]">Role:</span>{" "}
          {project.role}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((t) => (
            <span key={t} className="pill-soft">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-auto flex items-center gap-4">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              Live demo <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="text-xs text-[var(--muted-2)] italic">
              Live link on request
            </span>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--deep)] transition-colors"
            >
              Source <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="section-outer bg-[var(--ground)]"
    >
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09 } },
          }}
          className="mb-14"
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
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
