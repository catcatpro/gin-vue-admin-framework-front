import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  envPrefix: "APP_",
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
      server: {
      proxy: {
        "/api": {
          target:  "http://192.168.1.9:8080",
          secure: false,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }

  // test: {
  //   deps: {
  //     inline: ['element-plus']
  //   }
  // }
})
