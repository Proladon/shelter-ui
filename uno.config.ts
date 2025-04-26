import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import color from 'color'

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
        // result[colorKey] = `rgb(var(--${
        //   cssVarPrefix ? `${cssVarPrefix}-` : ''
        // }${objKey.replace(/([A-Z])/g, '-$1').toLowerCase()}), <alpha-value>)`
        result[colorKey] = `var(--${
          cssVarPrefix ? `${cssVarPrefix}-` : ''
        }${objKey.replace(/([A-Z])/g, '-$1').toLowerCase()})`
      }
    }

    return result
  }

  return innerFn(obj, '')
}

// 將 themeVars 物件展平成 key-value 的形式
const flattenThemeVars = (
  themeVars: any,
  prefix = '',
): Record<string, string> => {
  return Object.keys(themeVars).reduce((acc, key) => {
    const value = themeVars[key]
    const newKey = prefix ? `${prefix}-${key}` : key

    if (typeof value === 'object' && !Array.isArray(value)) {
      return { ...acc, ...flattenThemeVars(value, newKey) }
    }

    return { ...acc, [newKey]: value }
  }, {})
}

const addDarkenAndLighten = (themeVars: Record<string, string>,): Record<string, string> => {
  const needAdd = {}

  for (const key in themeVars) {
   // darken
   needAdd[`${key}-darken`] = color(themeVars[key]).darken(0.3).hex()
   // lighten
   needAdd[`${key}-lighten`] = color(themeVars[key]).lighten(0.3).hex()
  //  veil
   needAdd[`${key}-veil`] = color(themeVars[key]).fade(0.3).hex()
  }
  return {
    ...themeVars,
    ...needAdd,
  }
}

const themes = {    primary: '#7EAFBA',
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
  },}

const colors = convertToUnoColorsConfig(addDarkenAndLighten(flattenThemeVars(themes)),{
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
