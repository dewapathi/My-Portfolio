import type { Project } from "@/content/projects";

/** Lighter-weight row for archive projects — not every project needs the
 *  same visual footprint as a flagship ProjectChapter. */
export default function ProjectArchiveItem({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 rounded-xl border border-[var(--divider)] bg-[var(--surface)] px-5 py-4 hover:border-[var(--accent)]/25 hover:bg-[var(--surface-2)] transition-all duration-300">
      <span className="font-mono text-xs text-[var(--muted-2)] shrink-0 w-8">{project.id}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-medium text-sm text-[var(--deep)]">{project.title}</h4>
          <span
            className="text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded-full"
            style={{ background: `${project.accentFrom}14`, color: project.accentFrom }}
          >
            {project.category}
          </span>
        </div>
        <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{project.tagline}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 shrink-0">
        {project.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--divider)] text-[var(--muted)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
