"use client";

import { useQuoteStore } from "@/store/useQuoteStore";
import { openWhatsApp } from "@/lib/whatsapp";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppCheckout() {
  const {
    selectedServices,
    getTotalPrice,
    getWhatsAppMessage,
    clientName,
    clientBusiness,
    setClientName,
    setClientBusiness,
  } = useQuoteStore();

  const total = getTotalPrice();
  const hasServices = selectedServices.length > 0;

  const handleSend = () => {
    const message = getWhatsAppMessage();
    openWhatsApp(message);
  };

  return (
    <AnimatePresence>
      {hasServices && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
          className="mt-12 glass rounded-2xl border-satin-700/50 p-6 md:p-8"
        >
          <h3 className="text-lg font-semibold text-satin-50 mb-2">
            📬 Invia il tuo preventivo
          </h3>
          <p className="text-sm text-satin-400 mb-6">
            Compila i campi opzionali e invia il riepilogo direttamente su WhatsApp. Ti ricontatteremo in giornata.
          </p>

          {/* Optional fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="clientName" className="block text-xs text-satin-400 mb-1.5 uppercase tracking-wider">
                Il tuo nome
              </label>
              <input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Mario Rossi"
                className="w-full rounded-lg bg-satin-800/60 border border-satin-700/50 px-4 py-2.5 text-sm text-satin-50 placeholder:text-satin-600 focus:border-neon-cyan/40 focus:outline-none focus:ring-1 focus:ring-neon-cyan/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="clientBusiness" className="block text-xs text-satin-400 mb-1.5 uppercase tracking-wider">
                La tua attività
              </label>
              <input
                id="clientBusiness"
                type="text"
                value={clientBusiness}
                onChange={(e) => setClientBusiness(e.target.value)}
                placeholder="Ristorante Da Mario"
                className="w-full rounded-lg bg-satin-800/60 border border-satin-700/50 px-4 py-2.5 text-sm text-satin-50 placeholder:text-satin-600 focus:border-neon-cyan/40 focus:outline-none focus:ring-1 focus:ring-neon-cyan/20 transition-all"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-xl bg-satin-900/60 border border-satin-700/30 p-4 mb-6 font-mono text-xs text-satin-400 leading-relaxed whitespace-pre-wrap">
            {getWhatsAppMessage()}
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            data-cursor="pointer"
            className="group relative w-full overflow-hidden rounded-xl bg-green-600/90 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-green-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Invia su WhatsApp — €{total.toLocaleString("it-IT")}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>

          <p className="mt-3 text-center text-[10px] text-satin-600">
            Nessun pagamento richiesto. Riceverai un riscontro entro 24h.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
