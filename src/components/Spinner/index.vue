<template>
  <div class="loader loader--style3" title="2">
    <svg
      version="1.1"
      id="loader-1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="size"
      :height="size"
      viewBox="0 0 50 50"
      style="enable-background: new 0 0 50 50"
      xml:space="preserve"
    >
      <path
        :fill="computedColor"
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: 40,
  },
})

const size = computed(() =>
  typeof props.size === 'number' ? props.size : parseInt(props.size, 10) || 40,
)
const computedColor = computed(() => {
  // If color is a hex or rgb(a), use as fill, else if class name, use as var(--color), else use var(--sh-text-base)
  if (props.color) {
    // if (/^#|rgb|hsl/.test(props.color)) return props.color
    // treat as CSS var name
    return props.color
  }
  return 'var(--sh-text-base)'
})
</script>

<style lang="postcss" scoped></style>
