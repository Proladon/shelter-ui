<template>
  <slot />
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import color from 'color'
import type { ThemeVarsConfig } from './types'
import { setCssVar } from '@/utils/style'
import defaultTheme from '@/themes/default'

const props = withDefaults(
  defineProps<{
    themeConfig?: ThemeVarsConfig
    themePrefix?: string
  }>(),
  {
    themePrefix: 'sh',
    themeConfig: () => defaultTheme,
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
  Object.entries(themeVars).forEach(([key, value]) => {
    setCssVar(key, value)
    setCssVar(`${key}-darken`, color(value).blacken(0.3).hex())
    setCssVar(`${key}-lighten`, color(value).whiten(0.3).hex())
    setCssVar(`${key}-fade`, color(value).fade(0.7).hexa())
  })
}

onBeforeMount(() => {
  if (props.themePrefix) {
    setCssVar('sh-prefix', props.themePrefix)
  }
  const colorVars = flattenThemeVars(props.themeConfig, props.themePrefix)
  updateThemeVars(colorVars)
})
</script>
