import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'my-repo' with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/https://github.com/Rabia-Unas/aurex-web-internship-Rabia.git/', 
})