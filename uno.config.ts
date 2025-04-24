import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  transformers: [
    transformerDirectives(),
  ],
  shortcuts: {
    'btn': 'px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300',
    'input': 'px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
  },
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