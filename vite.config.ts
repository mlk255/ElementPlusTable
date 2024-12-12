import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: './mock', // mock文件夹的位置
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // '@' -> 'src' 目录
    },
  },
})
