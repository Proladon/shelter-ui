<template>
  <SHNotificationProvider placement="top-right" :max="5">
    <div class="test-app">
      <h1>Notification 組件測試</h1>
      <p>這是一個測試 Notification 組件的簡單應用</p>

      <AllDemo />
    </div>
  </SHNotificationProvider>
</template>

<script setup lang="ts">
import { SHNotificationProvider } from './index'
import AllDemo from './demos/AllDemo.vue'
</script>

<style lang="postcss" scoped>
.test-app {
  @apply p-8 max-w-4xl mx-auto;
}

h1 {
  @apply text-2xl font-bold text-text.base mb-4;
}

p {
  @apply text-text.base.fade mb-6;
}
</style>
