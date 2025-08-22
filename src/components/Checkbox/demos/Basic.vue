<template>
  <div class="demo">
    <h3>Basic Checkbox</h3>
    <div class="demo__content">
      <SHCheckbox v-model="checked1" />
      <p>Checked: {{ checked1 }}</p>
    </div>

    <div class="demo__content">
      <SHCheckbox v-model="checked2" value="option1" />
      <p>Value: {{ checked2 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import SHCheckbox from "../index.vue"

const checked1 = ref<boolean>(false)
const checked2 = ref<boolean>(false)
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
</style>
