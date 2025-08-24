<template>
  <span class="sh-tag" :class="tagClasses">
    <!-- 圖示插槽或圖示組件 -->
    <slot name="icon">
      <component v-if="icon" :is="icon" class="sh-tag__icon" />
    </slot>

    <!-- 標籤文字或預設插槽 -->
    <slot name="default">
      <span v-if="value" class="sh-tag__label">{{ value }}</span>
    </slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { TagProps } from "./types"

defineOptions({
  name: "SHTag",
})

const props = withDefaults(defineProps<TagProps>(), {
  value: "",
  type: "primary",
  rounded: false,
  bordered: false,
})

const tagClasses = computed(() => {
  return [
    "sh-tag",
    `sh-tag--${props.type}`,
    {
      "sh-tag--rounded": props.rounded,
      "sh-tag--bordered": props.bordered,
    },
  ]
})
</script>

<style lang="postcss">
.sh-tag {
  @apply inline-flex items-center gap-1 px-2 py-1 text-sm font-medium;
  @apply rounded;
}

.sh-tag--rounded {
  @apply rounded-full;
}

/* Type 變化 */
.sh-tag--primary {
  @apply bg-primary.fade text-primary;
}

.sh-tag--secondary {
  @apply bg-secondary.fade text-secondary;
}

.sh-tag--success {
  @apply bg-status.success.fade text-status.success;
}

.sh-tag--info {
  @apply bg-status.info.fade text-status.info;
}

.sh-tag--warning {
  @apply bg-status.warning.fade text-status.warning;
}

.sh-tag--danger {
  @apply bg-status.danger.fade text-status.danger;
}

/* Bordered 變化 */
.sh-tag--bordered {
  @apply border border-[1px] border-solid;

  &.sh-tag--primary {
    @apply text-primary border-primary;
  }

  &.sh-tag--secondary {
    @apply text-secondary border-secondary;
  }

  &.sh-tag--success {
    @apply text-status.success border-status.success;
  }

  &.sh-tag--info {
    @apply text-status.info border-status.info;
  }

  &.sh-tag--warning {
    @apply text-status.warning border-status.warning;
  }

  &.sh-tag--danger {
    @apply text-status.danger border-status.danger;
  }
}

.sh-tag__icon {
  @apply w-4 h-4 flex-shrink-0;
}

.sh-tag__label {
  @apply whitespace-nowrap;
}
</style>
