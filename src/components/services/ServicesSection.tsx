import { servicesData, getCategoryLabel } from "@/lib/services-data";
import type { Service } from "@/store/useQuoteStore";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

function ServiceCard({ service }: { service: Service }) {
  const colorMap: Record<Service["category"], "cyan" | "violet" | "lime"> = {
    core: "cyan",
    addon: "violet",
    premium: "lime",
  };

  const badgeColors: Record<Service["category"], string> = {
    core: "bg-neon-cyan/10 text-neon-cyan",
    addon: "bg-neon-violet/10 text-neon-violet",
    premium: "bg-neon-lime/10 text-neon-lime",
  };

  return (
    <GlassCard hoverGlowColor={colorMap[service.category]}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{service.icon}</span>
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${badgeColors[service.category]}`}>
          {service.category}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-satin-50 mb-2">{service.name}</h3>
      <p className="text-sm text-satin-400 leading-relaxed mb-4">{service.description}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-satin-50">€{service.price.toLocaleString("it-IT")}</span>
        <span className="text-xs text-satin-500">una tantum</span>
      </div>
    </GlassCard>
  );
}

export default function ServicesSection() {
  const categories: Service["category"][] = ["core", "addon", "premium"];

  return (
    <section id="servizi" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <SectionHeading
          badge="I nostri servizi"
          badgeColor="cyan"
          title={
            <>
              Tutto ciò che serve al tuo{" "}
              <span className="gradient-text">business digitale</span>
            </>
          }
          subtitle="Dalla landing page all'e-commerce, ogni soluzione è pensata per performance, conversione e crescita nel mercato locale."
        />

        {/* Services Grid */}
        {categories.map((category) => {
          const categoryServices = servicesData.filter(
            (s) => s.category === category
          );
          return (
            <div key={category} className="mb-16 last:mb-0">
              <h3 className="text-sm font-semibold text-satin-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className={`w-8 h-px ${category === "core" ? "bg-neon-cyan" : category === "addon" ? "bg-neon-violet" : "bg-neon-lime"}`} />
                {getCategoryLabel(category)}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
