import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), VitePWA({
    manifest: {
      lang: 'en',
      name: 'web-cw-keyer',
      short_name: 'Keyer',
      background_color: '#fff',
      theme_color: '#fff',
      display: 'standalone',
      scope: '/web-cw-keyer/',
      start_url: '/web-cw-keyer/',
      icons: [
        {
          src: '192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '180x180.png',
          sizes: '180x180',
          type: 'image/png'
        },
        {
          src: '512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
      ]
    }
  })],
  base: './'
})
