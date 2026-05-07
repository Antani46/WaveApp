import { create } from "zustand";

export interface Service {
  id: string;
  name: string;
  price: number;
  category: "core" | "addon" | "premium";
  description: string;
  icon: string;
}

interface QuoteStore {
  selectedServices: Service[];
  isSidebarOpen: boolean;
  clientName: string;
  clientBusiness: string;

  // Actions
  addService: (service: Service) => void;
  removeService: (id: string) => void;
  toggleService: (service: Service) => void;
  toggleSidebar: () => void;
  setClientName: (name: string) => void;
  setClientBusiness: (business: string) => void;
  reset: () => void;

  // Computed
  getTotalPrice: () => number;
  getWhatsAppMessage: () => string;
  isServiceSelected: (id: string) => boolean;
}

export const useQuoteStore = create<QuoteStore>((set, get) => ({
  selectedServices: [],
  isSidebarOpen: false,
  clientName: "",
  clientBusiness: "",

  addService: (service) =>
    set((state) => {
      if (state.selectedServices.some((s) => s.id === service.id)) return state;
      return {
        selectedServices: [...state.selectedServices, service],
        isSidebarOpen: true,
      };
    }),

  removeService: (id) =>
    set((state) => ({
      selectedServices: state.selectedServices.filter((s) => s.id !== id),
    })),

  toggleService: (service) => {
    const state = get();
    if (state.isServiceSelected(service.id)) {
      state.removeService(service.id);
    } else {
      state.addService(service);
    }
  },

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setClientName: (name) => set({ clientName: name }),
  setClientBusiness: (business) => set({ clientBusiness: business }),

  reset: () =>
    set({
      selectedServices: [],
      isSidebarOpen: false,
      clientName: "",
      clientBusiness: "",
    }),

  getTotalPrice: () =>
    get().selectedServices.reduce((sum, s) => sum + s.price, 0),

  getWhatsAppMessage: () => {
    const { selectedServices, clientName, clientBusiness } = get();
    const total = get().getTotalPrice();

    const serviceList = selectedServices
      .map((s) => `• ${s.name} — €${s.price.toLocaleString("it-IT")}`)
      .join("\n");

    return [
      `🚀 *Nuovo Preventivo WaveDev*`,
      ``,
      clientName ? `👤 *Nome:* ${clientName}` : "",
      clientBusiness ? `🏢 *Attività:* ${clientBusiness}` : "",
      ``,
      `📦 *Servizi selezionati:*`,
      serviceList,
      ``,
      `💰 *Valore progetto:* €${total.toLocaleString("it-IT")}`,
      ``,
      `Vorrei ricevere maggiori informazioni su questo preventivo.`,
    ]
      .filter(Boolean)
      .join("\n");
  },

  isServiceSelected: (id) =>
    get().selectedServices.some((s) => s.id === id),
}));
