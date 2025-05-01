<template>
  <slot />
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import color from 'color'
import type { ThemeVarsConfig } from './types'
import { setCssVar } from '@/_utils/style'

const props = withDefaults(
  defineProps<{
    themeConfig?: ThemeVarsConfig
    themePrefix?: string
  }>(),
  {
    themePrefix: 'sh',
    themeConfig: () => ({
      primary: '#7EAFBA',
      'primary-light': '#2c353c',
      bg: {
        primary: '#283038',
        secondary: '#1b1f27',
      },

      text: {
        // base: '#E3C9AA',
        base: '#C5B39D',
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
    }),
  },
)

// 將 themeVars 物件展平成 key-value 的形式
const flattenThemeVars = (
  themeVars: ThemeVarsConfig | Record<string, any>,
  prefix = '',
): Record<string, string> => {
  return Object.keys(themeVars).reduce((acc, key) => {
    const value = themeVars[key as keyof typeof themeVars]
    const newKey = prefix ? `${prefix}-${key}` : key

    if (typeof value === 'object' && !Array.isArray(value)) {
      return {
        ...acc,
        ...flattenThemeVars(value as Record<string, any>, newKey),
      }
    }

    return { ...acc, [newKey]: value as string }
  }, {})
}

// 更新 CSS 變數
const updateThemeVars = (themeVars: Record<string, string>) => {
  for (const key in themeVars) {
    // const rgbArray = color(themeVars[key]).rgb().array()
    // setCssVar(key, `${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}`)
    // const darkenRgbArray = color(themeVars[key]).darken(0.3).rgb().array()
    // setCssVar(`${key}-darken`, `${darkenRgbArray[0]}, ${darkenRgbArray[1]}, ${darkenRgbArray[2]}`)
    // const lightenRgbArray = color(themeVars[key]).lighten(0.3).rgb().array()
    // setCssVar(`${key}-lighten`, `${lightenRgbArray[0]}, ${lightenRgbArray[1]}, ${lightenRgbArray[2]}`)

    setCssVar(key, themeVars[key])
    setCssVar(`${key}-darken`, color(themeVars[key]).blacken(0.3).hex())
    setCssVar(`${key}-lighten`, color(themeVars[key]).whiten(0.3).hex())
    setCssVar(`${key}-fade`, color(themeVars[key]).fade(0.7).hexa())
  }
}

onBeforeMount(() => {
  if (props.themePrefix) {
    setCssVar('sh-prefix', props.themePrefix)
  }
  const colorVars = flattenThemeVars(props.themeConfig, props.themePrefix)
  updateThemeVars(colorVars)
})
</script>
