<template>
  <div ref="containerRef" class="sh-config-provider">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { ConfigProviderProps, ThemeVarsConfig } from './types'
import type { DesignTokens } from '@/core/theme-utils'
import { flattenTokens, deriveColorVariants } from '@/core/theme-utils'

type ScaleCategory = Exclude<keyof DesignTokens, 'colors' | 'focusRing'>

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  themeConfig: undefined,
})

const containerRef = ref<HTMLElement>()

/** Category key -> CSS variable segment, matching generateBaselineCss()'s layout. */
const CATEGORY_SEGMENTS: Record<ScaleCategory, string> = {
  spacing: 'spacing',
  radius: 'radius',
  fontSize: 'font-size',
  componentSize: 'component-size',
  zIndex: 'z',
  shadow: 'shadow',
  duration: 'duration',
  easing: 'ease',
}

const applyFlatVars = (
  el: HTMLElement,
  flat: Record<string, string>,
  segment: string,
) => {
  for (const [key, value] of Object.entries(flat)) {
    el.style.setProperty(`--sh-${segment}-${key}`, value)
  }
}

/**
 * Apply a partial theme override to this provider's own container element
 * (not the document root), so multiple SHConfigProvider instances can nest
 * with independent overrides. Uses the SAME deriveColorVariants() function as
 * the build-time UnoCSS config so darken/lighten/fade stay identical.
 */
const applyTheme = (config: ThemeVarsConfig | undefined) => {
  const el = containerRef.value
  if (!el || !config) return

  if (config.colors) {
    const flat = flattenTokens(config.colors)
    const withVariants = deriveColorVariants(flat)
    for (const [key, value] of Object.entries(withVariants)) {
      el.style.setProperty(`--sh-${key}`, value)
    }
  }

  for (const category of Object.keys(CATEGORY_SEGMENTS) as ScaleCategory[]) {
    const group = config[category]
    if (group) applyFlatVars(el, flattenTokens(group), CATEGORY_SEGMENTS[category])
  }

  if (config.focusRing) {
    el.style.setProperty('--sh-focus-ring', config.focusRing)
  }
}

// Reactive updates: re-apply whenever themeConfig changes after mount.
watch(() => props.themeConfig, applyTheme, { deep: true })

// Initial application: `immediate: true` on the watcher above would fire
// during setup(), before the `containerRef` template ref is bound to the
// rendered DOM element, so applyTheme would silently no-op on a static
// themeConfig passed at mount. Applying once in onMounted (after the ref is
// bound) ensures a themeConfig provided directly at mount time is applied.
onMounted(() => applyTheme(props.themeConfig))
</script>

<style lang="postcss" scoped>
.sh-config-provider {
  /* Invisible in the box-layout tree so wrapping <slot /> doesn't disturb the
     parent's flex/grid layout, while still being a real element CSS
     variables can be scoped to. */
  display: contents;
}
</style>
