// ── WhatsApp Configuration ──
// Sostituisci con il tuo numero reale (formato internazionale senza +)
const WHATSAPP_NUMBER = "393XXXXXXXXX";

/**
 * Genera l'URL per l'API di WhatsApp con il messaggio formattato.
 */
export function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Apre WhatsApp con il messaggio precompilato.
 */
export function openWhatsApp(message: string): void {
  const url = getWhatsAppUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
}
