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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            A selection of projects showcasing my expertise across different technologies
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${
                  selectedCategory === category
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Live</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
