"use client";

import { motion } from "framer-motion";
import { useQuoteStore, type Service } from "@/store/useQuoteStore";

interface ServiceBlockProps {
  service: Service;
}

export default function ServiceBlock({ service }: ServiceBlockProps) {
  const { toggleService, isServiceSelected } = useQuoteStore();
  const selected = isServiceSelected(service.id);

  const colorMap: Record<Service["category"], { border: string; glow: string; bg: string; text: string }> = {
    core: {
      border: selected ? "border-neon-cyan/60" : "border-satin-700/50 hover:border-neon-cyan/30",
      glow: selected ? "shadow-[0_0_30px_rgba(0,229,255,0.15),inset_0_0_30px_rgba(0,229,255,0.05)]" : "",
      bg: selected ? "bg-neon-cyan/5" : "bg-satin-800/40",
      text: "text-neon-cyan",
    },
    addon: {
      border: selected ? "border-neon-violet/60" : "border-satin-700/50 hover:border-neon-violet/30",
      glow: selected ? "shadow-[0_0_30px_rgba(180,74,255,0.15),inset_0_0_30px_rgba(180,74,255,0.05)]" : "",
      bg: selected ? "bg-neon-violet/5" : "bg-satin-800/40",
      text: "text-neon-violet",
    },
    premium: {
      border: selected ? "border-neon-lime/60" : "border-satin-700/50 hover:border-neon-lime/30",
      glow: selected ? "shadow-[0_0_30px_rgba(168,255,0,0.15),inset_0_0_30px_rgba(168,255,0,0.05)]" : "",
      bg: selected ? "bg-neon-lime/5" : "bg-satin-800/40",
      text: "text-neon-lime",
    },
  };

  const colors = colorMap[service.category];

  return (
    <motion.button
      onClick={() => toggleService(service)}
      data-cursor="pointer"
      layout
      whileTap={{ scale: 0.97 }}
      className={`flex flex-col h-full min-h-[280px] group relative text-left w-full rounded-xl border p-5 backdrop-blur-sm transition-all duration-300 ${colors.border} ${colors.bg} ${colors.glow}`}
    >
      {/* Selection indicator */}
      <motion.div
        initial={false}
        animate={{
          scale: selected ? 1 : 0,
          opacity: selected ? 1 : 0,
        }}
        className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center ${colors.text} bg-current/10`}
      >
        <svg className="w-3.5 h-3.5 text-current" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </motion.div>

      {/* Icon & Category */}
      <div className="flex items-center gap-3 mb-3 shrink-0">
        <span className="text-2xl">{service.icon}</span>
        <span className={`text-[9px] font-bold uppercase tracking-widest ${colors.text} opacity-70`}>
          {service.category}
        </span>
      </div>

      {/* Name */}
      <h4 className="text-base font-semibold text-satin-50 mb-1.5 pr-6 shrink-0">
        {service.name}
      </h4>

      {/* Description */}
      <p className="text-xs text-satin-400 leading-relaxed mb-3 flex-1">
        {service.description}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mt-auto pt-2 shrink-0">
        <span className={`text-xl font-bold ${selected ? colors.text : "text-satin-200"} transition-colors duration-300`}>
          €{service.price.toLocaleString("it-IT")}
          {service.category === "premium" && <span className="text-sm font-normal opacity-70 ml-1">/anno</span>}
        </span>
      </div>

      {/* Bottom glow line */}
      <motion.div
        initial={false}
        animate={{ scaleX: selected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute bottom-0 left-4 right-4 h-px ${
          service.category === "core" ? "bg-neon-cyan" :
          service.category === "addon" ? "bg-neon-violet" : "bg-neon-lime"
        } origin-left`}
      />
    </motion.button>
  );
}
