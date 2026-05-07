import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";
import PwaRegister from "@/components/seo/PwaRegister";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WaveApp — Siti Web & PWA per Business Locali",
    template: "%s | WaveApp",
  },
  description:
    "Trasformiamo la presenza digitale di ristoranti, lidi e attività locali con siti performanti, Progressive Web App, SEO locale e sistemi di prenotazione.",
  keywords: [
    "sviluppo siti web",
    "PWA",
    "progressive web app",
    "SEO locale",
    "siti per ristoranti",
    "Next.js",
    "web agency",
  ],
  authors: [{ name: "WaveApp" }],
  creator: "WaveApp",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "WaveApp",
    title: "WaveApp — Siti Web & PWA per Business Locali",
    description:
      "Performance estreme, design che converte. Siti web, PWA e SEO per il tuo business locale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WaveApp — Siti Web & PWA per Business Locali",
    description:
      "Performance estreme, design che converte. Siti web, PWA e SEO per il tuo business locale.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-dvh bg-background text-foreground font-sans">
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
