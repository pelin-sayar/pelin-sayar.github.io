import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/pelin-sayar.github.io/",
  plugins: [react()],
})
