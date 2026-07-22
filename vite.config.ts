import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import dts from 'vite-plugin-dts'
import { generateBaselineCss } from './src/core'

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, 'package.json'), 'utf-8'),
)

/**
 * Generates src/generated/baseline.css from design tokens at build/dev start.
 * Re-run automatically whenever `pnpm dev` or `pnpm build` is invoked.
 */
function generateBaselinePlugin(): Plugin {
  return {
    name: 'shelter-ui:generate-baseline-css',
    buildStart() {
      const outDir = resolve(__dirname, 'src/generated')
      mkdirSync(outDir, { recursive: true })
      const css = [
        '/* AUTO-GENERATED — do not edit manually. */',
        '/* Source: src/themes/default.ts via src/core/theme-utils.ts  */',
        '/* Re-generated on every `pnpm dev` / `pnpm build`.           */',
        '',
        generateBaselineCss(),
      ].join('\n')
      writeFileSync(resolve(outDir, 'baseline.css'), css, 'utf-8')
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __SHELTER_UI_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [
    generateBaselinePlugin(),
    vue(),
    UnoCSS(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/App.vue', 'src/main.ts', 'src/views/**'],
      outDir: 'dist',
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    cssMinify: 'esbuild',
    lib: {
      // 使用物件形式定義多個入口點
      entry: {
        'shelter-ui': resolve(__dirname, 'src/index.ts'),
        core: resolve(__dirname, 'src/core/index.ts'),
        preset: resolve(__dirname, 'src/preset.ts'),
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
        assetFileNames: () => 'index.css',
      },
    },
  },
})
