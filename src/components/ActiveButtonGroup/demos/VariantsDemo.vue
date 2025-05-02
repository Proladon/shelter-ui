<template>
  <div class="demo-container">
    <div class="variant-section">
      <h4>Disabled Button Example</h4>
      <s-active-button-group v-model="disabled" class="mb-4">
        <s-active-button-item value="tab1">Normal</s-active-button-item>
        <s-active-button-item value="tab2" disabled
          >Disabled</s-active-button-item
        >
        <s-active-button-item value="tab3">Button</s-active-button-item>
      </s-active-button-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SActiveButtonGroup, SActiveButtonItem } from '../'

const disabled = ref('tab1')
const options = ref('option1')
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
