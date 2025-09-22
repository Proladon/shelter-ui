<template>
  <div
    class="sh-divider"
    :class="[
      `sh-divider--${orientation}`,
      `sh-divider--${variant}`,
      `sh-divider--${thickness}`,
      props.class,
    ]"
    role="separator"
    :aria-orientation="orientation"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { DividerProps } from "./types"

// Props
const props = withDefaults(defineProps<DividerProps>(), {
  orientation: "horizontal",
  variant: "solid",
  thickness: "thin",
})
</script>

<style lang="postcss">
.sh-divider {
  @apply border-gray-300;
}

/* 方向樣式 */
.sh-divider--horizontal {
  @apply w-full border-t;
}

.sh-divider--vertical {
  @apply h-full border-l;
  min-height: 1rem;
}

/* 樣式變體 */
.sh-divider--solid {
  border-style: solid;
}

.sh-divider--dashed {
  border-style: dashed;
}

.sh-divider--dotted {
  border-style: dotted;
}

/* 粗細樣式 */
.sh-divider--thin.sh-divider--horizontal {
  @apply border-t;
}

.sh-divider--thin.sh-divider--vertical {
  @apply border-l;
}

.sh-divider--medium.sh-divider--horizontal {
  @apply border-t-2;
}

.sh-divider--medium.sh-divider--vertical {
  @apply border-l-2;
}

.sh-divider--thick.sh-divider--horizontal {
  @apply border-t-4;
}

.sh-divider--thick.sh-divider--vertical {
  @apply border-l-4;
}

/* 帶文字的分隔線 */
.sh-divider:not(:empty) {
  @apply flex items-center text-sm text-gray-500;
}

.sh-divider--horizontal:not(:empty) {
  @apply flex-row;
}

.sh-divider--horizontal:not(:empty)::before,
.sh-divider--horizontal:not(:empty)::after {
  @apply flex-1 border-t border-gray-300;
  content: "";
}

.sh-divider--horizontal:not(:empty)::before {
  @apply mr-4;
}

.sh-divider--horizontal:not(:empty)::after {
  @apply ml-4;
}

.sh-divider--vertical:not(:empty) {
  @apply flex-col;
  writing-mode: vertical-lr;
  text-orientation: mixed;
}

.sh-divider--vertical:not(:empty)::before,
.sh-divider--vertical:not(:empty)::after {
  @apply flex-1 border-l border-gray-300;
  content: "";
}

.sh-divider--vertical:not(:empty)::before {
  @apply mb-4;
}

.sh-divider--vertical:not(:empty)::after {
  @apply mt-4;
}

/* 當有內容時移除主要邊框 */
.sh-divider:not(:empty) {
  border: none;
}
</style>
