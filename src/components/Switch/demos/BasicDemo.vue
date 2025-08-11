<template>
  <div class="demo-row">
  <SHSwitch v-model="checked">啟用</SHSwitch>
    <p class="ml-4">目前狀態：{{ checked ? '開啟' : '關閉' }}</p>
  </div>
</template>

<script setup lang="ts">
import SHSwitch from '../index.vue'
import { ref } from 'vue'
const checked = ref(false)
</script>

<style scoped>
.demo-row {
  @apply flex flex-col justify-center items-center;
}
.ml-4 {
  margin-left: 1rem;
}
</style>
