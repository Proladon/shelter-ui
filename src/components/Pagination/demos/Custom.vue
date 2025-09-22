<template>
  <div class="space-y-4">
    <Pagination
      v-model="customPage"
      :total="500"
      :page-size="20"
      :sibling-count="1"
      :show-edges="false"
    />
    <p class="text-sm text-gray-600">當前頁數: {{ customPage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Pagination from "../index.vue"

const customPage = ref(5)
</script>
