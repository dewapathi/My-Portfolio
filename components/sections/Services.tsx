"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Server,
  Smartphone,
  Cloud,
  Database,
  Zap,
  Shield,
  Rocket,
} from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Frontend Development",
    description:
      "Building modern, responsive user interfaces using React, Next.js, and TypeScript. Creating seamless user experiences with clean code and best practices.",
    features: [
      "React & Next.js Development",
      "TypeScript Implementation",
      "Responsive Design",
      "UI/UX Optimization",
    ],
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Developing secure, scalable backend systems and REST APIs using Python (Django, Flask, FastAPI) and Node.js. Focus on performance and reliability.",
    features: [
      "Django & Django REST Framework",
      "Node.js & Express",
      "RESTful API Design",
      "Authentication & Authorization",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Creating cross-platform mobile applications using React Native. Full support for iOS and Android with backend integration and app store publishing.",
    features: [
      "React Native Development",
      "iOS & Android Support",
      "Backend Integration",
      "App Store Publishing",
    ],
  },
  {
    icon: Cloud,
    title: "AWS Cloud Deployment",
    description:
      "Deploying applications to production using AWS services. Setting up scalable infrastructure with EC2, S3, RDS, Docker, and CI/CD pipelines.",
    features: [
      "AWS Infrastructure Setup",
      "Docker & Containerization",
      "CI/CD Pipeline Configuration",
      "Production Deployment",
    ],
  },
  {
    icon: Database,
    title: "Database Design",
    description:
      "Designing efficient database schemas and optimizing queries. Experience with PostgreSQL, MySQL, and MongoDB for various use cases.",
    features: [
      "Database Schema Design",
      "Query Optimization",
      "Data Migration",
      "Performance Tuning",
    ],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Optimizing applications for speed and efficiency. Identifying bottlenecks and implementing solutions to improve performance and user experience.",
    features: [
      "Code Optimization",
      "Database Query Optimization",
      "Caching Strategies",
      "Load Testing",
    ],
  },
  {
    icon: Shield,
    title: "Security Implementation",
    description:
      "Implementing secure authentication systems, role-based access control, and following security best practices to protect applications and data.",
    features: [
      "Authentication Systems",
      "Role-Based Access Control",
      "Security Best Practices",
      "Data Encryption",
    ],
  },
  {
    icon: Rocket,
    title: "Third-Party Integrations",
    description:
      "Integrating third-party APIs and services including payment gateways, SMS systems, push notifications, and other external services.",
    features: [
      "Payment Gateway Integration",
      "SMS & Push Notifications",
      "API Integrations",
      "Service Configuration",
    ],
  },
];

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="services"
      ref={ref}
      className="section-padding bg-white dark:bg-gray-900"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Comprehensive development services to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-start"
                    >
                      <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-6 sm:p-8 text-white mx-4 sm:mx-0">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Start Your Project?</h3>
            <p className="mb-4 sm:mb-6 text-primary-50 text-sm sm:text-base">
              I'm interested in long-term collaborations as well as small, well-defined projects.
              Let's discuss how I can help bring your vision to life.
            </p>
            <a
              href="#contact"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
