<template>
  <FlexContainer align="center" justify="between" :gap="16">
    <div style="background: #eee; padding: 8px">區塊一</div>
    <div style="background: #eee; padding: 8px">區塊二</div>
    <div style="background: #eee; padding: 8px">區塊三</div>
  </FlexContainer>
</template>

<script setup lang="ts">
import FlexContainer from '../index.vue'
</script>

<style scoped>
div {
  border-radius: 4px;
}
</style>
