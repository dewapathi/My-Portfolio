"use client";

import { motion } from "framer-motion";
import { FLAGSHIP_PROJECTS, ARCHIVE_PROJECTS } from "@/content/projects";
import ProjectChapter from "@/components/projects/ProjectChapter";
import ProjectArchiveItem from "@/components/projects/ProjectArchiveItem";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Work() {
  return (
    <section id="work" className="section-outer bg-[var(--surface-2)]">
      <div className="section-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-4">
            Selected Work
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-medium text-[var(--deep)] leading-[1.1] tracking-[-0.02em] text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Five systems, built end to end.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg text-[var(--muted)] max-w-xl leading-relaxed"
          >
            Real problems. Production systems. Each one a full case study —
            problem, architecture, and outcome.
          </motion.p>
        </motion.div>

        <div className="space-y-6 mb-20">
          {FLAGSHIP_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={fadeUp}
            >
              <ProjectChapter project={project} index={i} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.14em] uppercase text-[var(--muted-2)] mb-5">
            Also Shipped
          </motion.p>
          <div className="space-y-3">
            {ARCHIVE_PROJECTS.map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <ProjectArchiveItem project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
