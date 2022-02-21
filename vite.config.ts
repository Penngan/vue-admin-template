import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import setting from './src/setting'
// https://vitejs.dev/config/
export default defineConfig({
  // https://vitejs.dev/config/#base
  base: setting.viteBasePath,
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // https://vitejs.dev/config/#server-options
  server: {
    hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
    port: setting.vitePort, // 配置端口
    open: false, // 是否自动打开浏览器
    cors: true, // 是否允许跨域
    host: '0.0.0.0',
    proxy: {
      // 配置代理
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
