<template>
  <div class="demo-container">
    <div class="tooltip-grid">
  <SHTooltip side="top">
        <template #trigger>
          <SHButton type="primary" class="w-full">Top</SHButton>
        </template>
        Tooltip on top
  </SHTooltip>

  <SHTooltip side="right">
        <template #trigger>
          <SHButton type="primary" class="w-full">Right</SHButton>
        </template>
        Tooltip on right
  </SHTooltip>

  <SHTooltip side="bottom">
        <template #trigger>
          <SHButton type="primary" class="w-full">Bottom</SHButton>
        </template>
        Tooltip on bottom
  </SHTooltip>

  <SHTooltip side="left">
        <template #trigger>
          <SHButton type="primary" class="w-full">Left</SHButton>
        </template>
        Tooltip on left
  </SHTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import SHTooltip from '../index.vue'
import SHButton from '@/components/Button/index.vue'
</script>

<style scoped>
.demo-container {
  @apply p-10;
}

.tooltip-grid {
  @apply grid grid-cols-2 gap-5 max-w-sm mx-auto;
}
</style>
