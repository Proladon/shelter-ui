<template>
  <div class="demo">
    <h3>Checkbox with Label</h3>
    <div class="demo__content">
      <SHCheckbox v-model="checked1" label="Accept terms and conditions" />
    </div>

    <div class="demo__content">
      <SHCheckbox v-model="checked2" label="Subscribe to newsletter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import SHCheckbox from "../index.vue"

const checked1 = ref<boolean>(false)
const checked2 = ref<boolean>(true)
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
