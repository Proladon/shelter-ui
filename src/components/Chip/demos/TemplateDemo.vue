<template>
  <div class="demo-container">
    <SHChip class="py-0 pl-0 pr-4">
      <span
        class="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center"
        >P</span
      >
      <span class="ml-2 font-medium">PRIME</span>
    </SHChip>

    <SHChip class="py-0 pl-0 pr-4">
      <span
        class="bg-status-success text-white rounded-full w-8 h-8 flex items-center justify-center"
        >S</span
      >
      <span class="ml-2 font-medium">SHELTER</span>
    </SHChip>

    <SHChip removable>
      <template #icon>
        <icon-heart class="w-4 h-4 text-red-500" />
      </template>
      <span class="font-medium">最愛</span>
    </SHChip>
  </div>
</template>

<script setup lang="ts">
import { IconHeart } from '@tabler/icons-vue'
</script>

<style scoped>
.demo-container {
  display: flex;
  gap: 12px;
  padding: 20px 0;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
