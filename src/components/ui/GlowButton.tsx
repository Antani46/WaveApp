import { ButtonHTMLAttributes, ReactNode } from "react";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "cyan" | "violet" | "lime";
  className?: string;
}

export default function GlowButton({
  children,
  color = "cyan",
  className = "",
  ...props
}: GlowButtonProps) {
  const colorMap = {
    cyan: "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]",
    violet: "bg-neon-violet/10 border-neon-violet/30 text-neon-violet hover:bg-neon-violet/20 hover:shadow-[0_0_30px_rgba(180,74,255,0.2)]",
    lime: "bg-neon-lime/10 border-neon-lime/30 text-neon-lime hover:bg-neon-lime/20 hover:shadow-[0_0_30px_rgba(168,255,0,0.2)]",
  };

  const gradientMap = {
    cyan: "from-neon-cyan/0 via-neon-cyan/10 to-neon-cyan/0",
    violet: "from-neon-violet/0 via-neon-violet/10 to-neon-violet/0",
    lime: "from-neon-lime/0 via-neon-lime/10 to-neon-lime/0",
  };

  return (
    <button
      data-cursor="pointer"
      className={`group relative overflow-hidden rounded-xl border px-8 py-4 text-base font-semibold transition-all duration-300 ${colorMap[color]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientMap[color]} translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700`}
      />
    </button>
  );
}
