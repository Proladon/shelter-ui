<template>
  <span v-if="show" class="sh-checkbox-indicator">
    <slot name="icon">
      <IconCheck
        v-if="state === 'checked'"
        class="sh-checkbox-indicator__icon"
      />
      <IconMinus
        v-else-if="state === 'indeterminate'"
        class="sh-checkbox-indicator__icon"
      />
    </slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { IconCheck, IconMinus } from "@tabler/icons-vue"

interface CheckboxIndicatorProps {
  /**
   * 複選框狀態
   */
  state?: "checked" | "unchecked" | "indeterminate"
  /**
   * 強制顯示
   */
  forceMount?: boolean
}

const props = withDefaults(defineProps<CheckboxIndicatorProps>(), {
  state: "unchecked",
  forceMount: false,
})

const show = computed(() => {
  return (
    props.forceMount ||
    props.state === "checked" ||
    props.state === "indeterminate"
  )
})
</script>

<style lang="postcss">
.sh-checkbox-indicator {
  @apply flex items-center justify-center w-full h-full;
}

.sh-checkbox-indicator__icon {
  @apply w-3 h-3 text-white transition-opacity duration-200;
}
</style>
