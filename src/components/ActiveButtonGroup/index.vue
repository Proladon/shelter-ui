<script setup lang="ts">
import { ref, provide, computed, onMounted, watch, nextTick } from 'vue'
import type { ActiveButtonGroupProps, ActiveButtonGroupEmits } from './types'
import { addButtonKey, activeValueKey, handleButtonClickKey } from './context'
import type { ActiveButtonRegistration } from './context'

defineOptions({
  name: 'SHActiveButtonGroup',
})

const props = withDefaults(defineProps<ActiveButtonGroupProps>(), {
  defaultValue: undefined,
  value: undefined,
  block: false,
})

const emit = defineEmits<ActiveButtonGroupEmits>()

// For collecting buttons
const buttons = ref<ActiveButtonRegistration[]>([])
const indicatorRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref({
  width: '0px',
  height: '0px',
  transform: 'translateX(0px)',
})

const addButton = (button: ActiveButtonRegistration) => {
  buttons.value.push(button)
}

// Get the current value (value or defaultValue)
const currentValue = computed(() => {
  return props.value !== undefined ? props.value : props.defaultValue
})

// Store a non-reactive copy of the current value to break the reactivity chain
const activeButtonValue = ref(currentValue.value)

// For positioning the indicator - separated from reactive updates
const updateIndicator = () => {
  if (!indicatorRef.value) return

  const activeButton = buttons.value.find(
    (btn) => btn.value === activeButtonValue.value,
  )
  if (!activeButton || !activeButton.ref) return

  const rect = activeButton.ref.getBoundingClientRect()
  indicatorStyle.value = {
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transform: `translateX(${activeButton.ref.offsetLeft - 3.5}px)`,
  }
}

const handleButtonClick = (value: string) => {
  if (value === currentValue.value) return
  emit('update:value', value)
  emit('change', value)
}

// Provide the context to child components
provide(addButtonKey, addButton)
provide(activeValueKey, currentValue) // This is safe as we're providing the computed ref
provide(handleButtonClickKey, handleButtonClick)

// Use watch instead of onUpdated to avoid recursive updates
watch(
  currentValue,
  (newVal) => {
    // Update the non-reactive copy first
    activeButtonValue.value = newVal

    // Use nextTick to ensure DOM has updated before measuring
    nextTick(() => {
      updateIndicator()
    })
  },
  { immediate: true },
)

onMounted(() => {
  nextTick(() => {
    updateIndicator()
  })
})
</script>

<template>
  <div
    class="sh-active-button-group"
    :class="{
      'sh-active-button-group--primary': true,
      'sh-active-button-group--block': block,
    }"
  >
    <div
      ref="indicatorRef"
      class="sh-active-button-indicator"
      :style="indicatorStyle"
    ></div>

    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
.sh-active-button-group {
  @apply relative flex rounded-md overflow-hidden bg-bg.primary text-text.base p-1;
  @apply border border-solid border-border.base;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.sh-active-button-group--block {
  @apply w-full;
}

/* Indicator style - always primary */
.sh-active-button-group .sh-active-button-indicator {
  @apply bg-primary.fade;
}

.sh-active-button-indicator {
  @apply absolute rounded-md z-0;
  transition:
    transform 250ms ease,
    width 250ms ease;
}
</style>
