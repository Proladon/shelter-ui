<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">基本使用</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        基本的滾動區域，包含垂直和水平滾動
      </p>
    </div>

    <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <ScrollArea
        class="h-48 w-full border border-gray-300 dark:border-gray-600 rounded"
      >
        <div class="p-4 w-[600px]">
          <h4 class="mb-4 text-sm font-medium leading-none">標籤</h4>
          <div v-for="tag in tags" :key="tag" class="text-sm mb-2 last:mb-0">
            {{ tag }}
          </div>
        </div>
      </ScrollArea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '../index'

const tags = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${i + 1}`)
</script>
