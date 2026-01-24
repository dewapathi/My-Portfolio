"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with Django REST Framework backend, React frontend, and AWS deployment. Features include user authentication, payment integration, order management, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    technologies: ["Django", "React", "PostgreSQL", "AWS", "Stripe"],
    category: "Full Stack",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "SaaS Dashboard",
    description:
      "Modern SaaS platform built with Next.js and TypeScript. Includes subscription management, analytics dashboard, and multi-tenant architecture. Deployed on AWS with CI/CD pipeline.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "AWS"],
    category: "Full Stack",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Mobile Food Delivery App",
    description:
      "React Native mobile application for iOS and Android. Features real-time order tracking, push notifications, payment integration, and backend API integration with Django REST Framework.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    technologies: ["React Native", "Django REST", "Firebase", "Stripe"],
    category: "Mobile",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Task Management System",
    description:
      "Collaborative task management platform with real-time updates. Built with Node.js, Express, and React. Features include team collaboration, file attachments, and project analytics.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
    technologies: ["Node.js", "Express", "React", "Socket.io", "MongoDB"],
    category: "Full Stack",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Healthcare API Platform",
    description:
      "Secure healthcare API platform built with FastAPI. Includes HIPAA-compliant data handling, patient management, appointment scheduling, and integration with third-party medical systems.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800",
    technologies: ["FastAPI", "PostgreSQL", "Docker", "AWS", "JWT"],
    category: "Backend",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Real Estate Marketplace",
    description:
      "Property listing platform with advanced search, map integration, and virtual tour features. Built with Next.js, Django REST Framework, and integrated with Google Maps API.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    technologies: ["Next.js", "Django", "PostgreSQL", "Google Maps API", "AWS"],
    category: "Full Stack",
    github: "https://github.com",
    live: "https://example.com",
  },
];

const categories = ["All", "Full Stack", "Mobile", "Backend"];

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      id="projects"
      ref={ref}
      className="section-padding bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-950 dark:via-gray-900/30 dark:to-gray-950 relative overflow-hidden"
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
              Portfolio
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary-600 to-transparent mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
            Showcasing innovative solutions across different technologies
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-xl shadow-primary-500/50"
                    : "glass-effect text-gray-700 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-900/90 border border-gray-200/50 dark:border-gray-800/50"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              <div className="relative glass-effect rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-800/50 h-full flex flex-col">
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm sm:text-base leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-200/50 dark:border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm"
                    >
                      <Github className="w-5 h-5" />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
