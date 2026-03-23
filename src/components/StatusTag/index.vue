<template>
  <span class="sh-status-tag" :style="textStyle">
    <!-- Status indicator: spinner or dot -->
    <span class="sh-status-tag__indicator">
      <Spinner v-if="loading" :color="`var(--sh-${typeVar})`" :size="10" />
      <span v-else class="sh-status-tag__dot" :style="dotStyle" />
    </span>

    <!-- Label -->
    <slot>
      <span v-if="value" class="sh-status-tag__label">{{ value }}</span>
    </slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StatusTagProps } from './types'
import Spinner from '@/components/Spinner/index.vue'

defineOptions({ name: 'SHStatusTag' })

const props = withDefaults(defineProps<StatusTagProps>(), {
  value: '',
  type: 'primary',
  loading: false,
})

// Maps type to the CSS variable key prefix
const cssVarMap: Record<string, string> = {
  primary: 'primary',
  success: 'status-success',
  warning: 'status-warning',
  danger: 'status-danger',
  info: 'status-info',
}

const typeVar = computed(() => cssVarMap[props.type] ?? 'primary')

const dotStyle = computed(() => ({
  backgroundColor: `var(--sh-${typeVar.value})`,
}))

const textStyle = computed(() => ({
  color: `var(--sh-${typeVar.value})`,
}))
</script>

<style lang="postcss">
.sh-status-tag {
  @apply inline-flex items-center font-medium bg-bg.secondary text-text.base border border-solid border-border.base;
  gap: var(--sh-spacing-sm);
  padding: 2px var(--sh-spacing-sm);
  border-radius: var(--sh-radius-sm);
  font-size: var(--sh-font-size-xs);
}

/* ── Indicator wrapper ────────────────────────────────────────────── */
.sh-status-tag__indicator {
  @apply inline-flex items-center justify-center flex-shrink-0;
}

/* ── Status dot ──────────────────────────────────────────────────── */
.sh-status-tag__dot {
  display: inline-block;
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: var(--sh-radius-full);
}

/* ── Label ───────────────────────────────────────────────────────── */
.sh-status-tag__label {
  @apply whitespace-nowrap;
}
</style>
