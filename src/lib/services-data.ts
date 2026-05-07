import type { Service } from "@/store/useQuoteStore";

export const servicesData: Service[] = [
  // ── Core ──
  {
    id: "vetrina-express",
    name: "Vetrina Express",
    price: 500,
    category: "core",
    description:
      "Una Landing page moderna e dritta al punto. Ottimizzata mobile, con form contatti e pulsante WhatsApp. Ideale per farsi trovare subito.",
    icon: "🚀",
  },
  {
    id: "esperienza-immersiva",
    name: "Esperienza Immersiva",
    price: 700,
    category: "core",
    description:
      "Animazioni allo scorrimento (Framer Motion), design interattivo e performance estreme. L'effetto \"WOW\" garantito.",
    icon: "✨",
  },
  {
    id: "sito-multipagina",
    name: "Sito Multi-Pagina",
    price: 800,
    category: "core",
    description:
      "Fino a 5 pagine strutturate (Chi Siamo, Servizi, Galleria, Contatti). Il quartier generale digitale della tua azienda.",
    icon: "🏢",
  },

  // ── Addon ──
  {
    id: "pwa",
    name: "Progressive Web App (PWA)",
    price: 250,
    category: "addon",
    description:
      "Fai installare il tuo sito come un'App direttamente sul telefono dei clienti (icona in home screen), navigabile anche con poca connessione.",
    icon: "📱",
  },
  {
    id: "catalogo-smart",
    name: "Menu / Catalogo Smart",
    price: 300,
    category: "addon",
    description:
      "Basta vecchi PDF pesanti. Un catalogo nativo, velocissimo, bello da sfogliare e accessibile via QR Code ai tavoli o in spiaggia.",
    icon: "📖",
  },
  {
    id: "booster-seo",
    name: "Booster SEO Locale",
    price: 180,
    category: "addon",
    description:
      "Ottimizzazione tecnica e setup avanzato di Google Business Profile per apparire tra i primi risultati nella tua città.",
    icon: "🎯",
  },
  {
    id: "ai-chatbot-base",
    name: "AI Chatbot (Base)",
    price: 350,
    category: "addon",
    description:
      "Chatbot integrato nel sito per rispondere alle domande frequenti, qualificare i contatti e guidare l’utente (in base a contenuti e flussi).",
    icon: "🤖",
  },
  {
    id: "ai-automation-n8n",
    name: "AI Automation Server",
    price: 500,
    category: "addon",
    description:
      "Struttura di automazioni con server dedicato per gestire task ripetitivi (email, fatture in entrata, classificazioni, notifiche e workflow su misura). Il prezzo può variare in base alle integrazioni richieste.",
    icon: "🧠",
  },

  // ── Premium ──
  {
    id: "zero-pensieri",
    name: "Pacchetto \"Zero Pensieri\" (Annuale)",
    price: 250,
    category: "premium",
    description:
      "Server ultra-veloci inclusi, sicurezza SSL, monitoraggio costante e fino a 5 modifiche (testi/foto) all'anno incluse.",
    icon: "🛡️",
  },
];

export const getCategoryLabel = (category: Service["category"]): string => {
  const labels: Record<Service["category"], string> = {
    core: "Soluzioni Base",
    addon: "Moduli Aggiuntivi",
    premium: "Gestione & Sicurezza (Abbonamento)",
  };
  return labels[category];
};

export const getCategoryColor = (category: Service["category"]): string => {
  const colors: Record<Service["category"], string> = {
    core: "neon-cyan",
    addon: "neon-violet",
    premium: "neon-lime",
  };
  return colors[category];
};
