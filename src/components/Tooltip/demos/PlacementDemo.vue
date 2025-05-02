<template>
  <div class="demo-container">
    <div class="tooltip-grid">
      <STooltip side="top">
        <template #trigger>
          <SButton type="primary" class="w-full">Top</SButton>
        </template>
        Tooltip on top
      </STooltip>

      <STooltip side="right">
        <template #trigger>
          <SButton type="primary" class="w-full">Right</SButton>
        </template>
        Tooltip on right
      </STooltip>

      <STooltip side="bottom">
        <template #trigger>
          <SButton type="primary" class="w-full">Bottom</SButton>
        </template>
        Tooltip on bottom
      </STooltip>

      <STooltip side="left">
        <template #trigger>
          <SButton type="primary" class="w-full">Left</SButton>
        </template>
        Tooltip on left
      </STooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import STooltip from '../index.vue'
import SButton from '@/components/Button/index.vue'
</script>

<style scoped>
.demo-container {
  @apply p-10;
}

.tooltip-grid {
  @apply grid grid-cols-2 gap-5 max-w-sm mx-auto;
}
</style>
