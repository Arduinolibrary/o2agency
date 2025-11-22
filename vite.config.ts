import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 部署到 Github Pages 的基础路径
  base: '/o2agency/', 
  build: {
    outDir: 'dist',
  }
})