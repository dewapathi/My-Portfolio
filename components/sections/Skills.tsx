"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Database, Cloud, Smartphone, Server, Zap } from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    category: "Frontend",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    icon: Server,
    category: "Backend",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Python", level: 95 },
      { name: "Django", level: 95 },
      { name: "Django REST Framework", level: 95 },
      { name: "Flask", level: 85 },
      { name: "FastAPI", level: 85 },
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "Laravel", level: 80 },
    ],
  },
  {
    icon: Smartphone,
    category: "Mobile",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "React Native", level: 90 },
      { name: "iOS Development", level: 85 },
      { name: "Android Development", level: 85 },
      { name: "Firebase", level: 90 },
      { name: "Push Notifications", level: 85 },
    ],
  },
  {
    icon: Database,
    category: "Database",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MySQL", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Database Design", level: 90 },
    ],
  },
  {
    icon: Cloud,
    category: "Cloud & DevOps",
    color: "from-indigo-500 to-blue-500",
    skills: [
      { name: "AWS (EC2, S3, RDS)", level: 90 },
      { name: "Secrets Manager & IAM", level: 85 },
      { name: "Lambda", level: 85 },
      { name: "SNS/SES (Notifications & Email)", level: 85 },
      { name: "Docker", level: 90 },
      { name: "CI/CD", level: 85 },
      { name: "Git", level: 95 },
      { name: "Linux", level: 85 },
    ],
  },
  {
    icon: Zap,
    category: "Other",
    color: "from-yellow-500 to-orange-500",
    skills: [
      { name: "REST APIs", level: 95 },
      { name: "Design Patterns", level: 85 },
      { name: "SMS Systems", level: 80 },
      { name: "Third-party Integrations", level: 90 },
    ],
  },
];

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
            A comprehensive toolkit for building world-class digital solutions
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
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    backgroundImage: `linear-gradient(135deg, ${category.color.split(' ')[1]}, ${category.color.split(' ')[3]})`,
                  }}
                />
                <div className="relative glass-effect p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-800/50 h-full">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-6 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="group/skill">
                        <div className="flex justify-between items-center mb-2.5">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover/skill:text-gray-900 dark:group-hover/skill:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className={`text-sm font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="relative w-full h-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{
                              duration: 1.2,
                              delay: categoryIndex * 0.1 + skillIndex * 0.08,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${category.color} rounded-full shadow-lg`}
                            style={{
                              boxShadow: `0 0 20px rgba(var(--tw-gradient-stops), 0.5)`,
                            }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-shimmer bg-[length:200%_100%]"></div>
                          </motion.div>
                        </div>
                      </div>
                    ))}
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
