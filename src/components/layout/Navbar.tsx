"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "__top__" },
  { label: "Preventivo", href: "#preventivo" },
  { label: "Contatti", href: "#contatti" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
        item.href === "__top__" ? null : document.querySelector(item.href)
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

      if (latest < 50) {
        setActiveSection("__top__");
      }
    }
  });

  const scrollToSection = (href: string) => {
    if (href === "__top__") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full max-w-full box-border overflow-hidden ${
        isScrolled
          ? "bg-satin-950/80 backdrop-blur-md border-b border-satin-700/50 shadow-lg py-2 md:py-3"
          : "bg-transparent py-3 md:py-5"
      }`}
    >
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-2 md:px-6 lg:px-8 gap-1 md:gap-4 box-border">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-1 md:gap-2 shrink min-w-0"
          data-cursor="pointer"
        >
          <div className="relative flex h-6 w-6 md:h-9 md:w-9 items-center justify-center rounded-lg bg-satin-800 border border-satin-700 group-hover:border-neon-cyan/30 transition-all duration-300 shrink-0">
            <span className="text-xs md:text-lg font-bold gradient-text">W</span>
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-neon-cyan/5" />
          </div>
          <span className="text-xs md:text-lg font-semibold text-satin-50 tracking-tight shrink">
            Wave<span className="text-neon-cyan">Dev</span>
          </span>
        </Link>

        {/* Nav Links — sempre visibili, micro-copy su mobile */}
        <div className="flex items-center gap-0.5 md:gap-1 shrink min-w-0">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              data-cursor="pointer"
              className={`relative px-1.5 py-1 md:px-4 md:py-2 text-[9px] sm:text-[10px] md:text-sm font-medium rounded-lg transition-all duration-300 shrink-0 ${
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

        {/* CTA — sempre visibile, compatto su mobile */}
        <button
          onClick={() => scrollToSection("#preventivo")}
          data-cursor="pointer"
          className="relative overflow-hidden rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 px-1.5 py-1 md:px-5 md:py-2.5 text-[9px] sm:text-[10px] md:text-sm font-semibold text-neon-cyan transition-all duration-300 hover:bg-neon-cyan/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] shrink-0 flex items-center justify-center gap-1"
        >
          <span className="hidden sm:inline">Richiedi Preventivo</span>
          <span className="sm:hidden flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-neon-cyan">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
            </svg>
            <span className="text-[9px] font-bold">Preventivo</span>
          </span>
        </button>
      </nav>
    </motion.header>
  );
}
