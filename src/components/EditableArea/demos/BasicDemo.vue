<template>
  <div class="flex flex-col gap-4">
    <h4>基本用法</h4>
    <SHEditableArea>
      <template v-slot="{ editing }">
        <div v-if="!editing">
          <p>現在處於檢視模式</p>
        </div>
        <div v-else>
          <p>現在處於編輯模式</p>
        </div>
      </template>
    </SHEditableArea>

    <h4>不可編輯狀態</h4>
    <SHEditableArea :editable="false">
      <div>
        <p>這是一個不可編輯區域的示例內容</p>
        <p>此區域的編輯按鈕呈現禁用狀態</p>
      </div>
    </SHEditableArea>
  </div>
</template>

<script setup lang="ts">
// 基本可編輯區域示例
</script>
