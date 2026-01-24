"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/three/Hero3D"), { ssr: false });

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* 3D Layer (lazy + disabled on reduced motion) */}
      <Hero3D />

      {/* Readability layer so text stays crisp over 3D */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_0%,black_35%,transparent_70%)] bg-white/55 dark:bg-gray-950/35" />
      </div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-400/30 to-purple-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-primary-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom section-padding relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect text-primary-700 dark:text-primary-300 text-sm font-semibold shadow-lg backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              Full Stack Software Engineer
            </motion.span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold mb-6 sm:mb-8 leading-[1.1] tracking-tight"
          >
            <span className="block gradient-text mb-2">Building Digital</span>
            <span className="block text-gray-900 dark:text-white">Experiences</span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 gradient-text-alt">
              That Matter
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-10 sm:mb-12 leading-relaxed max-w-3xl mx-auto font-light"
          >
            Crafting <span className="font-semibold text-gray-900 dark:text-white">secure</span>,{" "}
            <span className="font-semibold text-gray-900 dark:text-white">scalable</span> backend systems
            and <span className="font-semibold text-gray-900 dark:text-white">modern</span> web applications
            with cutting-edge technologies
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-2xl shadow-primary-500/50 hover:shadow-primary-600/50 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Get In Touch</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 sm:px-10 py-4 sm:py-5 glass-effect text-gray-900 dark:text-white rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200/50 dark:border-gray-800/50"
            >
              View My Work
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-20 sm:mt-24"
          >
            <motion.a
              href="#about"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
              aria-label="Scroll to about"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ChevronDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
