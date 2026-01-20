"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "your.email@example.com",
    href: "mailto:your.email@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Available Worldwide",
    href: "#",
  },
];

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="contact"
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                  Let's Connect
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities
                  to be part of your vision. Whether you're a startup looking to build an MVP
                  or an established business needing to scale, I'm here to help.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all group"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors flex-shrink-0">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-1">
                          {info.label}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 break-words">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* What I Offer */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                  What I Offer
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                  I focus on delivering high-quality work with attention to detail, clear communication,
                  and timely delivery. Here's what you can expect when working with me:
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl"
                >
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                    Clean, maintainable, and scalable code
                  </h4>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl"
                >
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                    Responsive and user-friendly interfaces
                  </h4>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl"
                >
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                    Secure backend and database integration
                  </h4>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl"
                >
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                    Clear communication and regular updates
                  </h4>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl"
                >
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                    Production-ready applications
                  </h4>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
