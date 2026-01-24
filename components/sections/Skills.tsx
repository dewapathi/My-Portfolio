"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Database, Cloud, Smartphone, Server, Zap, CheckCircle2 } from "lucide-react";

type SkillCategory = {
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  color: string;
  summary: string;
  core: string[];
  experienced: string[];
  highlights: string[];
};

const skillCategories: SkillCategory[] = [
  {
    icon: Code,
    category: "Frontend",
    color: "from-blue-500 to-cyan-500",
    summary: "Modern UI, design systems, performance, and SEO-friendly apps.",
    core: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    experienced: ["JavaScript", "HTML/CSS", "Framer Motion"],
    highlights: ["Responsive UI", "Component architecture", "Performance tuning"],
  },
  {
    icon: Server,
    category: "Backend",
    color: "from-green-500 to-emerald-500",
    summary: "Secure, scalable APIs with clean architecture and integrations.",
    core: ["Python", "Django", "Django REST Framework", "Node.js"],
    experienced: ["FastAPI", "Flask", "Express.js", "Laravel"],
    highlights: ["REST APIs", "Auth & RBAC", "Integrations & webhooks"],
  },
  {
    icon: Smartphone,
    category: "Mobile",
    color: "from-purple-500 to-pink-500",
    summary: "Cross-platform apps with backend integration and store support.",
    core: ["React Native", "Firebase"],
    experienced: ["iOS & Android publishing", "Push notifications", "Deep links"],
    highlights: ["API integration", "Crash-free releases", "App store support"],
  },
  {
    icon: Database,
    category: "Database",
    color: "from-orange-500 to-red-500",
    summary: "Schema design, query optimization, and reliable data modeling.",
    core: ["PostgreSQL", "MySQL"],
    experienced: ["MongoDB", "Database design", "Migrations"],
    highlights: ["Indexes & query tuning", "Data integrity", "Performance"],
  },
  {
    icon: Cloud,
    category: "Cloud & DevOps",
    color: "from-indigo-500 to-blue-500",
    summary: "Production deployments, automation, and secure cloud operations.",
    core: ["AWS (EC2, S3, RDS)", "Docker", "CI/CD"],
    experienced: ["Secrets Manager & IAM", "Lambda", "SNS/SES", "Linux"],
    highlights: ["Reliable deployments", "Security best practices", "Monitoring-ready setups"],
  },
  {
    icon: Zap,
    category: "Other",
    color: "from-yellow-500 to-orange-500",
    summary: "Patterns, integrations, messaging, and delivery-focused engineering.",
    core: ["REST APIs", "Third-party integrations"],
    experienced: ["Design patterns", "SMS systems", "Observability basics"],
    highlights: ["Clean code", "Maintainability", "Fast delivery"],
  },
];

function Pill({ label, variant }: { label: string; variant: "core" | "secondary" }) {
  return (
    <span
      className={
        variant === "core"
          ? "px-3 py-1 rounded-lg text-xs font-semibold bg-gray-900 text-white dark:bg-white dark:text-gray-900"
          : "px-3 py-1 rounded-lg text-xs font-medium bg-gray-100/80 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50"
      }
    >
      {label}
    </span>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="text-sm sm:text-base font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              Technical Expertise
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="gradient-text">Skills</span> &{" "}
            <span className="text-gray-900 dark:text-white">Technologies</span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary-600 to-transparent mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            No inflated percentages — just a clear view of the technologies I use and the problems I solve.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: categoryIndex * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${category.color.split(" ")[1]}, ${category.color.split(" ")[3]})`,
                  }}
                />
                <div className="relative glass-effect p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-800/50 h-full">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-5 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {category.summary}
                  </p>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        Core stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.core.map((t) => (
                          <Pill key={t} label={t} variant="core" />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        Also experienced with
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.experienced.map((t) => (
                          <Pill key={t} label={t} variant="secondary" />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        Focus areas
                      </p>
                      <ul className="space-y-2">
                        {category.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
