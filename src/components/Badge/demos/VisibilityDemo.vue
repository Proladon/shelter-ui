<template>
  <div class="demo-container">
    <div>
      <div class="control-section">
        <SHButton @click="visible = !visible">
          Toggle Badge Visibility
        </SHButton>
        <div>Current state: {{ visible ? 'Visible' : 'Hidden' }}</div>
      </div>

      <div class="badges-section">
        <SHBadge :value="8" :show="visible">
          <div class="demo-item"></div>
        </SHBadge>

        <SHBadge is-dot :show="visible">
          <div class="demo-item"></div>
        </SHBadge>

        <SHBadge value="New" :show="visible">
          <div class="demo-item"></div>
        </SHBadge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SHButton } from '@/index'
import { ref } from 'vue'

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
