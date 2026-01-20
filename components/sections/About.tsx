"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Server, Smartphone, Cloud } from "lucide-react";

const expertise = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "React, Next.js, TypeScript, and modern UI frameworks",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Django, Flask, FastAPI, Node.js, and RESTful APIs",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "React Native for iOS and Android applications",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "AWS, Docker, CI/CD, and production deployments",
  },
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-white dark:bg-gray-900"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Full Stack Software Engineer
            </h3>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                I am a professional full stack software engineer with hands-on experience in building
                modern, secure, and scalable web and mobile applications for startups and businesses.
              </p>
              <p>
                I specialize in frontend development using React and Next.js, backend development
                with Django, Django REST Framework, Flask, FastAPI, and Node.js, along with mobile
                application development using React Native.
              </p>
              <p>
                My expertise extends to cloud deployment on AWS (EC2, S3, RDS, Docker, CI/CD),
                database design (PostgreSQL, MySQL, MongoDB), and implementing secure authentication
                systems with role-based access control.
              </p>
              <p>
                I am detail-oriented, communicate clearly, and always focus on delivering
                high-quality work on time. I am interested in long-term collaborations as well as
                small, well-defined projects.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-10 h-10 text-primary-600 mb-4" />
                  <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
