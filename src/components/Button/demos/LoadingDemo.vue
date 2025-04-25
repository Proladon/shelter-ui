<template>
  <div class="flex gap-2">
    <s-button :loading="true">加載中</s-button>
    <s-button type="primary" :loading="true">加載中</s-button>
    <s-button type="success" :loading="loading">{{ loading ? '加載中...' : '點擊加載' }}</s-button>
    <s-button @click="toggleLoading">{{ loading ? '停止加載' : '開始加載' }}</s-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const toggleLoading = () => {
  loading.value = !loading.value
}
</script>