"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Full Stack Software Engineer",
    company: "Freelance / Contract",
    location: "Remote",
    period: "2020 - Present",
    description: [
      "Developed secure, scalable backend systems and REST APIs for web and mobile applications",
      "Built modern frontend applications using React, Next.js, and TypeScript",
      "Implemented authentication systems, database design, and third-party API integrations",
      "Deployed applications to production using AWS services (EC2, S3, RDS, Docker, CI/CD)",
      "Developed mobile applications for Android and iOS using React Native",
      "Provided app publishing support (Google Play Console and Apple Developer setup)",
      "Delivered high-quality code with focus on performance, security, and reliability",
    ],
    technologies: [
      "Python", "Django", "Flask", "FastAPI", "Node.js", "React", "Next.js",
      "React Native", "AWS", "PostgreSQL", "MySQL", "MongoDB", "Docker"
    ],
  },
  {
    title: "Backend Developer",
    company: "Various Clients",
    location: "Remote",
    period: "2018 - 2020",
    description: [
      "Designed and developed RESTful APIs using Django REST Framework",
      "Implemented secure authentication and authorization systems",
      "Optimized database queries and improved application performance",
      "Integrated third-party services and payment gateways",
      "Collaborated with frontend developers and mobile app developers",
    ],
    technologies: [
      "Python", "Django", "PostgreSQL", "MySQL", "REST APIs", "AWS"
    ],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="experience"
      ref={ref}
      className="section-padding scroll-mt-24 bg-white dark:bg-gray-900"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6 sm:mb-8"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-900"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative pl-12 sm:pl-20 pb-8 sm:pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-2 sm:left-6 top-2 w-3 h-3 sm:w-4 sm:h-4 bg-primary-600 rounded-full border-2 sm:border-4 border-white dark:border-gray-900"></div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex flex-col mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm sm:text-base text-gray-600 dark:text-gray-300 flex items-start"
                      >
                        <span className="text-primary-600 dark:text-primary-400 mr-2 mt-0.5">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
