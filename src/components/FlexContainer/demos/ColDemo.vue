<template>
  <FlexContainer align="center" justify="center" :gap="12" col>
    <div style="background: #eee; padding: 8px">垂直一</div>
    <div style="background: #eee; padding: 8px">垂直二</div>
    <div style="background: #eee; padding: 8px">垂直三</div>
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
