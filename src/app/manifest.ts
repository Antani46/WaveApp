import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WaveDev — Agenzia Web',
    short_name: 'WaveDev',
    description: 'Siti Web, PWA e SEO per Business Locali',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1017',
    theme_color: '#00e5ff',
    icons: [
      {
        src: '/icon.svg',
        sizes: '192x192 512x512',
        type: 'image/svg+xml',
      },
    ],
  }
}
