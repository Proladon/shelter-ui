<template>
  <slot />
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import color from 'color'
import type { ThemeVarsConfig } from './types'

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
    }),
  },
)

// 將 themeVars 物件展平成 key-value 的形式
const flattenThemeVars = (
  themeVars: ThemeVarsConfig,
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

// 設置 CSS 變數
const setCssVar = (varName: string, value: string) => {
  document.documentElement.style.setProperty(`--${varName}`, value)
}

// 更新 CSS 變數
const updateThemeVars = (themeVars: Record<string, string>) => {
  for (const key in themeVars) {
    const rgbArray = color(themeVars[key]).rgb().array()
    setCssVar(key, `${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}`)
  }
}

onBeforeMount(() => {
  const colorVars = flattenThemeVars(props.themeConfig, props.themePrefix)
  updateThemeVars(colorVars)
})
</script>
