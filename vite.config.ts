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
      // 使用对象形式定义多个入口点
      entry: {
        'shelter-ui': resolve(__dirname, 'src/index.ts'),
        core: resolve(__dirname, 'src/core/index.ts'),
      },
      name: 'ShelterUI',
      // 调整文件名格式以支持多个入口
      fileName: (format, entryName) => {
        if (entryName === 'shelter-ui') {
          return `shelter-ui.${format === 'es' ? 'js' : format}.js`
        }
        return `${entryName}.${format === 'es' ? 'js' : format}.js`
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
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'shelter-ui.css'
          return assetInfo.name || ''
        },
      },
    },
  },
})
