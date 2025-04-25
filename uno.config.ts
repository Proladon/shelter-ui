import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: {},
  theme: {
    colors: {
      primary: {
        DEFAULT: '#3498db',
        dark: '#2980b9',
      },
      secondary: {
        DEFAULT: '#2ecc71',
        dark: '#27ae60',
      },
    },
  },
})