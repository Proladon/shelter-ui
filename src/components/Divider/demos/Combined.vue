<template>
  <div class="p-4 border rounded">
    <h4 class="font-semibold">產品介紹</h4>
    <p class="text-sm text-gray-600">這是一個很棒的產品</p>

    <Divider variant="dashed" thickness="medium">特色功能</Divider>

    <ul class="list-disc list-inside space-y-1 text-sm">
      <li>功能一</li>
      <li>功能二</li>
      <li>功能三</li>
    </ul>

    <Divider variant="dotted">價格資訊</Divider>

    <div class="flex items-center justify-between">
      <span>基礎版</span>
      <span class="font-semibold">$29/月</span>
    </div>
  </div>
</template>

<script setup>
import Divider from "../index.vue"
</script>
