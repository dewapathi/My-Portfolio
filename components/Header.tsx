"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { NAV_ITEMS, SITE } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved === "dark" || (!saved && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--divider)] shadow-[0_1px_0_var(--divider)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="#home"
          data-cursor="Home"
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label="Pradeepa Lakruwan — home"
        >
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-[var(--accent)] text-white font-mono text-xs font-bold tracking-tight select-none">
            PL
          </span>
          <span className="hidden sm:block font-serif text-base font-normal text-[var(--deep)] group-hover:text-[var(--accent)] transition-colors">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-underline relative px-3.5 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--deep)] hover:bg-[var(--surface-2)] transition-all duration-150"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--deep)] hover:bg-[var(--surface-2)] transition-all"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="#contact"
            data-cursor="Talk"
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-85 transition-opacity"
          >
            Let&apos;s Talk
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="lg:hidden p-2 rounded-lg text-[var(--muted)] hover:text-[var(--deep)] hover:bg-[var(--surface-2)] transition-all"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <button
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="absolute right-0 top-0 h-full w-[80vw] max-w-sm bg-[var(--surface)] border-l border-[var(--divider)] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--divider)]">
                <span className="font-serif text-base text-[var(--deep)]">{SITE.name}</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-lg text-[var(--muted)] hover:bg-[var(--surface-2)] transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-[var(--deep)] font-medium hover:bg-[var(--surface-2)] transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="px-6 py-6 border-t border-[var(--divider)]">
                <Link
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Let&apos;s Talk
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
