import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  cacheDir: './.vite-cache'   // 👈 Vite cache outside node_modules
})

