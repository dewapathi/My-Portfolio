"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import ProjectVisual from "./ProjectVisual";

export default function ProjectChapter({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const flip = index % 2 !== 0;
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 3);
    rotateX.set(-py * 3);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1400,
      }}
      className="group rounded-2xl border border-[var(--divider)] bg-[var(--surface)] overflow-hidden hover:border-[var(--accent)]/25 hover:shadow-[0_16px_60px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_60px_rgba(0,0,0,0.4)] transition-all duration-500"
    >
      <div
        className="h-[3px]"
        style={{ background: `linear-gradient(90deg, ${project.accentFrom}, ${project.accentTo})` }}
      />
      <div className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        <div
          ref={visualRef}
          className="relative lg:w-[46%] shrink-0 min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.accentFrom}20, ${project.accentTo}16)` }}
        >
          <motion.div style={{ y: parallaxY }} className="absolute inset-[-8%]">
            <ProjectVisual project={project} />
          </motion.div>

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
          <div className="absolute bottom-5 left-5">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#10B981] bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Live in Production
            </span>
          </div>
        </div>

        <div className="flex-1 p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
          <div className="flex items-start gap-4 mb-6">
            <span
              className="font-mono text-[2.2rem] font-bold leading-none select-none shrink-0 mt-1"
              style={{ color: `${project.accentFrom}38` }}
            >
              {project.id}
            </span>
            <div>
              <h3
                className="font-display font-medium text-[var(--deep)] leading-tight mb-2"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                {project.title}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">{project.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md border"
                style={{ background: `${project.accentFrom}0E`, color: project.accentFrom, borderColor: `${project.accentFrom}28` }}
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            href={`/work/${project.slug}`}
            data-cursor="Open"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--deep)] hover:text-[var(--accent)] transition-colors w-fit"
          >
            View case study <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
