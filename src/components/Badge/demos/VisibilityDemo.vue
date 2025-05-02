<template>
  <div class="demo-container">
    <div>
      <div class="control-section">
        <s-button @click="visible = !visible">
          Toggle Badge Visibility
        </s-button>
        <div>Current state: {{ visible ? 'Visible' : 'Hidden' }}</div>
      </div>

      <div class="badges-section">
        <s-badge :value="8" :show="visible">
          <div class="demo-item"></div>
        </s-badge>

        <s-badge is-dot :show="visible">
          <div class="demo-item"></div>
        </s-badge>

        <s-badge value="New" :show="visible">
          <div class="demo-item"></div>
        </s-badge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SButton } from '@/index'

const visible = ref(true)
</script>

<style scoped>
.demo-container {
  padding: 20px 0;
}

.control-section {
  margin-bottom: 20px;
  text-align: center;
}

.badges-section {
  display: flex;
  gap: 24px;
  justify-content: center;
}

.demo-item {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
