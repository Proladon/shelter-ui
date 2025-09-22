<template>
  <div class="space-y-4">
    <Pagination v-model="disabledPage" :total="100" :page-size="10" disabled />
    <p class="text-sm text-gray-600">當前頁數: {{ disabledPage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Pagination from "../index.vue"

const disabledPage = ref(2)
</script>
