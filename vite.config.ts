import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: '間 Ma — 把空白留下來',
        short_name: '間',
        description:
          '把暫停變成一幅墨色。App Store 少見的靜默收集體驗——不以分鐘計時，而以墨色留下你的空白。',
        theme_color: '#1a2428',
        background_color: '#d5dee3',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'zh-Hant',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
