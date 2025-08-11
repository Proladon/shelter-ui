<template>
  <div>
    <SHActiveButtonGroup v-model="activeTab" class="mb-5">
      <SHActiveButtonItem value="all">All</SHActiveButtonItem>
      <SHActiveButtonItem value="active">Active</SHActiveButtonItem>
      <SHActiveButtonItem value="completed">Completed</SHActiveButtonItem>
    </SHActiveButtonGroup>

    <div class="content-area">
      <div v-if="activeTab === 'all'">
        <h3>All Tasks</h3>
        <p>Showing all tasks in your list.</p>
      </div>
      <div v-if="activeTab === 'active'">
        <h3>Active Tasks</h3>
        <p>Showing only active tasks.</p>
      </div>
      <div v-if="activeTab === 'completed'">
        <h3>Completed Tasks</h3>
        <p>Showing only completed tasks.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHActiveButtonGroup, SHActiveButtonItem } from '@/index'

const activeTab = ref('all')
</script>

<style scoped>
.mb-5 {
  margin-bottom: 20px;
}

.content-area {
  background-color: var(--sh-bg-subtle);
  padding: 20px;
  border-radius: 6px;
}

h3 {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 18px;
}

p {
  margin: 0;
}
</style>
