<script setup lang="ts">
import ConfigProvider from '@/components/ConfigProvider/index.vue'
import NotificationTest from '@/components/Notification/TestApp.vue'
</script>

<template>
  <ConfigProvider>
    <NotificationTest />
  </ConfigProvider>
</template>

<style scoped>
/* App.vue 用於測試 Notification 組件 */
</style>
