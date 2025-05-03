import type { ThemeVarsConfig } from '@/components/ConfigProvider/types'
import color from 'color'
import defaultTheme from '../themes/default'

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

const addDarkenAndLighten = (
  themeVars: Record<string, string>,
): Record<string, string> => {
  const needAdd: Record<string, string> = {}

  for (const key in themeVars) {
    // darken
    needAdd[`${key}-darken`] = color(themeVars[key]).darken(0.3).hex()
    // lighten
    needAdd[`${key}-lighten`] = color(themeVars[key]).lighten(0.3).hex()
    //  fade
    needAdd[`${key}-fade`] = color(themeVars[key]).fade(0.3).hex()
  }
  return {
    ...themeVars,
    ...needAdd,
  }
}

export const generateUnoThemeColors = (themeVarsConfig?: ThemeVarsConfig) => {
  const themes = themeVarsConfig || defaultTheme
  return convertToUnoColorsConfig(
    addDarkenAndLighten(flattenThemeVars(themes)),
    {
      colorPrefix: '',
      cssVarPrefix: 'sh',
    },
  )
}
