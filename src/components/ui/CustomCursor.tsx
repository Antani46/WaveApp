"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // NOTA: Abbiamo rimosso 'useSpring' per la posizione X e Y. 
  // Una freccia DEVE essere istantanea e senza lag per un'ottima User Experience.
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Controlla se siamo sopra un elemento cliccabile
    const clickable = target.closest(
      "a, button, [role='button'], input, textarea, select, [data-cursor='pointer']"
    );
    setIsPointer(!!clickable);
  }, []);

  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile, handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter]);

  // Su mobile non renderizziamo nessun cursore
  if (isMobile) return null;

  return (
    <>
      {/* Inietta dinamicamente un CSS globale per nascondere SEMPRE il cursore nativo di Windows/Mac, 
        anche quando si passa sopra i link (che di solito forzano il cursore a manina).
      */}
      <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-150 ease-out origin-top-left"
          style={{
            transform: isPointer ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
            filter: isPointer
              ? "drop-shadow(0 0 10px rgba(0, 229, 255, 0.8))"
              : "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))",
          }}
        >
          {/* Path geometrico di una freccia aerodinamica perfetta */}
          <path
            d="M0 0L17 6.5L10 8.5L13 16L10 17.5L7 10L0 15V0Z"
            fill={isPointer ? "#0f172a" : "#ffffff"}     // Sfondo cambia da bianco a scuro
            stroke={isPointer ? "#00e5ff" : "#00e5ff"}    // Bordo sempre ciano
            strokeWidth={isPointer ? "1.5" : "1"}         // Il bordo diventa più netto al clic
            strokeLinejoin="round"
            className="transition-all duration-200 ease-out"
          />
        </svg>
      </motion.div>
    </>
  );
}