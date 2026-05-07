"use client";

import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowButton from "@/components/ui/GlowButton";
import { motion } from "framer-motion";
import { openWhatsApp } from "@/lib/whatsapp";

export default function ContactSection() {
  const handleWhatsApp = () => {
    openWhatsApp("Ciao! Vorrei maggiori informazioni su un progetto con WaveDev.");
  };

  return (
    <section id="contatti" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading 
          badge="Pronto all'evoluzione?"
          badgeColor="cyan"
          title={<>Parliamo del tuo <span className="gradient-text">prossimo successo</span></>}
          subtitle="Non sono solo siti web. Sono strumenti di crescita progettati per dominare il mercato locale."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Email Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }} 
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GlassCard hoverGlowColor="cyan" className="h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center text-2xl mb-6">✉️</div>
                <h3 className="text-xl font-bold text-satin-50 mb-2">Email</h3>
                <p className="text-satin-400 text-sm mb-6">Hai una richiesta specifica o un progetto complesso? Scrivimi qui.</p>
              </div>
              <a href="mailto:it.wavedev@gmail.com" className="text-neon-cyan font-bold hover:underline tracking-tight">it.wavedev@gmail.com</a>
            </GlassCard>
          </motion.div>

          {/* WhatsApp Card - Featured */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            whileHover={{ y: -10 }} 
            className="md:scale-105"
          >
            <GlassCard hoverGlowColor="lime" className="h-full flex flex-col justify-between border-neon-lime/30 bg-neon-lime/[0.02]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-neon-lime/10 flex items-center justify-center text-2xl mb-6">💬</div>
                <h3 className="text-xl font-bold text-satin-50 mb-2">WhatsApp Direct</h3>
                <p className="text-satin-400 text-sm mb-6">Il modo più veloce per scambiare due chiacchiere e ricevere un feedback immediato.</p>
              </div>
              <GlowButton color="lime" className="w-full py-3 mt-4" onClick={handleWhatsApp}>
                CHAT IMMEDIATA
              </GlowButton>
            </GlassCard>
          </motion.div>

          {/* Instagram Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            whileHover={{ y: -10 }} 
          >
            <GlassCard hoverGlowColor="violet" className="h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-neon-violet/10 flex items-center justify-center text-2xl mb-6">📸</div>
                <h3 className="text-xl font-bold text-satin-50 mb-2">Instagram</h3>
                <p className="text-satin-400 text-sm mb-6">Vedi i dietro le quinte, i processi creativi e gli ultimi lanci ufficiali.</p>
              </div>
              <a href="https://instagram.com/it.wavedev" target="_blank" className="text-neon-violet font-bold hover:underline">@it.wavedev</a>
            </GlassCard>
          </motion.div>
        </div>

        {/* Artistic Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-3xl p-8 md:p-12 border-satin-700/50 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-satin-900/50 to-satin-800/50"
        >
          <div className="max-w-md text-center md:text-left">
            <h4 className="text-2xl font-bold text-satin-50 mb-2">Nuova attività?</h4>
            <p className="text-satin-400">Ho pacchetti speciali &quot;Early Bird&quot; per chi sta lanciando il proprio business ora. Parliamone!</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative">
              <span className="text-5xl font-black text-neon-cyan">24h</span>
              <div className="absolute -top-1 -right-4 w-3 h-3 bg-neon-lime rounded-full animate-pulse" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-satin-500 font-bold mt-1">Tempo di risposta</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
