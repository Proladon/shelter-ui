<template>
  <div class="demo-container">
    <div class="variant-section">
      <h4>Disabled Button Example</h4>
      <SHActiveButtonGroup v-model="disabled" class="mb-4">
        <SHActiveButtonItem value="tab1">Normal</SHActiveButtonItem>
        <SHActiveButtonItem value="tab2" disabled>Disabled</SHActiveButtonItem>
        <SHActiveButtonItem value="tab3">Button</SHActiveButtonItem>
      </SHActiveButtonGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHActiveButtonItem } from '../'

const disabled = ref('tab1')
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.variant-section {
  margin-bottom: 10px;
}

h4 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
