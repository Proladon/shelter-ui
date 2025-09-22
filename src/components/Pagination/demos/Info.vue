<template>
  <div class="space-y-4">
    <Pagination v-model="infoPage" :total="1000" :page-size="25">
      <template #info="{ current, pageSize, totalItems }">
        <span class="text-sm text-gray-600">
          第 {{ (current - 1) * pageSize + 1 }}-{{
            Math.min(current * pageSize, totalItems)
          }}
          項，共 {{ totalItems }} 項
        </span>
      </template>
    </Pagination>
    <p class="text-sm text-gray-600">當前頁數: {{ infoPage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Pagination from "../index.vue"

const infoPage = ref(3)
</script>
