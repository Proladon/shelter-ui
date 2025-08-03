<template>
  <div class="demo-stack">
    <SMessageBox type="info">這是一個 info 訊息</SMessageBox>
    <SMessageBox type="danger">這是一個 danger 訊息</SMessageBox>
    <SMessageBox type="success">這是一個 success 訊息</SMessageBox>
    <SMessageBox type="warning">這是一個 warning 訊息</SMessageBox>
    <SMessageBox type="normal">這是一個 normal 訊息</SMessageBox>
    <SMessageBox type="normal"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nam,
      sequi nulla laboriosam quasi aperiam nostrum magni aut impedit, corrupti,
      quos obcaecati praesentium saepe. Vel libero minus laudantium cumque
      quos.</SMessageBox
    >
    <SMessageBox
      type="info"
      icon="<svg viewBox='0 0 20 20' fill='currentColor' width='20' height='20'><rect x='4' y='4' width='12' height='12' stroke='currentColor' stroke-width='2' fill='none'/></svg>"
    >
      自訂 icon
    </SMessageBox>
  </div>
</template>

<script setup lang="ts">
import SMessageBox from '../index.vue'
</script>

<style scoped>
.demo-stack > * + * {
  margin-top: 16px;
}
</style>
