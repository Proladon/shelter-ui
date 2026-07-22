<template>
  <span class="sh-status-tag" :style="textStyle">
    <!-- Status indicator: spinner or dot -->
    <span class="sh-status-tag__indicator">
      <Spinner v-if="loading" :color="typeVar" :size="10" />
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
import type { StatusTagProps, StatusTagSlots } from './types'
import Spinner from '@/components/Spinner'
import { resolveTypeVar } from '@/composables/resolveTypeVar'

defineOptions({ name: 'SHStatusTag' })

const props = withDefaults(defineProps<StatusTagProps>(), {
  value: '',
  type: 'primary',
  loading: false,
})

defineSlots<StatusTagSlots>()

const typeVar = resolveTypeVar(() => props.type)

const dotStyle = computed(() => ({
  backgroundColor: typeVar.value,
}))

const textStyle = computed(() => ({
  color: typeVar.value,
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
