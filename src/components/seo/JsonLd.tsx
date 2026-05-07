export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "WaveDev",
    description:
      "Sviluppo siti web, Progressive Web App, SEO locale per ristoranti, lidi e attività locali.",
    url: "https://wavedev.dev",
    email: "it.wavedev@gmail.com",
    sameAs: ["https://instagram.com/it.wavedev"],
    areaServed: {
      "@type": "Country",
      name: "Italia",
    },
    serviceType: [
      "Web Development",
      "Progressive Web App",
      "SEO",
      "E-Commerce",
    ],
    priceRange: "€€",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: "Italian",
      email: "it.wavedev@gmail.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
