import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

function convertToUnoColorsConfig(
  obj: any,
  {
    colorPrefix = '',
    cssVarPrefix = '',
  }: {
    colorPrefix?: string
    cssVarPrefix?: string
  },
): any {
  const innerFn = (obj: any, lastObjKey: string) => {
    const result: any = {}

    for (const key in obj) {
      const objKey = lastObjKey ? `${lastObjKey}-${key}` : key
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        Object.assign(result, innerFn(obj[key], key))
      } else if (typeof obj[key] === 'string') {
        const colorKey = colorPrefix
          ? `${colorPrefix}-${objKey.replace(/-/g, '.')}`
          : objKey.replace(/-/g, '.')
        result[colorKey] = `rgb(var(--${
          cssVarPrefix ? `${cssVarPrefix}-` : ''
        }${objKey.replace(/([A-Z])/g, '-$1').toLowerCase()}), <alpha-value>)`
      }
    }

    return result
  }

  return innerFn(obj, '')
}

const colors = convertToUnoColorsConfig(
  {
    primary: '#7EAFBA',
    'primary-light': '#2c353c',
    bg: {
      primary: '#22272e',
      secondary: '#1b1f27',
    },

    text: {
      base: '#9CA3AF',
    },

    border: {
      base: '#3e4451',
    },

    status: {
      info: '#d5d5d5',
      danger: '#ed6d7d',
      warning: '#f2c97d',
      success: '#9cc3b4',
    },
  },
  {
    colorPrefix: '',
    cssVarPrefix: 'sh',
  },
)

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
