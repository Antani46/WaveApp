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
    default: "WaveDev — Siti Web & PWA per Business Locali",
    template: "%s | WaveDev",
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
  authors: [{ name: "WaveDev" }],
  creator: "WaveDev",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "WaveDev",
    title: "WaveDev — Siti Web & PWA per Business Locali",
    description:
      "Performance estreme, design che converte. Siti web, PWA e SEO per il tuo business locale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WaveDev — Siti Web & PWA per Business Locali",
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
        <meta name="color-scheme" content="dark only" />
        <JsonLd />
      </head>
      <body className="min-h-dvh bg-background text-foreground font-sans">
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
