<template>
  <div class="flex items-center h-20 space-x-4">
    <div class="text-center">
      <p class="font-semibold">Blog</p>
      <p class="text-sm text-gray-500">部落格</p>
    </div>
    <Divider orientation="vertical" />
    <div class="text-center">
      <p class="font-semibold">Docs</p>
      <p class="text-sm text-gray-500">文檔</p>
    </div>
    <Divider orientation="vertical" />
    <div class="text-center">
      <p class="font-semibold">Source</p>
      <p class="text-sm text-gray-500">原始碼</p>
    </div>
  </div>
</template>

<script setup>
import Divider from "../index.vue"
</script>
