<template>
  <div class="demo-container">
    <h3>帶圖示標籤</h3>
    <div class="demo-section">
      <SHTag value="使用者" type="primary" :icon="IconUser" />
      <SHTag value="搜尋" type="secondary" :icon="IconSearch" />
      <SHTag value="成功" type="success" :icon="IconCheck" />
      <SHTag value="資訊" type="info" :icon="IconInfoCircle" />
      <SHTag value="警告" type="warning" :icon="IconAlertTriangle" />
      <SHTag value="危險" type="danger" :icon="IconX" />
    </div>

    <h3>圓角帶圖示標籤</h3>
    <div class="demo-section">
      <SHTag value="使用者" type="primary" :icon="IconUser" rounded />
      <SHTag value="搜尋" type="secondary" :icon="IconSearch" rounded />
      <SHTag value="成功" type="success" :icon="IconCheck" rounded />
      <SHTag value="資訊" type="info" :icon="IconInfoCircle" rounded />
      <SHTag value="警告" type="warning" :icon="IconAlertTriangle" rounded />
      <SHTag value="危險" type="danger" :icon="IconX" rounded />
    </div>

    <h3>自訂圖示插槽</h3>
    <div class="demo-section">
      <SHTag value="自訂圖示" type="primary">
        <template #icon>
          <IconStar class="w-4 h-4" />
        </template>
      </SHTag>

      <SHTag type="success">
        <template #icon>
          <IconHeart class="w-4 h-4" />
        </template>
        <template #default> 喜愛項目 </template>
      </SHTag>
    </div>
  </div>
</template>

<script setup lang="ts">
import SHTag from "../index.vue"
import {
  IconUser,
  IconSearch,
  IconCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconX,
  IconStar,
  IconHeart,
} from "@tabler/icons-vue"
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply space-y-6;
}

.demo-section {
  @apply flex items-center gap-2 flex-wrap;
}
</style>
