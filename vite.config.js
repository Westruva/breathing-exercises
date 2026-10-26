import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plain Vite + React setup. No backend: the app is fully static.
// base './' makes all file links relative, so the build works from any folder or URL path.
export default defineConfig({
  base: './',
  plugins: [react()],
})
