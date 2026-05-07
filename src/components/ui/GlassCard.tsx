import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverGlowColor?: "cyan" | "violet" | "lime" | "none";
}

export default function GlassCard({
  children,
  className = "",
  hoverGlowColor = "none",
}: GlassCardProps) {
  const glowMap = {
    cyan: "hover:shadow-[0_0_30px_rgba(0,229,255,0.08)] hover:border-neon-cyan/40 border-neon-cyan/20",
    violet: "hover:shadow-[0_0_30px_rgba(180,74,255,0.08)] hover:border-neon-violet/40 border-neon-violet/20",
    lime: "hover:shadow-[0_0_30px_rgba(168,255,0,0.08)] hover:border-neon-lime/40 border-neon-lime/20",
    none: "border-satin-700/50 hover:border-satin-600",
  };

  return (
    <div
      className={`glass rounded-2xl p-6 transition-all duration-300 border ${glowMap[hoverGlowColor]} ${className}`}
    >
      {children}
    </div>
  );
}
