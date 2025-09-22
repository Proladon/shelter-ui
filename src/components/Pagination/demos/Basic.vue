<template>
  <div class="space-y-4">
    <Pagination v-model="basicPage" :total="100" :page-size="10" />
    <p class="text-sm text-gray-600">當前頁數: {{ basicPage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Pagination from "../index.vue"

const basicPage = ref(1)
</script>
