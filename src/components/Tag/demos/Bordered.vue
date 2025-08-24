<template>
  <div class="demo-container">
    <h3>邊框標籤</h3>
    <div class="demo-section">
      <SHTag value="Primary" type="primary" bordered />
      <SHTag value="Secondary" type="secondary" bordered />
      <SHTag value="Success" type="success" bordered />
      <SHTag value="Info" type="info" bordered />
      <SHTag value="Warning" type="warning" bordered />
      <SHTag value="Danger" type="danger" bordered />
    </div>

    <h3>邊框對比</h3>
    <div class="demo-section">
      <div class="comparison-group">
        <h4>填充樣式</h4>
        <div class="tags">
          <SHTag value="Primary" type="primary" />
          <SHTag value="Success" type="success" />
          <SHTag value="Warning" type="warning" />
        </div>
      </div>

      <div class="comparison-group">
        <h4>邊框樣式</h4>
        <div class="tags">
          <SHTag value="Primary" type="primary" bordered />
          <SHTag value="Success" type="success" bordered />
          <SHTag value="Warning" type="warning" bordered />
        </div>
      </div>
    </div>

    <h3>帶圖示的邊框標籤</h3>
    <div class="demo-section">
      <SHTag value="使用者" type="primary" :icon="IconUser" bordered />
      <SHTag value="成功" type="success" :icon="IconCheck" bordered />
      <SHTag value="警告" type="warning" :icon="IconAlertTriangle" bordered />
      <SHTag value="危險" type="danger" :icon="IconX" bordered />
    </div>

    <h3>圓角邊框組合</h3>
    <div class="demo-section">
      <SHTag value="圓角邊框" type="primary" rounded bordered />
      <SHTag
        value="圓角邊框"
        type="success"
        rounded
        bordered
        :icon="IconCheck"
      />
      <SHTag
        value="圓角邊框"
        type="info"
        rounded
        bordered
        :icon="IconInfoCircle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SHTag from "../index.vue"
import {
  IconUser,
  IconCheck,
  IconAlertTriangle,
  IconX,
  IconInfoCircle,
} from "@tabler/icons-vue"
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply space-y-6;
}

.demo-section {
  @apply flex items-start gap-4 flex-wrap;
}

.comparison-group {
  @apply space-y-2;
}

.comparison-group h4 {
  @apply text-sm font-medium text-gray-600 dark:text-gray-400;
}

.tags {
  @apply flex items-center gap-2 flex-wrap;
}
</style>
