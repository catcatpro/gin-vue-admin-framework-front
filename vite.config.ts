import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import Inspect from 'vite-plugin-inspect'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import{ resolve } from 'node:path'
const pathSrc = resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dts: resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver()
      ],
      dts: resolve(pathSrc, 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect(),
  ],
  envPrefix: "APP_",
  resolve: {
    alias: {
      '@':  pathSrc
    }
  },
      server: {
      proxy: {
        "/api": {
          target:  "http://192.168.1.7:8080",
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
