<template>
  <div class="space-y-4">
    <div>
      <p class="mb-2 text-sm text-gray-600">細線 (預設)</p>
      <Divider thickness="thin" />
    </div>

    <div>
      <p class="mb-2 text-sm text-gray-600">中等粗細</p>
      <Divider thickness="medium" />
    </div>

    <div>
      <p class="mb-2 text-sm text-gray-600">粗線</p>
      <Divider thickness="thick" />
    </div>
  </div>
</template>

<script setup>
import Divider from "../index.vue"
</script>
