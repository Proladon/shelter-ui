<template>
  <div class="flex flex-col gap-4">
    <h4>基本用法</h4>
    <s-editable-area>
      <div>
        <p>這是一個可編輯區域的示例內容</p>
        <p>點擊右上角的編輯按鈕可觸發編輯事件</p>
      </div>
    </s-editable-area>

    <h4>不可編輯狀態</h4>
    <s-editable-area :editable="false">
      <div>
        <p>這是一個不可編輯區域的示例內容</p>
        <p>此區域的編輯按鈕呈現禁用狀態</p>
      </div>
    </s-editable-area>
  </div>
</template>

<script setup lang="ts">
// 基本可編輯區域示例
</script>
