import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Bochunweb/', // 這是你 GitHub Pages 的 repo 名稱
  plugins: [react()]
})
