"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skillCategories = [
  {
    category: "Frontend",
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
    category: "Backend",
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
    category: "Mobile",
    skills: [
      { name: "React Native", level: 90 },
      { name: "iOS Development", level: 85 },
      { name: "Android Development", level: 85 },
      { name: "Firebase", level: 90 },
      { name: "Push Notifications", level: 85 },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MySQL", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Database Design", level: 90 },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS (EC2, S3, RDS)", level: 90 },
      { name: "Docker", level: 90 },
      { name: "CI/CD", level: 85 },
      { name: "Git", level: 95 },
      { name: "Linux", level: 85 },
    ],
  },
  {
    category: "Other",
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
      className="section-padding bg-gray-50 dark:bg-gray-800"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            A comprehensive overview of the technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                {category.category}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          ease: "easeOut",
                        }}
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
