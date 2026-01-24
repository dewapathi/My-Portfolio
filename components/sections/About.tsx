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
      className="section-padding scroll-mt-24 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-950 dark:via-gray-900/30 dark:to-gray-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          <p className="text-sm sm:text-base font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-4">
            About
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Building <span className="gradient-text">reliable</span>{" "}
            <span className="text-gray-900 dark:text-white">systems</span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary-600 to-transparent mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I help teams ship secure backends, smooth mobile apps, and production-ready cloud deployments.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-effect rounded-2xl p-7 sm:p-9 shadow-xl border border-gray-200/40 dark:border-gray-800/50">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Full Stack Software Engineer
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
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
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Backend APIs", value: "Secure + scalable" },
                  { label: "AWS Deployments", value: "Prod-ready" },
                  { label: "Mobile Apps", value: "iOS + Android" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-white/60 dark:bg-gray-950/40 border border-gray-200/40 dark:border-gray-800/50 p-3"
                  >
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">{s.label}</div>
                    <div className="text-[11px] text-gray-600 dark:text-gray-400">{s.value}</div>
                  </div>
                ))}
              </div>
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
                  className="glass-effect rounded-2xl p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/40 dark:border-gray-800/50"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center shadow-lg mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
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
