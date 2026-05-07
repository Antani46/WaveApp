"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Servizi", href: "#servizi" },
  { label: "Preventivo", href: "#preventivo" },
  { label: "Contatti", href: "#contatti" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== "undefined") {
      // 1. Dynamic Threshold per saltare la Hero Section (400vh)
      const threshold = window.innerHeight * 3.8;
      
      if (latest > threshold && !isScrolled) {
        setIsScrolled(true);
      } else if (latest <= threshold && isScrolled) {
        setIsScrolled(false);
      }

      // 2. Scroll Spy per l'active state dei link
      const sections = navItems.map((item) =>
        document.querySelector(item.href)
      );
      const scrollPos = latest + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (section) {
          const el = section as HTMLElement;
          if (
            scrollPos >= el.offsetTop &&
            scrollPos < el.offsetTop + el.offsetHeight
          ) {
            setActiveSection(navItems[index].href);
          }
        }
      });
    }
  });

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-satin-950/80 backdrop-blur-md border-b border-satin-700/50 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          data-cursor="pointer"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-satin-800 border border-satin-700 group-hover:border-neon-cyan/30 transition-all duration-300">
            <span className="text-lg font-bold gradient-text">W</span>
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-neon-cyan/5" />
          </div>
          <span className="text-lg font-semibold text-satin-50 tracking-tight">
            Wave<span className="text-neon-cyan">App</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              data-cursor="pointer"
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeSection === item.href
                  ? "text-neon-cyan"
                  : "text-satin-300 hover:text-satin-50"
              }`}
            >
              {item.label}
              {activeSection === item.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg bg-neon-cyan/5 border border-neon-cyan/20"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection("#preventivo")}
            data-cursor="pointer"
            className="relative overflow-hidden rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 px-5 py-2.5 text-sm font-semibold text-neon-cyan transition-all duration-300 hover:bg-neon-cyan/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
          >
            Richiedi Preventivo
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-cursor="pointer"
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-satin-200 origin-center transition-colors"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-satin-200"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-satin-200 origin-center transition-colors"
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden glass border-t border-satin-700/50 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href
                      ? "text-neon-cyan bg-neon-cyan/5"
                      : "text-satin-300 hover:text-satin-50 hover:bg-satin-800/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("#preventivo")}
                className="mt-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 px-4 py-3 text-sm font-semibold text-neon-cyan text-center"
              >
                Richiedi Preventivo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
