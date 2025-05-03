import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      // 使用物件形式定義多個入口點
      entry: {
        'shelter-ui': resolve(__dirname, 'src/index.ts'),
        core: resolve(__dirname, 'src/core/index.ts'),
      },
      name: 'ShelterUI',
      // 調整檔案名稱格式以支援多個入口
      fileName: (format, entryName) => {
        // 確保生成 ES 和 CommonJS 兩種格式
        if (format === 'es') {
          return `${entryName}.js.js`
        } else if (format === 'cjs') {
          return `${entryName}.cjs.js`
        }
        return `${entryName}.${format}.js`
      },
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
        assetFileNames: () => {
          // if (assetInfo.name === 'style.css') return 'index.css'
          // return assetInfo.name || ''
          return 'index.css'
        },
      },
    },
  },
})
