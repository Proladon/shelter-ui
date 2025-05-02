<template>
  <div class="demo-container">
    <STooltip>
      <template #trigger>
        <Button type="primary">Hover me</Button>
      </template>
      Basic tooltip content
    </STooltip>
  </div>
</template>

<script setup lang="ts">
import STooltip from '../index.vue'
import Button from '@/components/Button/index.vue'
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply flex justify-center p-10;
}
</style>
