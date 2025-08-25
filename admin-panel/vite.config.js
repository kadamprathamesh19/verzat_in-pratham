import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // your backend URL
    },
    open: '/admin', // This opens http://localhost:5173/admin on dev start
  },
})
