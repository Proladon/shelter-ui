<template>
  <slot />
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import type { ThemeVarsConfig } from './types'
import { flattenTokens, deriveColorVariants } from '@/core/theme-utils'
import { setCssVar } from '@/utils/style'

const props = withDefaults(
  defineProps<{
    themeConfig?: ThemeVarsConfig
    themePrefix?: string
  }>(),
  {
    themePrefix: 'sh',
    themeConfig: undefined,
  },
)

/**
 * Apply color CSS variables to the document root at runtime.
 * Uses the SAME deriveColorVariants() function as the build-time UnoCSS config
 * so darken/lighten/fade values are guaranteed to be identical.
 */
const applyColorVars = (colors: ThemeVarsConfig, prefix: string) => {
  const flat = flattenTokens(colors)
  const withVariants = deriveColorVariants(flat)

  for (const [key, value] of Object.entries(withVariants)) {
    setCssVar(`${prefix}-${key}`, value)
  }
}

onBeforeMount(() => {
  // Only override CSS variables at runtime when a CUSTOM themeConfig is provided.
  // The default theme is already baked into style.css as static :root vars,
  // so we skip runtime injection to prevent SSR FOUC.
  if (props.themeConfig) {
    applyColorVars(props.themeConfig, props.themePrefix)
  }
})
</script>
