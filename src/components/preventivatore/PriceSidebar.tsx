"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useQuoteStore } from "@/store/useQuoteStore";

export default function PriceSidebar() {
  const { selectedServices, isSidebarOpen, toggleSidebar, getTotalPrice, removeService } = useQuoteStore();
  const total = getTotalPrice();

  return (
    <>
      {/* Floating badge (always visible when services selected) */}
      <AnimatePresence>
        {selectedServices.length > 0 && !isSidebarOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleSidebar}
            data-cursor="pointer"
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full glass border-neon-cyan/30 px-5 py-3 shadow-[0_0_30px_rgba(0,229,255,0.15)] lg:hidden"
          >
            <span className="text-sm font-semibold text-neon-cyan">
              €{total.toLocaleString("it-IT")}
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neon-cyan/20 text-xs font-bold text-neon-cyan">
              {selectedServices.length}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Desktop sidebar (inline) */}
      <div className="hidden lg:block sticky top-32 mt-8">
        <AnimatePresence mode="wait">
          {selectedServices.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="border-2 border-dashed border-satin-700/50 rounded-xl p-8 flex flex-col items-center justify-center text-center h-[300px] bg-satin-900/20 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center mb-4 text-neon-cyan">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-satin-400 text-sm leading-relaxed max-w-[240px]">
                Inizia l'evoluzione. Seleziona i moduli a sinistra per costruire il tuo preventivo in tempo reale.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="glass rounded-2xl border-satin-700/50 p-6 space-y-4 min-h-[300px]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-satin-200 uppercase tracking-wider">
                  Il tuo progetto
                </h3>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neon-cyan/10 text-xs font-bold text-neon-cyan">
                  {selectedServices.length}
                </span>
              </div>

              {/* Selected services list */}
              <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                  {selectedServices.map((service) => (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center justify-between rounded-lg bg-satin-800/40 px-3 py-2.5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm shrink-0">{service.icon}</span>
                        <span className="text-xs text-satin-300 truncate">{service.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-semibold text-satin-200">
                          €{service.price.toLocaleString("it-IT")}
                        </span>
                        <button
                          onClick={() => removeService(service.id)}
                          data-cursor="pointer"
                          className="text-satin-500 hover:text-red-400 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="h-px bg-satin-700/50" />

              {/* Total */}
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-satin-400">Totale</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.1, color: "#00e5ff" }}
                  animate={{ scale: 1, color: "#e8edf5" }}
                  className="text-2xl font-bold text-satin-50"
                >
                  €{total.toLocaleString("it-IT")}
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 z-40 bg-satin-950/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 glass rounded-t-3xl border-t border-satin-700/50 p-6 max-h-[70vh] overflow-y-auto lg:hidden"
            >
              <div className="mx-auto w-12 h-1 rounded-full bg-satin-600 mb-6" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-satin-50">Il tuo progetto</h3>
                <button onClick={toggleSidebar} data-cursor="pointer" className="text-satin-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2 mb-4">
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between rounded-lg bg-satin-800/40 px-3 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm">{service.icon}</span>
                      <span className="text-xs text-satin-300 truncate">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-satin-200">€{service.price.toLocaleString("it-IT")}</span>
                      <button onClick={() => removeService(service.id)} className="text-satin-500 hover:text-red-400 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-px bg-satin-700/50 mb-4" />
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-satin-400">Totale</span>
                <span className="text-2xl font-bold text-satin-50">€{total.toLocaleString("it-IT")}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
