"use client";

import { servicesData, getCategoryLabel } from "@/lib/services-data";
import ServiceBlock from "./ServiceBlock";
import PriceSidebar from "./PriceSidebar";
import WhatsAppCheckout from "@/components/checkout/WhatsAppCheckout";
import type { Service } from "@/store/useQuoteStore";
import SectionHeading from "@/components/ui/SectionHeading";

export default function DashboardSection() {
  const categories: Service["category"][] = ["core", "addon", "premium"];

  return (
    <section id="preventivo" className="relative py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon-violet/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
        {/* Header */}
        <SectionHeading
          badge="Servizi & Preventivo interattivo"
          badgeColor="violet"
          title={
            <>
              Tutto ciò che serve al tuo{" "}
              <span className="gradient-text">business digitale</span>
            </>
          }
          subtitle="Dalla landing page all'e-commerce: seleziona i servizi che ti interessano e ottieni un preventivo in tempo reale, pensato per performance, conversione e crescita nel mercato locale."
        />

        {/* Dashboard Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* Service Blocks Grid */}
          <div className="flex-1 w-full space-y-10">
            {categories.map((category) => {
              const categoryServices = servicesData.filter(
                (s) => s.category === category
              );
              return (
                <div key={category}>
                  <h3 className="text-xs font-semibold text-satin-400 uppercase tracking-widest mb-4 flex items-center gap-3">
                    <span
                      className={`w-6 h-px ${
                        category === "core"
                          ? "bg-neon-cyan"
                          : category === "addon"
                          ? "bg-neon-violet"
                          : "bg-neon-lime"
                      }`}
                    />
                    {getCategoryLabel(category)}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                    {categoryServices.map((service) => (
                      <ServiceBlock key={service.id} service={service} />
                    ))}
                  </div>
                </div>
              );
            })}

          </div>

          {/* Price Sidebar Container */}
          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0">
            <PriceSidebar />
          </div>
        </div>

        {/* WhatsApp Checkout (Full Width) */}
        <WhatsAppCheckout />
      </div>
    </section>
  );
}
