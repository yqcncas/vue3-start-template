import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      // 别名
      '@': resolve(__dirname, 'src') // __dirname 指当前项目路径  'src'指该项目路径下的哪个文件路径
    }
  },
  plugins: [vue(), eslintPlugin()]
})
