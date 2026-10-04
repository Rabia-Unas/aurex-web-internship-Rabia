import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'my-repo' with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/aurex-web-internship-Rabia/', 
})