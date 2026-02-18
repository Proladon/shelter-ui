import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { generateUnoThemeColors } from './src/core'

const colors = generateUnoThemeColors()

console.log(colors)

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {},
  theme: {
    colors: {
      ...colors,
    },
  },
})
