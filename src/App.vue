<script setup lang="ts">
import ConfigProvider from '@/components/ConfigProvider/index.vue'
import DashboardDemo from '@/views/Dashboard/index.vue'
</script>

<template>
  <div class="app-container">
    <ConfigProvider>
      <DashboardDemo />
    </ConfigProvider>
  </div>
</template>

<style scoped>
/* App.vue 用於測試 Notification 組件 */

.app-container {
  @apply bg-bg.primary;
}
</style>
