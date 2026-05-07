import { ReactNode } from "react";

interface SectionHeadingProps {
  badge: string;
  badgeColor?: "cyan" | "violet" | "lime";
  title: ReactNode;
  subtitle: string;
}

export default function SectionHeading({
  badge,
  badgeColor = "cyan",
  title,
  subtitle,
}: SectionHeadingProps) {
  const colorMap = {
    cyan: "text-neon-cyan",
    violet: "text-neon-violet",
    lime: "text-neon-lime",
  };

  return (
    <div className="text-center mb-16">
      <span
        className={`text-sm font-semibold uppercase tracking-widest ${colorMap[badgeColor]}`}
      >
        {badge}
      </span>
      <h2 className="mt-3 text-3xl md:text-5xl font-bold text-satin-50 tracking-tight">
        {title}
      </h2>
      <p className="mt-4 text-base md:text-lg text-satin-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
