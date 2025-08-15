<template>
  <div class="demo-section">
    <Collapsible v-model:open="customOpen">
      <template #trigger>
        <div class="custom-trigger">
          <IconInfoCircle :size="20" />
          <span>查看詳細信息</span>
          <IconChevronDown
            :size="16"
            class="ml-auto transition-transform duration-200"
            :class="{ 'rotate-180': customOpen }"
          />
        </div>
      </template>
      <div class="demo-content">
        <h6 class="font-semibold mb-2">詳細信息</h6>
        <ul class="list-disc list-inside space-y-1">
          <li>這是第一項詳細信息</li>
          <li>這是第二項詳細信息</li>
          <li>這是第三項詳細信息</li>
        </ul>
      </div>
    </Collapsible>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconInfoCircle, IconChevronDown } from '@tabler/icons-vue'
import Collapsible from '../index.vue'

const customOpen = ref(false)
</script>

<style lang="postcss" scoped>
.demo-section {
  @apply space-y-3;
  width: 300px;
}

.custom-trigger {
  @apply flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer;
}

.space-y-1 > * + * {
  @apply mt-1;
}
</style>
