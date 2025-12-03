import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: '/Currency-Exchange/',
   // must match EXACT repo name
})
