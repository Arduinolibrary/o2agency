import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 如果部署到 Github Pages，请取消下面注释并替换 'your-repo-name' 为您的仓库名
  // base: '/your-repo-name/',
  build: {
    outDir: 'dist',
  }
})