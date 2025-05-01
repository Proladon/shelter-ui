<template>
  <div class="flex flex-col gap-4">
    <div>
      <h4>不同方位</h4>
      <div class="flex flex-wrap gap-4">
        <s-popover side="top">
          <template #trigger>
            <s-button>上方</s-button>
          </template>
          <div class="py-2">彈出框顯示在上方</div>
        </s-popover>

        <s-popover side="right">
          <template #trigger>
            <s-button>右方</s-button>
          </template>
          <div class="py-2">彈出框顯示在右方</div>
        </s-popover>

        <s-popover side="bottom">
          <template #trigger>
            <s-button>下方</s-button>
          </template>
          <div class="py-2">彈出框顯示在下方</div>
        </s-popover>

        <s-popover side="left">
          <template #trigger>
            <s-button>左方</s-button>
          </template>
          <div class="py-2">彈出框顯示在左方</div>
        </s-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 不同方位彈出框示例
</script>
