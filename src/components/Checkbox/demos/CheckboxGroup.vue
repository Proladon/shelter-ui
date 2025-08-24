<template>
  <div class="demo">
    <h3>Checkbox Group</h3>
    <div class="demo__content">
      <SHCheckboxGroup
        v-model="selected1"
        label="Choose your interests"
        :options="interests"
        orientation="vertical"
      />
      <p class="mt-4">Selected: {{ selected1 }}</p>
    </div>

    <div class="demo__content">
      <SHCheckboxGroup
        v-model="selected2"
        label="Choose colors (horizontal)"
        :options="colors"
        orientation="horizontal"
      />
      <p class="mt-4">Selected: {{ selected2 }}</p>
    </div>

    <div class="demo__content">
      <SHCheckboxGroup
        v-model="selected3"
        label="Choose languages (with disabled options)"
        :options="languages"
        orientation="vertical"
      />
      <p class="mt-4">Selected: {{ selected3 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import SHCheckboxGroup from "../CheckboxGroup.vue"

const selected1 = ref<string[]>(["programming"])
const selected2 = ref<string[]>([])
const selected3 = ref<string[]>(["javascript"])

const interests = [
  { label: "Programming", value: "programming" },
  { label: "Design", value: "design" },
  { label: "Music", value: "music" },
  { label: "Sports", value: "sports" },
]

const colors = ["Red", "Blue", "Green", "Yellow"]

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python", disabled: true },
  { label: "TypeScript", value: "typescript" },
  { label: "Java", value: "java", disabled: true },
  { label: "Go", value: "go" },
]
</script>

<style scoped>
.demo {
  padding: 1rem;
}

.demo > * + * {
  margin-top: 1rem;
}

.demo__content {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
