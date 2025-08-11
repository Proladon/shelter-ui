<template>
  <div class="flex flex-col gap-4">
    <div>
      <h4>不同方位</h4>
      <div class="flex flex-wrap gap-4">
        <SHPopover side="top">
          <template #trigger>
            <SHButton>上方</SHButton>
          </template>
          <div class="py-2">彈出框顯示在上方</div>
        </SHPopover>

        <SHPopover side="right">
          <template #trigger>
            <SHButton>右方</SHButton>
          </template>
          <div class="py-2">彈出框顯示在右方</div>
        </SHPopover>

        <SHPopover side="bottom">
          <template #trigger>
            <SHButton>下方</SHButton>
          </template>
          <div class="py-2">彈出框顯示在下方</div>
        </SHPopover>

        <SHPopover side="left">
          <template #trigger>
            <SHButton>左方</SHButton>
          </template>
          <div class="py-2">彈出框顯示在左方</div>
        </SHPopover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 不同方位彈出框示例
</script>
