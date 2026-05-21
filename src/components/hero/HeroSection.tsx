"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import GlowButton from "@/components/ui/GlowButton";

/* ── Mockup del "sito vecchio" (Il tuo originale) ── */
function OldSiteMockup({ opacity }: { opacity: number }) {
  return (
    <motion.div style={{ opacity }} className="w-full h-full pointer-events-none">
      <div className="rounded-t-xl bg-gray-200 p-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4 h-6 rounded bg-white/70 flex items-center px-2">
          <span className="text-[10px] text-gray-400 font-mono">
            www.ristorante-vecchio.it
          </span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-b-xl space-y-4 border-x border-b border-gray-200 h-[calc(100%-48px)]">
        <div className="h-5 w-48 bg-gray-300 rounded animate-pulse" />
        <div className="flex gap-4">
          <div className="w-32 h-32 bg-gray-200 rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-4/5" />
            <div className="h-3 bg-gray-200 rounded w-3/5" />
            <div className="mt-4 h-8 w-24 bg-gray-300 rounded text-[10px] flex items-center justify-center text-gray-500 font-mono">
              CONTATTACI
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="h-20 bg-gray-100 rounded" />
          <div className="h-20 bg-gray-100 rounded" />
          <div className="h-20 bg-gray-100 rounded" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Nuova interfaccia (I tuoi colori custom) ── */
function NewSiteMockup({ elementsOpacity, elementsY }: { elementsOpacity: any; elementsY: any; }) {
  return (
    <div className="w-full h-full pointer-events-none">
      <div className="rounded-t-xl bg-satin-800 p-3 flex items-center gap-2 border border-satin-700/50 border-b-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-neon-cyan/60" />
          <div className="w-3 h-3 rounded-full bg-neon-violet/60" />
          <div className="w-3 h-3 rounded-full bg-neon-lime/60" />
        </div>
        <div className="flex-1 mx-4 h-6 rounded bg-satin-900/80 flex items-center px-3">
          <span className="text-[10px] text-neon-cyan font-mono">
            🔒 tuoristorante.app
          </span>
        </div>
      </div>
      <div className="glass rounded-b-xl p-6 space-y-4 h-[calc(100%-48px)]">
        <motion.div
          style={{ opacity: elementsOpacity, y: elementsY }}
          className="h-5 w-48 rounded bg-gradient-to-r from-neon-cyan/30 to-neon-violet/30"
        />
        <motion.div style={{ opacity: elementsOpacity, y: elementsY }} className="flex gap-4">
          <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 border border-satin-700/50 flex items-center justify-center">
            <span className="text-3xl">🍽️</span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-satin-700/50 rounded w-full" />
            <div className="h-3 bg-satin-700/50 rounded w-4/5" />
            <div className="h-3 bg-satin-700/50 rounded w-3/5" />
            <div className="mt-4 h-8 w-28 rounded-lg bg-neon-cyan/20 border border-neon-cyan/30 text-[10px] flex items-center justify-center text-neon-cyan font-medium">
              📅 PRENOTA ORA
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {["📱 PWA", "🔍 SEO", "⚡ Fast"].map((label) => (
            <motion.div
              key={label}
              style={{ opacity: elementsOpacity }}
              className="h-20 rounded-lg bg-satin-800/50 border border-satin-700/30 flex items-center justify-center text-xs text-satin-300"
            >
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Frammenti originali (Gli 8 pezzi con rotazione casuale) ── */
function OldSiteFragment({ index, progress, children }: { index: number; progress: any; children: React.ReactNode }) {
  const randomFactor = Math.sin(index * 123.45) * 0.5 + 0.5;
  const angle = (index / 8) * Math.PI * 2 + (randomFactor * 0.5);
  const distance = 1500 + (randomFactor * 1000);

  const x = useTransform(progress, [0.15, 0.35], [0, Math.cos(angle) * distance]);
  const y = useTransform(progress, [0.15, 0.35], [0, Math.sin(angle) * distance]);
  const rotate = useTransform(progress, [0.15, 0.35], [0, (index % 2 === 0 ? 1 : -1) * (180 + randomFactor * 360)]);
  const opacity = useTransform(progress, [0.15, 0.30], [1, 0]);
  const scale = useTransform(progress, [0.15, 0.35], [1, 0.1]);

  return (
    <motion.div
      style={{ x, y, rotate, opacity, scale }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="w-full h-full"
        style={{
          clipPath: `polygon(${index === 0 ? "0 0, 55% 0, 45% 45%, 0 55%" :
              index === 1 ? "55% 0, 100% 0, 100% 45%, 55% 45%" :
                index === 2 ? "100% 45%, 100% 100%, 45% 100%, 45% 45%" :
                  index === 3 ? "45% 100%, 0 100%, 0 45%, 45% 45%" :
                    index === 4 ? "30% 30%, 70% 30%, 70% 70%, 30% 70%" :
                      index === 5 ? "0 0, 100% 0, 50% 50%" :
                        index === 6 ? "100% 0, 100% 100%, 50% 50%" :
                          "0 100%, 100% 100%, 50% 50%"
            })`
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ── Floating Objects ── */
function FloatingObject({ icon, delay, className }: { icon: string; delay: number; className: string }) {
  return (
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay: delay, ease: "easeInOut" }}
      className={`absolute flex items-center justify-center text-4xl pointer-events-none z-30 ${className}`}
    >
      <div className="glass w-16 h-16 rounded-2xl flex items-center justify-center border-neon-cyan/20 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
        {icon}
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  // ── LA LOGICA DEI TITOLI (L'unica cosa che ho cambiato) ──

  // Titolo vecchio: sparisce, rimpicciolisce e poi viene eliminato dal DOM
  const oldTitleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const oldTitleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  const oldTitleDisplay = useTransform(scrollYProgress, (v) => v >= 0.12 ? "none" : "flex");

  // Titolo nuovo: nasce nascosto, poi si attiva e appare
  const newTitleOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const newTitleScale = useTransform(scrollYProgress, [0.15, 0.3], [0.9, 1]);
  const newTitleDisplay = useTransform(scrollYProgress, (v) => v < 0.12 ? "none" : "flex");

  // Elementi UI Nuovi
  const elementsOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const elementsY = useTransform(scrollYProgress, [0.25, 0.45], [20, 0]);
  const floatingOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // ── LOGICA ONBOARDING / SCROLL HINTS ──
  const [showFirstHint, setShowFirstHint] = useState(false);
  const [showSecondHint, setShowSecondHint] = useState(false);
  const timer1Ref = useRef<NodeJS.Timeout | null>(null);
  const timer2Ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentProgress = scrollYProgress.get();
    if (currentProgress >= 0 && currentProgress <= 0.15) {
      timer1Ref.current = setTimeout(() => {
        setShowFirstHint(true);
      }, 2500);
    } else if (currentProgress >= 0.25 && currentProgress <= 0.60) {
      timer2Ref.current = setTimeout(() => {
        setShowSecondHint(true);
      }, 1500);
    }
    return () => {
      if (timer1Ref.current) clearTimeout(timer1Ref.current);
      if (timer2Ref.current) clearTimeout(timer2Ref.current);
    };
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Ad ogni scroll, resettiamo i timer
    if (timer1Ref.current) clearTimeout(timer1Ref.current);
    if (timer2Ref.current) clearTimeout(timer2Ref.current);

    // Nascondi i pulsanti se usciamo dai range di tolleranza
    if (latest > 0.15 && showFirstHint) setShowFirstHint(false);
    if ((latest < 0.25 || latest > 0.60) && showSecondHint) setShowSecondHint(false);

    // Timer 1: Inizio Pagina (con tolleranza fino a 0.15)
    if (latest >= 0 && latest <= 0.15) {
      if (!showFirstHint) {
        timer1Ref.current = setTimeout(() => {
          setShowFirstHint(true);
        }, 2500);
      }
    } 
    // Timer 2: Stato di Hold esteso (tra 0.25 e 0.60)
    else if (latest >= 0.25 && latest <= 0.60) {
      if (!showSecondHint) {
        timer2Ref.current = setTimeout(() => {
          setShowSecondHint(true);
        }, 1500);
      }
    }
  });

  const handleFirstHintClick = () => {
    setShowFirstHint(false);
    if (!containerRef.current) return;
    // Target dinamico: su mobile (schermo alto e stretto) spingiamo più in profondità
    const isMobile = window.innerWidth < 768;
    const multiplier = isMobile ? 0.72 : 0.58;
    const targetY = containerRef.current.offsetTop + (containerRef.current.offsetHeight * multiplier);
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 2000; // Scroll panoramico lento e immersivo (2 secondi)
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Quintic Ease-Out: partenza reattiva con scatto, decelerazione lunga e dolce
      const easeOutQuintic = 1 - Math.pow(1 - progress, 5);
      
      window.scrollTo(0, startY + distance * easeOutQuintic);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const handleSecondHintClick = () => {
    setShowSecondHint(false);
    const servicesSection = document.getElementById("preventivo") || document.getElementById("services") || document.querySelector('[id*="servizi"]');
    if (!servicesSection) return;
    
    const targetY = servicesSection.getBoundingClientRect().top + window.scrollY;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 800;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Quintic Ease-Out anche per il secondo pulsante
      const easeOutQuintic = 1 - Math.pow(1 - progress, 5);
      
      window.scrollTo(0, startY + distance * easeOutQuintic);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-satin-950">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 gap-12 lg:gap-16">

        {/* TITOLI */}
        <div className="relative w-full max-w-4xl min-h-[220px] md:min-h-[300px] grid place-items-center">

          <motion.div
            style={{ opacity: oldTitleOpacity, scale: oldTitleScale, display: oldTitleDisplay }}
            className="col-start-1 row-start-1 flex flex-col items-center justify-center gap-6 pointer-events-none"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-satin-50 tracking-tighter leading-[0.85] text-center">
              IL TUO SITO<br />
              <span className="text-satin-700">È UN</span><br />
              <span className="gradient-text-animated">DINOSAURO?</span>
            </h1>
            <p className="text-xs md:text-sm text-neon-cyan font-bold tracking-[0.4em] uppercase">
              Inizia l&apos;evoluzione
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: newTitleOpacity, scale: newTitleScale, display: newTitleDisplay }}
            className="col-start-1 row-start-1 flex flex-col items-center justify-center gap-8 pointer-events-none"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-satin-50 tracking-tighter leading-[0.85] text-center">
              DESIGN <br />
              <span className="gradient-text-animated">SENZA CONFINI</span>
            </h2>
            <p className="text-xs md:text-sm text-neon-cyan font-bold tracking-[0.4em] uppercase">
              Performance Estreme
            </p>
          </motion.div>
        </div>

        {/* MOCKUPS */}
        <div className="relative w-full max-w-5xl aspect-[16/10] mx-auto grid place-items-center mt-4">

          {/* Sotto: Nuovo Sito */}
          <div className="col-start-1 row-start-1 z-10 w-full h-full">
            <NewSiteMockup elementsOpacity={elementsOpacity} elementsY={elementsY} />
          </div>

          {/* Sopra: Vecchio Sito (L'esplosione a 8 frammenti) */}
          <div className="col-start-1 row-start-1 z-20 w-full h-full perspective-2000 pointer-events-none">
            <div className="relative w-full h-full">
              {[...Array(8)].map((_, i) => (
                <OldSiteFragment key={i} index={i} progress={scrollYProgress}>
                  <OldSiteMockup opacity={1} />
                </OldSiteFragment>
              ))}
            </div>
          </div>

          {/* Icone */}
          <motion.div
            style={{ opacity: floatingOpacity }}
            className="col-start-1 row-start-1 z-30 pointer-events-none relative w-full h-full"
          >
            <FloatingObject icon="🚀" delay={0} className="-top-6 left-2 md:-top-12 md:-left-12" />
            <FloatingObject icon="⚡" delay={0.5} className="-top-4 right-2 md:-top-8 md:-right-8" />
            <FloatingObject icon="📱" delay={1} className="-bottom-4 left-2 md:-bottom-8 md:-left-8" />
            <FloatingObject icon="💎" delay={1.5} className="-bottom-6 right-2 md:-bottom-12 md:-right-12" />
          </motion.div>
        </div>

        {/* ── ONBOARDING HINTS ── */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          <AnimatePresence>
            {showFirstHint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute w-full top-[76%] flex justify-center"
              >
                <button
                  onClick={handleFirstHintClick}
                  className="pointer-events-auto text-2xl md:text-4xl italic font-black font-serif bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent hover:opacity-80 transition-all duration-300 drop-shadow-[0_0_20px_rgba(0,229,255,0.8)] px-8 py-5 bg-satin-950/60 backdrop-blur-md rounded-2xl border border-satin-700/50 hover:scale-105"
                >
                  Inizia l'evoluzione ⬇
                </button>
              </motion.div>
            )}
            {showSecondHint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute w-full top-[78%] md:top-[80%] flex justify-center"
              >
                <button
                  onClick={handleSecondHintClick}
                  className="pointer-events-auto text-2xl md:text-4xl italic font-black font-serif bg-gradient-to-r from-neon-cyan to-neon-lime bg-clip-text text-transparent hover:opacity-80 transition-all duration-300 drop-shadow-[0_0_20px_rgba(168,255,0,0.8)] px-8 py-5 bg-satin-950/80 backdrop-blur-md rounded-2xl border border-satin-700/50 hover:scale-105"
                >
                  Scopri i servizi ⬇
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}