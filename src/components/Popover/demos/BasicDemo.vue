<template>
  <div class="flex flex-col gap-4">
    <div>
      <h4>基本用法</h4>
      <div class="flex flex-wrap gap-4">
        <SHPopover>
          <template #trigger>
            <SHButton>點擊顯示彈出框</SHButton>
          </template>
          <div :style="{ display: 'flex', flexDirection: 'column', gap: 10 }">
            <p class="text-lg font-medium">彈出框內容</p>
            <p>這是一個基本的彈出框示例</p>
          </div>
        </SHPopover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 基本彈出框示例
</script>
