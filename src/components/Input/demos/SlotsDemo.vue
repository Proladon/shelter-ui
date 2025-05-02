<template>
  <div class="demo-container">
    <h4>Prefix Slot</h4>
    <s-input v-model="userInput" placeholder="Enter username">
      <template #prefix>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </template>
    </s-input>

    <h4>Suffix Slot</h4>
    <s-input
      v-model="passwordInput"
      placeholder="Enter password"
      type="password"
    >
      <template #suffix>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </template>
    </s-input>

    <h4>Both Slots</h4>
    <s-input v-model="searchInput" placeholder="Search..." clearable>
      <template #prefix>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </template>
      <template #suffix>
        <span class="search-hint">Press Enter</span>
      </template>
    </s-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userInput = ref('')
const passwordInput = ref('')
const searchInput = ref('')
</script>

<style scoped>
.demo-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

h4 {
  margin: 16px 0 8px;
  font-size: 14px;
}

.icon {
  color: #999;
}

.search-hint {
  font-size: 12px;
  color: #999;
  margin-right: 4px;
}
</style>
