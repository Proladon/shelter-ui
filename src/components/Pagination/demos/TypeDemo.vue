<template>
  <div class="demo-container">
    <h3>不同樣式變體的分頁</h3>

    <div class="demo-section">
      <h4>Default (預設)</h4>
      <SHPagination v-model="page1" :total="100" :page-size="10" />
    </div>

    <div class="demo-section">
      <h4>Text (文字按鈕)</h4>
      <SHPagination v-model="page2" :total="100" :page-size="10" text />
    </div>

    <div class="demo-section">
      <h4>Ghost (幽靈按鈕)</h4>
      <SHPagination v-model="page3" :total="100" :page-size="10" ghost />
    </div>

    <div class="demo-section">
      <h4>Outline (外框按鈕)</h4>
      <SHPagination v-model="page4" :total="100" :page-size="10" outline />
    </div>

    <div class="demo-section">
      <h4>Bordered (帶邊框按鈕)</h4>
      <SHPagination v-model="page5" :total="100" :page-size="10" borderd />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import SHPagination from "../index.vue"

const page1 = ref(3)
const page2 = ref(3)
const page3 = ref(3)
const page4 = ref(3)
const page5 = ref(3)
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
}

.demo-section h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-weight: 600;
}
</style>
