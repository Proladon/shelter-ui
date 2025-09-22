<template>
  <div class="space-y-6">
    <section>
      <h3 class="text-lg font-semibold mb-4">小尺寸 (Small)</h3>
      <Pagination
        v-model="smallPage"
        :total="100"
        :page-size="10"
        size="small"
      />
      <p class="text-sm text-gray-600 mt-2">當前頁數: {{ smallPage }}</p>
    </section>

    <section>
      <h3 class="text-lg font-semibold mb-4">默認尺寸 (Default)</h3>
      <Pagination
        v-model="defaultPage"
        :total="100"
        :page-size="10"
        size="default"
      />
      <p class="text-sm text-gray-600 mt-2">當前頁數: {{ defaultPage }}</p>
    </section>

    <section>
      <h3 class="text-lg font-semibold mb-4">大尺寸 (Large)</h3>
      <Pagination
        v-model="largePage"
        :total="100"
        :page-size="10"
        size="large"
      />
      <p class="text-sm text-gray-600 mt-2">當前頁數: {{ largePage }}</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Pagination from "../index.vue"

const smallPage = ref(1)
const defaultPage = ref(1)
const largePage = ref(1)
</script>
