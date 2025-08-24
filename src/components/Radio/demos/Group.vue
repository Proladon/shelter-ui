<template>
  <div class="demo-container">
    <h3>RadioGroup 群組</h3>

    <div class="demo-section">
      <h4>垂直佈局</h4>
      <SHRadioGroup
        v-model="selectedOption1"
        :options="options"
        label="選擇您的喜好"
        orientation="vertical"
      />
      <p class="demo-result">選中的值：{{ selectedOption1 || "無" }}</p>
    </div>

    <div class="demo-section">
      <h4>水平佈局</h4>
      <SHRadioGroup
        v-model="selectedOption2"
        :options="options"
        label="選擇顏色"
        orientation="horizontal"
      />
      <p class="demo-result">選中的值：{{ selectedOption2 || "無" }}</p>
    </div>

    <div class="demo-section">
      <h4>帶禁用選項</h4>
      <SHRadioGroup
        v-model="selectedOption3"
        :options="disabledOptions"
        label="選擇方案"
        orientation="vertical"
      />
      <p class="demo-result">選中的值：{{ selectedOption3 || "無" }}</p>
    </div>

    <div class="demo-section">
      <h4>禁用整個群組</h4>
      <SHRadioGroup
        v-model="selectedOption4"
        :options="options"
        label="禁用的群組"
        orientation="vertical"
        disabled
      />
      <p class="demo-result">選中的值：{{ selectedOption4 || "無" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import SHRadioGroup from "../RadioGroup.vue"

const selectedOption1 = ref(null)
const selectedOption2 = ref(null)
const selectedOption3 = ref(null)
const selectedOption4 = ref("option1")

const options = [
  { label: "選項一", value: "option1" },
  { label: "選項二", value: "option2" },
  { label: "選項三", value: "option3" },
]

const disabledOptions = [
  { label: "免費方案", value: "free" },
  { label: "專業方案", value: "pro" },
  { label: "企業方案", value: "enterprise", disabled: true },
]
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply space-y-6;
}

.demo-section {
  @apply space-y-3;
}

.demo-section h4 {
  @apply text-sm font-semibold text-gray-600 dark:text-gray-400;
}

.demo-result {
  @apply text-sm text-gray-600 dark:text-gray-400 italic;
}
</style>
