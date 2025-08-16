<template>
  <div class="notification-demo">
    <h2>通知組件演示</h2>
    <p class="demo-description">
      這個演示展示了如何使用 SHNotificationProvider 和 useNotification API
    </p>

    <div class="demo-grid">
      <div class="demo-section">
        <h3>基本通知</h3>
        <BasicDemo />
      </div>

      <div class="demo-section">
        <h3>持續時間控制</h3>
        <DurationDemo />
      </div>

      <div class="demo-section">
        <h3>自定義內容</h3>
        <CustomDemo />
      </div>

      <div class="demo-section">
        <h3>位置演示說明</h3>
        <PlacementDemo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicDemo from '../demos/BasicDemo.vue'
import DurationDemo from '../demos/DurationDemo.vue'
import CustomDemo from '../demos/CustomDemo.vue'
import PlacementDemo from '../demos/PlacementDemo.vue'
</script>

<style lang="postcss" scoped>
.notification-demo {
  @apply p-6 space-y-6;
}

.demo-description {
  @apply text-text.base.fade text-sm mb-6;
}

.demo-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
}

.demo-section {
  @apply p-4 border border-border.base rounded-lg bg-bg.primary;
}

.demo-section h3 {
  @apply text-lg font-medium text-text.base mb-4;
}
</style>
