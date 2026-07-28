import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Project } from "@/content/projects";
import ProjectVisual from "./ProjectVisual";

export default function CaseStudyBody({ project }: { project: Project }) {
  return (
    <article className="pt-32 pb-28">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <Link
          href="/#work"
          data-cursor="Back"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--deep)] transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" /> Back to selected work
        </Link>

        <div className="flex items-start gap-5 mb-6">
          <span
            className="font-mono text-4xl font-bold leading-none select-none shrink-0"
            style={{ color: `${project.accentFrom}45` }}
          >
            {project.id}
          </span>
          <div>
            <p
              className="text-xs font-bold tracking-[0.16em] uppercase mb-2"
              style={{ color: project.accentFrom }}
            >
              {project.category}
            </p>
            <h1
              className="font-display font-medium text-[var(--deep)] leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              {project.title}
            </h1>
          </div>
        </div>

        <p className="text-xl text-[var(--muted)] leading-relaxed max-w-2xl mb-14">
          {project.tagline}
        </p>

        <div
          className="relative rounded-2xl overflow-hidden border border-[var(--divider)] min-h-[320px] sm:min-h-[440px] mb-16"
          style={{ background: `linear-gradient(135deg, ${project.accentFrom}20, ${project.accentTo}16)` }}
        >
          <ProjectVisual project={project} />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p
                className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3"
                style={{ color: project.accentFrom }}
              >
                The Problem
              </p>
              <p className="text-base sm:text-lg text-[var(--deep)] leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <p
                className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3"
                style={{ color: project.accentFrom }}
              >
                Architecture &amp; Approach
              </p>
              <p className="text-base sm:text-lg text-[var(--deep)] leading-relaxed">
                {project.impact}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p
                className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3"
                style={{ color: project.accentFrom }}
              >
                My Contribution
              </p>
              <p className="text-sm text-[var(--deep)] leading-relaxed">{project.role}</p>
            </div>
            <div>
              <p
                className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3"
                style={{ color: project.accentFrom }}
              >
                Status
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#10B981]">
                <CheckCircle2 className="h-4 w-4" /> Live in production
              </span>
            </div>
            <div>
              <p
                className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3"
                style={{ color: project.accentFrom }}
              >
                Technology Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md border"
                    style={{ background: `${project.accentFrom}0E`, color: project.accentFrom, borderColor: `${project.accentFrom}28` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {(project.live || project.github) && (
              <div className="flex flex-col gap-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="View"
                    className="text-sm font-medium text-[var(--accent)] hover:underline"
                  >
                    View live →
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Code"
                    className="text-sm font-medium text-[var(--accent)] hover:underline"
                  >
                    View source →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
