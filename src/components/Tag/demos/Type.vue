<template>
  <div class="demo-container">
    <h3>類型變化</h3>
    <div class="demo-section">
      <SHTag value="Primary" type="primary" />
      <SHTag value="Secondary" type="secondary" />
      <SHTag value="Success" type="success" />
      <SHTag value="Info" type="info" />
      <SHTag value="Warning" type="warning" />
      <SHTag value="Danger" type="danger" />
    </div>

    <h3>圓角標籤</h3>
    <div class="demo-section">
      <SHTag value="Primary" type="primary" rounded />
      <SHTag value="Secondary" type="secondary" rounded />
      <SHTag value="Success" type="success" rounded />
      <SHTag value="Info" type="info" rounded />
      <SHTag value="Warning" type="warning" rounded />
      <SHTag value="Danger" type="danger" rounded />
    </div>

    <h3>邊框標籤</h3>
    <div class="demo-section">
      <SHTag value="Primary" type="primary" bordered />
      <SHTag value="Secondary" type="secondary" bordered />
      <SHTag value="Success" type="success" bordered />
      <SHTag value="Info" type="info" bordered />
      <SHTag value="Warning" type="warning" bordered />
      <SHTag value="Danger" type="danger" bordered />
    </div>

    <h3>圓角邊框標籤</h3>
    <div class="demo-section">
      <SHTag value="Primary" type="primary" rounded bordered />
      <SHTag value="Secondary" type="secondary" rounded bordered />
      <SHTag value="Success" type="success" rounded bordered />
      <SHTag value="Info" type="info" rounded bordered />
      <SHTag value="Warning" type="warning" rounded bordered />
      <SHTag value="Danger" type="danger" rounded bordered />
    </div>
  </div>
</template>

<script setup lang="ts">
import SHTag from "../index.vue"
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply space-y-6;
}

.demo-section {
  @apply flex items-center gap-2 flex-wrap;
}
</style>
