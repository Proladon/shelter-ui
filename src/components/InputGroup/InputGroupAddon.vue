<template>
  <div
    class="sh-input-group-addon"
    :class="{
      'sh-input-group-addon--block-start': align === 'block-start',
      'sh-input-group-addon--block-end': align === 'block-end',
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { InputGroupAddonProps } from './types'

defineOptions({ name: 'SHInputGroupAddon' })

withDefaults(defineProps<InputGroupAddonProps>(), {
  align: 'inline',
})
</script>

<style lang="postcss" scoped>
.sh-input-group-addon {
  @apply inline-flex items-center shrink-0;
  @apply bg-bg.primary text-text.primary;
  @apply px-[var(--sh-spacing-md)];
  @apply text-[var(--sh-font-size-md)];
  white-space: nowrap;
}

/* Inline addon: buttons fill the cell height and lose their own border */
.sh-input-group-addon:not(.sh-input-group-addon--block-end) :deep(button) {
  @apply rounded-none border-0 h-full;
  margin: 0;
}

/* Block-start addon: seamless inner header bar */
.sh-input-group-addon--block-start {
  @apply flex items-center gap-[var(--sh-spacing-sm)];
  @apply bg-bg.primary text-text.primary;
  @apply text-[var(--sh-font-size-sm)];
  @apply px-[var(--sh-spacing-md)] py-[var(--sh-spacing-sm)];
  min-height: var(--sh-component-size-sm);
  white-space: normal;
}

/* Block-end addon: seamless inner footer bar */
.sh-input-group-addon--block-end {
  @apply flex items-center gap-[var(--sh-spacing-sm)];
  @apply bg-bg.primary text-text.primary;
  @apply text-[var(--sh-font-size-sm)];
  @apply px-[var(--sh-spacing-md)] py-[var(--sh-spacing-sm)];
  /* min height so the toolbar has comfortable click area */
  min-height: var(--sh-component-size-sm);
  white-space: normal;
}
</style>
