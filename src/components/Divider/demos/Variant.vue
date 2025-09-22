<template>
  <div class="space-y-4">
    <div>
      <p class="mb-2 text-sm text-gray-600">實線 (預設)</p>
      <Divider variant="solid" />
    </div>

    <div>
      <p class="mb-2 text-sm text-gray-600">虛線</p>
      <Divider variant="dashed" />
    </div>

    <div>
      <p class="mb-2 text-sm text-gray-600">點線</p>
      <Divider variant="dotted" />
    </div>
  </div>
</template>

<script setup>
import Divider from "../index.vue"
</script>
