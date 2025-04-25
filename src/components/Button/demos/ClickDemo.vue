<template>
  <s-button type="primary" @click="handleClick">點擊我</s-button>
</template>

<script setup lang="ts">
const handleClick = () => {
  alert('按鈕被點擊了！')
}
</script>